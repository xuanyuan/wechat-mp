const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const credentials = require('./credentials.js')
const compression = require('compression');
const morgan = require('morgan');

app.set('port', process.env.PORT || 5000)

// 用gzip压缩响应数据，应该在任何可能会发送响应的中间件之前被连入
app.use(compression());
// 提供自动日志记录支持
app.use(require('morgan')());
// 提供对req.body支持
app.use(bodyParser());
// 提供对cookie的支持
app.use(cookieParser(credentials.cookieSecret))
// 提供会话ID（存在cookie里）的会话支持。默认存在内存里，不适用生产环境，可以配置为使用数据库存储
app.use(require('express-session')())

app.use(function(req, res, next) {
	console.log(req.url)
	next()
})

app.get('/a', function(req, res) {
	console.log('/a: 路由终止')
	res.send('a')
})
app.get('/a', function(req, res) {
	console.log('/a: 永远不会调用 ')
})
app.get('/b', function(req, res, next) {
	console.log('/b: 路由未终止 ')
	next()
})
app.use(function(req, res, next) {
	console.log('SOMETIMES')
	next()
})
app.get('/b', function(req, res, next) {
	console.log('/b (part 2): 抛出错误 ')
	throw new Error('b 失败 ')
})
app.use('/b', function(err, req, res, next) {
	console.log('/b 检测到错误并传递 ')
	next(err)
})
app.get('/c', function(err, req) {
	console.log('/c: 抛出错误 ')
	throw new Error('c 失败 ')
})
app.use('/c', function(err, req, res, next) {
	console.log('/c: 检测到错误但不传递 ')
	next()
})
app.use(function(err, req, res, next) {
	console.log(' 检测到未处理的错误 : ' + err.message)
	res.send('500 - 服务器错误 ')
})
app.use(function(req, res) {
	console.log(' 未处理的路由 ')
	res.send('404 - 未找到 ')
})

app.listen(app.get('port'), function() {
	console.log(`Express started on http://localhost:${app.get('port')}; press Ctrl-C to terminate.`)
})