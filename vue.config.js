// 开启严格模式
"use static";

const path = require("path"); // NODE模块

function resolve(dir) {
	return path.join(__dirname, dir);
}

// 标题
const name = "elk后台管理系统";

// 端口
const port = process.env.port || 9938;

console.log("当前运行环境:", process.env.NODE_ENV);
console.log("当前运行api:", process.env.VUE_APP_BASE_API);

//  vue.config.js 配置
module.exports = {
	// 默认值： ‘/’
	// 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上
	publicPath: "/",
	// 当运行 npm run build时生成的生产环境构建文件的目录 默认 dist
	outputDir: "dist",
	// 放置生成的静态资源的目录
	assetsDir: "static",
	// 开发环境下开启eslint代码检测
	lintOnSave: process.env.NODE_ENV === "development",

	devServer: {
		// host: "0.0.0.0",
		port: port,
		open: true,
		// webSocketServer: true,
		proxy: {
			[process.env.VUE_APP_BASE_API]: {
				target: process.env.VUE_APP_BASE_URL, //代理的地址
				changeOrigin: true, // 是否允许跨域
				pathRewrite: {
					// 路径重写`
					// '/dev-api': ''
					["^" + process.env.VUE_APP_BASE_API]: "",
				},
			},
			[process.env.VUE_APP_BASE_FILE_URL + process.env.VUE_APP_BASE_API]: {
				target: process.env.VUE_APP_BASE_FILE_URL, //代理的文件地址
				changeOrigin: true, // 是否允许跨域
				pathRewrite: {
					// 路径重写`
					["^" + process.env.VUE_APP_BASE_FILE_URL]: "",
				},
			},
			// disableHostCheck: true,
		},
	},
	// alias：路径的映射，路径多层次的时候很方便
	configureWebpack: {
		resolve: {
			alias: {
				"@": resolve("src"),
				assets: resolve("@/assets"),
				components: resolve("@/components"),
				utils: resolve("@/utils"),
				view: resolve("@/view"),
			},
		},
	},

	chainWebpack(config) {
		// 移除 资源预加载配置
		config.plugins.delete("preload");
		// 移除 空隙时间加载其他内容
		config.plugins.delete("prefetch");

		// 设置 svg-sprite-loader`：将加载的 svg 图片拼接成 雪碧图，放到页面中，其它地方通过 <use> 复用
		config.module
			.rule("svg")
			.exclude.add(resolve("src/assets/icons")) // 排除的文件
			.end();
		config.module
			.rule("icons")
			.test(/\.svg$/)
			.include.add(resolve("src/assets/icons")) // 包含的文件
			.end()
			.use("svg-sprite-loader")
			.loader("svg-sprite-loader")
			.options({
				symbolId: "icon-[name]",
			})
			.end();
		// .use('svg-loader')
		// .loader('svg-loader')
		// .tap(options => ({...options, plugins: [{removeAttrs: {attrs: 'fill'}}]})) // 删除默认fill属性
		// .end()

		// 条件判断：当是 生产环境的时候，对其进行一些处理
		config.when(process.env.NODE_ENV !== "development"),
			(config) => {
				config
					.plugin("ScriptExtHtmlWebpackPlugin")
					.after("html")
					.use("script-ext-html-webpack-plugin", [
						{
							inline: /runtime\..*\.js$/,
						},
					])
					.end();

				// chunks 资源分块
				confing.optimization.splitChunks({
					chunks: "all",
					cacheGroups: {
						libs: {
							name: chunk - libs,
							test: /[\\/]node_modules[\\/]/,
							priority: 10,
							chunks: "initial",
						},
						elementUI: {
							name: chunk - elementUI,
							test: /[\\/]node_modules[\\/]_?element-ui(.*)/,
							priority: 20,
						},
						commons: {
							name: chunk - commons,
							test: resolve("src/components"),
							priority: 5,
							minChunks: 3,
							reuseExistingChunk: true,
						},
					},
				});

				config.optimization.runtimeChunk("single");
			};
		// console.log(config.toString())
	},
};
