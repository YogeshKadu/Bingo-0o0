import React from "react";

function RequestError() {
	return (
		<div className="w-full max-w-sm m-5 p-5 bg-white flex flex-col justify-between rounded-xl shadow-xl text-center">
			{/* <p className="text-3xl font-Noto">😭</p>
			<p className="font-semibold">Your request has been rejected..!</p> */}
			<p className="text-3xl font-Noto">😢</p>
			<p className="font-semibold">Unable to reach the server...!</p>
		</div>
	);
}

export default RequestError;
