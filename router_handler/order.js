const { result } = require('@hapi/joi/lib/base')
const db = require('../db')

exports.getArticleCates = (req, res) => {
    let sql = 'SELECT * FROM my_order WHERE 1=1'; // 初始化SQL，1=1是为了方便后面拼接WHERE子句
    const params = []; // 存储查询参数的数组

    // 检查并添加username到查询条件和参数数组
    if (req.body.orderName) {
        sql += ' AND orderName LIKE  ?';
        params.push('%' + req.body.orderName + '%');
    }

    // 检查并添加region到查询条件和参数数组
    if (req.body.status) {
        sql += ' AND status = ?';
        params.push(req.body.status);
    }

    db.query(sql, params, (err, results) => {
        if (err) return res.cc(err);

        if (results.length === 0) {
            return res.cc('没有找到匹配的记录');
        }

        res.send({
            code: 200,
            message: '查询成功',
            data: results,
        });
    });
}

exports.addArticleCates = (req,res) => {
    const sql = 'insert into my_order set ?'
    db.query(sql,req.body,(err,results) => {
        if(err) return res.cc(err)
        if(results.affectedRows !== 1) return res.cc('新增订单失败')
        res.cc('新增订单成功',200)
    })
}

exports.deleteCateById = (req, res) => {
    const sql = 'delete from my_order where id=?'
    db.query(sql,req.body.id,(err,results) => {
        if(err) return res.cc(err)
        if(results.affectedRows !== 1) return res.cc('删除订单失败')
        res.cc('删除订单成功',200)
    })
  }


exports.updateCateById = (req,res) => {
    const sql = 'update my_order set ? where id=?'
        db.query(sql,[req.body,req.body.id],(err,results) => {
            if(err) return res.cc(err)
            if(results.affectedRows !== 1) return res.cc('修改数据失败')
            res.cc('修改数据成功',200)
        })
}