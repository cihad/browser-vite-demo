importScripts(
	"https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js"
)

workbox.routing.registerRoute(
	/^https?:\/\/localhost:8080\/vite(\/.*)$/,
	async ({ request, params, url }) => {
		console.log("service-worker registerRouter", { params, url })
		const req = request?.url || url.toString()
		const [pathname] = params
		// send the request to vite worker
		postToViteWorker(pathname)
		const response = new Response("Merhaba", {
			headers: { "Content-Type": "text/html" },
		})
		return response
	}
)

const channel = new BroadcastChannel("my_bus")

self.addEventListener("message", (event) => {
	console.log("[service-worker.js->message]", { event })
})

function postToViteWorker(pathname) {
	channel.postMessage({ type: "MSG_ID", pathname })
}
