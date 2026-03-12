import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { Provider } from "react-redux"
import router from "./router"
import store from "./redux/store"

import "./index.css"

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>,
)

// Register service worker
if ("serviceWorker" in navigator) {
	window.addEventListener("load", () => {
		navigator.serviceWorker
			.register("/sw.js")
			.then((reg) => console.log("SW registered:", reg))
			.catch((err) => console.log("SW registration failed:", err))
	})
}
