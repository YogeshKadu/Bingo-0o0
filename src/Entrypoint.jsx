import Peer from "peerjs";
import React, { useEffect, useState } from "react";
import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import Login from "./Pages/Login";
import Landing from "./Pages/Landing";
import GameBoard from "./Pages/GameBoard";
import punishments from "./assets/punishments";

//#region Global Variable and function
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
const ToastOptions = {
	error: {
		icon: "😥",
		className: "font-Nono",
	},
	success: {
		icon: "😊",
		className: "font-Nono",
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
//#endregion
export default function Entrypoint() {
	const navigate = useNavigate();
	const [LocalUsername, setLocalUsername] = useState("");
	const [PeerObject, setPeerObject] = useState(null);
	const [DataConnection, setDataConnection] = useState(null);

	const [Cards, setCards] = useState(shuffledNumbers());
	const [RecentMessage, setRecentMessage] = useState(null);

	const [Buffer, setBuffer] = useState(false);
	const [EndBanner, setEndBanner] = useState(false);
	// const [Loading, setLoading] = useState(false);
	const [NewRequest, setNewRequest] = useState(false);

	useEffect(() => {
		if (DataConnection !== null) {
			HandlePeerConnection();
		}else{
			setCards(shuffledNumbers());
			console.log("shuffle");
		}
	}, [DataConnection]);
	useEffect(() => {
		console.log(RecentMessage);
	}, [RecentMessage]);

	const ConnectToServer = (username) => {
		setBuffer(true);
		const peer = new Peer(username, { debug: 0 });
		peer.on("open", (id) => HandlePeerOpen(id));
		peer.on("connection", (dataConnection) => {
			setNewRequest(true);
			setDataConnection(dataConnection);
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

	const ConnectToClient = (username) => {
		if (PeerObject === null) {
			console.log("PeerObject null");
			return;
		}
		setBuffer(true);
		const conn = PeerObject.connect(username);
		setDataConnection(conn);
	};

	//#region Peer Region
	const HandlePeerOpen = (id) => {
		console.log(">>>HandlePeerOpen: ", id);
		setLocalUsername(id);
		setBuffer(false);
		navigate("/landing", { replace: true });
	};
	const HandlePeerClose = () => {
		console.log(">>>HandlePeerClose");
	};
	const HandlePeerDisconnected = (currentId) => {
		console.log(">>>HandlePeerDisconnected: ", currentId);
		navigate("/landing", { replace: true });

		setBuffer(false);
	};
	const HandlePeerError = (error) => {
		switch (error.type) {
			case "peer-unavailable":
				// error.message = "Unavailable username.";
				break;
			case "webrtc":
				error.message = "Stop calling your self.";
				break;
			default:
		}
		console.log(">>>HandlePeerError: ", error);
		console.log("error.type: ", error.type);
		toast(error.message, ToastOptions.error);

		setBuffer(false);
	};
	//#endregion

	//#region Conn Region
	const HandlePeerConnection = () => {
		DataConnection.on("open", (data) => HandleConnOpen(data));
		DataConnection.on("data", (data) => {
			ReceiveMessage(JSON.parse(data));
		});
		DataConnection.on("close", (data) => HandleConnClose(data));
		DataConnection.on("disconnected", (data) =>
			HandleConnDisconnected(data)
		);
		DataConnection.on("error", (error) => HandleConnError(error));
	};
	const HandleConnOpen = (data) => {
		console.log(">>>HandleConnOpen: ", data);
		setBuffer(false);
	};
	const HandleConnClose = (data) => {
		console.log(">>>HandleConnClose: ", data);
		setDataConnection(null);
		navigate("landing");
	};
	const HandleConnError = (error) => {
		console.log(">>>HandleConnError: ", error);
		console.log("error.type: ", error.type);
		setBuffer(false);
	};
	const HandleConnDisconnected = (data) => {
		console.log(data);
		setBuffer(false);
	};
	//#endregion

	//#region General Functions
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

	const EndGame = () => setTimeout(() => {
		setEndBanner(true);
	}, 1500);

	const CardClicked = (index) => {
		console.log(index);
		const updatedCards = [...Cards];
		updatedCards[index].checked = true;
		const message = {
			status: 200,
			peer: DataConnection.peer,
			content: updatedCards[index].value,
			info: ``,
			winpeer: "",
		};
		if (WinCheck(updatedCards) === true) {
			message.status = 201;
			message.winpeer = LocalUsername;
			message.info =
				punishments[Math.floor(Math.random() * punishments.length)];
			// toast("Congrats you win this dual!", {
			// 	...ToastOptions.success,
			// 	icon: "🤩",
			// 	duration: 5000,
			// });
			// setEndBanner(true);
			EndGame()
		}
		setRecentMessage(message);
		setCards(updatedCards);
		SendMessage(message);
	};

	// {
	// 	status: 100-info[ 101:Accept | 102:Reject ] | 200-Data | 201 - Win | 400-Error
	// 	peer:[person whos going to play next]
	// 	content: String | Card Value
	// 	info: String | Message
	// 	winpeer: String
	// }
	const Accept = () => {
		setNewRequest(false);
		navigate("board");
		// console.log("Navigate");
	};
	const Reject = () => {
		setNewRequest(false);
		setTimeout(() => {
			setDataConnection(null);
		}, 1500);
	};

	const SendMessage = (message) => {
		DataConnection.send(JSON.stringify(message));
	};
	const ReceiveMessage = (responce) => {
		switch (responce.status) {
			case 101:
				{
					toast(responce.info, ToastOptions.success);
					navigate("board", { replace: true });
				}
				break;
			case 102:
				{
					toast(responce.info, ToastOptions.error);
				}
				break;
			case 200:
				{
					const indexToUpdate = Cards.findIndex(
						(item) => item.value === responce.content
					);
					const updatedCards = [...Cards];
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
						// toast("Congrats you won this dual!", {
						// 	...ToastOptions.success,
						// 	icon: "🤩",
						// 	duration: 5000,
						// });
						// setEndBanner(true);
						EndGame();
						setRecentMessage(responce);
						SendMessage(message);
					} else {
						setRecentMessage(responce);
					}
					setCards(updatedCards);
				}
				break;
			case 201:
				{
					// if (responce.winpeer === LocalUsername) {
					// 	toast("Congrats you won this dual!", {
					// 		...ToastOptions.success,
					// 		icon: "🤩",
					// 		duration: 5000,
					// 	});
					// } else {
					// 	toast("You lost this dual!", {
					// 		...ToastOptions.error,
					// 		icon: "😟",
					// 		duration: 5000,
					// 	});
					// }
					setRecentMessage(responce);
					// setEndBanner(true);
					EndGame();
				}
				break;
			default:
				toast("Error: Let me know what you did for this error", {
					...ToastOptions.error,
					icon: "😒",
					duration: 8000,
				});
				break;
		}
		// setRecentMessage(responce);
	};
	//#endregion
	return (
		<div className="w-full flex flex-col min-h-screen font-asap">
			<Routes>
				<Route
					path="/"
					element={<Login ConnectToServer={ConnectToServer} />}
				/>
				<Route
					path="landing"
					element={
						<Landing
							LocalUsername={LocalUsername}
							ConnectToClient={ConnectToClient}
						/>
					}
				/>
				<Route
					path="board"
					element={
						<GameBoard
							Cards={Cards}
							CardClicked={CardClicked}
							LocalUsername={LocalUsername}
							RecentMessage={RecentMessage}
							FriendUsername={DataConnection?.peer}
						/>
					}
				/>

				<Route path="*" element={<Navigate to={"/"} />} />
			</Routes>
			{(NewRequest || Buffer || EndBanner) && (
				<div className="absolute w-full h-full top-0 left-0 bg-gray-600/20 flex justify-center items-center">
					{NewRequest && (
						<div className="w-full p-5 max-w-md">
							<div className="bg-slate-200 p-5 shadow-lg  rounded-xl">
								<p className="mb-5">
									<strong>{DataConnection?.peer}</strong>{" "}
									requested for a dual!
								</p>
								<div className="flex gap-3 ">
									<button
										className="bg-blue-500 text-white px-5 py-1 rounded-xl flex-1"
										onClick={() => {
											const message = {
												status: 101,
												peer:
													Math.random > 0.5
														? LocalUsername
														: DataConnection.peer,
												content: "",
												info: `${LocalUsername} accepted your dual !`,
												winpeer: "",
											};
											setRecentMessage(message);
											SendMessage(message);
											// Send Message
											Accept();
										}}
									>
										Accept
									</button>
									<button
										className="bg-red-400 text-white px-5 py-1 rounded-xl flex-1"
										onClick={() => {
											const message = {
												status: 102,
												peer:
													Math.random > 0.5
														? LocalUsername
														: DataConnection.peer,
												content: "",
												info: `${LocalUsername} Rejected your request !`,
												winpeer: "",
											};
											// Send Message
											setRecentMessage(null);
											SendMessage(message);
											Reject();
										}}
									>
										Reject
									</button>
								</div>
							</div>
						</div>
					)}
					{Buffer && (
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
					)}
					{EndBanner && (
						<div className="h-full w-full m-5 max-w-md rounded-xl flex items-end">
							<div className="w-full p-5 bg-white shadow-lg mb-5 rounded-xl">

							</div>
						</div>
					)}
				</div>
			)}
			<Toaster reverseOrder={true} position="bottom-center" />
		</div>
	);
}
