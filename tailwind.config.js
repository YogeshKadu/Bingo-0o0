/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"custom-dark": "#282C34",
			},
			fontFamily: {
				"Noto":["Noto Color Emoji",'sans-serif'],
				"Poppins": ["Poppins", 'sans-serif'],
				"asap":["Asap",'sans-serif'],

			},
			animation: {
				"pulsejump": "pulsejumpk 1s ease-in-out forwards",
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
			backgroundImage: {
				'gradient-radial-to-tr': 'radial-gradient(115% 90% at 0% 100%, var(--tw-gradient-stops))',
				'gradient-radial-to-tl': 'radial-gradient(115% 90% at 100% 100%, var(--tw-gradient-stops))',
				'gradient-radial-to-br': 'radial-gradient(90% 115% at 0% 0%, var(--tw-gradient-stops))',
				'gradient-radial-to-bl': 'radial-gradient(90% 115% at 100% 0%, var(--tw-gradient-stops))',
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
			}
		},
	},
	plugins: [],
};
