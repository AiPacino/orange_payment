const { DB , FIELD_TYPE} = require('./../../lib/model')

class UserModel {

  constructor(){
    this.model = DB.define('user' , {
      id : {
        type : FIELD_TYPE.BIGINT,
        primaryKey: true,
        autoIncrement: true 
      },
      uuid: {
        type: FIELD_TYPE.STRING_LEN(64)
      },
      name : {
        type: FIELD_TYPE.STRING_LEN(128)
      },
      email : {
        type: FIELD_TYPE.STRING_LEN(128)
      },
      password: {
        type: FIELD_TYPE.STRING_LEN(128)
      },
      phone: {
        type: FIELD_TYPE.STRING_LEN(32)
      },
      
      key: {
        type: FIELD_TYPE.STRING_LEN(32),
        defaultValue : ''
      },
      status : {
        type : FIELD_TYPE.BOOLEAN,
        defaultValue : 1
      },
      create_time : {
        type : FIELD_TYPE.INT,
        defaultValue : parseInt(Date.now() / 1000)
      },
      update_time : {
        type : FIELD_TYPE.INT,
        defaultValue : parseInt(Date.now() / 1000)
      },
      fee_in : {
        type : FIELD_TYPE.DECIMAL2,
        defaultValue : 0
      },
      fee_out : {
        type : FIELD_TYPE.DECIMAL2,
        defaultValue : 0
      },
      notify_url : {
        type: FIELD_TYPE.STRING_LEN(64),
        defaultValue : ''
      },
    },{
      timestamps: false,
      freezeTableName: true,
      tableName : 't_user'
    })

  }

  
}

module.exports = new UserModel()