import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Signup from "./_Pages/Signup";
import Signin from "./_Pages/Signin";
import Lobby from "./_Pages/Lobby";
import Header from "./_components/Header";


function ErrorPage() {
	return (
		<div className="w-full max-w-lg mx-auto h-screen overflow-hidden flex flex-col">
			<Header />
			<p className="text-center font-semibold text-2xl text-white">00:30</p>
			<div className="m-5 p-2 bg-white rounded-2xl">
				<div className="text-center bg-gray-200 rounded-lg shadow-inner p-2 relative flex gap-2">
					<span className="absolute"></span>
					<div className="h-12 w-2/4 z-20 flex items-center justify-center font-bold">
						<p>YogeshKadu</p>
					</div>
					<div className="h-12 w-2/4 z-20 flex items-center justify-center font-bold">
						<p className="">KrissKad</p>
					</div>
				</div>
			</div>
			{/* <Lobby /> */}
		</div>
	);
}

export default function Entrypoint() {
	return (
		<div className="w-full flex flex-col min-h-screen font-asap">
			<Routes>
				<Route path="/" element={<Lobby />} />
				<Route path="/signin" element={<Signin />} />
				<Route path="/signup" element={<Signup />} />
			</Routes>
		</div>
	);
}
