'use strict'

const lists = require('./../config/redis').lists
const output = require('./../config/redis').output
const fs = require('fs')
const path = require('path')


let st = `const Client = require('./redisClient')\n`
st += `let client = Client()\n\n`

lists.forEach(function (item) {
  let method = item.method
  let key = item.key
  let params = item.params
  let getParams = params.join(',')

  // get
  st += `let ${method}Get = (${getParams}) => {\n`
  st += `\n  let key = \`${key}\`\n`
  st += `  let res = client.getKey(key)\n`
  st += `  return res\n`
  st += `}\n`

  st += `exports.${method}Get = ${method}Get\n\n`
  console.log('build ' + method + 'Get success ...')
  // del
  let delParams = params.join(',')
  st += `let ${method}Del = (${delParams}) => {\n`
  st += `\n  let key = \`${key}\`\n`
  st += `  let res = client.del(key)\n`
  st += `  return res\n`
  st += `}\n`

  st += `exports.${method}Del = ${method}Del\n\n`
  console.log('build ' + method + 'Del success ...')
  // set 
  params.push(...['value', 'expire = 0'])
  let setParams = params.join(',')
  st += `let ${method}Set = (${setParams}) => {\n`
  st += `\n  let key = \`${key}\`\n`
  st += `  let res = client.setKey(key , value , expire)\n`
  st += `  return res\n`
  st += `}\n`

  st += `exports.${method}Set = ${method}Set\n\n`
  console.log('build ' + method + 'Set success ...')

})

let copyClientJs = (distFile) => {
  let clientStr = fs.readFileSync(path.join(__dirname , './client.js')).toString()
  if (fs.existsSync(distFile)){
    fs.unlinkSync(distFile)
  }

  fs.writeFileSync(distFile , clientStr)
  console.log('create redis client js')
}

output.forEach(out => {

  fs.writeFileSync(path.join(out.path , 'redisClientProxy.js'), st)
  copyClientJs(path.join(out.path, 'redisClient.js'))
});

