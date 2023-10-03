/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"custom-dark": "#282C34",
			},
			backgroundImage:{
				'gradient-radial': 'radial-gradient(var(--gradient-color-stops))',
			},
			fontFamily: {
				Noto: ["Noto Color Emoji", "sans-serif"],
				Poppins: ["Poppins", "sans-serif"],
				asap: ["Asap", "sans-serif"],
				Gluten: ["Gluten", "cursive","sans-serif"],
			},
			dropShadow:{
				'0xl': '0px 2px 1px rgba(0, 0, 0, 1)',
				'3xl': '0px 5px 5px rgba(0, 0, 0, 0.8)',
			},
			animation: {
				pulsejump: "pulsejumpk 1s ease-in-out forwards",
			},
			keyframes: {
				pulsejumpk: {
					"0%": {
						opacity: 0,
						transform: "scale(0.5) translateY(5px)",
					},
					"50%": {
						opacity: 1,
						transform: "scale(1.1) translateY(-5px)",
					},
					"100%": {
						opacity: 1,
						transform: "scale(1) translateY(0)",
					},
				},
			},
		},
	},
	plugins: [],
};
