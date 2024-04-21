const { result } = require('@hapi/joi/lib/base')
const db = require('../db')

exports.getArticleCates = (req, res) => {
    const sql = 'select * from my_order'
    db.query(sql,(err,results) => {
        if(err) return res.cc(err)
        res.send({
            code:200,
            message:'获取订单成功!',
            data:results
        })
    })
}

exports.addArticleCates = (req,res) => {
    const sql = 'insert into my_order set ?'
    db.query(sql,req.body,(err,results) => {
        if(err) return res.cc(err)
        if(results.affectedRows !== 1) return res.cc('新增图书失败')
        res.cc('新增图书成功',200)
    })
}

exports.deleteCateById = (req, res) => {
    const sql = 'delete from my_order where id=?'
    db.query(sql,req.body.id,(err,results) => {
        if(err) return res.cc(err)
        if(results.affectedRows !== 1) return res.cc('删除图书失败')
        res.cc('删除图书成功',200)
    })
  }

exports.getArticleCateById = (req,res) => {
    const sql = 'select * from my_order where id=?'
    db.query(sql,req.params.id,(err,results) => {
        if(err) return res.cc(err)
        if(results.length !== 1) return res.cc('获取图书失败')
        res.send({
            code:200,
            message:'获取图书成功',
            data:results[0]
        })
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