module.exports = {
  SUCCESS : {
    code : 0,
    message : 'success',
    data : {}
  },
  FAIL : {
    code : 1,
    message : 'error',
    data : {}
  },

  QUESTION_POST_DATA_ID_ERROR : {
    code : 10101,
    message : 'question数据id错误'
  },
  QUESTION_POST_DATA_TITLE_ERROR : {
    code : 10102,
    message : 'question数据title错误'
  },
  QUESTION_POST_DATA_CONTENT_ERROR : {
    code : 10103,
    message : 'question数据content错误'
  },
  QUESTION_POST_DATA_AMOUNT_ERROR : {
    code : 10103,
    message : 'question数据amount错误'
  },
  QUESTION_POST_DATA_DEADLINE_ERROR : {
    code : 10103,
    message : 'question数据deadline错误'
  },
  QUESTION_STATUS_NO_CAN_UPDATE : {
    code : 10110,
    message : 'question数据该状态下无法修改'
  },
  QUESTION_DATA_FIND_ERROR : {
    code : 10111,
    message : 'question数据未找到'
  },
  QUESTION_DATA_UID_NOT_MATCH : {
    code : 10112,
    message : 'question数据uid不匹配'
  },
  QUESTION_STATUS_NO_CAN_PUBLISH : {
    code : 10113,
    message : 'question数据该状态下无法发布'
  },
  QUESTION_STATUS_NO_CAN_DELETE : {
    code : 10114,
    message : 'question数据该状态下无法删除'
  },
  QUESTION_STATUS_NO_CAN_ANSWER : {
    code : 10115,
    message : 'question数据该状态下无法回答'
  },
  // answer
  ANSWER_FIND_ERROR : {
    code : 10120,
    message : '未找到answer数据'
  }
  
}