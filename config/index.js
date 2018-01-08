const path = require('path')

let config = {
  
  version : '0.0.1',
  
  dev : true ,
  
  port : 8080 , // 监听端口

  session : {
    secret : '5e61dc2eb977626227e9d32b21b78b3b43bb2874'
  },

  mini_app : {
    app_id : 'wxb6eaa665e1c5789a' ,
    app_secret : '0d68a47bc93510f24941bfe5d1977b2b'
  },

  rpc : {
    port : 8081,
    host : '127.0.0.1',
    path : path.join(__dirname , './../server/controller')
  },

  database : {
    type : 'mysql',
    host : '59939c0a9a983.gz.cdb.myqcloud.com',
    port : 5579,
    dbname : 'orange_one',
    username: 'root',
    password: 'Lucong19890512',
    maxLimit : 10,
  },

}

let env = process.env.NODE_ENV ? process.env.NODE_ENV : ''

if (env){
  let extendsConfig = require('./' + env)
  config = Object.assign(config , extendsConfig)
}


module.exports = config