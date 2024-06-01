const db = require('../db')
const bcrypt = require('bcryptjs')
// 用这个包来生成 Token 字符串
const jwt = require('jsonwebtoken')
// 导入配置文件
const config = require('../config')

exports.regUser = (req, res) => {
    const userinfo = req.body
    //监测表单数据是否合法
    // if (!userinfo.username || !userinfo.password) {
    //     res.send({
    //         status: 1,
    //         message: '账号或密码不能为空'
    //     })
    // }

    //监测用户名是否被占用
    const sql = 'select * from my_user where username=?'
    db.query(sql, userinfo.username, (err, results) => {
        if (err) {
            // return res.send({ status: 0, message: err.message })
            return res.cc(err)
        }
        if (results.length > 0) {
            // return res.send({ status: 1, message: '账号已被占用' })
            return res.cc('账号已被占用')
        }
        //密码加密
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        //插入数据
        const sql = 'insert into my_user set ?'
        db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, results) => {
            if (err) {
                // return res.send({status:1,message:err.message})
                return res.cc(err)
            }
            if (results.affectedRows !== 1) return res.cc('注册用户失败')
            // res.send({status:0,message:'注册用户成功'})
            res.cc('注册成功！', 200)
        })
    })
    // res.send('reguser ok')
}

exports.login = (req, res) => {
    //查询用户信息
    const userinfo = req.body
    sql = 'select * from my_user where username=?'
    db.query(sql, userinfo.username, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('用户未注册')
        //判断密码是否与数据里的加密密码一致
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        if (!compareResult) return res.cc('密码错误')
        //token
        const user = { ...results[0], password: '', user_pic: '' }
        // 生成 Token 字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn: '10h', // token 有效期为 10 个小时
        })
        res.send({
            code: 200,
            message: '登录成功!',
            // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
            token: 'Bearer ' + tokenStr,
            id:results[0].id
          })
    })
}