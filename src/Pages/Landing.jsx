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

	return (
		<div className="w-full min-h-screen flex overflow-hidden justify-center items-center flex-col relative">
			{/* <span className="absolute w-96 h-96 bg-gradient-to-r from-lime-500 to-yellow-300 top-1/4 right-1/4 rounded-[60%_80%_70%_60%/60%_80%_70%_60%] animate-[spin_50s_alternate_linear_infinite]"></span> */}
			{/* <span className="absolute w-[500px] h-[500px] bg-gradient-to-r from-sky-500 to-teal-500 rounded-[60%_80%_70%_60%/60%_50%_50%_80%] bottom-10  -left-3 sm:left-1/4 animate-[spin_50s_alternate-reverse_linear_infinite]"></span> */}
			<div className="p-5 pb-0 w-full max-w-md">
				<div className="bg-[#4773F455] p-5 rounded-lg shadow-lg text-white font-Poppins text-sm relative backdrop-blur-lg">
					<h3>
						Hi there, <span className="font-Noto">👋</span>{" "}
					</h3>
					<big>{props.LocalUsername}</big>
					<p className="text-xs mt-2">
						Welcome to the Bingo Adventure,
						<br />
						Let's start pushing your luck !
					</p>
				</div>
			</div>
			<div className="p-5 w-full max-w-md">
				<div className="bg-[#4773F455] p-5 rounded-xl shadow-lg backdrop-blur-lg">
					<form
						action=""
						className="w-full flex flex-col text-gray-200"
						onSubmit={(event) => {
							event.preventDefault();
							console.log("connect");
							props.ConnectToClient(inputValue);
						}}
					>
						<h2 className="text-white text-xl mb-2">
							<label htmlFor="username" className="cursor-pointer">
								<strong>Challenge your friends</strong>
							</label>
						</h2>
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
		</div>
	);
}

export default Landing;
