import { useSelector, useDispatch } from "react-redux"
import {
	removeFromCart,
	increaseQuantity,
	decreaseQuantity,
	clearCart,
} from "../../redux/cartSlice"

export default function CartComp() {
	const cartItems = useSelector((state) => state.cart.items)
	const dispatch = useDispatch()

	if (cartItems.length === 0) {
		return <h2 className="text-center p-10">Your cart is empty</h2>
	}

	return (
		<div className="max-w-4xl mx-auto p-6 space-y-6">
			<h1 className="text-3xl font-bold text-center">Shopping Cart</h1>

			{cartItems.map((item) => (
				<div
					key={item.id}
					className="flex justify-between items-center border p-4 rounded"
				>
					<div className="flex items-center gap-4">
						<img src={item.thumbnail} className="w-16" />
						<div>
							<p className="font-semibold">{item.title}</p>
							<p>${item.price}</p>
						</div>
					</div>

					<div className="flex items-center gap-3">
						<button
							onClick={() => dispatch(decreaseQuantity(item.id))}
							className="px-2 border"
						>
							-
						</button>

						<span>{item.quantity}</span>

						<button
							onClick={() => dispatch(increaseQuantity(item.id))}
							className="px-2 border"
						>
							+
						</button>
					</div>

					<button
						onClick={() => dispatch(removeFromCart(item.id))}
						className="text-red-600"
					>
						Remove
					</button>
				</div>
			))}

			<button
				onClick={() => dispatch(clearCart())}
				className="bg-red-600 text-white px-4 py-2 rounded"
			>
				Clear Cart
			</button>
		</div>
	)
}
