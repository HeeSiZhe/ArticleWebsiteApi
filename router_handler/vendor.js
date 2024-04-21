const db = require('../db')

exports.getArticleCates = (req, res) => {
    const sql = 'select * from vendor'
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取供应商库存信息成功!',
            data: results
        })
    })
}

exports.addArticleCates = (req, res) => {
    const sql = 'insert into vendor set ?'
    db.query(sql, req.body, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('新增图书失败')
        res.cc('新增图书成功', 0)
    })
}

exports.deleteCateById = (req, res) => {
    const sql = 'delete from vendor where Bno=?'
    db.query(sql, req.params.Bno, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除图书失败')
        res.cc('删除图书成功', 0)
    })
}

exports.getArticleCateById = (req, res) => {
    const sql = 'select * from vendor where Bno=?'
    db.query(sql, req.params.Bno, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('获取图书失败')
        res.send({
            status: 0,
            message: '获取图书成功',
            data: results[0]
        })
    })
}

exports.updateCateById = (req, res) => {
    const sql = 'update vendor set Vnum=Vnum-? where Bno=?'
    db.query(sql, [req.body.JinHuo, req.body.Bno], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('修改数据失败')
        else {
            const sql = 'update bstore set Bnum=Bnum+? where Bno=?'
            db.query(sql, [req.body.JinHuo, req.body.Bno], (err, results) => {
                if (err) return res.cc(err)
                if (results.affectedRows !== 1) return res.cc('修改数据失败')
                res.cc('修改数据成功', 0)
            })
        }
    })
}

exports.updateCateById1 = (req, res) => {
    const sql = 'update bstore set Bnum=Bnum-? where Bno=?'
    db.query(sql, [req.body.TuiHuo, req.body.Bno], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('修改数据失败')
        else {
            const sql = 'update vendor set Vnum=Vnum+? where Bno=?'
            db.query(sql, [req.body.TuiHuo, req.body.Bno], (err, results) => {
                if (err) return res.cc(err)
                if (results.affectedRows !== 1) return res.cc('修改数据失败')
                res.cc('修改数据成功', 0)
            })
        }
    })
}