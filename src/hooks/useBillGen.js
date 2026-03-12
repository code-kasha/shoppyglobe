import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { clearCart } from "../redux/cartSlice"
import toast from "react-hot-toast"

export default function useBillGen() {
	const dispatch = useDispatch()
	const cartItems = useSelector((state) => state.cart.items)

	const [bill, setBill] = useState({ items: [], total: 0 })
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		// Use setTimeout to defer setState and avoid warnings
		const timer = setTimeout(() => {
			if (cartItems.length === 0) {
				setBill({ items: [], total: 0 })
			} else {
				const totalAmount = cartItems.reduce(
					(acc, item) => acc + item.price * (item.quantity || 1),
					0,
				)
				setBill({ items: cartItems, total: totalAmount })
			}
			setLoading(false)
		}, 0)

		return () => clearTimeout(timer)
	}, [cartItems])

	const checkout = () => {
		if (cartItems.length === 0) {
			toast.error("Cart is empty")
			return null
		}

		const billText = `
BILL
--------------------
${cartItems
	.map(
		(item) =>
			`${item.title} x ${item.quantity} = $${(
				item.price * item.quantity
			).toFixed(2)}`,
	)
	.join("\n")}
--------------------
Total: $${bill.total.toFixed(2)}
    `

		toast.success("Purchase successful!")
		dispatch(clearCart())
		return billText
	}

	return { bill, loading, checkout }
}
