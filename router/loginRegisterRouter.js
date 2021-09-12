//引入express模块
const express = require('express')

const router = express.Router()

//引入上传模块
const multer = require('multer')
//配置上传对象
const upload = multer({dest:__dirname+'/upload'})

const controllers = require('../controllers/controllers')
const more = require('../controllers/more')

router.post('/login',controllers.loginAccount)
router.post('/register',controllers.registerAccount)
router.post('/writeArticle',controllers.inputArticle)
router.get('/getArticle',controllers.getArticle)

router.post('/getArticleInfo',controllers.getArticleInfo)
//查看自己的帖子
router.get('/checkMyArticle',controllers.checkMyArticle)
//点赞某个帖子
router.get('/likeArticle',controllers.likeArticle)

//上传用户头像接口,如果上传单个文件可以调用upload.single()方法，并将文件的name的值作为参数传入
router.post('/setUserHeadImage',upload.single('user_headImage'),more.setUserHeadImage)
//查询是否存在找回账号用户
router.post('/searchAccount',more.searchAccount)

//修改账号密码
router.post('/revisePassword',more.revisePassword)

//统计收到的赞
router.get('/getLikeNumber',more.getLikeNumber)

//修改用户信息
router.post('/reviseUserMsg',more.reviseUserMsg)

//添加评论
router.post('/addComment',more.addComment)
//加载所有对应评论
router.get('/getAllComment',more.getAllComment)
module.exports = function(){
    return router
}