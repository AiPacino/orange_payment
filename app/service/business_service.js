const BusinessModel = require('./../../server/model/business_model')
const BusinessMethodModel = require('./../../server/model/business_method_model')
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
        return [ config , result.common ]
      }catch (err){
        return [null , null]
      }
      
    }else{
      return [null , null]
    }
    // return result
  }


}

module.exports = new BusinessService()