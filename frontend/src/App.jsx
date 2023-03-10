import { Route, Routes } from "react-router-dom"
import { BrowserRouter } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ChatPage from "./pages/ChatPage"
import ProtectedRoute from "./pages/ProtectedRoute"
import NotFoundPage from "./pages/NotFoundPage"

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/'
					element={
						<ProtectedRoute>
							<ChatPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/chat'
					element={
						<ProtectedRoute>
							<ChatPage />
						</ProtectedRoute>
					}
				/>

				<Route path='/login' element={<HomePage />} />
				<Route path='/*' element={<NotFoundPage />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
