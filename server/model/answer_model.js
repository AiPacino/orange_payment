const { DB , FIELD_TYPE , OP , Se} = require('./../../lib/model')
const UserModel = require('./user_model')
// const QuestionModel = require('./question_model')

class AnswerModel {

  constructor(){
    this.model = DB.define('answer' , {
      id : {
        type : FIELD_TYPE.BIGINT,
        primaryKey: true,
        autoIncrement: true 
      },
      question_id: {
        type : FIELD_TYPE.BIGINT
      },
      pid : {
        type : FIELD_TYPE.BIGINT,
        defaultValue : 0
      },
      content : {
        type: FIELD_TYPE.TEXT
      },
      uid: {
        type : FIELD_TYPE.BIGINT,
      },
      likes_count : {
        type : FIELD_TYPE.INT,
        defaultValue : 0
      },
      status : {
        type : FIELD_TYPE.INT_LEN(2),
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
      freezeTableName: true,
      tableName : 't_answer'
    })

    this.model.belongsTo(UserModel.model , {foreignKey :'uid' , targetKey: 'id'})
  }

  async getListByQuestionId(questionId , map = {}){

    let where = {}
    where.question_id = questionId
    let page = map.page ? map.page : 1
    let size = map.size ? map.size : 10

    where.status = map.status ? map.status : 1

    let result = this.model.findAndCountAll({
      where: where,
      offset : (page - 1) * size,
      limit : size,
      order : [
        ['create_time' , 'DESC']
      ],
      include: [{
        model: UserModel.model,
        // where: { id : Se.col('t_answer.uid') },
        attributes: ['id', 'nick_name' , 'avatar_url' , 'gender']
      }]
    })

    return result
  }

}

module.exports = new AnswerModel()