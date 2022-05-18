export * from "../../node_modules/url/url.js"
const URL = globalThis.URL
const URLSearchParams = globalThis.URLSearchParams
export function fileURLToPath(s) {
	if (s.protocol === "file:") {
		return s.pathname
	}
	throw new Error(`fileURLToPath(${s})`)
}
export function pathToFileURL(s) {
	return new URL(s, "file://")
}

export { URL, URLSearchParams }
