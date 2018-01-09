'use strict'
/**
 * RPC
 * version 1.0.1
 * date create 2017/12/1
 * date update 2018/1/9
 */
class RPC {

  constructor(){
    this._args = {}
    this._methods = {}

    this.response = this._response()
  }

  /**
   * 返回所有添加的方法
   */
  methods(){
    return this._methods
  }

  /**
   * 注入方法到对象
   * @param {*} obj 
   */
  use(obj){
    return Object.assign(this._methods , obj)
  }

  /**
   * 添加方法
   * @param {*} method 
   * @param {*} callback 
   */
  add(method , callback){

    let exec = (args , cb) => {

      this._args = args

      // 1.0.1 call取得返回值,json解析
      callback(this._args).then((res) => {

        let response = this.response.json(res)
        let _cb = cb(null , response)
        return _cb

      })
 
    }

    this._methods[method] = exec

  }

  /**
   * 获取返回数据方法对象
   */
  _response(){
    let Response = {}

    // 1.0.1 匹配json字段
    Response.json = function() {

      let args = arguments
   
      let jsonData = {code : 0 , data : {} , message : '' , time : parseInt(Date.now() / 1000 )}

      for (let i =0 ;i<3 ;i++){

        if (args[i] && typeof args[i] == 'string'){
          jsonData.message = args[i]
        }
    
        if (args[i] && typeof args[i] == 'object'){
          let resultData = args[i]
          if (resultData.hasOwnProperty('code')){
            jsonData.code = resultData.code
            delete resultData.code
          }
          if (resultData.hasOwnProperty('message')){
            jsonData.message = resultData.message
            delete resultData.message
          }
          if (resultData.hasOwnProperty('data')){
            jsonData.data = resultData.data
            delete resultData.data
          }else {
            jsonData.data = resultData
          }
  
          
        }
    
        if (args[i] && typeof args[i] == 'number'){
          jsonData.code = args[i]
        }
      }

      return JSON.stringify(jsonData)
    }

    

    return Response
  }

}

module.exports = new RPC()