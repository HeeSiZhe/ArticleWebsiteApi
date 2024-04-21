const express = require('express')
const app = express()
const bodyParser = require('body-parser');

//cors中间件
const cors = require('cors')
app.use(cors())

app.use(bodyParser.json());


// 托管静态资源文件
app.use('/uploads', express.static('./uploads'))

//封装res.cc函数
app.use((req, res, next) => {
    res.cc = function (err, code = 1001) {
        res.send({
            code,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

//解析token
// 导入配置文件
const config = require('./config')
// 解析 token 的中间件
const expressJWT = require('express-jwt')
// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({
    secret: config.jwtSecretKey,
    algorithms: ['HS256'],
    credentialsRequired: false,
    getToken: function fromHeaderOrQuerystring(req) {
      if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
      ) {
        return req.headers.authorization.split(" ")[1];
      } else if (req.query && req.query.token) {
        return req.query.token;
      }
      return null;
    },
  }).unless({ path: [/^\api\//] }))
//用户路由
const userRouter = require('./router/user')
app.use('/api', userRouter)
//用户信息路由
const userinfoRouter = require('./router/userinfo')
app.use('/my', userinfoRouter)
//文章分类路由
const orderRouter = require('./router/order')
app.use('/my/order', orderRouter)
//文章路由
const articleRouter = require('./router/article')
app.use('/my/article',articleRouter)

//供应商路由
const vendorRouter = require('./router/vendor')
app.use('/my/vendor',vendorRouter)

//错误中间件
const joi = require('joi')
app.use(function (err, req, res, next) {
    // 数据验证失败
    if (err instanceof joi.ValidationError) return res.cc(err)
    // 捕获身份认证失败的错误
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败!')
    //未知的错误
    res.cc(err)
})

//启动服务器
app.listen(3007, () => {
    console.log('api server running at http://127.0.0.1:3007');
})