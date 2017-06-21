# react-大众点评项目
npm run mock 
npm start 
npm run mock
npm start

本项目使用react全家桶+fetch+mock
    使用router设置路由，使用fetch+mock模拟后台服务器数据库，使用redux实现组件间数据共享
    

package.json更改
mac电脑:
	"scripts": {
    "start": "NODE_ENV=dev webpack-dev-server --progress --colors",
    "mock": "node --harmony ./mock/server.js",
    "build": "rm -rf ./build && NODE_ENV=production webpack --config ./webpack.production.config.js --progress --colors"
  },
Win电脑:
  	windows:
  	"scripts": {
    "start": "set NODE_ENV=dev && webpack-dev-server --progress --colors",
    "mock": "node --harmony ./mock/server.js",
    "build": "rd/s/q build && set NODE_ENV=production && webpack --config ./webpack.production.config.js --progress --colors"
  },
