import React from "react";

function WelcomeCard() {
	return (
		<div className="w-full max-w-lg mx-auto p-5 bg-white rounded-xl m-5">
			{/* <div className="mx-6 my-2 bg-white p-3 rounded-xl"> */}
				<h3 className="mb-2">
					Hi there, <b className="font-semibold">Yogesh</b> <span className="font-Noto">👋</span>
				</h3>
				<p className="text-sm mb-3">
					Welcome to the Bingo Adventure,
					<br />
					Let's start pushing your luck !
				</p>
				<form
					action="none"
					onSubmit={(e) => {
						e.preventDefault();
						console.log("Doing the thing");
					}}
				>
					<div className="bg-custom-dark/10 rounded-md px-3 mb-2">
						<label
							htmlFor="peerid"
							className="text-xs text-slate-500"
						>
							Enter username
						</label>
						<input
							type="text"
							name="peerid"
							id="peerid"
							className="bg-transparent outline-none text-slate-700 placeholder:text-slate-600 w-full py-2"
							placeholder="Username..."
						/>
					</div>
					<div className="flex gap-2 items-center">
						<button className="bg-blue-600 text-white flex-1 p-1 rounded-2xl">
							Connect
						</button>
						<button className="bg-pink-700 text-white flex-0 p-3 rounded-full">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 16 16"
                                className="fill-white w-5 h-5"
							>
								<path
									fill="currentColor"
									d="M3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3H3zm2.5 4a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0zm8 8a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0zM8 9.5a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3z"
								/>
							</svg>
						</button>
					</div>
				</form>
			{/* </div> */}
		</div>
	);
}

export default WelcomeCard;
