const { DB, FIELD_TYPE, OP } = require('./../../lib/model')

class UserModel {

  constructor() {
    this.op = OP
  }

  model(){
    let model = DB.define('test', {
      id: {
        type: FIELD_TYPE.BIGINT,
        primaryKey: true,
        autoIncrement: true
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
      tableName: 't_test'
    })

    return model
  }

}

module.exports = new UserModel()