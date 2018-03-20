const { DB , FIELD_TYPE , OP} = require('./../../lib/model')

class BusinessMethodModel {

  constructor(){
    // this.model = DB.define('business_method' , {
    //   id : {
    //     type : FIELD_TYPE.BIGINT,
    //     primaryKey: true,
    //     autoIncrement: true 
    //   },
    //   business_id: {
    //     type : FIELD_TYPE.BIGINT,
    //   },
    //   method_key : {
    //     type: FIELD_TYPE.STRING_LEN(12)
    //   },
    //   config : {
    //     type: FIELD_TYPE.TEXT
    //   },
    //   status : {
    //     type : FIELD_TYPE.BOOLEAN,
    //     defaultValue : 1
    //   },
    //   active : {
    //     type : FIELD_TYPE.BOOLEAN,
    //     defaultValue : 0
    //   },
    //   common : {
    //     type : FIELD_TYPE.BOOLEAN,
    //     defaultValue : 1
    //   },
    //   rate : {
    //     type : FIELD_TYPE.DECIMAL2,
    //     defaultValue : 0
    //   },
    //   remark : {
    //     type : FIELD_TYPE.STRING_LEN(64),
    //     defaultValue : ''
    //   },
    //   opens : {
    //     type : FIELD_TYPE.STRING,
    //     defaultValue : ''
    //   }
    //   // create_time : {
    //   //   type : FIELD_TYPE.INT,
    //   //   defaultValue : parseInt(Date.now() / 1000)
    //   // },
    //   // update_time : {
    //   //   type : FIELD_TYPE.INT,
    //   //   defaultValue : parseInt(Date.now() / 1000)
    //   // }
    // },{
    //   timestamps: false,
    //   freezeTableName: true,
    //   tableName : 't_business_method'
    // })

    this.op = OP
  }

  model() {
    let model = DB.define('business_method', {
      id: {
        type: FIELD_TYPE.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      business_id: {
        type: FIELD_TYPE.BIGINT,
      },
      method_key: {
        type: FIELD_TYPE.STRING_LEN(12)
      },
      config: {
        type: FIELD_TYPE.TEXT
      },
      status: {
        type: FIELD_TYPE.BOOLEAN,
        defaultValue: 1
      },
      active: {
        type: FIELD_TYPE.BOOLEAN,
        defaultValue: 0
      },
      common: {
        type: FIELD_TYPE.BOOLEAN,
        defaultValue: 1
      },
      rate: {
        type: FIELD_TYPE.DECIMAL2,
        defaultValue: 0
      },
      remark: {
        type: FIELD_TYPE.STRING_LEN(64),
        defaultValue: ''
      },
      opens: {
        type: FIELD_TYPE.STRING,
        defaultValue: ''
      }
      // create_time : {
      //   type : FIELD_TYPE.INT,
      //   defaultValue : parseInt(Date.now() / 1000)
      // },
      // update_time : {
      //   type : FIELD_TYPE.INT,
      //   defaultValue : parseInt(Date.now() / 1000)
      // }
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 't_business_method'
    })

    return model
  }

  
}

module.exports = new BusinessMethodModel()