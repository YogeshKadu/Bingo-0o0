import React, { useEffect, useState } from "react";
// import Header from "../_Pages/_components/Header";
import { useNavigate } from "react-router-dom";

function GameBoard(props) {
	const navigate = useNavigate();
	useEffect(() => {
		console.log(props);
		if (
			props.LocalUsername === "" ||
			props.LocalUsername === undefined ||
			props.FriendUsername === undefined
		)
			navigate("/");
	}, []);

	return (
		<div className="w-full max-w-sm mx-auto min-h-screen flex flex-col">
			{/* <Header /> */}
			{/* <p className="text-center font-semibold text-2xl text-white">00:30</p> */}
			{props.FriendUsername !== undefined && (
				<div className="m-5 p">
					<div className="text-center relative flex gap-2 font-semibold text-white justify-evenly">
						<div className=" z-20 flex items-center justify-center flex-col gap-1">
							<p className="text-xs">{props.LocalUsername}</p>
						</div>
						<div className="z-20 flex items-center justify-center flex-col gap-1">
							<p className="text-xs">{props.FriendUsername}</p>
						</div>
					</div>
				</div>
			)}

			<div className="w-full px-5">
				<div className="p-5 bg-[#4773F455] rounded-2xl shadow-md">
					<div className="grid grid-cols-5 auto-rows-auto gap-2 md:gap-3 font-Gluten text-2xl">
						{props.Cards?.map((item, index) => (
							<button
								className={`disabled:cursor-not-allowed rounded-lg place-content-center grid aspect-square font-extrabold ${
									item.checked === true
										? "bg-pink-600 shadow text-white"
										: "bg-green-400 text-white"
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
