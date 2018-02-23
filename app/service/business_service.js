const BusinessModel = require('./../../server/model/business_model')
const BusinessMethodModel = require('./../../server/model/business_method_model')
const BusinessFundModel = require('./../../server/model/business_fund_model')
const BusinessTradeModel = require('./../../server/model/business_trade_model')
const MethodModel = require('./../../server/model/method_model')
const ResultUtils = require('./../../utils/result_utils')
const UuidUtils = require('./../../utils/uuid_utils')
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

  async getById(id){
    let result = await BusinessModel.model.findById(id)
    log.info('getById result ' , result)
    return result
  }

  async getLists(map , page , size){
    let where = {}
    if(map.name){
      where.name = {[BusinessModel.op.like] : '%' + map.name + '%'}
    }
    if(map.status){
      where.status = map.status
    }

    let result = await BusinessModel.model.findAndCountAll({
      where : where ,
      offset : (page - 1) * size,
      limit : size,
      order : [ ['create_time' , 'DESC' ]]
    })

    return result
  }

  /**
   * 获取所有支付配置
   * @param {*} businessId 
   */
  async getMethods(businessId){
   
    let businessMethods = await BusinessMethodModel.model.findAll({
      where : {business_id : businessId}
    })
   
    let methods = await MethodModel.model.findAll()
    let result = []
    methods.forEach(method => {
      let item = {}
      item.name = method.name
      item.key = method.key_val
      item.config_json = JSON.parse(method.config_json)
      item.status = method.status
      item.business_method = {}

      businessMethods.forEach(businessMethod => {
        let methodKey = businessMethod.method_key
        if(methodKey == method.key_val){
          item.business_method = businessMethod.dataValues
        }
      })
      
      result.push(item)
    })
  
    return result
  }

  async setMethod(businessId , method , obj){
    let businessMethod = await BusinessMethodModel.model.findOne({
      where : {
        business_id : businessId,
        method_key : method,
      }
    })
    if(businessMethod){
      await businessMethod.update(obj)
    }else {
      businessMethod = await BusinessMethodModel.model.create(obj)
    }

    let result = ResultUtils.SUCCESS
    result.data = businessMethod
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

  /**
   * 修改信息
   * @param {*} obj 
   */
  async update(obj){

    // 检测名称和email
    let checkNameMap = { name : obj.name}
    if(obj.id){
      checkNameMap.id = {[BusinessModel.op.ne] : obj.id }
    }
    let checkNameCount = await BusinessModel.model.count({
      where : checkNameMap
    })
    log.info('update checkNameCount:' ,checkNameCount )
    if(checkNameCount > 0){
      return ResultUtils.BUSINESS_NAME_REQUIRED
    }

    let checkEmailMap = {email : obj.email}
    if(obj.id){
      checkEmailMap.id = {[BusinessModel.op.ne] : obj.id }
    }
    let checkEmailCount = await BusinessModel.model.count({
      where : checkEmailMap
    })
    log.info('update checkEmailCount:' ,checkEmailCount )
    if(checkEmailCount > 0){
      return ResultUtils.BUSINESS_EMAIL_REQUIRED
    }
    
    if(!obj.id){
      obj.uuid = UuidUtils.v4()
      let business = await BusinessModel.model.create(obj)
      let result = ResultUtils.SUCCESS
      result.data = business
      return result
    }else {
      let business = await BusinessModel.model.findById(obj.id)
      if(!business){
        return ResultUtils.BUSINESS_FIND_ERROR
      }

      await business.update(obj)
      let result = ResultUtils.SUCCESS
      result.data = business
      return result
    }

    
  }
  
}

module.exports = new BusinessService()