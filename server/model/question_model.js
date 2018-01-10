const { DB , FIELD_TYPE , OP , Se} = require('./../../lib/model')
const UserModel = require('./user_model')

class QuestionModel {

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

    this.model.hasOne(UserModel.model, { foreignKey: 'id' })
  }

  async getListByUid(uid , map = {}){

    let where = {}
    where.uid = uid
    let page = map.page ? map.page : 1
    let size = map.size ? map.size : 10
    if (map.hasOwnProperty('status')){
      where.status = map.status
    }else{
      where.status = {[OP.gt]: 0}
    }

    let result = this.model.findAndCountAll({
      where: where,
      offset : (page - 1) * size,
      limit : size,
      order : [
        ['create_time' , 'DESC']
      ],
      include: [{
        model: UserModel.model,
        where: { uid : Se.col('t_user.id') }
      }]
    })

    return result
  }

}

module.exports = new QuestionModel()