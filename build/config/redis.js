const path = require('path')

module.exports = {

  lists : [
    {method : 'userSessionKey' , key : 'session_key:${session_key}' , params : ['session_key'] , name : 'user_session_key'},
  ],
  output : [
    {path : path.join(__dirname , './../../app/proxy')},
  ]
}