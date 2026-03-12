import { useSelector, useDispatch } from "react-redux"
import { clearCart } from "../redux/cartSlice"
import toast from "react-hot-toast"

export default function useBillGen() {
	const dispatch = useDispatch()
	const cartItems = useSelector((state) => state.cart.items)

	// Generate bill from cart items
	const generateBill = () => {
		if (!cartItems.length) return { items: [], total: 0 }

		const totalAmount = cartItems.reduce(
			(acc, item) =>
				acc + (Number(item.price) || 0) * (Number(item.quantity) || 1),
			0,
		)

		return {
			items: cartItems.map((item) => ({
				...item,
				price: Number(item.price) || 0,
				quantity: Number(item.quantity) || 1,
			})),
			total: totalAmount,
		}
	}

	const checkout = () => {
		if (!cartItems.length) {
			toast.error("Cart is empty")
			return null
		}

		const billData = generateBill()
		toast.success("Purchase successful!")
		dispatch(clearCart()) // clear cart AFTER capturing bill
		return billData
	}

	return { bill: generateBill(), checkout }
}
