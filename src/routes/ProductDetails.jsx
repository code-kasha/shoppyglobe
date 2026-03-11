import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"

export default function ProductDetails() {
	const { id } = useParams()

	const [product, setProduct] = useState(null)
	const [selectedImage, setSelectedImage] = useState("")

	useEffect(() => {
		axios.get(`https://dummyjson.com/products/${id}`).then((res) => {
			const data = res.data
			setProduct(data)
			setSelectedImage(data.thumbnail || data.images?.[0] || "")
		})
	}, [id])

	if (!product) return <div className="text-center p-6">Loading...</div>

	return (
		<div className="max-w-6xl mx-auto p-6 space-y-8">
			{/* Title */}
			<h1 className="text-3xl font-bold text-center">{product.title}</h1>

			{/* Main Section */}
			<div className="grid md:grid-cols-2 gap-8 border  p-4 rounded">
				{/* Image Section */}
				<div className="space-y-4 flex flex-col items-center">
					{/* Main Image */}
					<img
						src={selectedImage}
						alt={product.title}
						className="w-90 rounded shadow"
					/>

					{/* Thumbnails */}
					<div className="flex gap-3">
						{[...(product.images || [])].map((img, i) => (
							<img
								key={i}
								src={img}
								alt="thumbnail"
								onClick={() => setSelectedImage(img)}
								className={`w-16 border rounded cursor-pointer transition hover:scale-105
                  ${selectedImage === img ? "border-blue-500 border-2" : ""}`}
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
					<p>
						<strong>Availability:</strong> {product.availabilityStatus}
					</p>
					<p>
						<strong>Weight:</strong> {product.weight}
					</p>
					<p>
						<strong>Minimum Order Quantity:</strong>{" "}
						{product.minimumOrderQuantity}
					</p>

					<p>
						<strong>Tags:</strong> {product.tags?.join(", ")}
					</p>

					{product.stock > 0 ? (
						<p className="text-green-600 font-semibold">In Stock</p>
					) : (
						<p className="text-red-600 font-semibold">Out of Stock</p>
					)}
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

			{/* Shipping / Warranty */}
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
