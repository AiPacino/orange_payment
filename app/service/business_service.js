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
        return config
      }catch (err){
        return null
      }
      
    }else{
      return null
    }
    // return result
  }


}

module.exports = new BusinessService()