const { DB , FIELD_TYPE , OP} = require('./../../lib/model')
const UserModel = require('./../model/user_model')
const BusinessModel = require('./../model/business_model')

class OrderModel {

  constructor(){
    // this.model = DB.define('order' , {
    //   id : {
    //     type : FIELD_TYPE.BIGINT,
    //     primaryKey: true,
    //     autoIncrement: true 
    //   },
    //   uuid: {
    //     type: FIELD_TYPE.STRING_LEN(32)
    //   },
    //   user_id : {
    //     type: FIELD_TYPE.BIGINT,
    //   },
    //   app_id : {
    //     type: FIELD_TYPE.STRING_LEN(32)
    //   },
    //   business_id : {
    //     type: FIELD_TYPE.BIGINT,
    //   },
    //   business_uuid : {
    //     type: FIELD_TYPE.STRING_LEN(32)
    //   },
    //   order_no: {
    //     type: FIELD_TYPE.STRING_LEN(32)
    //   },
    //   out_trade_no: {
    //     type: FIELD_TYPE.STRING_LEN(32)
    //   },
    //   body : {
    //     type : FIELD_TYPE.STRING_LEN(128)
    //   },
    //   detail: {
    //     type: FIELD_TYPE.STRING_LEN(1000),
    //     defaultValue : ''
    //   },
    //   total_fee: {
    //     type: FIELD_TYPE.BIGINT,
    //   },
    //   redirect_url: {
    //     type: FIELD_TYPE.STRING_LEN(255),
    //     defaultValue : ''
    //   },
    //   extend_str: {
    //     type: FIELD_TYPE.TEXT,
    //     defaultValue : ''
    //   },
    //   method: {
    //     type: FIELD_TYPE.STRING_LEN(12)
    //   },
    //   status : {
    //     type : FIELD_TYPE.INT_LEN(2),
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
    //   payment_type: {
    //     type: FIELD_TYPE.STRING_LEN(24),
    //     defaultValue : ''
    //   },
    //   payment_info: {
    //     type: FIELD_TYPE.TEXT,
    //     defaultValue : ''
    //   },
    //   payment_user : {
    //     type: FIELD_TYPE.STRING_LEN(32),
    //     defaultValue : ''
    //   },
    //   unifiedorder_info: {
    //     type: FIELD_TYPE.TEXT,
    //     defaultValue : ''
    //   },
    //   poundage_fee :{
    //     type: FIELD_TYPE.BIGINT,
    //     defaultValue : 0
    //   },
    //   service_fee : {
    //     type: FIELD_TYPE.BIGINT,
    //     defaultValue : 0
    //   }
    // },{
    //   timestamps: true,
    //   createdAt: 'create_time',
    //   updatedAt: 'update_time',
    //   freezeTableName: true,
    //   tableName : 't_order'
    // })

    // this.model.belongsTo(UserModel.model() , {foreignKey :'user_id' , targetKey: 'id'})
    // this.model.belongsTo(BusinessModel.model() , {foreignKey :'business_id' , targetKey: 'id'})
    this.op = OP
  }

  model() {
    return DB.define('order', {
      id: {
        type: FIELD_TYPE.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      uuid: {
        type: FIELD_TYPE.STRING_LEN(32)
      },
      user_id: {
        type: FIELD_TYPE.BIGINT,
      },
      app_id: {
        type: FIELD_TYPE.STRING_LEN(32)
      },
      business_id: {
        type: FIELD_TYPE.BIGINT,
      },
      business_uuid: {
        type: FIELD_TYPE.STRING_LEN(32)
      },
      order_no: {
        type: FIELD_TYPE.STRING_LEN(32)
      },
      out_trade_no: {
        type: FIELD_TYPE.STRING_LEN(32)
      },
      body: {
        type: FIELD_TYPE.STRING_LEN(128)
      },
      detail: {
        type: FIELD_TYPE.STRING_LEN(1000),
        defaultValue: ''
      },
      total_fee: {
        type: FIELD_TYPE.BIGINT,
      },
      redirect_url: {
        type: FIELD_TYPE.STRING_LEN(255),
        defaultValue: ''
      },
      extend_str: {
        type: FIELD_TYPE.TEXT,
        defaultValue: ''
      },
      method: {
        type: FIELD_TYPE.STRING_LEN(12)
      },
      status: {
        type: FIELD_TYPE.INT_LEN(2),
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
      payment_type: {
        type: FIELD_TYPE.STRING_LEN(24),
        defaultValue: ''
      },
      payment_info: {
        type: FIELD_TYPE.TEXT,
        defaultValue: ''
      },
      payment_user: {
        type: FIELD_TYPE.STRING_LEN(32),
        defaultValue: ''
      },
      unifiedorder_info: {
        type: FIELD_TYPE.TEXT,
        defaultValue: ''
      },
      poundage_fee: {
        type: FIELD_TYPE.BIGINT,
        defaultValue: 0
      },
      service_fee: {
        type: FIELD_TYPE.BIGINT,
        defaultValue: 0
      }
    }, {
      timestamps: true,
      createdAt: 'create_time',
      updatedAt: 'update_time',
      freezeTableName: true,
      tableName: 't_order'
    })

    // model.belongsTo(UserModel.model(), { foreignKey: 'user_id', targetKey: 'id' })
    // model.belongsTo(BusinessModel.model(), { foreignKey: 'business_id', targetKey: 'id' })
  }

  async getLists(map, page, size) {
    let result = await this.model().findAndCountAll({
      where: map,
      offset: (page - 1) * size,
      limit: size,
      order: [['create_time', 'DESC']],
      include: [
        {
          model: UserModel.model(),
          attributes: ['id', 'name']
        },
        {
          model: BusinessModel.model(),
          attributes: ['id', 'name']
        }
      ]
    })

    return result
  }

  
}

module.exports = new OrderModel()