const log = require('./../../lib/log')('user_service')
const UserModel = require('./../../server/model/user_model')
const UserFundModel = require('./../../server/model/user_fund_model')
const UserTradeModel = require('./../../server/model/user_trade_model')
const CryptoUtils = require('./../../utils/crypto_utils')
const UuidUtils = require('./../../utils/uuid_utils')
const ResultUtils = require('./../../utils/result_utils')

class UserService {

  async getInfoById(id){
    let result = await UserModel.model.findById(id)
    log.info('getInfoByid result' , result)
    return result
  }

  async getInfoByUuid(uuid){
    let result = await UserModel.model.find({
      where : {uuid : uuid}
    })
    log.info('getInfoByUuid result' , result)
    return result
  }

  // 获取商户列表
  async getLists(map , page , size){
    let where = {}
    if(map.name){
      where.name = {[UserModel.op.like] : '%' + map.name + '%'}
    }
    if(map.status){
      where.status = map.status
    }

    let result = await UserModel.model.findAndCountAll({
      where : where ,
      offset : (page - 1) * size,
      limit : size,
      order : [ ['create_time' , 'DESC' ]]
    })

    return result
  }

  // 记录资金流水
  async fundTrade(userId , money , type = 1 , orderId = 0 , fee = 0){
    let userFund = await UserFundModel.model.find({
      where : {
        user_id : userId,
        status : 1
      }
    })
    let result = true

    if(userFund){
      let oldMoney = userFund.money
      let newMoney = oldMoney + (money * type)
      if(newMoney <= 0){
        result = false
      }else{
        userFund.money = newMoney
        await userFund.save()
      }
 
    }else{

      let newMoney = money * type
      if(newMoney <= 0){
        result = false
      }else {
        userFund = await UserFundModel.model.create({
          user_id : userId,
          money : newMoney
        })
      }

    }

    let userTrade = null
    if(result){
      // 记录
      userTrade = await UserTradeModel.model.create({
        user_id : userId,
        type : (type == 1) ? 'in' : 'out',
        num : money * type,
        order_id : orderId,
        fee : fee
      })
    }
    
    userFund = result ? userFund : null
    return [result , userFund , userTrade]
  }

  // test sign
  async paySign(obj){
    let user = await this.getInfoByUuid(obj.app_id)
    let key = user.key

    let sign = CryptoUtils.md5ByKey(obj , key)
    return sign

  }

  // 加入
  async join(obj) {
    let userObj = {}
    // userObj.uuid = UuidUtils.v4()
    userObj.name = obj.name
    userObj.email = obj.email
    userObj.contract = obj.contract
    userObj.phone = obj.phone
    userObj.status = 0
    userObj.uuid = 'or' + UuidUtils.random(16) // appId
    userObj.key = UuidUtils.v4()
    userObj.password = CryptoUtils.md5(obj.phone)
    log.info('join userObj' , userObj)

    // 检查邮箱
    let checkEmail = await UserModel.model.count({
      where : {email : obj.email}
    })
    if(checkEmail > 0){
      return ResultUtils.USER_EMAIL_REQUIRED
    }

    // 检查名称
    let checkName = await UserModel.model.count({
      where : {name : obj.name}
    })
    if(checkName > 0){
      return ResultUtils.USER_NAME_REQUIRED
    }

    let user = await UserModel.model.create(userObj)
    log.info('join user' , user)
    let result = ResultUtils.SUCCESS
    result.data = user
    return result
  }

  // 登录
  async login(obj){
    log.info('login obj' , obj)
    let checkUser = await UserModel.model.findOne({
      where : {
        email : obj.email,
        password : CryptoUtils.md5(obj.password)
      }
    })

    log.info('login user' , checkUser)
    if(checkUser){
      let result = ResultUtils.SUCCESS
      result.data = {user_id : checkUser.id}
      return result
    }else{
      let result = ResultUtils.FAIL
      return result
    }
  }

  // 交易记录
  async tradeLogList(userId , map = {} , page = 1 , size = 10){
    map.user_id = userId

    let result = await UserTradeModel.model.findAndCountAll({
      where : map ,
      offset : (page - 1) * size,
      limit : size,
      order : [['create_time' , 'DESC']]
    })

    log.info('/logList result' , result)
    return result
  }

  // 获取商户资产
  async getUserFund(userId){
    let result = await UserFundModel.model.findOne({
      where : {user_id : userId}
    })
    return result ? result.money : 0
  }

  // 设置状态
  async setStatus(userId , status){
    let user = await UserModel.model.findById(userId)
    if(user){
      user.status = status
      user.save()

      return ResultUtils.SUCCESS
    }else{
      return ResultUtils.USER_FIND_ERROR
    }
  }

  // 设置费率
  async setRate(userId , inNum , outNum){
    let user = await UserModel.model.findById(userId)
    if(user){
      user.rate_in = inNum
      user.rate_out = outNum
      user.save()

      return ResultUtils.SUCCESS
    }else{
      return ResultUtils.USER_FIND_ERROR
    }
  }

}

module.exports = new UserService()