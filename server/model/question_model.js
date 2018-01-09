const { DB , FIELD_TYPE} = require('./../../lib/model')

class UserAppModel {

  constructor(){
    this.model = DB.define('t_question' , {
      id : {
        type : FIELD_TYPE.BIGINT,
        primaryKey: true,
        autoIncrement: true 
      },
      type: {
        type: FIELD_TYPE.INT_LEN(2),
        defaultValue : 1
      },
      title : {
        type: FIELD_TYPE.STRING_LEN(128)
      },
      content : {
        type: FIELD_TYPE.TEXT
      },
      uid: {
        type : FIELD_TYPE.BIGINT,
      },
      deadline : {
        type : FIELD_TYPE.INT,
        defaultValue : parseInt(Date.now() / 1000)
      },
      amount : {
        type : FIELD_TYPE.INT,
        defaultValue : parseInt(Date.now() / 1000)
      },
      status : {
        type : FIELD_TYPE.INT_LEN(2),
        defaultValue : 0
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