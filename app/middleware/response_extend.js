/**
 * response扩展中间件
 */

const moment = require('moment')
const VERSION = require('./../../config/index').version

module.exports = (req , res , next) => {

  let ua = req.headers['user-agent'].toLowerCase()
  res.locals.is_weixin = ua.match(/MicroMessenger/i) == 'micromessenger'
  res.locals.is_alipay = ua.match(/Alipay/i) == 'alipay'
  res.locals.is_mobile = ua.match(/(iphone|ipod|ipad|android)/i) ? true : false
  /**
   * 获取版本号
   */
  res.locals.version = function(){
    if (process.env.NODE_ENV == 'production'){
      return VERSION
    }else {
      return Date.now()
    }
  }

  /**
   * 返回成功数据
   */
  res.success = function(){

    let args = arguments
   
    let jsonData = {code : 0 , data : {} , message : '' , time : Date.now()}

    for (let i =0 ;i<3 ;i++){

      if (args[i] && typeof args[i] == 'string'){
        jsonData.message = args[i]
      }
  
      if (args[i] && typeof args[i] == 'object'){
        jsonData.data = args[i]
      }
  
      if (args[i] && typeof args[i] == 'number'){
        jsonData.code = args[i]
      }
    }
   
    return res.json(jsonData)
  }

  /**
   * 返回失败数据
   */
  res.error = function() {
    let args = arguments
    let jsonData = {code : 1 , data : {} , message : '' , time : Date.now()}

    for (let i =0 ;i<3 ;i++){

      if (args[i] && typeof args[i] == 'string'){
        jsonData.message = args[i]
      }
  
      if (args[i] && typeof args[i] == 'object'){
        jsonData.data = args[i]
      }
  
      if (args[i] && typeof args[i] == 'number'){
        jsonData.code = args[i]
      }
    }
    
    return res.json(jsonData)
  }

  /**
   * 常用时间戳转时间处理,记得抽出来
   * 在ejs中调用如下：
   * <?= dateFormat(voice_item.create_time)  ?>
   */
  res.locals.dateFormat = (timestamp, format) => {
    format = format || 'YYYY-MM-DD HH:mm'
    let date = null
    if (!timestamp) {
      date = new Date()
    } else {
      date = new Date(timestamp * 1000)
    }
    //logger.debug(date);
    return moment(date).format(format)
  }

  res.locals.dateDisplay = (timestamp) => {
    let now = parseInt(Date.now() / 1000)
    let long = now - timestamp
    if(long < 60){
      return long + '秒前'
    }else if (long >= 60 && long < 3600){
      return parseInt(long / 60).toString() + '分钟前'
    }else if(long >= 3600 && long < 24 * 3600){
      return parseInt(long / 3600).toString() + '小时前'
    }else if(long >= 24 * 3600 && long < 24 * 3600 * 30){
      return parseInt(long / 3600 / 24).toString() + '天前'
    }else {
      let format = 'YYYY-MM-DD HH:mm'
      let date = new Date(timestamp * 1000)
      return moment(date).format(format)
    }
  }

  next()

}