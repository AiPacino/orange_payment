const log = require('./../../lib/log')('user_service')
const UserModel = require('./../../server/model/user_model')
const UserFundModel = require('./../../server/model/user_fund_model')
const UserTradeModel = require('./../../server/model/user_trade_model')

class UserService {

  async getInfoByUuid(uuid){
    let result = await UserModel.model.find({
      where : {uuid : uuid}
    })
    log.info('getInfoByUuid result' , result)
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
}

module.exports = new UserService()