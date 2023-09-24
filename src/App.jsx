import { Route, Routes, useNavigate } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";

import Login from "./Pages/Login";
import Landing from "./Pages/Landing";
import { useEffect, useState } from "react";

/*
message:{
	status: 100 - Message | 200 - Accepted | 400 - Rejected,
	message: string,
	win: boolean,
	winnerId: ""
	peerid:""
}

*/

// The usage -
import { Peer } from "peerjs";
import GameBoard from "./Pages/GameBoard";

function App() {
	const [localPeerId, setLocalPeerId] = useState("");
	const [buffering, setBuffering] = useState(false);
	const [inGame, setInGame] = useState(false);
	const [gotRequest, setGotRequest] = useState(false);
	const [peerObject, setPeerObject] = useState();
	const [DataConnection, setDataConnection] = useState([]);
	const [messageLog, setMessageLog] = useState([]);
	const [resentMSG, setResentMSG] = useState({});

	const [clientPeerId, setClientPeerid] = useState("");
	const [connRequest, setConnRequest] = useState([]);
	// const [connected, setconnected] = useState(false);

	var firstRun = true;
	const navigate = useNavigate();

	useEffect(() => {
		console.log("First run test");
		if (localPeerId === "") navigate("/auth");
		firstRun = false;
	}, []);

	useEffect(() => {
		if (!firstRun) return;
		if (localPeerId === "") navigate("/auth");
	}, [localPeerId]);

	const closeConnection = (message, dataConnection) => {
		dataConnection.send(
			JSON.stringify({
				status: 400,
				message: message,
				win: false,
				winnerId: null,
				peerid: localPeerId,
			})
		);
		console.log("called", dataConnection);
		setTimeout(DataConnection.close(), 3000);
	};

	// const HandleNewResponse = (response) => {
	// 	if (response === false) {
	// 		closeConnection();
	// 	}
	// 	setGotRequest(false);
	// };

	//#region Server
	function ConnectToServer(peerid) {
		console.log("ConnectToServer");
		const localPeer = new Peer(peerid, { debug: 2 });
		localPeer.on("open", (id) => {
			HandlePeerOpen(id);
		});
		localPeer.on("connection", (data) => {
			HandlePeerConnection(data);
		});
		localPeer.on("close", (data) => HandlePeerClose(data));
		localPeer.on("disconnected", (data) => HandlePeerDisconnected(data));
		localPeer.on("error", HandlePeerError);

		setPeerObject(localPeer);
		setBuffering(true);
	}
	const HandlePeerOpen = (id) => {
		console.log("peerID: ", id);
		// setconnected(true); // Connected to server
		setLocalPeerId(id);
		navigate("/");
		setBuffering(false);
	};
	const HandlePeerConnection = (dataConnection) => {
		if (inGame === true) {
			closeConnection("Player is in the game.", dataConnection);
			return;
		}
		console.log("HandlePeerConnection");
		setDataConnection(dataConnection);
		setGotRequest(true);
	};

	const HandlePeerClose = (data) => {
		console.log("HandlePeerClose",data);
	};

	const HandlePeerDisconnected = (data) => {
		console.log("HandlePeerDisconnected", data);
		navigate("/auth");
	};
	const HandlePeerError = (error) => {
		console.log("HandlePeerError : ", error.message);
		// setLocalPeerId("");
		toast.error(error.message);
		setBuffering(false);
	};
	//#endregion

	//#region Client
	function ConnectToClient(peerid) {
		console.log(!inGame);
		if (peerObject === null) return;
		const dataConnection = peerObject.connect(peerid);
		console.log("ConnectToClient");
		setDataConnection(dataConnection);
		setBuffering(true);

		dataConnection.on("open", HandleConnOpen);
		dataConnection.on("data", ReceiveMessage);
		dataConnection.on("close", HandleConnClose);
		dataConnection.on("error", HandleConnError);
		console.log("DataConnect setup Complete");
	}
	const HandleConnOpen = () => {
		console.log("HandleConnOpen");
		// navigate("/match");
	};
	const HandleConnClose = () => {
		console.log("HandleConnClose");
	};
	const HandleConnError = (error) => {
		console.log("HandleConnError ", error);
		console.log("Type: ", error.type);
	};
	//#endregion

	const ReceiveMessage = (message) => {
		const parsedData = JSON.parse(message);

		setResentMSG(parsedData);
		setMessageLog((preState) => [...preState, parsedData]);
		if (parsedData.status === 400) {
			setBuffering(false);
		} else if (parsedData.status === 200) {
			setBuffering(false);
			if (parsedData.win === true) {
				setInGame(false);
			} else {
				setInGame(true);
			}
			navigate("/match");
		}
		console.log(parsedData);
	};
	const SendMessage = (message) => {
		setResentMSG(message);
		DataConnection.send(JSON.stringify(message));
	};

	return (
		<div className="min-h-screen w-full bg-gradient-to-b from-blue-600 to-purple-700 font-Poppins relative">
			<Routes>
				<Route
					path="/"
					element={
						<Landing
							localPeerId={localPeerId}
							gotRequest={gotRequest}
							dataConnection={DataConnection}
							SendMessage={SendMessage}
							setGotRequest={setGotRequest}
							closeConnection={closeConnection}
							ConnectToClient={ConnectToClient}
						/>
					}
				/>
				<Route
					path="/match"
					element={
						<GameBoard
							messageLog={messageLog}
							localPeerId={localPeerId}
							dataConnection={DataConnection}
							SendMessage={SendMessage}

							resentMSG={resentMSG}
						/>
					}
				/>
				<Route
					path="/auth"
					element={<Login ConnectToServer={ConnectToServer} />}
				/>
			</Routes>

			{buffering === true && (
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
			<Toaster reverseOrder={true} position="bottom-center" />
		</div>
	);
}

export default App;
