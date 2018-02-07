const UserService = require('./user_service')
const BusinessService = require('./business_service')
const log = require('./../../lib/log')('order_service')

class OrderService {

  // 记录手续费
  async recordOrderFee(order){
  
    let orderId = order.id
    let userId = order.user_id
    let businessId = order.business_id
    let totalFee = order.total_fee
    let poundageFee = order.poundage_fee
    let serviceFee = order.service_fee
    // log.info('/recordOrderFee totalFee' , totalFee)
    // log.info('/recordOrderFee serviceFee' , serviceFee)
    // 商户需要减去入账手续费
    let userMoney = totalFee - serviceFee // 
    log.info('/recordOrderFee userMoney' , userMoney)
    let [ resultUser ] = await UserService.fundTrade(userId , userMoney , 1 , orderId , serviceFee)
    log.info('/recordOrderFee resultUser' , resultUser)
    // 资质商入账费用需要减去支付平台手续费
    let businessMoney = totalFee - poundageFee 
    let [ resultBusiness ] = await BusinessService.fundTrade(businessId , businessMoney , 1 , orderId , poundageFee)
    log.info('/recordOrderFee resultBusiness' , resultBusiness)

    return {
      userFundTrade : resultUser,
      businessFundTrade : resultBusiness
    }

  }
}

module.exports = new OrderService()