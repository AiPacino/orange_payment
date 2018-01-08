'use strict'

const redis = require('redis')

class Client {
  constructor(host , port){
    this.client = redis.createClient(port , host)
    this.client.on('error', function (err) {
        console.log('error' + err)
    })
  }

  setKey(key , value , expire = 0) {
    let that = this
    return new Promise((resolve , reject) => {
      that.client.set(key , value ,function(err) {
        
        if (err){
          reject(err)
        }else {
          if (expire){
            that.client.expire(key , expire , function(err) {
              if (err){
                reject(err)
              }else {
                resolve(true)
              }
            })
          }else {
            resolve(true)
          }
          
        }
      })
    })
    
  }

  getKey(key) {
    let that = this
    return new Promise((resolve ,reject) => {
      that.client.get(key , function(err , reply){
        if(err){
          reject(err)
        }else{
          resolve(reply)
        }
      })
    })
  }

  setHash(key , value , expire = 0) {
    let that = this
    return new Promise((resolve ,reject) => {
      
      that.client.hmset(key , value ,function(err){
        
        if (err){
          reject(err)
        }else {
          if (expire){
            that.client.expire(key , expire , function(err) {
              if (err){
                reject(err)
              }else {
                resolve(true)
              }
            })
          }else {
            resolve(true)
          }
        }
      })
    })
  }

  getHash(key){
    let that = this
    return new Promise((resolve , reject) => {
      that.client.hgetall(key , function(err , obj){
        if(err){
          reject(err)
        }else{
          resolve(obj)
        }
      })
    })
  }

  del(key){
    let that = this
    return new Promise((resolve , reject) => {
      that.client.del(key , function(err , res){
        if(err){
          reject(err)
        }else{
          resolve(res)
        }
      })
    })
  }
}


module.exports = function(host = '127.0.0.1' , port = '6379'){
  return new Client(host , port)
}