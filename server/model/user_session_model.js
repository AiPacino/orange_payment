const { DB , FIELD_TYPE} = require('./../../lib/model')

class UserAppModel {

  constructor(){
    this.model = DB.define('t_user_session' , {
      id : {
        type : FIELD_TYPE.BIGINT,
        primaryKey: true,
        autoIncrement: true 
      },
      session_key: {
        type: FIELD_TYPE.STRING_LEN(32)
      },
      uid : {
        type : FIELD_TYPE.BIGINT,
      },
      deadline : {
        type : FIELD_TYPE.INT
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