import React from "react";
import Header from "../_components/Header";
import WelcomeCard from "../_components/WelcomeCard";
import Board from "../_components/Board";
import Overlays from "../_components/Overlays";
import GameRequest from "../_components/GameRequest";
import RequetUnderProgress from "../_components/RequetUnderProgress";
import RequestError from "../_components/RequestError";

function Lobby() {
	return (
		<div className="min-h-screen">
			{/* Header */}
			<Header />
			<WelcomeCard />
			<Board />
			{
            false && (
				<Overlays>
					{/* <GameRequest /> */}
					{/* <RequetUnderProgress /> */}
					<RequestError />
				</Overlays>
			)}
		</div>
	);
}

export default Lobby;
