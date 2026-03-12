import { useDispatch, useSelector } from "react-redux"
import { setSearchTerm, clearSearchTerm } from "../redux/searchSlice"

export default function SearchBar() {
	const dispatch = useDispatch()
	const term = useSelector((state) => state.search.term)

	return (
		<div className="max-w-4xl mx-auto my-4">
			<input
				type="text"
				value={term}
				name="search"
				onChange={(e) => dispatch(setSearchTerm(e.target.value))}
				placeholder="Search products..."
				className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
			/>
			{term && (
				<button
					onClick={() => dispatch(clearSearchTerm())}
					className="mt-2 text-sm text-red-500 hover:underline"
				>
					Clear
				</button>
			)}
		</div>
	)
}
