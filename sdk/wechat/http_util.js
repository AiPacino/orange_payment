const request = require('request')
const xml2js = require('xml2js')

class HttpUtil {

  get(){

  }

  post(action , data = {} , method = 'json'){
    let contentType = 'application/json'
    let body = ''
    if(method == 'json'){
      body = JSON.stringify(data)
    }else if(method == 'xml'){
      contentType = 'application/xml'
      body = this._objToXml(data)
    }

    return new Promise((resolve, reject) => {
      request({
        url: action,
        method: 'POST',
        json: true,
        headers: {
          'content-type' : contentType,
        },
        body: body
      }, function (error, response, body) {
        if(error) {
          reject (response)
        }
        if (!error && response.statusCode == 200) {
          resolve(body)
        }
      })
    })
  }

  _objToXml(obj){
    let builder = new xml2js.Builder()
    let xml = builder.buildObject(obj)
    return xml
  }
}

module.exports = new HttpUtil