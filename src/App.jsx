import { Toaster } from "react-hot-toast"

import { Outlet } from "react-router-dom"

import Header from "./components/Header"
import Footer from "./components/Footer"

function App() {
	return (
		<div className="flex flex-col h-screen">
			<Header />
			<main className="grow">
				<Outlet />
				<Toaster position="top-right" />
			</main>
			<Footer />
		</div>
	)
}

export default App
