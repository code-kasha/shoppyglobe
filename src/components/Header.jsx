import { Link } from "react-router-dom"

export default function Header() {
	return (
		<nav>
			<Link to="/">Home</Link> | <Link to="/about">About</Link> |{" "}
			<Link to="/products">Products</Link> | <Link to="/cart">Cart</Link>
		</nav>
	)
}
