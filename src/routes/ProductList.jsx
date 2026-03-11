import axios from "axios"
import { useState, useEffect } from "react"

export default function ProductList() {
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(true)

	const [page, setPage] = useState(1)
	const [limit] = useState(10)
	const [total, setTotal] = useState(0)

	useEffect(() => {
		axios
			.get(
				`https://dummyjson.com/products?limit=${limit}&skip=${(page - 1) * limit}`,
			)
			.then((res) => {
				setProducts(res.data.products)
				setTotal(res.data.total)
				setLoading(false)
			})
	}, [page, limit])

	const totalPages = Math.ceil(total / limit)

	if (loading) return <div className="text-center p-5">Loading...</div>

	return (
		<div>
			<div className="flex flex-col w-screen">
				<h2 className="text-center p-2 font-semibold text-2xl">Product List</h2>

				<div className="grid xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-2 grow">
					{products.map((product) => (
						<div
							key={product.id}
							className="p-2 space-y-2 group w-50 md:w-60 mx-auto"
						>
							<img
								src={product.thumbnail}
								alt={product.title}
								className="w-full border"
							/>

							<h3 className="text-lg text-center truncate group-hover:whitespace-normal group-hover:overflow-visible">
								{product.title}
							</h3>

							<div className="flex justify-around text-sm">
								<p title="Price">💲{product.price}</p>
								<p title="Discount">🈹 {product.discountPercentage}</p>
								<p title="Rating">⭐ {product.rating}</p>
							</div>

							<div className="flex flex-col sm:flex-row justify-around">
								<button>Add to Cart</button>
								<button>Buy Now</button>
							</div>
						</div>
					))}
				</div>

				{/* PAGINATION */}
				<div className="flex justify-center gap-2 mt-6 items-center">
					<button
						disabled={page === 1}
						onClick={() => setPage(page - 1)}
						className="px-3 py-1 border rounded disabled:opacity-40"
					>
						Prev
					</button>
					<p className="w-40 text-center">Page: {page}</p>
					<button
						disabled={page === totalPages}
						onClick={() => setPage(page + 1)}
						className="px-3 py-1 border rounded disabled:opacity-40"
					>
						Next
					</button>
				</div>
			</div>
		</div>
	)
}
