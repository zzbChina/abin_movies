const express = require('express')

const controllers = require('./controllers/controllers')
const app = express()

const bodyParser = require('body-parser')//解决接受post请求的参数
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static(__dirname+'/static'))

const loginRegisterRouter = require('./router/loginRegisterRouter')

app.get('/',controllers.getAllFilms)

app.use(loginRegisterRouter())//调用中间件得是一个函数形式

//解决跨域


app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','http://10.8.236.179:8000')
    res.header('Access-Control-Allow-Credentials','GET,POST')
    res.header()
})




// app.get('/test',controllers.test)

app.listen(8000,(err)=>{
    if(err){
        console.log('连接服务器失败')
    }else{
        console.log('连接服务器成功')
    }
})