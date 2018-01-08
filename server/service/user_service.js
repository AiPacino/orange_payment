const UuidUtils = require('./../../utils/uuid_utils')
const UserSessionModel = require('./../model/user_session_model')
const log = require('./../../lib/log')('server-service-user')

class UserService {

  // 获取sessionKey
  async getSessionKeyByUid(uid){

    let data = await UserSessionModel.model.findOne({
      uid : uid
    })
    if(data && data.deadline > parseInt(Date.now() / 1000)){
      // 没有过期
      return data
    }else {
      let sessionKey = UuidUtils.v4()
      log.info('getSessionKeyByUid sessionKey' , sessionKey)
      if (!data){
        // 添加
        data = await UserSessionModel.model.create({
          uid : uid ,
          session_key : sessionKey,
          deadline : parseInt(Date.now() / 1000) + 7200
        })
        return data
      }else {
        data.session_key = sessionKey
        data.deadline = parseInt(Date.now() / 1000) + 7200
        let update = await data.save()
        return update
      }
    }
  }

  
}

module.exports = new UserService()