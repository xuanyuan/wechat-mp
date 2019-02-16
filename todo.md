中间件只是一个有 3 个参数的函数：一个请求对象、一个响应对象和一个 next 函数；还有一种 4 个参数的形式，用来做错误处理

### 请求对象

| 属性和方法                     | 含义                                                                                                                                            |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| req.params                     | 一个数组，包含命名过的路由参数                                                                                                                  |
| req.query                      | 一个对象包含以键值对存放的查询字符串参数（通常称为 GET 请求参数）                                                                               |
| req.body                       | 一个对象，包含 POST 请求参数。要使 req.body 可用，需要中间件能够解析请求正文内容类                                                              |
| req.route                      | 关于当前匹配路由的信息。主要用于路由调试                                                                                                        |
| req.cookies/req.singnedCookies | 一个对象，包含从客户端传递过来的 cookies 值                                                                                                     |
| req.headers                    | 从客户端接收到的请求报头                                                                                                                        |
| req.accepts([types])           | 用来确定客户端是否接受一个或一组制定的类型（可选类型可以是单个的 MIME 类型，如 application/json、一个逗号分隔集合或是一个数组）                 |
| req.ip                         | 客户端的 IP 地址                                                                                                                                |
| req.path                       | 请求路径（不包含协议、主机、端口或查询字符串）                                                                                                  |
| req.host                       | 用来返回客户端所报告的主机名。这些信息可以伪造，所以不应该用于安全目的                                                                          |
| req.xhr                        | 如果请求由 Ajax 发起将会返回 true                                                                                                               |
| req.protocol                   | 用于标识请求的协议（http 或 https）                                                                                                             |
| req.secure                     | 如果连接是安全的，将返回 true。等同于 req.protocol==='https'                                                                                    |
| req.url/req.originalUrl        | 返回了路径和查询字符串（不包含协议、主机和端口）。req.url 若是出于内部路由目的，则可以重写，但是 req.originalUrl 旨在保留原始请求和查询字符串。 |
| req.acceptedLanguages          | 用来返回客户端首选的一组（人类的）语言。从请求报头中解析而来。                                                                                  |

### 响应对象

| 属性和方法                                                             | 含义                                                                                                                                                                                                                                                                                            |
| ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| res.status(code)                                                       | 设置 HTTP 状态代码。默认为 200。对于重定向（301,302,303,307）可以使用 redirect                                                                                                                                                                                                                  |
| res.set(name, value)                                                   | 设置响应头。通常不需要手动设置                                                                                                                                                                                                                                                                  |  |
| res.cookie(name, value, [options]),res.clearCookie(name, [options])    | 设置或清除客户端 cookies 值。需要中间件支持                                                                                                                                                                                                                                                     |
| res.redirect([status], url)                                            | 重定向浏览器。默认重定向代码是 302（建立）。通常应尽量减少重定向，除非永久移动页面，这种情况应当使用代码 301（永久移动）                                                                                                                                                                        |
| res.send(body),res.send(status, body)                                  | 向客户端发送响应及可选的状态码。Express 的默认内容类型是 text/html。 如果想改为 text/plain，需要在 res.send 之前调用 res.set('Content-Type', 'text/plain')。如果 body 是一个对象或数组，响应将会以 JSON 发送（内容类型需要被正确设置）， 推荐调用 res.json                                      |
| res.json(json)，res.json(status, json)                                 | 向客户端发送 JSON 以及可选的状态码                                                                                                                                                                                                                                                              |
| res.jsonp(json),res.jsonp(status, json)                                | 向客户端发送 JSONP 及可选的状态码                                                                                                                                                                                                                                                               |
| res.type(type)                                                         | 设置 Content-Type 头信息。基本上相当于 res.set('Content-Type', 'type')                                                                                                                                                                                                                          |
| res.format(object)                                                     | 允许你根据接收请求报头发送不同的内容。res.format({'text/plain': 'hi there', 'text/html': '<b>hi there</b>'})                                                                                                                                                                                    |
| res.attachment([filename]), res.download(path, [filename], [callback]) | 两种方法会将响应报头 Content-Disposition 设为 attachment，这样浏览器会选择下载而不是展示内容。可以指定 filename 给浏览器作为对用户的提示。用 res.download 指定要下载的文件，而 res.attachment 只是设置报头。另外，还要将内容发送到客户端。                                                      |
| res.sendFile(path,[option],[callback])                                 | 根据路径读取指定文件并将内容发送到客户端。                                                                                                                                                                                                                                                      |
| res.locals,res.render(view,[locals],callback)                          | res.locals 是一个对象，包含用于渲染视图的默认上下文。res.render 使用配置的模板引擎渲染视图（不能把 res.render 的 locals 参数与 res.locals 混为一谈，上下文在 res.locals 中会被重写，但在没有被重写的情况下仍然可用）。res.render 的默认响应代码为 200，使用 res.status 可以指定一个不同的代码。 |

两种最流行的 NoSQL 数据库是文档数据库 MongoDB 和键 - 值数据库 Redis

mongodb 连接

```javascript
mongoose.connect('mongodb://39.105.150.128/test', {
  keepAlive: 1,
  useNewUrlParser: true
})
```

mongod --dbpath /var/lib/mongodb/ --logpath /var/log/mongodb/mongodb.log --logappend &
–dbpath：指定 mongo 的数据库文件在哪个文件夹
–logpath：指定 mongo 的 log 日志是哪个，这里 log 一定要指定到具体的文件名
–logappend：表示 log 的写入是采用附加的方式，默认的是覆盖之前的文件

永久启动
启动：sudo service mongodb start
关闭：sudo service mongodb stop
临时启动
mongod
进入 mongo 命令行交互
mongo

查看 27017 端口占用
lsof -i:27017

mongo 允许远程连接

```shell
sudo vim /etc/mongodb.conf
将下面两个属性改为下面的值，有#的去掉#
bind_ip = 0.0.0.0
port = 27017
```
