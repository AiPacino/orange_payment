const { DB , FIELD_TYPE} = require('./../../lib/model')

class UserAppModel {

  constructor(){
    this.model = DB.define('t_user' , {
      id : {
        type : FIELD_TYPE.BIGINT,
        primaryKey: true,
        autoIncrement: true 
      },
      nick_name: {
        type: FIELD_TYPE.STRING_LEN(64)
      },
      real_name : {
        type: FIELD_TYPE.STRING_LEN(64)
      },
      phone : {
        type: FIELD_TYPE.STRING_LEN(16)
      },
      openid: {
        type: FIELD_TYPE.STRING_LEN(32)
      },
      avatar_url: {
        type: FIELD_TYPE.STRING
      },
      gender : {
        type : FIELD_TYPE.STRING_LEN(2),
        defaultValue : 0
      },
      province: {
        type: FIELD_TYPE.STRING_LEN(64)
      },
      city: {
        type: FIELD_TYPE.STRING_LEN(64)
      },
      country: {
        type: FIELD_TYPE.STRING_LEN(64)
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
      }
    },{
      timestamps: false,
      freezeTableName: true
    })
  }

}

module.exports = new UserAppModel()