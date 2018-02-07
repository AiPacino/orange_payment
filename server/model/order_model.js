const { DB , FIELD_TYPE} = require('./../../lib/model')

class OrderModel {

  constructor(){
    this.model = DB.define('order' , {
      id : {
        type : FIELD_TYPE.BIGINT,
        primaryKey: true,
        autoIncrement: true 
      },
      uuid: {
        type: FIELD_TYPE.STRING_LEN(32)
      },
      user_id : {
        type: FIELD_TYPE.BIGINT,
      },
      app_id : {
        type: FIELD_TYPE.STRING_LEN(32)
      },
      business_id : {
        type: FIELD_TYPE.BIGINT,
      },
      business_uuid : {
        type: FIELD_TYPE.STRING_LEN(32)
      },
      order_no: {
        type: FIELD_TYPE.STRING_LEN(32)
      },
      out_trade_no: {
        type: FIELD_TYPE.STRING_LEN(32)
      },
      body : {
        type : FIELD_TYPE.STRING_LEN(128)
      },
      detail: {
        type: FIELD_TYPE.STRING_LEN(1000),
        defaultValue : ''
      },
      total_fee: {
        type: FIELD_TYPE.BIGINT,
      },
      redirect_url: {
        type: FIELD_TYPE.STRING_LEN(255),
        defaultValue : ''
      },
      extend_str: {
        type: FIELD_TYPE.TEXT,
        defaultValue : ''
      },
      method: {
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
      payment_type: {
        type: FIELD_TYPE.STRING_LEN(24),
        defaultValue : ''
      },
      payment_info: {
        type: FIELD_TYPE.TEXT,
        defaultValue : ''
      },
      payment_user : {
        type: FIELD_TYPE.STRING_LEN(32),
        defaultValue : ''
      },
      unifiedorder_info: {
        type: FIELD_TYPE.TEXT,
        defaultValue : ''
      },
    },{
      timestamps: false,
      freezeTableName: true,
      tableName : 't_order'
    })

  }

  
}

module.exports = new OrderModel()