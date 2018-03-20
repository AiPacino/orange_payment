const { DB , FIELD_TYPE , OP} = require('./../../lib/model')

class BusinessModel {

  constructor(){
    // this.model = DB.define('business' , {
    //   id : {
    //     type : FIELD_TYPE.BIGINT,
    //     primaryKey: true,
    //     autoIncrement: true 
    //   },
    //   uuid: {
    //     type: FIELD_TYPE.STRING_LEN(64)
    //   },
    //   name : {
    //     type: FIELD_TYPE.STRING_LEN(255)
    //   },
    //   email : {
    //     type: FIELD_TYPE.STRING_LEN(255)
    //   },
    //   password: {
    //     type: FIELD_TYPE.STRING_LEN(255)
    //   },
    //   app_id: {
    //     type: FIELD_TYPE.STRING_LEN(32)
    //   },
    //   app_secret : {
    //     type: FIELD_TYPE.STRING_LEN(64),
    //     defaultValue : ''
    //   },
    //   sec_key: {
    //     type: FIELD_TYPE.STRING_LEN(32),
    //     defaultValue : ''
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
    //   },
    //   is_common : {
    //     type : FIELD_TYPE.BOOLEAN,
    //     defaultValue : 1
    //   }
    // },{
    //   timestamps: false,
    //   freezeTableName: true,
    //   tableName : 't_business'
    // })

    this.op = OP
  }

  model() {
    let model = DB.define('business', {
      id: {
        type: FIELD_TYPE.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      uuid: {
        type: FIELD_TYPE.STRING_LEN(64)
      },
      name: {
        type: FIELD_TYPE.STRING_LEN(255)
      },
      email: {
        type: FIELD_TYPE.STRING_LEN(255)
      },
      password: {
        type: FIELD_TYPE.STRING_LEN(255)
      },
      app_id: {
        type: FIELD_TYPE.STRING_LEN(32)
      },
      app_secret: {
        type: FIELD_TYPE.STRING_LEN(64),
        defaultValue: ''
      },
      sec_key: {
        type: FIELD_TYPE.STRING_LEN(32),
        defaultValue: ''
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
      },
      is_common: {
        type: FIELD_TYPE.BOOLEAN,
        defaultValue: 1
      }
    }, {
      timestamps: true,
      createdAt: 'create_time',
      updatedAt: 'update_time',
      freezeTableName: true,
      tableName: 't_business'
    })

    return model
  }
  
}

module.exports = new BusinessModel()