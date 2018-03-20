const { DB , FIELD_TYPE , OP} = require('./../../lib/model')

class BusinessFundModel {

  constructor(){
    // this.model = DB.define('business_fund' , {
    //   id : {
    //     type : FIELD_TYPE.BIGINT,
    //     primaryKey: true,
    //     autoIncrement: true 
    //   },
    //   business_id: {
    //     type: FIELD_TYPE.BIGINT
    //   },
    //   money: {
    //     type: FIELD_TYPE.BIGINT,
    //     defaultValue : 0
    //   },
    //   status : {
    //     type : FIELD_TYPE.BOOLEAN,
    //     defaultValue : 1
    //   },
    //   create_time : {
    //     type : FIELD_TYPE.INT,
    //     defaultValue : parseInt(Date.now() / 1000)
    //   },
    //   update_time : {
    //     type : FIELD_TYPE.INT,
    //     defaultValue : parseInt(Date.now() / 1000)
    //   }
    // },{
    //   timestamps: false,
    //   freezeTableName: true,
    //   tableName : 't_business_fund'
    // })

    this.op = OP
  }

  model() {
    let model = DB.define('business_fund', {
      id: {
        type: FIELD_TYPE.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      business_id: {
        type: FIELD_TYPE.BIGINT
      },
      money: {
        type: FIELD_TYPE.BIGINT,
        defaultValue: 0
      },
      status: {
        type: FIELD_TYPE.BOOLEAN,
        defaultValue: 1
      },
      create_time: {
        type: FIELD_TYPE.INT,
        defaultValue: parseInt(Date.now() / 1000)
      },
      update_time: {
        type: FIELD_TYPE.INT,
        defaultValue: parseInt(Date.now() / 1000)
      }
    }, {
      timestamps: true,
      createdAt: 'create_time',
      updatedAt: 'update_time',
      freezeTableName: true,
      tableName: 't_business_fund'
    })

    return model
  }
}

module.exports = new BusinessFundModel()