const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const compression = require('compression')
const mongoose = require('mongoose')
const session = require('express-session')
const connectMongo = require('connect-mongo')
const morgan = require('morgan');
const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');
const credentials = require('./credentials.js')
const routes = require('./routes')
const cors = require('cors');

// cors限制在/api开头的路径上
app.use('/api', cors());

const opts = {
	keepAlive: 1,
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	autoIndex: false, //Don't build indexes
	reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
	reconnectInterval: 10000, // Reconnect every 10s
	poolSize: 10,
	connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
	socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
	family: 4 // User IPv4, skip trying IPv6
}

app.set('port', process.env.PORT || 5000)

// 用gzip压缩响应数据，应该在任何可能会发送响应的中间件之前被连入
app.use(compression())
// 提供对req.body支持
app.use(bodyParser())

// 定义session存储变量
const MongoStore = connectMongo(session)
const sessionStore = new MongoStore({
	mongooseConnection: mongoose.createConnection(
		credentials.mongo[app.get('env')].connectionString,
		opts
	)
})

// 提供对cookie的支持
app.use(cookieParser(credentials.cookieSecret))
// 提供会话ID（存在cookie里）的会话支持。默认存在内存里，不适用生产环境，可以配置为使用数据库存储
app.use(
	session({
		store: sessionStore,
		secret: credentials.cookieSecret,
		resave: false,
		saveUninitialized: true
	})
)

// 提供自动日志记录支持
switch (app.get('env')) {
	case 'development':
		// 紧凑、彩色的开发日志
		app.use(morgan('combined'))
		mongoose.connect(credentials.mongo.development.connectionString, opts)
		break
	case 'production':
		// 支持按日志循环
		const logDir = path.join(__dirname, 'log');

		fs.existsSync(logDir) || fs.mkdirSync(logDir);
		const logStream = rfs('node.log', {
			interval: '1m',
			path: logDir
		})
		app.use(morgan('combined', {
			stream: logStream
		}));
		mongoose.connect(credentials.mongo.production.connectionString, opts)
		break

	default:
		throw new Error('Unknown execution environment: ' + app.get('env'))
		break
}

routes(app)

app.use(function(err, req, res, next) {

	console.log(' 检测到未处理的错误 : ' + err.message)
	res.status(500);
	res.send('500 - 服务器错误 ')
})
app.use(function(req, res) {
	console.log(' 未处理的路由' + req.url);
	res.status(404);
	res.send('404 - 未找到 ')
})

app.listen(app.get('port'), function() {
	console.log(
		`Express started in ${app.get('env')} mode on http://localhost:${app.get(
      'port'
    )}; press Ctrl-C to terminate.`
	)
})