const User = require('./mg/user')
const Business = require('./mg/business')
const Order = require('./mg/order')

$(function (){

  User.init()
  Business.init()
  Order.init()

})