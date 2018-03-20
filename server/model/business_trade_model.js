const { DB , FIELD_TYPE , OP} = require('./../../lib/model')

class BusinessTradeModel {

  constructor(){
    // this.model = DB.define('business_trade' , {
    //   id : {
    //     type : FIELD_TYPE.BIGINT,
    //     primaryKey: true,
    //     autoIncrement: true 
    //   },
    //   business_id: {
    //     type: FIELD_TYPE.BIGINT
    //   },
    //   order_id: {
    //     type: FIELD_TYPE.BIGINT,
    //     defaultValue : 0
    //   },
    //   num : {
    //     type : FIELD_TYPE.BIGINT,
    //     defaultValue : 0
    //   },
    //   type : {
    //     type : FIELD_TYPE.STRING_LEN(12),
    //     defaultValue : 'in'
    //   },
    //   create_time : {
    //     type : FIELD_TYPE.INT,
    //     defaultValue : parseInt(Date.now() / 1000)
    //   },
    //   fee : {
    //     type : FIELD_TYPE.BIGINT,
    //     defaultValue : 0
    //   }
      
    // },{
    //   timestamps: false,
    //   freezeTableName: true,
    //   tableName : 't_business_trade'
    // })
    this.op = OP
  }

  model() {
    let model = DB.define('business_trade', {
      id: {
        type: FIELD_TYPE.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      business_id: {
        type: FIELD_TYPE.BIGINT
      },
      order_id: {
        type: FIELD_TYPE.BIGINT,
        defaultValue: 0
      },
      num: {
        type: FIELD_TYPE.BIGINT,
        defaultValue: 0
      },
      type: {
        type: FIELD_TYPE.STRING_LEN(12),
        defaultValue: 'in'
      },
      create_time: {
        type: FIELD_TYPE.INT,
        defaultValue: parseInt(Date.now() / 1000)
      },
      fee: {
        type: FIELD_TYPE.BIGINT,
        defaultValue: 0
      }

    }, {
      timestamps: true,
      createdAt: 'create_time',
      updatedAt: false,
      freezeTableName: true,
      tableName: 't_business_trade'
    })

    return model

  }
}

module.exports = new BusinessTradeModel()