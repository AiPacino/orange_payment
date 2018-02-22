module.exports = {
  SUCCESS : {
    code : 0,
    message : 'success',
    data : {}
  },
  FAIL : {
    code : 1,
    message : 'error'
  },

  USER_EMAIL_REQUIRED : {
    code : 8001,
    message : '商户邮箱存在'
  },
  USER_NAME_REQUIRED : {
    code : 8002,
    message : '商户名重复'
  },
  USER_FIND_ERROR : {
    code : 8010,
    message : '商户未找到'
  },

  BUSINESS_FIND_ERROR : {
    code : 10001,
    message : '资质商账户未找到'
  },

  BUSINESS_PAY_CONFIG_ERROR : {
    code : 10002,
    message : '支付配置信息错误'
  },

  BUSINESS_PAY_OPENS_NOT_MATCH : {
    code : 10003,
    message : '支付权限不匹配'
  },

  ORDER_STATUS_0 :{
    code : 20001,
    message : '订单已支付'
  },


  PAYMENT_UNIFIED_ORDER_WX_FAIL : {
    code : 30001,
    message : '微信支付下单失败',
  },

  PAYMENT_UNIFIED_ORDER_ALIPAY_FAIL : {
    code : 30002,
    message : '支付宝支付下单失败',
  },

  PAYMENT_UNIFIED_ORDER_TYPE_ERR: {
    code : 30101,
    message : '不支持的下单类型',
  },

  PAYMENT_UNIFIED_CHCEK_SIGN : {
    code : 30200,
    message : '签名错误',
  },

  PAYMENT_UNIFIED_CHCEK_USER : {
    code : 30201,
    message : '商户信息错误或被禁用',
  },

  PAYMENT_UNIFIED_CHCEK_METHOD : {
    code : 30202,
    message : '不支持的支付方式',
  },

  PAYMENT_UNIFIED_CHCEK_PAYMENT_TYPE : {
    code : 30203,
    message : '不支持的支付类型',
  },

  PAYMENT_UNIFIED_CHCEK_BODY : {
    code : 30204,
    message : '请求body字段非法',
  },

  PAYMENT_UNIFIED_TOTAL_FEE : {
    code : 30205,
    message : '请求total_fee字段非法',
  },

  PAYMENT_UNIFIED_REDIRECT_URL : {
    code : 30206,
    message : '请求redirect_url字段非法',
  },

  PAYMENT_UNIFIED_OUT_TRADE_NO : {
    code : 30207,
    message : '请求out_trade_no字段非法',
  }
  
}