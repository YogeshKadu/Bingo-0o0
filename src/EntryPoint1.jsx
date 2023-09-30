import Peer, { DataConnectionErrorType } from "peerjs";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";

import Login from "./Pages/Login";
import Landing from "./Pages/Landing";
import GameBoard from "./Pages/GameBoard";
import punishments from "./assets/punishments";

const ToastOptions = {
	error: {
		icon: "😥",
		className: "font-Nono",
		position: "bottom-center",
	},
	success: {
		icon: "😊",
		className: "font-Nono",
		position: "bottom-center",
	},
};
const shuffledNumbers = () => {
	const numberedArray = Array.from({ length: 25 })
		.fill({})
		.map((_, index) => {
			return { id: index, value: index + 1, checked: false };
		});
	for (let i = numberedArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[numberedArray[i], numberedArray[j]] = [
			numberedArray[j],
			numberedArray[i],
		]; // Swap elements
	}
	return numberedArray;
};
const winPatterns = [
	// Rows
	[0, 1, 2, 3, 4],
	[5, 6, 7, 8, 9],
	[10, 11, 12, 13, 14],
	[15, 16, 17, 18, 19],
	[20, 21, 22, 23, 24],

	// Columns
	[0, 5, 10, 15, 20],
	[1, 6, 11, 16, 21],
	[2, 7, 12, 17, 22],
	[3, 8, 13, 18, 23],
	[4, 9, 14, 19, 24],

	// Diagonals
	[0, 6, 12, 18, 24],
	[4, 8, 12, 16, 20],
];

