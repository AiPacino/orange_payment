const Client = require('./redisClient')
let client = Client()

let userSessionKeyGet = (session_key) => {

  let key = `session_key:${session_key}`
  let res = client.getKey(key)
  return res
}
exports.userSessionKeyGet = userSessionKeyGet

let userSessionKeyDel = (session_key) => {

  let key = `session_key:${session_key}`
  let res = client.del(key)
  return res
}
exports.userSessionKeyDel = userSessionKeyDel

let userSessionKeySet = (session_key,value,expire = 0) => {

  let key = `session_key:${session_key}`
  let res = client.setKey(key , value , expire)
  return res
}
exports.userSessionKeySet = userSessionKeySet

