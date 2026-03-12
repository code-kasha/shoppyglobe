export default function Spinner({ message = "Loading..." }) {
	return (
		<div className="fixed inset-0 flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm z-50">
			<div className="w-16 h-16 border-4 border-amber-700 border-t-transparent rounded-full animate-spin mb-4"></div>
			<p className="text-white text-lg font-medium">{message}</p>
		</div>
	)
}
