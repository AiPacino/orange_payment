const log = require('./../../lib/log')('weixin_service')
const RESULT_UTILS = require('./../../utils/result_utils')
const WxPaySdk = require('./../../sdk/wechat/wx_pay')
const WxPubSdk = require('./../../sdk/wechat/wx_pub')
const WxJssdk = require('./../../sdk/wechat/wx_jssdk')
const OrderModel = require('./../../server/model/order_model')
const OrderService = require('./order_service')
const PaymentService = require('./payment_service')
const BusinessMethodModel = require('./../../server/model/business_method_model')
const WxTokenModel = require('./../../server/model/wx_token_model')
const XmlUtils = require('./../../utils/xml_utils')

class WeixinService {

  // 微信支付下单
  async unifiedOrder(order , opt , isCommon = 1){

    let wxPayOpt = {}
    wxPayOpt.app_id = opt.app_id
    wxPayOpt.mch_id = opt.mch_id
    wxPayOpt.notify_url = 'http://pay.cc512.com/api/notify/wxpay'
    wxPayOpt.key = opt.key
    
    // h5支付需要wap地址
    wxPayOpt.h5_url = 'http://pay.cc512.com'
    
    let WxPay = new WxPaySdk(wxPayOpt , isCommon)
    let body = order.body
    let out_trade_no = order.order_no // 用平台生成的 ，不用第三方的
    let total_fee = order.total_fee
    let ip = order.ip
    let openid = order.payment_user
    let payment_type = order.payment_type
    
    let unifiedOrderResult = await WxPay.unifiedOrder(body , out_trade_no , total_fee , ip , openid , payment_type)
    
    // 保存数据
    log.info('unifiedOrder result' , unifiedOrderResult)
    let result = {code : 0 , message : '' , data : {}}

    if(unifiedOrderResult.return_code == 'SUCCESS'){
      if(unifiedOrderResult.result_code == 'SUCCESS'){
        result.message = unifiedOrderResult.return_msg
        result.data = unifiedOrderResult
        result.data.order_no = order.order_no
      }else{
        result.code = RESULT_UTILS.PAYMENT_UNIFIED_ORDER_WX_FAIL.code
        result.message = unifiedOrderResult.err_code_des
        result.data = unifiedOrderResult
      }
    
    }else {
      result.code = RESULT_UTILS.PAYMENT_UNIFIED_ORDER_WX_FAIL.code
      result.message = unifiedOrderResult.return_msg
      result.data = unifiedOrderResult

    }

    this._saveUnifiedOrderResult(order.order_no , result)
    return result
  }

  /**
   * 保存订单数据
   * @param {*} orderNo 
   * @param {*} unifiedOrderResult 
   */
  async _saveUnifiedOrderResult(orderNo , unifiedOrderResult){
    let order = await OrderModel.model.findOne({
      where : { order_no : orderNo}
    })
    if(order){
      order.unifiedorder_info = JSON.stringify(unifiedOrderResult)
      order.save()
    }
    
    return
  }

  /**
   * 接收通知处理订单 
   */
  async notifyDealOrder(xmlData){
    let notifyObj = await XmlUtils.toObj(xmlData)

    // test data
    // let notifyObj = '{"appid":"wx9070c69e2b42f307","bank_type":"CFT","cash_fee":"1","device_info":"WEB","fee_type":"CNY","is_subscribe":"Y","mch_id":"1488745772","nonce_str":"206bfdf125df48b68d5fc50da469cd99","openid":"oLOGI0lDCn1OH19JzDkzItpmPsaU","out_trade_no":"4e8f92f6e3ac4e198f04eaae2bacf5b7","result_code":"SUCCESS","return_code":"SUCCESS","time_end":"20180208183839","total_fee":"1","trade_type":"NATIVE","transaction_id":"4200000062201802089498574084"}'
    // notifyObj = JSON.parse(notifyObj)

    log.info('notifyDealOrder notifyObj' , notifyObj)
    let orderNo = notifyObj.out_trade_no || null
    let resultCode = notifyObj.result_code || null
    // if(resultCode != 'SUCCESS' || !orderNo){
    //   return 'FAIL'
    // }
    
    if(orderNo){

      // 找到订单信息 商户信息
      let order = await OrderModel.model.findOne({
        where : {
          order_no : orderNo
        }
      })
      log.info('notifyDealOrder order' , order)
      let businessMethod = await BusinessMethodModel.model.findOne({
        where : {
          business_id : order.business_id,
          method_key : order.method,
          status : 1
        }
      })
      if(!businessMethod){
        log.info('notifyDealOrder config error')
        return 'FAIL:config error'
      }
      log.info('notifyDealOrderbusiness method' , businessMethod)

      // 找到商户配置 然后验证
      let methodConfig = JSON.parse(businessMethod.config)
      let isCommon = businessMethod.common
      log.info('notifyDealOrder business common' , isCommon)

      let signData = notifyObj.sign
      let WxPay = new WxPaySdk(methodConfig , isCommon)
      let signObj = notifyObj
      delete signObj.sign
      let signed = WxPay._sign(signObj)
      log.info('notifyDealOrder notify sign data' , signData)
      log.info('notifyDealOrder notify signed ' , signed)
      if(signData != signed){
        // return 'FAIL:sign error'
      }

      
      if(resultCode == 'SUCCESS'){

        // 修改订单信息 
        order.status = 0
        order.payment_info = JSON.stringify(notifyObj)
        if(notifyObj.openid){
          order.payment_user = notifyObj.openid
        }
        order.save()

        // 记录流水
        OrderService.recordOrderFee(order.dataValues).then(resOrderRecodeFee => {
          log.info('notifyDealOrder resOrderRecodeFee' , resOrderRecodeFee)
        })

        // 通知商户
        try {
          PaymentService.notifyUser(order).then(() => {
            log.info('notifyDealOrder res success')
          })
        }catch (err) {
          log.info('notifyDealOrder err:' , err)
        }
        
        // try {
        //   PaymentService.notifyUser(order).then(() => {
        //     log.info('notifyDealOrder resultNotify:')
        //   }).catch(err => {
        //     log.info('notifyDealOrder error:' , err)
        //   })
        // }catch (err) {
        //   log.info('notifyDealOrder err:' , err)
        // }

      }else{
        order.payment_info = JSON.stringify(notifyObj)
        order.save()

        return 'FAIL'
      }
      
      
    }else{
      log.info('notifyDealOrder return fail no order_no')
      return 'FAIL'
    }
    
    log.info('notifyDealOrder return success')
    return 'success'
  }

