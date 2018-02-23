const Request = require('./../common/request')

class Business {
  init(){
    this.update()
  }

  update(){
    let form = $('#form-buisness-update')
    if(form.length <= 0){
      return
    }

    form.on('submit' , function () {  
      let action = $(this).attr('action')
      let data = $(this).serialize()

      Request.ajax(action , data).then(response => {
        if(response.code == 0){
          location.href = '/mg/business'
        }else{
          alert(response.message)
        }
      })

      return false
    })

  }
}

module.exports = new Business()