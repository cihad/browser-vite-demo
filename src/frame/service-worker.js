importScripts(
	"https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js"
)

workbox.routing.registerRoute(
	/^https?:\/\/localhost:8080\/(\/.*)$/,
	async ({ request, params, url }) => {
		const req = request?.url || url.toString()
		const [pathname] = params
		// send the request to vite worker
		const response = await postToViteWorker(pathname)
		return response
	}
)
