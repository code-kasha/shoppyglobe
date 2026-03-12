import { useState, useEffect } from "react"
import axios from "axios"
import { useSelector } from "react-redux"

export default function useCartProducts(page = 1, limit = 10) {
	const cartItems = useSelector((state) => state.cart.items)

	const [products, setProducts] = useState([])
	const [total, setTotal] = useState(0)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		let isMounted = true

		const fetchProducts = async () => {
			try {
				const res = await axios.get(
					`https://dummyjson.com/products?limit=${limit}&skip=${(page - 1) * limit}`,
				)
				if (!isMounted) return

				// Map products and mark if in cart
				const data = res.data.products.map((p) => ({
					...p,
					isInCart: cartItems.some((item) => item.id === p.id),
				}))

				setProducts(data)
				setTotal(res.data.total)
			} catch (err) {
				if (!isMounted) return
				setError(err.message || "Failed to fetch products")
			} finally {
				if (isMounted) setLoading(false)
			}
		}

		// Fetch in next tick to avoid setState warning
		setTimeout(fetchProducts, 0)

		return () => {
			isMounted = false
		}
	}, [page, limit, cartItems])

	return { products, total, loading, error }
}
