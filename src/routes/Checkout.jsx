import { useState } from "react"
import useBillGen from "../hooks/useBillGen"
import Spinner from "../components/Spinner"

export default function Checkout() {
	const { bill, loading, checkout } = useBillGen()
	const [completed, setCompleted] = useState(false)
	const [billText, setBillText] = useState("")

	if (loading) return <Spinner message="Generating your bill..." />

	if (bill.items.length === 0 && !completed) {
		return (
			<div className="text-center p-6">
				<h2 className="text-xl font-semibold">Your cart is empty</h2>
			</div>
		)
	}

	const handleCheckout = () => {
		const text = checkout()
		if (text) {
			setBillText(text)
			setCompleted(true)
		}
	}

	if (completed) {
		// Show formatted bill after purchase
		return (
			<div className="max-w-4xl mx-auto p-6 space-y-6">
				<h1 className="text-3xl font-bold text-center text-green-600">
					Thank you for shopping with us!
				</h1>
				<pre className="bg-gray-100 p-6 rounded text-sm font-mono whitespace-pre-wrap">
					{billText}
				</pre>
			</div>
		)
	}

	// Show bill table before purchase
	return (
		<div className="max-w-4xl mx-auto p-6 space-y-4">
			<h1 className="text-2xl font-bold mb-4">Your Cart</h1>

			<table className="w-full border-collapse border border-gray-300">
				<thead className="bg-gray-100">
					<tr>
						<th className="border px-4 py-2 text-left">Item</th>
						<th className="border px-4 py-2 text-center">Quantity</th>
						<th className="border px-4 py-2 text-right">Price</th>
						<th className="border px-4 py-2 text-right">Subtotal</th>
					</tr>
				</thead>
				<tbody>
					{bill.items.map((item) => (
						<tr key={item.id} className="hover:bg-gray-50">
							<td className="border px-4 py-2">{item.title}</td>
							<td className="border px-4 py-2 text-center">{item.quantity}</td>
							<td className="border px-4 py-2 text-right">
								${item.price.toFixed(2)}
							</td>
							<td className="border px-4 py-2 text-right">
								${(item.price * item.quantity).toFixed(2)}
							</td>
						</tr>
					))}
				</tbody>
				<tfoot>
					<tr className="bg-gray-100 font-semibold">
						<td className="border px-4 py-2 text-left" colSpan={3}>
							Total
						</td>
						<td className="border px-4 py-2 text-right">
							${bill.total.toFixed(2)}
						</td>
					</tr>
				</tfoot>
			</table>

			<button
				onClick={handleCheckout}
				className="mt-6 w-full py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded"
			>
				Confirm Purchase
			</button>
		</div>
	)
}
