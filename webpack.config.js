const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require("webpack")
const ReplacePlugin = require("webpack-plugin-replace")

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
				url: path.resolve(__dirname, "./src/shims/url.js"),
			},
			fallback: {
				util: require.resolve("util"),
				os: require.resolve("os-browserify/browser"),
				assert: require.resolve("assert"),
				process: require.resolve("process/browser"),
				perf_hooks: require.resolve("perf-hooks-browserify/browser"),
				readline: false,
				fsevents: false,
				chokidar: false,
				readdirp: false,
				consolidate: false,
				pnpapi: false,
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
			new webpack.DefinePlugin({
				"process.env.NODE_DEBUG": JSON.stringify(
					process.env.NODE_DEBUG
				),
				"process.versions": JSON.stringify(process.versions),
				"process.platform": JSON.stringify(process.platform),
				"process.env.VITE_DEBUG_FILTER": JSON.stringify(
					process.env.VITE_DEBUG_FILTER
				),
			}),
			new ReplacePlugin({
				values: {
					"{ global }": "          ", // don't touch :)
				},
			}),
		],
	},
]
