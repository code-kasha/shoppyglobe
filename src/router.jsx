import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import NotFound from "./components/NotFound"
import Home from "./components/Home"
import About from "./components/About"

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <NotFound />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: "about",
				element: <About />,
			},
		],
	},
])

export default router
