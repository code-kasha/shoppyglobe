import { useState, useEffect } from "react"
import axios from "axios"
import { useSelector } from "react-redux"

export default function useCartProduct(id) {
	const cartItems = useSelector((state) => state.cart.items)

	const [product, setProduct] = useState(null)
	const [selectedImage, setSelectedImage] = useState("")
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		if (!id) return

		let isMounted = true

		const fetchProduct = async () => {
			try {
				const res = await axios.get(`https://dummyjson.com/products/${id}`)
				if (!isMounted) return

				const data = res.data
				setProduct({
					...data,
					isInCart: cartItems.some((item) => item.id === data.id),
				})
				setSelectedImage(data.thumbnail || data.images?.[0] || "")
			} catch (err) {
				if (!isMounted) return
				setError(err.message || "Failed to fetch product")
			} finally {
				if (isMounted) setLoading(false)
			}
		}

		setTimeout(fetchProduct, 0) // Avoid synchronous setState warning

		return () => {
			isMounted = false
		}
	}, [id, cartItems])

	return { product, selectedImage, setSelectedImage, loading, error }
}
