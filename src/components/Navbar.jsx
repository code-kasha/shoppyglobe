import { Link } from "react-router-dom"

export default function Navbar() {
	return (
		<>
			<nav class="bg-neutral-primary">
				<div class="flex flex-wrap justify-between items-center mx-auto max-w-7xl p-4">
					<a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
						<svg
							width="40px"
							height="40px"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z"
								stroke="#1C274C"
								stroke-width="1.5"
							/>
							<path
								d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z"
								stroke="#1C274C"
								stroke-width="1.5"
							/>
							<path
								d="M2 3L2.26121 3.09184C3.5628 3.54945 4.2136 3.77826 4.58584 4.32298C4.95808 4.86771 4.95808 5.59126 4.95808 7.03836V9.76C4.95808 12.7016 5.02132 13.6723 5.88772 14.5862C6.75412 15.5 8.14857 15.5 10.9375 15.5H12M16.2404 15.5C17.8014 15.5 18.5819 15.5 19.1336 15.0504C19.6853 14.6008 19.8429 13.8364 20.158 12.3075L20.6578 9.88275C21.0049 8.14369 21.1784 7.27417 20.7345 6.69708C20.2906 6.12 18.7738 6.12 17.0888 6.12H11.0235M4.95808 6.12H7"
								stroke="#1C274C"
								stroke-width="1.5"
								stroke-linecap="round"
							/>
						</svg>

						<span class="self-center text-xl text-heading font-semibold whitespace-nowrap">
							Shoppy Globe
						</span>
					</a>
					<div class="flex items-center space-x-6 rtl:space-x-reverse">
						<a
							href="#"
							class="text-sm font-medium text-fg-brand hover:underline"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="size-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
								/>
							</svg>
						</a>
					</div>
				</div>
			</nav>
			<nav class="bg-neutral-secondary-soft border-y border-default border-default">
				<div class="max-w-7xl px-4 py-3 mx-auto">
					<div class="flex items-center">
						<ul class="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
							<li>
								<Link
									to="/"
									className="text-heading hover:underline"
									aria-current="page"
								>
									Home
								</Link>
							</li>
							<li>
								<Link to="/about" className="text-heading hover:underline">
									About Us
								</Link>
							</li>
							<li>
								<a href="/products" class="text-heading hover:underline">
									Products
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	)
}
