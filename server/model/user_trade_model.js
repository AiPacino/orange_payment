const { DB , FIELD_TYPE} = require('./../../lib/model')

class UserTradeModel {

  constructor(){
    this.model = DB.define('user_trade' , {
      id : {
        type : FIELD_TYPE.BIGINT,
        primaryKey: true,
        autoIncrement: true 
      },
      user_id: {
        type: FIELD_TYPE.BIGINT
      },
      order_id: {
        type: FIELD_TYPE.BIGINT,
        defaultValue : 0
      },
      num : {
        type : FIELD_TYPE.BIGINT,
        defaultValue : 0
      },
      type : {
        type : FIELD_TYPE.STRING_LEN(12),
        defaultValue : 'in'
      },
      create_time : {
        type : FIELD_TYPE.INT,
        defaultValue : parseInt(Date.now() / 1000)
      }
      
    },{
      timestamps: false,
      freezeTableName: true,
      tableName : 't_user_trade'
    })

  }

  
}

module.exports = new UserTradeModel()