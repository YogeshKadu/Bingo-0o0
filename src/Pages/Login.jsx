import React, { useState } from "react";

function Login(props) {
	const [inputValue, setValue] = useState("");
	const [isValid, setValid] = useState(false);

	const changeInput = (event) => {
		setValue(event.target.value);
		setValid(event.target.validity.valid);
	};

	return (
		<div className="w-screen h-screen flex justify-center items-center">
			<div className="bg-[#4773F455] p-5 w-full max-w-md mx-5 rounded-xl shadow-lg">
				<h2 className="text-white text-xl mb-3">
					<strong className="font-semibold">Login form</strong>
				</h2>
				<form
					action=""
					className="w-full flex flex-col text-gray-200"
					onSubmit={(event) => {
						event.preventDefault();
						props.ConnectToServer(inputValue);
						// setValue("");
					}}
				>
					<label htmlFor="username" className="text-xs">
						Username :
					</label>
					<input
						required
						type="text"
						id="username"
						name="username"
						value={inputValue}
						placeholder="Enter your name.."
						pattern="^[a-zA-Z0-9][a-zA-Z0-9]{5,12}[a-zA-Z0-9]$"
						className="bg-transparent outline-none placeholder:text-gray-300 h-8 border-b border-gray-300 mb-5 px-1"
						onChange={(event) => changeInput(event)}
					/>

					<button className="bg-gradient-to-r from-yellow-500 to-orange-600 p-1 rounded-2xl outline-none" disabled={!isValid}>
						Login
					</button>
				</form>
			</div>
		</div>
	);
}

export default Login;
