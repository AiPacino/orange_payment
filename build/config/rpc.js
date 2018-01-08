const path = require('path')

module.exports = {
  // host : '127.0.0.1',
  // port : '9001',
  output : [
    {'path' : path.join(__dirname , './../../app/proxy') , host: 'http://127.0.0.1:8081'},
  ],
  routers : [

    {
      method : 'demo',
      name : 'demo',
      args : ['a' , 'b']
    },
    
  ],


}