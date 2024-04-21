const express = require('express')
const router = express.Router()
const artcate_handler = require('../router_handler/vendor')

//获取供应商列表
router.get('/cates',artcate_handler.getArticleCates)
//新增图书分类
router.post('/addcates',artcate_handler.addArticleCates)
// //根据id删除图书分类
router.get('/deletecate/:Bno',artcate_handler.deleteCateById)
// //根据id获取图书分类
router.get('/cates/:Bno',artcate_handler.getArticleCateById)
// //根据id更新图书分类数据
router.post('/updatecate',artcate_handler.updateCateById)
router.post('/updatecate1',artcate_handler.updateCateById1)


module.exports = router