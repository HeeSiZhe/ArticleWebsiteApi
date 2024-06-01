const db = require('../db')
const bcrypt = require('bcryptjs')

exports.getUserinfo = (req, res) => {
    const sql = `select id, username, age,address,phone,nickname, email, user_pic from my_user where id = ?`
    db.query(sql, req.body.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) {
            res.cc('获取用户信息失败')
        }
        res.send({
            code: 200,
            message: '获取用户信息成功',
            data: results[0]
        })
    })
}

exports.updateUserinfo = (req, res) => {
    const sql = 'update  my_user set ? where id=?'
    db.query(sql, [req.body, req.body.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) {
            return res.cc('更新用户信息失败')
        }
        res.cc('更新用户信息成功', 200)
    })
}

exports.updatePwd = (req, res) => {
    const sql = 'select * from  my_user where id=?'
    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.cc('err')
        if (results.length !== 1) {
            return res.cc('用户不存在')
        }
        // 判断提交的旧密码是否正确
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        if (!compareResult) return res.cc('原密码错误')

        const sql = 'update  my_user set password=? where id=?'
        const newPwd = bcrypt.hashSync(req.body.newPwd)
        db.query(sql, [newPwd, req.user.id], (err, results) => {
            if (err) return res.cc('err')
            if (results.affectedRows !== 1) {
                return res.cc('修改密码失败')
            }
            res.cc('修改密码成功', 200)
        })
    })
}

exports.updateAvatar = (req, res) => {
    const sql = 'update  my_user set user_pic=? where id=?'
    db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) {
            res.cc('更换头像失败')
        }
        res.cc('更换头像成功', 200)
    })
}