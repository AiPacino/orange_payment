
const OrderModel = require('./../../server/model/order_model')
const WeixinService = require('./../service/weixin_service')
const Uuid = require('./../../utils/uuid_utils')
const RESULT_UTILS = require('./../../utils/result_utils')
const log = require('./../../lib/log')('payment_service')

class PaymentService {

  async createOrder(orderObj){

    let orderUuid = Uuid.v4()
    orderObj.uuid = orderUuid
    orderObj.order_no = orderUuid

    log.info('createORder orderObj' , orderObj)

    let orderFind = await OrderModel.model.findOne({
      where : {
        business_id : orderObj.business_id,
        out_trade_no : orderObj.out_trade_no
      }
    })
    log.info('createOrder orderFind' , orderFind)

    let resultData = {}
    if(orderFind){
      let status = orderFind.status
      if(status == 0){
        return RESULT_UTILS.ORDER_STATUS_0
      }else {
        resultData = orderFind
      }
    }else{

      let order = await OrderModel.model.create(orderObj)
      log.info('createOrder order' , order)
      resultData = order
    }

    let result = RESULT_UTILS.SUCCESS
    result.data = {
      business_id : resultData.business_uuid,
      order_no : resultData.order_no,
      out_trade_no : resultData.out_trade_no,
      body : resultData.body,
      detail : resultData.detail,
      total_fee :resultData.total_fee,
      redirect_url : resultData.redirect_url,
      payment_type : resultData.payment_type,
      method :resultData.method
    }
    return result
  }

  async unifiedOrder(orderObj , opt = {}){
    
    let result = null
    let method = orderObj.method
    if(method == 'wx'){
      result = await WeixinService.unifiedOrder(orderObj , opt)
    }

    return result
  }
}

module.exports = new PaymentService()