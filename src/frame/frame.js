navigator.serviceWorker.register("/service-worker.js")
navigator.serviceWorker.ready.then(() =>
	console.log("Service worker is running.")
)

const worker = new Worker(new URL("./vite-worker.js", import.meta.url))
worker.postMessage({
	question:
		"The Answer to the Ultimate Question of Life, The Universe, and Everything.",
})
worker.onmessage = ({ data: { answer } }) => {
	console.log({ answer })
}
