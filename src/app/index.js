function postToFrame(fileContent) {
	const frame = document.querySelector("#frame")

	frame.contentWindow.postMessage({ fileContent })
}

document.addEventListener("DOMContentLoaded", function () {
	const textarea = document.querySelector("#fileContent")

	textarea.addEventListener("input", (event) => {
		postToFrame(event.target.value)
	})
})
