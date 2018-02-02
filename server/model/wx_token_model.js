const { DB , FIELD_TYPE} = require('./../../lib/model')

class WxTokenModel {

  constructor(){
    this.model = DB.define('wx_token' , {
      id : {
        type : FIELD_TYPE.BIGINT,
        primaryKey: true,
        autoIncrement: true 
      },
      app_id: {
        type: FIELD_TYPE.STRING_LEN(32)
      },
      access_token: {
        type: FIELD_TYPE.STRING,
        defaultValue : ''
      },
      access_token_deadline: {
        type: FIELD_TYPE.INT,
        defaultValue : 0
      },
      jsapi_ticket: {
        type: FIELD_TYPE.STRING,
        defaultValue : ''
      },
      jsapi_ticket_deadline: {
        type: FIELD_TYPE.INT,
        defaultValue : 0
      },
    },{
      timestamps: false,
      freezeTableName: true,
      tableName : 't_wx_token'
    })

  }

  
}

module.exports = new WxTokenModel()