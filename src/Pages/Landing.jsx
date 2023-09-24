import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function Landing(props) {
	const [inputValue, setValue] = useState("");
	const [isValid, setValid] = useState(false);


	const navigate = useNavigate();

	const changeInput = (event) => {
		setValue(event.target.value);
		setValid(event.target.validity.valid);
	};

	const Reject = () => {
		// props.SendMessage({
		// 	status: 400,
		// 	message: "User rejected your request.",
		// 	win: false,
		// 	winnerId: null,
		// });
		props.closeConnection("User rejected your request.",props.dataConnection);
		props.setGotRequest(false);
	};
	const Accept = () => {
		props.SendMessage({
			status: 200,
			message: "User accepted your request",
			win: false,
			winnerId: null,
			peerid: Math.random() > 0.5 ? props.localPeerId : props.dataConnection.peer
		});
		props.setGotRequest(false);
		navigate('/match');
	};
	return (
		<div className="w-full min-h-screen flex overflow-hidden justify-center items-center flex-col relative">
			<span className="absolute w-96 h-96 bg-gradient-to-r from-lime-500 to-yellow-300 top-1/4 right-1/4 rounded-[60%_80%_70%_60%/60%_80%_70%_60%] animate-[spin_50s_alternate_linear_infinite]"></span>
			<span className="absolute w-[500px] h-[500px] bg-gradient-to-r from-sky-500 to-teal-500 rounded-[60%_80%_70%_60%/60%_50%_50%_80%] bottom-10 left-1/4 animate-[spin_50s_alternate-reverse_linear_infinite]"></span>
			<div className="p-5 pb-0 w-full max-w-md">
				<div className="bg-[#4773F455] p-5 rounded-lg shadow-lg text-white font-Poppins text-sm relative backdrop-blur-lg">
					<h3>
						Hi there, <span className="font-Noto">👋</span>{" "}
					</h3>
					<big>{props.localPeerId}</big>
					<p className="text-xs mt-2">
						Welcome to the Bingo Adventure,
						<br />
						Let's start pushing your luck !
					</p>
				</div>
			</div>
			<div className="p-5 w-full max-w-md">
				<div className="bg-[#4773F455] p-5 rounded-xl shadow-lg backdrop-blur-lg">
					<h2 className="text-white mb-2">
						<strong>Challenge your friend</strong>
					</h2>
					<form
						action=""
						className="w-full flex flex-col text-gray-200"
						onSubmit={(event) => {
							event.preventDefault();
							console.log("connect");
							props.ConnectToClient(inputValue);
						}}
					>
						<label htmlFor="username">Username :</label>
						<input
							type="text"
							name="username"
							id="username"
							placeholder="Enter friends username.."
							className="bg-transparent outline-none placeholder:text-gray-300 h-8 border-b border-gray-300 mb-5"
							onChange={(event) => changeInput(event)}
							required
						/>

						<button
							type="submit"
							className="bg-gradient-to-r from-yellow-500 to-orange-600 p-1 rounded-2xl outline-none disabled:bg-slate-400"
							disabled={!isValid}
						>
							Connect
						</button>
					</form>
				</div>
			</div>
			<div
				className={`absolute left-0 top-0 transition-transform bg-slate-800/20 h-full w-full justify-center items-center ${
					props.gotRequest ? "flex" : "hidden"
				}`}
			>
				<div className="bg-slate-200 w-full p-5 m-5 max-w-md rounded-xl shadow-lg ">
					<p className="mb-5">
						<strong>{props.dataConnection.peer}</strong> requested for a
						dual!
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
		</div>
	);
}

export default Landing;
