import { useSelector, useDispatch } from "react-redux"
import {
	removeFromCart,
	increaseQuantity,
	decreaseQuantity,
} from "../redux/cartSlice"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

export default function Cart() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const cartItems = useSelector((state) => state.cart.items)

	const total = cartItems.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0,
	)

	if (cartItems.length === 0) {
		return (
			<div className="text-center mt-10">
				<p className="text-lg font-semibold">Your cart is empty</p>
				<Link to="/" className="text-blue-600 underline mt-4 inline-block">
					Continue Shopping
				</Link>
			</div>
		)
	}

	return (
		<div className="max-w-4xl mx-auto p-6 space-y-6">
			<h1 className="text-2xl font-bold text-center mb-6">Your Cart</h1>

			<div className="space-y-4">
				{cartItems.map((item) => (
					<div
						key={item.id}
						className="flex justify-between items-center border rounded p-3"
					>
						<div className="flex items-center gap-3">
							<img
								src={item.thumbnail}
								alt={item.title}
								className="w-16 h-16 object-cover rounded"
							/>
							<div>
								<p className="font-semibold">{item.title}</p>
								<p className="text-sm text-gray-600">💲{item.price}</p>
							</div>
						</div>

						<div className="flex items-center gap-2">
							<button
								onClick={() => dispatch(decreaseQuantity(item.id))}
								className="px-2 py-1 border rounded"
							>
								-
							</button>
							<span>{item.quantity}</span>
							<button
								onClick={() => dispatch(increaseQuantity(item.id))}
								className="px-2 py-1 border rounded"
							>
								+
							</button>
							<button
								onClick={() => {
									dispatch(removeFromCart(item.id))
									toast.success(`${item.title} removed from cart`)
								}}
								className="ml-2 text-red-600 font-semibold"
							>
								Remove
							</button>
						</div>
					</div>
				))}
			</div>

			<div className="flex justify-between items-center mt-6 border-t pt-4">
				<p className="text-xl font-semibold">Total: 💲{total.toFixed(2)}</p>
				<button
					onClick={() => navigate("/checkout")}
					className="bg-amber-400 hover:bg-amber-500 text-black font-semibold px-4 py-2 rounded-md"
				>
					Checkout
				</button>
			</div>
		</div>
	)
}
