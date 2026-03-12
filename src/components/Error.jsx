export default function Error({ message = "Something went wrong." }) {
	return (
		<div className="flex flex-col items-center justify-center p-6 text-red-600">
			<svg
				className="w-12 h-12 mb-2"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"
				/>
			</svg>
			<p>{message}</p>
		</div>
	)
}
