'use strict'
/**
 * RPC
 */
class RPC {

  constructor(){
    this._args = {}
    this._methods = {}
    this._result = ''

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

      callback(this._args , this.response).then(() => {
        // this.result = JSON.stringify(result)
        // console.log('this.result' , this._result)
        let _cb = cb(null , this._result)
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

    Response.json = (data = {} , code = 0 , message = 'SUCCESS') => {
      this._result = JSON.stringify({data : data , code : code , message : message , time : parseInt(Date.now() / 1000 )})
      return this._result
    }

    return Response
  }

}

module.exports = new RPC()