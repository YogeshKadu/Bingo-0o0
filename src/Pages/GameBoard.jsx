import React, { useEffect, useState } from "react";
// import Header from "../_Pages/_components/Header";
import { useNavigate } from "react-router-dom";

function GameBoard(props) {
	const navigate = useNavigate();
	useEffect(() => {
		console.log(props);
		if(props.LocalUsername === '')
			navigate("/");
	}, []);

	return (
		<div className="w-full max-w-sm mx-auto min-h-screen flex flex-col">
			{/* <Header /> */}
			{/* <p className="text-center font-semibold text-2xl text-white">00:30</p> */}
			<div className="m-5 p">
				<div className="text-center relative flex gap-2 font-semibold text-white justify-evenly">
					<div className=" z-20 flex items-center justify-center flex-col gap-1">
						<span className="bg-pink-500 rounded-full relative w-14 h-14 grid place-content-center mt-2 text-3xl">
							<span
								className={`${
									props.RecentMessage?.peer ===
										props.FriendUsername && "hidden"
								} absolute w-full h-full top-0 left-0 rounded-full border-4 border-sky-400`}
							></span>
							Y
						</span>
						<p className="text-xs">{props.LocalUsername}</p>
					</div>
					<div className="z-20 flex items-center justify-center flex-col gap-1">
						<span className="bg-pink-500 rounded-full relative w-14 h-14 grid place-content-center mt-2 text-3xl">
							<span
								className={`${
									props.RecentMessage?.peer ===
										props.FriendUsername && "hidden"
								} absolute w-full h-full top-0 left-0 rounded-full border-4 border-sky-400`}
							></span>
							{props.FriendUsername[0]}
						</span>
						<p className="text-xs">{props.FriendUsername}</p>
					</div>
				</div>
			</div>
			<div className="w-full px-5">
				<div className="p-5 bg-[#4773F455] rounded-2xl shadow-md">
					<div className="grid grid-cols-5 auto-rows-auto gap-1 md:gap-2">
						{props.Cards?.map((item, index) => (
							<button
								className={`disabled:cursor-not-allowed border-2 rounded-full place-content-center bg-gradient-to-b grid aspect-square ${
									item.checked === true
										? "from-pink-500 via-rose-500 to-fuchsia-600 text-white border-rose-500"
										: "from-green-400 via-lime-600 to-emerald-600 text-white border-teal-400"
								}`}
								key={item.id}
								onClick={(e) => props.CardClicked(index)}
								disabled={
									props.RecentMessage?.peer ===
									props.FriendUsername
								}
							>
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
