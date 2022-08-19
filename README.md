# helloworld

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


# 目录结构说明
## build：构建脚本目录，主要是webpack的配置。启动文件是dev-server.js，输入npm run dev首先启动的就是dev-server.js，它会去检查node及npm版本，加载配置文件，启动服务。
build.js：生产环境构建脚本，
check-versions.js：版本检查，
utils.js：构建相关工具方法，
vue-loader.conf.js：css加载器配置，
dev-server.js：运行本地开发服务器（隐藏）

webpack.base.conf.js：wabpack基础配置
webpack.dev.conf.js：wabpack开发环境配置
webpack.prod.conf.js： wabpack生产环境配置

## config文件主要是项目相关配置，我们常用的就是当端口冲突时配置监听端口，打包输出路径及命名等。
dev.env.js：开发环境配置，
index.js：项目主要配置（配置监听端口，打包输出路径）
prod.env.js：生产环境配置，

## node_modules里面是项目依赖包，其中包括很多基础依赖，也可以根据需要安装其他依赖。

## src：项目源码（核心文件），
assets：静态资源（样式类文件，如css、less、ssss等），
components：公共组件，
router：路由配置，

App.vue：根组件，
main.js：入口文件，

## static：静态资源（一般是图片类资源）。

## .babelrc：babel编译参数。

## .editorconfig：代码格式。

## .postcssrc.js：css转换工具。

## index.html：主页。

## package.json：项目基本信息（版本号、项目姓名、依赖、打包方式）。

## package-lock.json：记录项目中实际安装的各个依赖（npm package）的具体来源和版本号



# 消息提示组件：wc-messagebox
## 安装：npm i wc-messagebox --save

## 使用
toastParams: {
	toastStyle: {
		height: '1.2rem',
		width: '7.5rem',
		lineHeight: '0.8rem',
		fontSize: '0.64rem'
	}
}
this.$toast('获取成功', this.toastParams)
// toast 的图文混合模式
this.$toast(text, {
	path: path,
	location: 'center',
	toastStyle: {
		height: '100px',
		width: '100px'
	},
	imgStyle: {
		width: '40px',
		marginBottom: '15px'
	}
})
this.$loading.show('加载中...') // loading
this.$loading.hide()

this.$alert('这里是内容')  // 如果只传递一个字符串, 则标题默认为 '提示', 按钮默认为 '确定'
  如果参数为对象, 则可接受如下配置选项:
	title: '这里是标题',
	content: '这里是内容',
	btnText: '这里是按钮',
	component: Component // 用于用户自行指明 Alert 组件
	比如:
  this.$alert({
	title: '我是标题',
	content: '我是内容',
	btnText: '我知道了'
})

this.$confirm('这里是内容')
  如果参数为对象, 则可接受如下配置选项:
	title: '这里是标题',
	content: '这里是内容',
	yesStyle: {}, // 设置左边按钮样式
	yesText: '',  // 左边按钮文本,
	noStyle: {},  // 设置右边按钮样式,
	noText: '',   // 设置右边按钮文本
	component: Component // 可不设置, 适用于用户自定义组件
  比如:
  this.$confirm({
	title: '我是标题',
	content: '我是内容',
	yesText: 'OK',
	noText: 'No'
})
