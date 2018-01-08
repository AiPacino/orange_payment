const uuidv4 = require('uuid/v4')

class UuidUtils {

  v4(){
    return uuidv4().replace(/-/g,'')
  }

}

module.exports = new UuidUtils()