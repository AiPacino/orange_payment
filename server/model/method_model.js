const { DB , FIELD_TYPE } = require('./../../lib/model')

class MethodModel {

  constructor(){
    this.model = DB.define('method' , {
      id : {
        type : FIELD_TYPE.BIGINT,
        primaryKey: true,
        autoIncrement: true 
      },
      name : {
        type: FIELD_TYPE.STRING_LEN(64)
      },
      key_val : {
        type: FIELD_TYPE.STRING_LEN(12)
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
      config_json : {
        type : FIELD_TYPE.TEXT
      }
    },{
      timestamps: false,
      freezeTableName: true,
      tableName : 't_method'
    })

  }

  
}

module.exports = new MethodModel()