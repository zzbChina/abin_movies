const dbConfig = require('../util/database_config.js')
var md5 = require('md5')

//发起获取所有电影信息接口
getAllFilms=(req,res)=>{
    const sql = "SELECT * from films";
    const sqlArr = [];
    const callback = (err,data)=>{
        if(err){
            console.log('连接出错')
        }else{
            res.send({
                data
            })
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callback)
}
//发起登录请求接口
loginAccount=(req,res)=>{
    let account = req.body.account
    let password = md5(req.body.password)
    const sql = 'select * from users where account=? && password=?'
    const sqlArr = [account,password]
    const callback = (err,data)=>{
        if(err){
            console.log('登录失败')
        }else{
            res.send({
                data
            })
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callback)
}
//发起注册请求接口
registerAccount=(req,res)=>{
    let {account} = req.body
    let sql = 'select * from users where account=?'
    let sqlArr = [account]
    let callback = (err,data)=>{
        if(err){
            console.log(err)
        }else{
            //查询数据库是否已经存在该手机号绑定的用户
            if(data != ''){
                console.log('该手机号码已被注册')
                res.send('该号码已被注册')
            }else{
                let account = req.body.account
                let password = md5(req.body.password)
                let status = req.body.status
                let nickname = req.body.nickname
                let email = req.body.nickname
                let sql = 'insert into users set ?'
                let sqlArr = {account,password,status,nickname,email}
                let callback = (err)=>{
                    if(err){
                        console.log('注册信息写入数据库失败')
                        console.log(err)
                    }else{
                        res.send('数据写入成功')
                    }
                }
                dbConfig.sqlConnect(sql,sqlArr,callback)
            }
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}
//发起项数据库写入帖子请求接口
inputArticle=(req,res)=>{
    let {user_nickname,user_phone,article_title,article_content,publish_date} = req.body
    let sql = 'insert into community set ?'
    let sqlArr = {user_nickname,user_phone,article_title,article_content,publish_date}
    let callback = (err)=>{
        if(err){
            console.log(err)
            console.log('帖子写入失败')
            res.send('error')
        }else{
            console.log('帖子写入成功')
            res.send('success')
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}
//var articleNumber = 0
//发起请求帖子文章的接口
getArticle=(req,res)=>{
    // let articleNumber = req.query
    let sql = 'select * from community'
    let sqlArr = []
    let callback = (err,data)=>{
        if(err){
            console.log(err)
            console.log('请求帖子数据失败')
        }else{
            res.send(data)
            //articleNumber = articleNumber +10
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}
//查看文章帖子详情接口
getArticleInfo=(req,res)=>{
    let {article_id} = req.body
    let sql = 'select * from community where ?'
    let sqlArr = {article_id}
    let callback=(err,data)=>{
        if(err){
            console.log(err)
        }else{
            console.log(sqlArr)
            res.send(data)
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}
//查看我的帖子接口
checkMyArticle=(req,res)=>{
    let {user_phone}  = req.query
    let sql = 'select * from community where ?'
    let sqlArr = {user_phone}
    let callback = (err,data)=>{
        if(err){
            console.log(err)
        }else{
            res.send(data)
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}
//点赞某个帖子
likeArticle=(req,res)=>{
    let {article_id} = req.query
    let sql = 'select article_like from community where ?'
    let sqlArr = {article_id}
    let callback = (err,data)=>{
        if(err){
            console.log(err)
        }else{
            //send已经发送到客户端了，之后不能在发送send给客户端
            let newData = + data[0].article_like
            let sql = `update community set article_like=${newData+1} where ?`
            let sqlArr = {article_id}
            let callback = (err)=>{
                if(err){
                    console.log(err)
                    console.log('找到需要点赞的那一行数据但是点赞失败')
                }else{
                    res.send('成功点赞')
                }
            }
            dbConfig.sqlConnect(sql,sqlArr,callback)
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}

module.exports = {
    getAllFilms,
    loginAccount,
    registerAccount,
    inputArticle,
    getArticle,
    getArticleInfo,
    checkMyArticle,
    likeArticle
}