import React, { useEffect, useState } from "react";
import Header from "../_components/Header";
import { useNavigate } from "react-router-dom";

function GameBoard(props) {
	const navigate = useNavigate();
	useEffect(() => {
		// if (props.LocalUsername === "") navigate("/", { replace: true });
	}, []);
	console.log(props.RecentMessage, props.LocalUsername);

	return (
		<div className="w-full max-w-lg mx-auto h-screen overflow-hidden flex flex-col">
			<Header />
			{/* <p className="text-center font-semibold text-2xl text-white">00:30</p> */}
			<div className="m-5 p-2 bg-white rounded-2xl">
				<div className="text-center bg-gray-200 rounded-lg shadow-inner p-2 relative flex gap-2 font-semibold">
					<div className=" w-2/4 z-20 flex items-center justify-center flex-col gap-1">
						<span className="bg-pink-500 rounded-full relative w-10 h-10  grid place-content-center mt-2 text-white">
							{/* <span
								className={`absolute animate-ping rounded-full w-full h-full top-0 left-0 bg-pink-500 opacity-75 ${
									true && "hidden"
								}`}
							></span> */}
							
							<span className={`${props.RecentMessage.peer === props.LocalUsername && 'hidden'} absolute w-full h-full top-0 left-0 rounded-full border-4 scale-125 border-gray-700`}></span>
							Y
						</span>
						<p className="text-xs">{props.LocalUsername}</p>
					</div>
					<div className="w-2/4 z-20 flex items-center justify-center flex-col gap-1">
						<span className="bg-sky-500 rounded-full relative w-10 h-10 grid place-content-center mt-2 text-white">
							<span className={`${props.RecentMessage.peer !== props.LocalUsername && 'hidden'} absolute w-full h-full top-0 left-0 rounded-full border-4 scale-125 border-gray-700`}></span>
							{/* <span
								className={`absolute animate-ping rounded-full w-full h-full top-0 left-0 bg-sky-400 opacity-75 ${
									true && "hidden"
								}`}
							></span> */}
							{/* <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span> */}
							K
						</span>
						<p className="text-xs">{props.dataConnection.peer}</p>
					</div>
				</div>
			</div>
			<div className="w-full px-5">
				<div className="p-5 bg-[#4773F455] rounded-2xl shadow-md">
					<div className="grid grid-cols-5 auto-rows-auto gap-2 md:gap-5">
						{/* <button className="bg-pink-600 text-white outline-none border-none rounded-2xl shadow-inner aspect-square">00</button> */}
						{props.Cards?.map((item, index) => (
							<button
								className={`aspect-square font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out disabled:cursor-not-allowed ${
									item.checked === true
										? "bg-pink-500 hover:bg-pink-400 text-white"
										: "bg-cyan-50 hover:bg-blue-100 text-blue-800"
								}`}
								key={item.id}
								onClick={(e) => props.CardClicked(index)}
								disabled={
									props.RecentMessage.peer === props.LocalUsername
								}
							>
								{/* props.RecentMessage.peerid !== props.localPeerId */}
								{item.value}
							</button>
						))}
					</div>
				</div>
			</div>

			{/* Show card of winning player with win true and winid */}
		</div>
	);
}

export default GameBoard;
