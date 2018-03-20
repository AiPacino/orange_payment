const { DB , FIELD_TYPE , OP} = require('./../../lib/model')

class UserModel {

  constructor(){
    // this.model = DB.define('user' , {
    //   id : {
    //     type : FIELD_TYPE.BIGINT,
    //     primaryKey: true,
    //     autoIncrement: true 
    //   },
    //   uuid: {
    //     type: FIELD_TYPE.STRING_LEN(64)
    //   },
    //   name : {
    //     type: FIELD_TYPE.STRING_LEN(128)
    //   },
    //   email : {
    //     type: FIELD_TYPE.STRING_LEN(128)
    //   },
    //   password: {
    //     type: FIELD_TYPE.STRING_LEN(128)
    //   },
    //   phone: {
    //     type: FIELD_TYPE.STRING_LEN(32)
    //   },
    //   contract : {
    //     type: FIELD_TYPE.STRING_LEN(64)
    //   },
    //   key: {
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
    //   rate_in : {
    //     type : FIELD_TYPE.DECIMAL2,
    //     defaultValue : 0
    //   },
    //   rate_out : {
    //     type : FIELD_TYPE.DECIMAL2,
    //     defaultValue : 0
    //   },
    //   notify_url : {
    //     type: FIELD_TYPE.STRING_LEN(64),
    //     defaultValue : ''
    //   },
    //   business_id : {
    //     type : FIELD_TYPE.BIGINT,
    //     defaultValue : 0
    //   }
      
    // },{
    //   timestamps: false,
    //   freezeTableName: true,
    //   tableName : 't_user'
    // })

    this.op = OP

  }

  model() {
    let model = DB.define('user', {
      id: {
        type: FIELD_TYPE.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      uuid: {
        type: FIELD_TYPE.STRING_LEN(64)
      },
      name: {
        type: FIELD_TYPE.STRING_LEN(128)
      },
      email: {
        type: FIELD_TYPE.STRING_LEN(128)
      },
      password: {
        type: FIELD_TYPE.STRING_LEN(128)
      },
      phone: {
        type: FIELD_TYPE.STRING_LEN(32)
      },
      contract: {
        type: FIELD_TYPE.STRING_LEN(64)
      },
      key: {
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
      rate_in: {
        type: FIELD_TYPE.DECIMAL2,
        defaultValue: 0
      },
      rate_out: {
        type: FIELD_TYPE.DECIMAL2,
        defaultValue: 0
      },
      notify_url: {
        type: FIELD_TYPE.STRING_LEN(64),
        defaultValue: ''
      },
      business_id: {
        type: FIELD_TYPE.BIGINT,
        defaultValue: 0
      }

    }, {
      timestamps: true,
      createdAt: 'create_time',
      updatedAt: 'update_time',
      freezeTableName: true,
      tableName: 't_user'
    })

    return model
  }

  
}

module.exports = new UserModel()