import { useState, useEffect } from "react"
import axios from "axios"

export default function useCartProducts(page = 1, limit = 10) {
	const [products, setProducts] = useState([])
	const [total, setTotal] = useState(0)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		let isMounted = true

		const fetchProducts = async () => {
			setLoading(true)
			try {
				const res = await axios.get(
					`https://dummyjson.com/products?limit=${limit}&skip=${(page - 1) * limit}`,
				)
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

		fetchProducts()

		return () => {
			isMounted = false
		}
	}, [page, limit])

	return { products, total, loading, error }
}
