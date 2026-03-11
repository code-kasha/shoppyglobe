import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import NotFound from "./components/NotFound"
import Home from "./routes/Home"
import About from "./routes/About"
import ProductList from "./routes/ProductList"
import ProductDetails from "./routes/ProductDetails"
import Cart from "./routes/Cart"

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
			{
				path: "products",
				element: <ProductList />,
			},
			{
				path: "product/:id",
				element: <ProductDetails />,
			},
			{
				path: "cart",
				element: <Cart />,
			},
		],
	},
])

export default router
