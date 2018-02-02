let config = {
  'app_id' : '绑定支付的appId',
  'app_secret' : '公众帐号secert(公众号需要)',
  'mch_id' : '商户Id',
  'key' : '商户设置的key',
  'notify_url' : '回调地址',
}

// console.log(JSON.stringify(config));

// let data = {
//   'app_id' : 'wx9070c69e2b42f307',
//   'app_secret' : 'a47bfa076a9135dda22f9ce9a5ce4ae9',
//   'mch_id' : '1488745772',
//   'key' : 'ccf9507615a847fca60d386d12f6f8a0',
//   'notify_url' : 'https://pay.cc512.com/demo/pay/notify',
// }

// // console.log(JSON.stringify(data));

// let json = '{"access_token":"6_Y5IF7Mrb7U1o6XBWrU-AwUKV-QtPBOkhKKM24ZSukFWGKEcgo18AT-4C1Gw-HASU82MhaBQCQSSyiHCa4Eg7Vw","expires_in":7200,"refresh_token":"6_vTSCac0QAGD_Xz1ToiszJnfdT_RUicnGmEwTq6VOzBXr2zxgEC3SzzgDt5eV_CzutRYJFop8nVvhJlzqEBtTZQ","openid":"oLOGI0lDCn1OH19JzDkzItpmPsaU","scope":"snsapi_base"}'

// // console.log(JSON.parse(json))

// let openid = 'oLOGI0lDCn1OH19JzDkzItpmPsaU'

// let str = 'appid=wx9070c69e2b42f307&body=测试支付&device_info=WEB&fee_type=CNY&mch_id=1488745772&nonce_str=2a9e618638eb46309ec906d52815d5a2&notify_url=https://pay.cc512.com/api/notify/wxpay&openid=oLOGI0lDCn1OH19JzDkzItpmPsaU&out_trade_no=dc3996d42b9e48f48eb360f1355ef0c0&sign_type=MD5&spbill_create_ip=127.0.0.1&total_fee=1&trade_type=JSAPI&key=ccf9507615a847fca60d386d12f6f8a0'
// let str = 'appid=wx9070c69e2b42f307&body=测试支付&device_info=WEB&fee_type=CNY&mch_id=1488745772&nonce_str=e32f7a6eea0e4534bff92f6073472bfb&notify_url=https://pay.cc512.com/api/notify/wxpay&openid=oLOGI0lDCn1OH19JzDkzItpmPsaU&out_trade_no=a9f496e660e14734878afd085dfd968d&sign_type=MD5&spbill_create_ip=127.0.0.1&total_fee=1&trade_type=JSAPI&key=ccf9507615a847fca60d386d12f6f8a0';
// const crypto = require('crypto')

// let hash = crypto.createHash('md5')

// hash.update(str)
// let res = hash.digest('hex')

// console.log(res)

const xml2js = require('xml2js')
let xmlToObj = (xml) => {
  var parseString = xml2js.parseString
  return new Promise((resolve , reject) => {
    parseString(xml, function (err, result) {
      if(err) {
        reject(err)
      }
      resolve(result)
    })
  })
 
}

let xml = `<xml>
<return_code><![CDATA[SUCCESS]]></return_code>
<return_msg><![CDATA[OK]]></return_msg>
<appid><![CDATA[wx2421b1c4370ec43b]]></appid>
<mch_id><![CDATA[10000100]]></mch_id>
<nonce_str><![CDATA[IITRi8Iabbblz1Jc]]></nonce_str>
<openid><![CDATA[oUpF8uMuAJO_M2pxb1Q9zNjWeS6o]]></openid>
<sign><![CDATA[7921E432F65EB8ED0CE9755F0E86D72F]]></sign>
<result_code><![CDATA[SUCCESS]]></result_code>
<prepay_id><![CDATA[wx201411101639507cbf6ffd8b0779950874]]></prepay_id>
<trade_type><![CDATA[JSAPI]]></trade_type>
</xml> `
xmlToObj(xml).then(result => {
  console.log(result.xml.return_code)
})