function EntryPoint1() {
	const [LocalUsername, setLocalUsername] = useState("");
	const [PeerObject, setPeerObject] = useState(null);
	const [DataConnection, setDataConnection] = useState(null);

	// Flags
	const [Buffer, setBuffer] = useState(false);
	const [Request, setRequest] = useState(false);
	const [WinnerID, setWinnerID] = useState("");
	const [InGame, setInGame] = useState(false);

	const [RecentMessage, setRecentMessage] = useState(null);

	const [Cards, setCards] = useState(shuffledNumbers());
	const navigate = useNavigate();

	useEffect(() => {
		if (LocalUsername === "") {
			navigate("/", { replace: true });
		}
	}, []);
	useEffect(() => {
		if (DataConnection !== null) HandlePeerConnection();
	}, [DataConnection]);

	const ConnectToServer = (username) => {
		setBuffer(true);
		const peer = new Peer(username, { debug: 0 });
		peer.on("open", (id) => HandlePeerOpen(id));
		peer.on("connection", (dataConnection) => {
			// dataConnection.send("Hi Donnected");
			setRequest(true);
			setDataConnection(dataConnection);
			// HandlePeerConnection(dataConnection);
		});
		peer.on("close", () => HandlePeerClose());
		peer.on("disconnected", (currentId) =>
			HandlePeerDisconnected(currentId)
		);
		peer.on("error", (error) => HandlePeerError(error));
		setPeerObject(peer);
		/*
			fn: (error: PeerError<"disconnected" | "browser-incompatible" | "invalid-id" | "invalid-key" | "network" | "peer-unavailable" | "ssl-unavailable" | "server-error" | "socket-error" | "socket-closed" | "unavailable-id" | "webrtc">)
		*/
	};
	//#region Peer Region
	const HandlePeerOpen = (id) => {
		console.log(">>>HandlePeerOpen: ", id);
		setBuffer(false);
		setLocalUsername(id);
		navigate("/landing", { replace: true });
	};
	const HandlePeerClose = () => {
		console.log(">>>HandlePeerClose");
	};
	const HandlePeerDisconnected = (currentId) => {
		console.log(">>>HandlePeerDisconnected: ", currentId);
	};
	const HandlePeerError = (error) => {
		switch (error.type) {
			case "peer-unavailable":
				break;
			case "webrtc":
				error.message = "Stop calling your self.";
				break;
			default:
		}
		setBuffer(false);
		setRequest(false);
		console.log(">>>HandlePeerError: ", error);
		console.log("error.type: ", error.type);
		toast(error.message, ToastOptions.error);
	};
	//#endregion

	const ConnectToClient = (username) => {
		if (PeerObject === null) {
			console.log("PeerObject Numm");
			return;
		}
		setBuffer(true);
		const conn = PeerObject.connect(username);
		// HandlePeerConnection(conn);
		setDataConnection(conn);
	};
	const HandlePeerConnection = () => {
		// setDataConnection(dataConnection);
		DataConnection.on("open", (data) => HandleConnOpen(data));
		DataConnection.on("data", (data) => {
			console.log("Received data:", data);
			ReceiveMessage(JSON.parse(data));
		});
		DataConnection.on("close", (data) => HandleConnClose(data));
		DataConnection.on("disconnected", (data) =>
			HandleConnDisconnected(data)
		);
		DataConnection.on("error", (error) => HandleConnError(error));
	};
	const HandleConnOpen = (data) => {
		// setBuffer(false);
		console.log(">>>HandleConnOpen: ", data);
		// navigate("/match", { replace: true });
	};
	const HandleConnClose = (data) => {
		console.log(">>>HandleConnClose: ", data);
		toast.error("Lost connection with player.", ToastOptions.error);

		navigate("/landing");
		// ************************************************************************* setDataConnection(null);
	};
	const HandleConnError = (error) => {
		console.log(">>>HandleConnError: ", error);
		console.log("error.type: ", error.type);
		toast((message = error.message), ToastOptions.error);

		setBuffer(false);
		setRequest(false);
	};
	const HandleConnDisconnected = (data) => {
		console.log(data);
		setDataConnection(null);

		setBuffer(false);
		setRequest(false);
	};

	// ******************************************************************************
	//#region Regular Function
	const WinCheck = (cards) => {
		let matchingPatternCount = 0;
		// console.log(cards);
		for (const pattern of winPatterns) {
			const isWin = pattern.every(
				(index) => cards[index].checked === true
			);
			if (isWin) {
				matchingPatternCount++;
			}
		}
		if (matchingPatternCount >= 5) return true;
		return false;
	};

	const CardClicked = (index) => {
		const updatedCards = [...Cards];
		updatedCards[index].checked = true;
		const message = {
			status: 200,
			peer: DataConnection.peer,
			content: updatedCards[index].value,
		};
		if (WinCheck(updatedCards)) {
			message.winpeer = LocalUsername;
			message.status = 201;
			message.info =
				punishments[Math.floor(Math.random() * punishments.length)];
			console.log("check for win", message);
			toast("Congrats you won this dual!", {
				...ToastOptions.success,
				icon: "🤩",
			});
		}
		setCards(updatedCards);
		setRecentMessage(message);
		SendMessage(message);
	};
	/*
		{
			status: 100-info[ 101:Accept | 102:Reject ] | 200-Data | 201 - Win with option | 20* - win without option | 400-Error
			peer:[person whos going to play]
			content: String | Card Value | Panelty
			info: String
			winpeer: String
		}
	*/

	const SendMessage = (message) => {
		DataConnection.send(JSON.stringify(message));
	};
	const Accept = () => {
		setInGame(true);
		setRequest(false);
		const message = {
			status: 101,
			peer: Math.random > 0.5 ? localStorage : DataConnection.peer,
			info: "Player accepted your dual !",
		};
		console.log(message);
		setRecentMessage(message);
		SendMessage(message);
		navigate("/match");
	};
	const Reject = () => {
		setRequest(false);
		const message = {
			status: 102,
			peer: Math.random > 0.5 ? localStorage : DataConnection.peer,
			info: "Player rejected your dual !",
		};
		setRecentMessage(null);
		SendMessage(message);
		navigate("/landing");
	};
	const ReceiveMessage = (responce) => {
		switch (responce.status) {
			case 100:
				console.log("info", responce.content);
				break;
			case 101:
				console.log("Accept", responce.content);
				setBuffer(false);
				toast(responce.info, ToastOptions.success);
				navigate("/match");
				break;
			case 102:
				console.log("Reject", responce.info);
				setBuffer(false);
				setDataConnection(null);
				navigate("/landing");
				toast(responce.info, ToastOptions.error);
				break;
			case 200:
				var indexToUpdate = Cards.findIndex(
					(item) => item.value === responce.content
				);
				var updatedCards = [...Cards];
				console.log(indexToUpdate);
				updatedCards[indexToUpdate].checked = true;

				if (WinCheck(updatedCards) === true) {
					const message = {
						...responce,
						status: 201,
						peer: DataConnection.peer,
						info: punishments[
							Math.floor(Math.random() * punishments.length)
						],
						winpeer: LocalUsername,
					};
					SendMessage(message);
					toast("Congrats you won this dual!", {
						...ToastOptions.success,
						icon: "🤩",
					});
				}
				setCards(updatedCards);
				break;
			case 201:
				if (responce.winpeer === DataConnection.peer)
					toast(`${DataConnection.peer} won this dual!`, {
						...ToastOptions.error,
						icon: "😒",
						style: { backgroundColor: "#ff00ff", color: "#FFF" },
					});
				var indexToUpdate = Cards.findIndex(
					(item) => item.value === responce.content
				);
				console.log(indexToUpdate);
				var updatedCards = [...Cards]; // ***************************************************errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
				updatedCards[indexToUpdate].checked = true;
				setCards(updatedCards);
				break;
			case 400:
				console.log("error");
				break;

			default:
				break;
		}
		setRecentMessage(responce);
	};

	const Back = () => {
		setCards(shuffledNumbers());
		setBuffer(false);
		setRequest(false);
		setInGame(false);
		setWinnerID("");
		setRecentMessage(null);
	};
	//#endregion

	return (
		<div className="min-h-screen w-full bg-gradient-to-b from-blue-600 to-purple-700 font-Poppins relative">
			<Routes>
				<Route
					path="/"
					element={<Login ConnectToServer={ConnectToServer} />}
				/>
				<Route
					path="/landing"
					element={
						<Landing
							ConnectToClient={ConnectToClient}
							LocalUsername={LocalUsername}
						/>
					}
				/>
				<Route
					path="/match"
					element={
						<GameBoard
							dataConnection={DataConnection}
							LocalUsername={LocalUsername}
							Cards={Cards}
							CardClicked={CardClicked}
							RecentMessage={RecentMessage}
						/>
					}
				/>
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>

			{Buffer === true && (
				<div className="absolute w-full h-full top-0 left-0 bg-gray-600/20 flex justify-center items-center">
					<div className="m-5 p-3 bg-white rounded-lg text-blue-500">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 16 16"
							className="animate-spin"
						>
							<path
								fill="currentColor"
								d="M2.501 8a5.5 5.5 0 1 1 5.5 5.5A.75.75 0 0 0 8 15a7 7 0 1 0-7-7a.75.75 0 0 0 1.501 0Z"
							/>
						</svg>
					</div>
				</div>
			)}
			{Request === true && (
				<div className="absolute left-0 top-0 transition-transform bg-slate-800/20 h-full w-full justify-center items-center flex">
					<div className="bg-slate-200 w-full p-5 m-5 max-w-md rounded-xl shadow-lg ">
						<p className="mb-5">
							<strong>{DataConnection?.peer}</strong> requested
							for a dual!
						</p>
						<div className="flex gap-3 ">
							<button
								className="bg-blue-500 text-white px-5 py-1 rounded-xl flex-1"
								onClick={() => Accept()}
							>
								Accept
							</button>
							<button
								className="bg-red-400 text-white px-5 py-1 rounded-xl flex-1"
								onClick={() => Reject()}
							>
								Reject
							</button>
						</div>
					</div>
				</div>
			)}

			{WinnerID !== "" && (
				<div className="absolute left-0 top-0 transition-transform bg-slate-800/20 h-full w-full justify-center items-center flex">
					<div className="bg-slate-200 w-full p-5 m-5 max-w-md rounded-xl shadow-lg ">
						<p className="mb-5">
							{WinnerID === LocalUsername && (
								<>Congrats for winning the match. <span className="font-Noto text-xl">😍</span></>
							)}
							{WinnerID !== LocalUsername && (
								<>Don't be sad lets try again. <span className="font-Noto text-xl">🥺</span></>
							)}
						</p>
						<div className="flex gap-3 ">
							<button
								className="bg-blue-500 text-white px-5 py-1 rounded-xl flex-1"
								onClick={() => Back()}
							>
								Dashobard
							</button>
						</div>
					</div>
				</div>
			)}

			<Toaster reverseOrder={true} position="bottom-center" />
		</div>
	);
}

export default EntryPoint1;
