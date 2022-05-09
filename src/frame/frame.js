navigator.serviceWorker
	.register("/service-worker.js")
	.ready.then(() => console.log("service worker is running"))

const worker = new Worker("vite-worker.js")
worker.postMessage("Hello from frame.js")

window.addEventListener("message", () => {})
