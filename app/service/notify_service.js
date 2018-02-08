const log = require('./../../lib/log')('notify_service')
const UserModel = require('./../../server/model/user_model')
const HttpUtils = require('./../../utils/http_utils')

class  NofifyService {

  async toUser(orderObj){

    let userId = await orderObj.user_id
    let user = await UserModel.model.findById(userId)
    let notifyUrl = user.notify_url
    
    log.info('/notifyUser notifyUrl' , notifyUrl)

    let notifyObj = {
      result_code : orderObj.status == 0 ? 'SUCCESS' : 'FAIL',
      method : orderObj.method,
      app_id : orderObj.app_id,
      out_trade_no : orderObj.out_trade_no,
      out_order_no : orderObj.order_no,
      body : orderObj.body,
      detail : orderObj.detail,
      total_fee : orderObj.total_fee,
      redirect_url :orderObj.redirect_url,
      payment_type : orderObj.payment_type,
      payment_user : orderObj.payment_user || '' ,
      payment_info : orderObj.payment_info || ''
    }
  
    let result = 'fail'
    try {
      result = await HttpUtils.post(notifyUrl , notifyObj)
      log.info('/notifyUser result' , result )
    }catch (err){
      log.info('/notifyUser err' , err)
    }

    return result
  }
}

module.exports = new NofifyService()