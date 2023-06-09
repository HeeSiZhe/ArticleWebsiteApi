const express = require('express')
const router = express.Router()
const artcate_handler = require('../router_handler/artcate')
const expressJoi = require('@escook/express-joi')
const { add_cate_schema,delete_cate_schema,get_cate_schema,update_cate_schema } = require('../schema/user')

//获取文章分类列表
router.get('/cates',artcate_handler.getArticleCates)
//新增文章分类
router.post('/addcates',expressJoi(add_cate_schema),artcate_handler.addArticleCates)
//根据id删除文章分类
router.get('/deletecate/:id',expressJoi(delete_cate_schema),artcate_handler.deleteCateById)
//根据id获取文章分类
router.get('/cates/:id',expressJoi(get_cate_schema),artcate_handler.getArticleCateById)
//根据id更新文章分类数据
router.post('/updatecate',expressJoi(update_cate_schema),artcate_handler.updateCateById)


module.exports = router