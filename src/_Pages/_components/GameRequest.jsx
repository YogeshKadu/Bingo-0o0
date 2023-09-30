import React from "react";

function GameRequest() {
	return (
		<div className="p-4 bg-white m-5 w-full max-w-md rounded-lg text-zinc-900">
			<h2 className="text-lg font-bold">New Game Request</h2>
			<p className="mb-3 text-sm">
				<b>Krisskad</b> Requested for a dual
			</p>
			<div className="flex gap-2">
				<button
					type="button"
					className="inline-block flex-grow bg-blue-600 text-white p-1 rounded-md"
				>
					Accept
				</button>
				<button
					type="button"
					className="inline-block flex-grow bg-pink-600 text-white p-1 rounded-md"
				>
					Reject
				</button>
			</div>
		</div>
	);
}

export default GameRequest;

{
	/*  */
}