  /**
   * jssdk初始化
   * @param {*} opt 
   * @param {*} url 
   */
  async jssdkInit(opt , url){

    let jsapiTicket = await this.getJsapiTicket(opt)
    log.info('jssdkInit jsapiTicket ' ,jsapiTicket)
    let WxJsSdk = new WxJssdk(opt)
    let jssdkInitObj = WxJsSdk.getJssdkInit(jsapiTicket , url)
    log.info('jssdkInit jssdkInitObj' , jssdkInitObj)
    return jssdkInitObj
  }

  /**
   * 微信pay初始化
   * @param {*} opt 
   * @param {*} prepayId 
   */
  wxPayJsInit(opt , prepayId){
    let WxJsSdk = new WxJssdk(opt)
    let wxPayInitObj = WxJsSdk.getWxPayInit(prepayId)
    log.info('wxPayJsInit wxPayInitObj' , wxPayInitObj)
    return wxPayInitObj
  }

  async getAccessToken(opt , wxToken = null){
    let appId = opt.app_id
    if(!wxToken){
      wxToken = await WxTokenModel.model.findOne({
        where : {app_id : appId}
      })
    }

    let nowTime = parseInt(Date.now() / 1000)
    let deadLine = nowTime + 7200 - 100 // 过期时间
    if(wxToken){
      let accessToken = wxToken.access_token
      let accessTokenDeadline = wxToken.access_token_deadline
      if(accessToken && accessTokenDeadline > nowTime){
        log.info('getAccessToken result 1 ' , accessToken)
        return accessToken
      }
    }

    let wxPub = new WxPubSdk(opt)
    let accessTokenReturn = await wxPub.getAccessToken()
    log.info('accessTokenReturn' , accessTokenReturn)
    if (!accessTokenReturn){
      return null
    }

    if(wxToken){
      wxToken.access_token = accessTokenReturn.access_token
      wxToken.access_token_deadline = deadLine
      await wxToken.save()
    }else{
      await WxTokenModel.model.create(
        {
          app_id : appId,
          access_token : accessTokenReturn.access_token,
          access_token_deadline : deadLine
        }
      )
    }

    log.info('getAccessToken result 2 ' , accessTokenReturn.access_token)
    return accessTokenReturn.access_token

  }

  async getJsapiTicket(opt){
    let appId = opt.app_id
    let wxToken = await WxTokenModel.model.findOne({
      where : {app_id : appId}
    })

    let nowTime = parseInt(Date.now() / 1000)
    let deadLine = nowTime + 7200 - 100 // 过期时间
    
    if(wxToken){
      let jsapiTicket = wxToken.jsapi_ticket
      let jsapiTicketDeadline = wxToken.jsapi_ticket_deadline
      if(jsapiTicket && jsapiTicketDeadline >nowTime){
        log.info('getJsapiTicket result 1', jsapiTicket)
        return jsapiTicket
      }
    }

    let accessToken = await this.getAccessToken(opt , wxToken)
    let wxPub = new WxPubSdk(opt)
    let jsapiTicketResult = await wxPub.getJsapiTicket(accessToken)
    if(!jsapiTicketResult){
      return null
    }

    wxToken = await WxTokenModel.model.findOne({
      where : {app_id : appId}
    })

    if(wxToken){
      wxToken.jsapi_ticket = jsapiTicketResult.ticket
      wxToken.jsapi_ticket_deadline = deadLine
      await wxToken.save()
    }else{
      await WxTokenModel.model.create(
        {
          app_id : appId,
          jsapi_ticket : jsapiTicketResult.ticket,
          jsapi_ticket_deadline : deadLine
        }
      )
    }

    log.info('getJsapiTicket result 2', jsapiTicketResult.ticket)
    return jsapiTicketResult.ticket

  }

}

module.exports = new WeixinService()