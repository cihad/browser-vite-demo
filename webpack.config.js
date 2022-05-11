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
		context: path.resolve(__dirname, "./src/frame"),
		entry: {
			frame: "./frame.js",
			"vite-worker": "./vite-worker.js",
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
				tty: "tty-browserify",
				esbuild: "esbuild-wasm",
				module: path.resolve(__dirname, "./src/shims/module.js"),
			},
			fallback: {
				util: require.resolve("util"),
				url: require.resolve("url-polyfill"),
				os: require.resolve("os-browserify/browser"),
				assert: require.resolve("assert"),
				process: require.resolve("process/browser"),
				readline: false,
				fsevents: false,
				chokidar: false,
				readdirp: false,
				consolidate: false,
				pnpapi: false,
				perf_hooks: false,
			},
		},
		module: {
			exprContextCritical: false,
			unknownContextCritical: false,
		},
		plugins: [
			new HtmlWebpackPlugin({
				title: "The frame who accepts the requests",
				template: "./frame.html",
				filename: "frame.html",
			}),
			new webpack.HotModuleReplacementPlugin(),
		],
	},
]
