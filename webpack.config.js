const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require("webpack")

module.exports = [
	{
		mode: "development",
		entry: {
			app: "./src/app/index.js",
		},
		output: {
			path: path.resolve(__dirname, "dist"),
		},
		devServer: {
			static: "./dist",
			hot: true,
		},
		plugins: [
			new HtmlWebpackPlugin({
				title: "vite-browser Sample App",
				template: "./src/app/index.html",
				filename: "index.html",
			}),
			new webpack.HotModuleReplacementPlugin(),
		],
	},
	{
		mode: "development",
		entry: {
			frame: "./src/frame/frame.js",
			worker: "./src/frame/vite-worker.js",
		},
		output: {
			path: path.resolve(__dirname, "dist"),
			publicPath: "/public",
		},
		resolve: {
			alias: {
				fs: "memfs",
				path: "path-browserify",
				querystring: "querystring-es3",
				crypto: "crypto-browserify",
				stream: "readable-stream-no-circular",
				"readable-stream": "readable-stream-no-circular",
				"safe-buffer": "buffer",
				timers: "timers-browserify",
				os: "os-browserify",
				tty: "tty-browserify",
				esbuild: "esbuild-wasm",
				readline: "./empty.js",
				fsevents: "./empty.js",
				chokidar: "./empty.js",
				readdirp: "./empty.js",
				consolidate: "./empty.js",
				pnpapi: "./empty.js",
			},
		},
		plugins: [
			new HtmlWebpackPlugin({
				title: "The frame who accepts the requests",
				template: "./src/frame/frame.html",
				filename: "frame.html",
			}),
			new webpack.HotModuleReplacementPlugin(),
		],
	},
]
