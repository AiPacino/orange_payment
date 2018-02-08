const BusinessModel = require('./../../server/model/business_model')
const BusinessMethodModel = require('./../../server/model/business_method_model')
const BusinessFundModel = require('./../../server/model/business_fund_model')
const BusinessTradeModel = require('./../../server/model/business_trade_model')
const UserService = require('./../service/user_service')
const log = require('./../../lib/log')('business_service')

class BusinessService {

  async getByUuid(uuid){
    let result = await BusinessModel.model.findOne({
      where : {
        uuid : uuid , 
        status : 1
      }
    })

    log.info('getByUuid result ' , result)
    return result
  }

  // 获取支付配置
  async getMethodConfig(businessId , method = 'wx'){
    let result = await BusinessMethodModel.model.findOne({
      where : {
        business_id : businessId,
        method_key : method,
        status : 1
      }
    })

    log.info('getMethodConfig result ' , result)
    if(result){
      try {
        let config = JSON.parse(result.config)
        return [ config , result.common , result.rate , result.opens ]
      }catch (err){
        return [null , 1 , 0 , '']
      }
      
    }else{
      return [null , 1 , 0 , '']
    }
    // return result
  }

  // 记录资金流水
  async fundTrade(businessId , money , type = 1 , orderId = 0 , fee = 0){
    let fund = await BusinessFundModel.model.find({
      where : {
        business_id : businessId,
        status : 1
      }
    })
    let result = true

    if(fund){
      let oldMoney = fund.money
      let newMoney = oldMoney + (money * type)
      if(newMoney <= 0){
        result = false
      }else{
        fund.money = newMoney
        await fund.save()
      }
 
    }else{

      let newMoney = money * type
      if(newMoney <= 0){
        result = false
      }else {
        fund = await BusinessFundModel.model.create({
          business_id : businessId,
          money : newMoney
        })
      }

    }

    let trade = null
    if(result){
      // 记录
      trade = await BusinessTradeModel.model.create({
        business_id : businessId,
        type : (type == 1) ? 'in' : 'out',
        num : money * type,
        order_id : orderId,
        fee : fee
      })
    }
    
    fund = result ? fund : null
    return [result , fund , trade]
  }

  
}

module.exports = new BusinessService()