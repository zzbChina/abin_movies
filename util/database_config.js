const mysql = require('mysql')

module.exports = {
    config : {
        host : 'localhost',
        user : 'root',
        password : 'root',
        database : 'movies'
    },
    //连接数据库，使用mysql的连接池方式连接
    //连接池对象
    sqlConnect:function(sql,sqlArr,callBack){
        const pool = mysql.createPool(this.config)
        pool.getConnection((err,conn)=>{
            console.log('数据库连接成功')
            if(err){
                console.log('数据库连接失败')
                return 
            }
            //事件驱动
            conn.query(sql,sqlArr,callBack)
            //释放连接
            conn.release()
        })
        
    }
}

// const db = mysql.createConnection({
//     host : 'localhost',
//     user : 'root',
//     password : 'root',
// })
// db.connect((err)=>{
//     if(err){
//         console.log('连接成功')
//     }
// })

// module.exports = db