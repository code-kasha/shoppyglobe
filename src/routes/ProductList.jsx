import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../redux/cartSlice"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"

import useCartProducts from "../hooks/useCartProducts"
import Spinner from "../components/Spinner"
import Error from "../components/Error"

export default function ProductList() {
	const [page, setPage] = useState(1)
	const dispatch = useDispatch()
	const cartItems = useSelector((state) => state.cart.items)

	// Fetch products using the fixed hook
	const { products, total, loading, error } = useCartProducts(page, 10)

	// Map products to include cart info
	const productsWithCartInfo = products.map((p) => ({
		...p,
		isInCart: cartItems.some((item) => item.id === p.id),
	}))

	const totalPages = Math.ceil(total / 10)

	if (loading) return <Spinner message="Loading products..." />
	if (error) return <Error message={error} />

	return (
		<div className="max-w-7xl mx-auto px-4">
			<h2 className="text-center font-semibold text-2xl mt-6 mb-6">
				Product List
			</h2>

			{/* PRODUCT GRID */}
			<div className="grid xxs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
				{productsWithCartInfo.map((product) => (
					<div
						key={product.id}
						className="flex flex-col border rounded-lg p-3 space-y-2 shadow-sm hover:shadow-md transition w-4/5 mx-auto xxs:w-full"
					>
						<img
							src={product.thumbnail}
							alt={product.title}
							className="h-40 object-cover rounded w-full"
						/>

						<h3 className="text-sm font-medium line-clamp-1 hover:line-clamp-none">
							<Link to={`/product/${product.id}`}>{product.title}</Link>
						</h3>

						<div className="flex justify-between text-sm text-gray-600">
							<p>💲{product.price}</p>
							<p>⭐ {product.rating}</p>
						</div>

						<button
							onClick={() => {
								dispatch(addToCart(product))
								toast.success(`${product.title} added to cart`)
							}}
							disabled={product.isInCart}
							className={`w-full py-1 rounded-md text-sm font-semibold transition
                ${
									product.isInCart
										? "bg-gray-300 cursor-not-allowed"
										: "bg-amber-400 hover:bg-amber-500 text-black"
								}`}
						>
							{product.isInCart ? "In Cart" : "Add to Cart"}
						</button>
					</div>
				))}
			</div>

			{/* PAGINATION */}
			<div className="flex justify-center gap-4 mt-10 items-center">
				<button
					disabled={page === 1}
					onClick={() => setPage(page - 1)}
					className="px-4 py-1 border rounded disabled:opacity-40"
				>
					Prev
				</button>
				<p className="text-sm font-medium">
					Page {page} of {totalPages}
				</p>
				<button
					disabled={page === totalPages}
					onClick={() => setPage(page + 1)}
					className="px-4 py-1 border rounded disabled:opacity-40"
				>
					Next
				</button>
			</div>
		</div>
	)
}
