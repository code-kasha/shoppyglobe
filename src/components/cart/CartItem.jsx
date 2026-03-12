import { useSelector, useDispatch } from "react-redux"
import {
	removeFromCart,
	increaseQuantity,
	decreaseQuantity,
	clearCart,
} from "../../redux/cartSlice"

import toast from "react-hot-toast"

export default function CartItem() {
	const cartItems = useSelector((state) => state.cart.items)
	const dispatch = useDispatch()

	if (cartItems.length === 0) {
		return (
			<h2 className="text-center text-xl font-semibold p-10">
				Your cart is empty
			</h2>
		)
	}

	return (
		<div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
			<h1 className="text-2xl sm:text-3xl font-bold text-center">
				Shopping Cart
			</h1>

			{cartItems.map((item) => (
				<div
					key={item.id}
					className="flex flex-col sm:grid sm:grid-cols-[1fr_auto_auto] gap-4 border rounded-lg p-4 shadow-sm"
				>
					{/* PRODUCT INFO */}
					<div className="flex items-center gap-4 min-w-0">
						<img
							src={item.thumbnail}
							alt={item.title}
							className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded"
						/>

						<div className="min-w-0">
							<p className="font-semibold truncate" title={item.title}>
								{item.title}
							</p>
							<p className="text-gray-600 text-sm">${item.price}</p>
						</div>
					</div>

					{/* QUANTITY */}
					<div className="flex items-center gap-3 justify-center">
						<button
							onClick={() => {
								if (item.quantity > 1) {
									dispatch(decreaseQuantity(item.id))
									toast.success("Quantity updated")
								}
							}}
							className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-40"
							disabled={item.quantity === 1}
						>
							-
						</button>

						<span className="w-6 text-center font-semibold">
							{item.quantity}
						</span>

						<button
							onClick={() => {
								dispatch(increaseQuantity(item.id))
								toast.success("Quantity updated")
							}}
							className="px-3 py-1 border rounded hover:bg-gray-100"
						>
							+
						</button>
					</div>

					{/* REMOVE */}
					<button
						onClick={() => {
							dispatch(removeFromCart(item.id))
							toast.success("Item removed from cart")
						}}
						className="text-red-600 font-medium hover:underline sm:text-right"
					>
						Remove
					</button>
				</div>
			))}

			{/* CLEAR CART */}
			<div className="flex justify-center">
				<button
					onClick={() => {
						dispatch(clearCart())
						toast.success("Cart cleared")
					}}
					className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md"
				>
					Clear Cart
				</button>
			</div>
		</div>
	)
}
