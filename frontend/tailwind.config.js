/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				surface: "var(--surface)",
				accent: "var(--accent)",
				bg: "var(--bg)",
				text: "var(--text)",
				buttontext: "var(--buttontext)",
				grey: "var(--grey)",
				lightgrey: "var(--lightgrey)",
				primary: "var(--primary)",
			},
			screens: {
				"3xl": "2160px",
				"4xl": "3200px",
			},
		},
	},
	darkMode: ["class", '[data-theme="dark"]'],
	plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
}
