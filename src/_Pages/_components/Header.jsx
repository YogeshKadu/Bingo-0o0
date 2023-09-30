import React from "react";

function Header() {
	return (
		<nav className="flex flex-col">
			<div className="flex flex-row h-14 mt-2">
				<button className="w-14 h-full text-white">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						className="w-full h-full p-3"
					>
						<path
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M6 8h12M6 12h12M6 16h12"
						/>
					</svg>
				</button>
				<div className="flex-grow"></div>
				<button className="w-14 h-full text-white">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						className="w-full h-full p-3"
					>
						<path
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M8.195 8.765A4 4 0 1 1 12 14v1m.05 4v.1h-.1V19h.1Z"
						/>
					</svg>
				</button>
			</div>
		</nav>
	);
}

export default Header;
