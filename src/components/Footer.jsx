export default function Footer() {
	return (
		<>
			<footer class="bg-neutral-primary-soft rounded-base shadow-xs py-3">
				<div class="w-full mx-auto max-w-7xl p-4 md:flex md:items-center md:justify-between">
					<span class="text-sm text-body sm:text-center">
						© 2026{" "}
						<a href="#" class="hover:underline">
							Shoppy Globe™
						</a>
						. All Rights Reserved.
					</span>
					<ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-body sm:mt-0">
						<li>
							<a href="#" class="hover:underline me-4 md:me-6">
								About
							</a>
						</li>
						<li>
							<a href="#" class="hover:underline me-4 md:me-6">
								Privacy Policy
							</a>
						</li>
						<li>
							<a href="#" class="hover:underline me-4 md:me-6">
								Licensing
							</a>
						</li>
						<li>
							<a href="#" class="hover:underline">
								Contact
							</a>
						</li>
					</ul>
				</div>
			</footer>
		</>
	)
}
