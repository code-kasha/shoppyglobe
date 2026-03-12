// sw.js

const CACHE_NAME = "my-app-cache-v1"
const OFFLINE_PAGE = "/offline.html"

// Pre-cache app shell
const ASSETS_TO_CACHE = [
	"/",
	"/index.html",
	"/offline.html",
	"/favicon.ico",
	"/logo192.png",
	"/logo512.png",
	"/manifest.json",
	// Add other known CSS, JS, fonts, images here
]

// Install: cache app shell
self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.addAll(ASSETS_TO_CACHE)
		}),
	)
	self.skipWaiting()
})

// Activate: clean old caches
self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((keys) =>
				Promise.all(
					keys
						.filter((key) => key !== CACHE_NAME)
						.map((key) => caches.delete(key)),
				),
			),
	)
	self.clients.claim()
})

// Fetch: serve cached first, then network, then fallback
self.addEventListener("fetch", (event) => {
	const { request } = event

	// Only handle GET requests
	if (request.method !== "GET") return

	event.respondWith(
		caches.match(request).then((cachedResponse) => {
			if (cachedResponse) return cachedResponse

			return fetch(request)
				.then((networkResponse) => {
					// Cache API responses or assets dynamically
					return caches.open(CACHE_NAME).then((cache) => {
						cache.put(request, networkResponse.clone())
						return networkResponse
					})
				})
				.catch(() => {
					// Offline fallback
					if (request.destination === "document") {
						return caches.match(OFFLINE_PAGE)
					}
				})
		}),
	)
})
