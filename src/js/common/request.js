
class Request{

  ajax(action , data , method = 'post' ){
    return new Promise((resolve , reject) => {
      $.ajax({
        type: method,
        url: action ,
        data: data,
        dataType: 'json',
        success: function ( response, txtStatus , xhr) {
          // console.log(xhr.status)

          if(xhr.status == 200){
            resolve(response)
          }else {
            reject(txtStatus)
          }
          
        },
        error : function(xml , status , err){
          reject(err)
        }
      })
    })
  }

}

module.exports = new Request()