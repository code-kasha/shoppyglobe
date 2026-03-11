import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import NotFound from "./components/NotFound"

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
