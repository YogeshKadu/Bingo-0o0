import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Landing(props) {
	const navigate = useNavigate();
	const [inputValue, setValue] = useState("");
	const [isValid, setValid] = useState(false);

	useEffect(()=>{
		console.log(props);
		if(props.LocalUsername === '')
			navigate("/",{replace:true});
	},[])


	const changeInput = (event) => {
		setValue(event.target.value);
		setValid(event.target.validity.valid);
	};

	return (
		<div className="w-full min-h-screen flex overflow-hidden justify-center items-center flex-col relative">
			<div className="p-5 pb-0 w-full max-w-md">
				<h1 className="text-8xl sm:text-9xl font-black uppercase text-center w-full -top-16 text-white leading-9 sm:leading-[3rem] drop-shadow">Bingo</h1>
				<div className="bg-[#4773F455] p-5 rounded-lg shadow-lg text-white font-Poppins text-sm relative backdrop-blur-sm">
					<h3>
						Hi there, <span className="font-Noto">👋</span>{" "}
					</h3>
					<big className="font-semibold drop-shadow-0xl">{props.LocalUsername}</big>
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
