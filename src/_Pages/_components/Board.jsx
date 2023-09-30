import React, { useEffect, useState } from "react";

function Board() {
	const [cards, setCards] = useState([]);

	useEffect(() => {
		shuffledNumbers();
		console.log("Shuffeled");
	},[])


	const shuffledNumbers = () => {
		const numbersArray =  Array.from({ length: 25 }, (_, index) => index + 1);
		for (let i = numbersArray.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[numbersArray[i], numbersArray[j]] = [numbersArray[j], numbersArray[i]];
		  }
		  setCards(numbersArray);
	}
	return (
		<div
			className='w-full max-w-lg mx-auto p-5 bg-white rounded-2xl relative z-30 block
			'
			// before:content-[""] before:block before:w-4/5 before:h-4 before:mx-auto before:-top-4 before:absolute before:bg-[#B6AFF2] before:rounded-t-xl
			// before:-translate-x-1/2 before:left-2/4 before:-z-30
			// after:content-[""] after:block after:w-4/6 after:h-3 after:mx-auto after:-top-7 after:absolute after:bg-[#7062F0] after:rounded-t-xl
			// after:-translate-x-1/2 after:left-2/4 after:-z-30
		>
			<div className="mb-5 grid grid-cols-5 grid-rows-5 gap-2 text-blue-700 font-semibold sm:max-w-xs mx-3 sm:mx-auto">
				{
					cards.map((item, index) => (
						<button
							className="bg-gray-100/50 rounded-lg aspect-square"
							key={index}
						>
							{item}
						</button>
					))}
			</div>
			<button className="p-2 bg-blue-600 w-full rounded-2xl" onClick={()=> shuffledNumbers()}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
                    className="text-white mx-auto"
				>
					<path
						fill="currentColor"
						d="M19 8l-4 4h3c0 3.31-2.69 6-6 6c-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6c1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4l4-4H6z"
					>
                        <animateTransform attributeName="transform" attributeType="XML" dur="5s" from="360 12 12" repeatCount="indefinite" to="0 12 12" type="rotate"/>
					</path>
				</svg>
			</button>
			<div className=""></div>
		</div>
	);
}

export default Board;
