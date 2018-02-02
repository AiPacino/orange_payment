module.exports = {
  SUCCESS : {
    code : 0,
    message : 'success',
    data : {}
  },
  FAIL : {
    code : 1,
    message : 'error',
    data : {}
  },

  BUSINESS_FIND_ERROR : {
    code : 10001,
    message : '商户未找到',
    data : {}
  },

  BUSINESS_PAY_CONFIG_ERROR : {
    code : 10002,
    message : '商户支付配置信息错误',
    data : {}
  },

  ORDER_STATUS_0 :{
    code : 20001,
    message : '订单已支付',
    data : {}
  },

  PAYMENT_UNIFIED_ORDER_WX_FAIL : {
    code : 30001,
    message : '微信支付下单失败',
  }
  
}