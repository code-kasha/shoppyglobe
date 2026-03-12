import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../redux/cartSlice"
import toast from "react-hot-toast"
import Spinner from "../components/Spinner"
import Error from "../components/Error"
import useCartProduct from "../hooks/useCartProduct"

export default function ProductDetails() {
	const { id } = useParams()
	const dispatch = useDispatch()
	const cartItems = useSelector((state) => state.cart.items)

	const { product, loading, error } = useCartProduct(id)
	const [selectedImage, setSelectedImage] = useState("")

	// initialize selected image only once after product loads
	useEffect(() => {
		if (product && !selectedImage) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setSelectedImage(product.thumbnail || product.images?.[0] || "")
		}
		// only run when product changes, not on selectedImage
	}, [product, selectedImage])

	if (loading) return <Spinner message="Loading product..." />
	if (error) return <Error message={error} />
	if (!product) return null

	const isInCart = cartItems.some((item) => item.id === product.id)

	return (
		<div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-8">
			{/* Title */}
			<h1 className="text-2xl sm:text-3xl font-bold text-center">
				{product.title}
			</h1>

			{/* Main Section */}
			<div className="grid md:grid-cols-2 gap-8 p-4 rounded">
				{/* Images */}
				<div className="flex flex-col items-center space-y-4">
					<img
						src={selectedImage}
						alt={product.title}
						className="w-full max-w-md rounded shadow"
					/>
					<div className="flex gap-3 flex-wrap justify-center">
						{product.images?.map((img, i) => (
							<img
								key={i}
								src={img}
								alt="thumbnail"
								onClick={() => setSelectedImage(img)}
								className={`w-16 h-16 object-cover border rounded cursor-pointer transition transform hover:scale-105 ${
									selectedImage === img ? "border-blue-500 border-2" : ""
								}`}
							/>
						))}
					</div>
				</div>

				{/* Product Info */}
				<div className="space-y-2">
					<p>
						<strong>Brand:</strong> {product.brand}
					</p>
					<p>
						<strong>Category:</strong> {product.category}
					</p>
					<p>
						<strong>SKU:</strong> {product.sku}
					</p>
					<p>
						<strong>Price:</strong> ${product.price}
					</p>
					<p>
						<strong>Discount:</strong> {product.discountPercentage}%
					</p>
					<p>
						<strong>Rating:</strong> ⭐ {product.rating}
					</p>
					<p>
						<strong>Stock:</strong> {product.stock}
					</p>
					{product.stock > 0 ? (
						<p className="text-green-600 font-semibold">In Stock</p>
					) : (
						<p className="text-red-600 font-semibold">Out of Stock</p>
					)}

					<button
						onClick={() => {
							dispatch(addToCart(product))
							toast.success(`${product.title} added to cart`)
						}}
						disabled={product.stock === 0 || isInCart}
						className={`mt-4 w-full font-semibold py-2 rounded-md transition ${
							isInCart
								? "bg-gray-300 cursor-not-allowed"
								: "bg-amber-400 hover:bg-amber-500 text-black"
						}`}
					>
						{isInCart ? "In Cart" : "Add to Cart"}
					</button>
				</div>
			</div>

			{/* Description */}
			<div>
				<h2 className="text-xl font-semibold mb-2">Description</h2>
				<p>{product.description}</p>
			</div>

			{/* Dimensions */}
			<div>
				<h2 className="text-xl font-semibold mb-2">Dimensions</h2>
				<p>Width: {product.dimensions?.width}</p>
				<p>Height: {product.dimensions?.height}</p>
				<p>Depth: {product.dimensions?.depth}</p>
			</div>

			{/* Shipping & Warranty */}
			<div>
				<h2 className="text-xl font-semibold mb-2">Shipping & Warranty</h2>
				<p>
					<strong>Shipping:</strong> {product.shippingInformation}
				</p>
				<p>
					<strong>Warranty:</strong> {product.warrantyInformation}
				</p>
				<p>
					<strong>Return Policy:</strong> {product.returnPolicy}
				</p>
			</div>

			{/* Metadata */}
			<div>
				<h2 className="text-xl font-semibold mb-2">Metadata</h2>
				<p>
					<strong>Created At:</strong>{" "}
					{new Date(product.meta?.createdAt).toLocaleString()}
				</p>
				<p>
					<strong>Updated At:</strong>{" "}
					{new Date(product.meta?.updatedAt).toLocaleString()}
				</p>
				<p>
					<strong>Barcode:</strong> {product.meta?.barcode}
				</p>
				{product.meta?.qrCode && (
					<img src={product.meta.qrCode} alt="QR Code" className="w-24 mt-2" />
				)}
			</div>

			{/* Reviews */}
			<div>
				<h2 className="text-xl font-semibold mb-4">Reviews</h2>
				{product.reviews?.map((review, index) => (
					<div key={index} className="border p-4 rounded mb-3">
						<p className="font-semibold">{review.reviewerName}</p>
						<p className="text-yellow-500">{"⭐".repeat(review.rating)}</p>
						<p>{review.comment}</p>
						<p className="text-sm text-gray-500">
							{new Date(review.date).toLocaleDateString()}
						</p>
						<p className="text-sm text-gray-500">{review.reviewerEmail}</p>
					</div>
				))}
			</div>
		</div>
	)
}
