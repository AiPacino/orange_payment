const request = require('request')
const xml2js = require('xml2js')

class HttpUtil {

  get(){

  }

  post(action , data = {} , method = 'json'){
    console.log('xml================' , data)
    let contentType = 'application/json'
    let body = ''
    if(method == 'json'){
      if (data){
        body = JSON.stringify(data)
      }
      
    }else if(method == 'xml'){
      contentType = 'text/xml'
      body = this._objToXml(data)
      
    }
    console.log('===================' , body)
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
    // console.log('_objToXml================' , obj)
    // var builder = new xml2js.Builder()
    // var jsonxml = builder.buildObject(obj)

    // console.log('_objToXml================' , jsonxml)
    // return jsonxml
    let xml = '<xml>'
    for (let key in obj) {
      if(obj[key]){
        xml += `<${key}>${obj[key]}</${key}>`
      }
      
    }
    xml += '</xml>'
    console.log('_objToXml================' , xml)
    return xml
  }
}

module.exports = new HttpUtil