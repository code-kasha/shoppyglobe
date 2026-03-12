import { useState, useEffect } from "react"
import axios from "axios"
import { useSelector } from "react-redux"

export default function useCartProducts(page = 1, limit = 10) {
	const searchTerm = useSelector((state) => state.search.term)
	const [products, setProducts] = useState([])
	const [total, setTotal] = useState(0)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		let isMounted = true
		const fetchProducts = async () => {
			setLoading(true)
			try {
				// Use search API if term exists
				const url = searchTerm
					? `https://dummyjson.com/products/search?q=${encodeURIComponent(
							searchTerm,
						)}&limit=${limit}&skip=${(page - 1) * limit}`
					: `https://dummyjson.com/products?limit=${limit}&skip=${
							(page - 1) * limit
						}`

				const res = await axios.get(url)
				if (!isMounted) return

				setProducts(res.data.products)
				setTotal(res.data.total)
			} catch (err) {
				if (!isMounted) return
				setError(err.message || "Failed to fetch products")
			} finally {
				if (isMounted) setLoading(false)
			}
		}

		// debounce search to avoid too many requests
		const timer = setTimeout(() => {
			fetchProducts()
		}, 300)

		return () => {
			clearTimeout(timer)
			isMounted = false
		}
	}, [page, limit, searchTerm])

	return { products, total, loading, error }
}
