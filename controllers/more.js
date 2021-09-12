const dbConfig = require('../util/database_config.js')
const fs = require('fs')
var md5 = require('md5')//引入md5加密技术

//设置上传用户头像
setUserHeadImage=(req,res)=>{
    let userAccount = req.body.account//获取请求体中的账号参数，用于校验数据库中已有的账号
    let result = rename(req)
    // console.log(result.img_url)
    // res.json(result)
    let sql = 'update users set head_image = ? where account=?'
    let sqlArr = [result.img_url,userAccount]
    let callback = (err)=>{
        if(err){
            console.log(err)
        }else{
           let account = req.body.account
           let sql = 'select head_image from users where ?'
           let sqlArr = {account}
           let callback = (err,data)=>{
                if(err){
                    console.log(err)
                }else{
                    res.send(data)
                }
           }
           dbConfig.sqlConnect(sql,sqlArr,callback)
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}
function rename(req){
    let oldPath = req.file.destination+'/'+req.file.filename;
    let newPath = req.file.destination+'/'+req.file.filename+req.file.originalname;
    fs.rename(oldPath,newPath,()=>{
        console.log('改名成功')
    })
    return {
        state :'ok',
        img_url:req.file.filename+req.file.originalname
    }
}

//找会账号查找对应账号接口
searchAccount = (req,res)=>{
    let {account} = req.body
    let sql = 'select id from users where account=?'
    let sqlArr = [account]
    let callback = (err,data)=>{
        if(err){
            console.log(err)
            res.send('没有结果')
        }else{
            if(data==''){
                res.send('没有结果')
            }
            else{
                res.send(data)
            }
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}

//修改密码
revisePassword = (req,res)=>{
    let {password,id} = req.body
    let newPassword = md5(password)
    let sql = 'update users set password =? where id=?'
    let sqlArr = [newPassword,id]
    let callback = (err)=>{
        if(err){
            console.log(err)
        }else{
            res.send('修改成功')
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}

//统计得到的赞数
getLikeNumber = (req,res)=>{
    let {user_phone} = req.query
    let sql = 'select article_like from community where ?'
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
//修改用户信息
reviseUserMsg = (req,res)=>{
    let {email,gender,real_name,age,account} = req.body
    let sql = 'update users set email=?,gender=?,real_name=?,age=? where account=?'
    let sqlArr = [email,gender,real_name,age,account]
    let callback = (err,data)=>{
        if(err){
            console.log(err)
        }else{
            res.send(data)
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}
//添加评论
addComment = (req,res)=>{
    let {id,user_phone,user_comment,comment_like,user_nickname,comment_date}  = req.body
    let sql  = 'insert into comment set ?'
    let sqlArr = {id,user_phone,user_comment,comment_like,user_nickname,comment_date}
    let callback = (err)=>{
        if(err){
            console.log(err)
        }else{
            res.send('添加成功')
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}
//打开文章详情加载所有对应评论
getAllComment = (req,res)=>{
    let {id} = req.query
    let sql = 'select * from comment where ?'
    let sqlArr = {id}
    let callback = (err,data)=>{
        if(err){
            console.log(err)
        }else{
            console.log(id)
            res.send(data)
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}

module.exports = {
    setUserHeadImage,
    searchAccount,
    revisePassword,
    getLikeNumber,
    reviseUserMsg,
    addComment,
    getAllComment
}