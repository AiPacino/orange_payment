const Request = require('../common/request')

class User {

  init(){
    this.userStatusCheck()
    this.userRateSet()
  }
  /**
   * 设置商户状态
   */
  userStatusCheck(){
    let btnUserStatus = $('.user-items').find('.user-status-check')
    if(btnUserStatus.length <= 0){
      return 
    }

    btnUserStatus.on('click' , function(){
      let userId = $(this).attr('data-id')
      let status = $(this).attr('data-status') || 1

      let action = '/mg/api/userStatus'
      let data = {user_id : userId , status : status}

      Request.ajax(action , data).then(response => {
        // console.log(response)
        if(response.code == 0){
          location.reload()
        }else{
          alert(response.message)
        }
      })
    })
  }

  /**
   * 设置商户费率
   */
  userRateSet(){
    let btnUserRate = $('.user-items').find('.user-rate-set')
    if(btnUserRate.length <= 0){
      return 
    }

    btnUserRate.on('click' , function(){
      let userId = $(this).attr('data-id')
      let rateIn = $('#rate-in-' + userId).val()
      let rateOut = $('#rate-out-' + userId).val()

      let action = '/mg/api/userRate'
      let data = {
        user_id : userId,
        rate_in : rateIn,
        rate_out : rateOut
      }

      Request.ajax(action , data).then(response => {
        // console.log(response)
        if(response.code == 0){
          alert('设置成功！')
          location.reload()
        }else{
          alert(response.message)
        }
      })
    })
  }
}

module.exports = new User()