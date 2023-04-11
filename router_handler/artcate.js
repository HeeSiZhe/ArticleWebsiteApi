const { result } = require('@hapi/joi/lib/base')
const db = require('../db')

exports.getArticleCates = (req, res) => {
    const sql = 'select * from ev_article_cate where id_delete=0 order by id asc'
    db.query(sql,(err,results) => {
        if(err) return res.cc(err)
        res.send({
            status:0,
            message:'获取文章分类列表成功!',
            data:results
        })
    })
}

exports.addArticleCates = (req,res) => {
    const sql = 'select * from ev_article_cate where name=? or alias=?'
    db.query(sql,[req.body.name, req.body.alias],(err,results) => {
        if(err) return res.cc(err)
        if(results.length === 2) return res.cc('分类名称与别名 分别被两用户占用，请更换后重试!')
        if(results.length === 1 && req.body.name===results[0].name && req.body.alias===results[0].alias){
            return res.cc('分类名称与别名 都被一个用户占用，请更换后重试')
        }
        if(results.length === 1 && req.body.name===results[0].name){
            return res.cc('分类名称被占用，请更换后重试')
        }
        if(results.length === 1 && req.body.alias===results[0].alias){
            return res.cc('别名称被占用，请更换后重试')
        }
        const sql = 'insert into ev_article_cate set ?'
        db.query(sql,req.body,(err,results) => {
            if(err) return res.cc(err)
            if(results.affectedRows !== 1) return res.cc('新增文章分类失败')
            res.cc('新增文章分类成功',0)
        })
    })
}

exports.deleteCateById = (req, res) => {
    const sql = 'update ev_article_cate set id_delete=1 where id=?'
    db.query(sql,req.params.id,(err,results) => {
        if(err) return res.cc(err)
        if(results.affectedRows !== 1) return res.cc('删除文章分类失败')
        res.cc('删除文章分类成功',0)
    })
  }

exports.getArticleCateById = (req,res) => {
    const sql = 'select * from ev_article_cate where id=?'
    db.query(sql,req.params.id,(err,results) => {
        if(err) return res.cc(err)
        if(results.length !== 1) return res.cc('获取文章分类失败')
        res.send({
            status:0,
            message:'获取文章分类成功',
            data:results[0]
        })
    })
}

exports.updateCateById = (req,res) => {
    const sql = 'select * from ev_article_cate where Id<>? and (name=? or alias=?)'
    db.query(sql,[req.body.Id ,req.body.name, req.body.alias],(err,results) => {
        if(err) return res.cc(err)
        if(results.length === 2) return res.cc('分类名称与别名 分别被两用户占用，请更换后重试!')
        if(results.length === 1 && req.body.name===results[0].name && req.body.alias===results[0].alias){
            return res.cc('分类名称与别名 都被一个用户占用，请更换后重试')
        }
        if(results.length === 1 && req.body.name===results[0].name){
            return res.cc('分类名称被占用，请更换后重试')
        }
        if(results.length === 1 && req.body.alias===results[0].alias){
            return res.cc('别名称被占用，请更换后重试')
        }
        const sql = 'update ev_article_cate set ? where Id=?'
        db.query(sql,[req.body,req.body.Id],(err,results) => {
            if(err) return res.cc(err)
            if(results.affectedRows !== 1) return res.cc('修改分类数据失败')
            res.cc('修改分类数据成功',0)
        })
    })
}