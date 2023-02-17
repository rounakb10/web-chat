import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import { ThemeProvider } from "react-hook-theme"
import { AppProvider } from "./context/appContext"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
	<React.StrictMode>
		<ThemeProvider options={{ theme: "light", save: true }}>
			<AppProvider>
				<App />
			</AppProvider>
		</ThemeProvider>
	</React.StrictMode>
)
