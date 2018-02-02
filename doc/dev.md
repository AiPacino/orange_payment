### 接口域名
`https://open.cc512.com`

### 接口

#### 下单
+ `POST /payment/unifiedOrder?access_token=[]&business_id=[]`

请求 ：
```js
{
  method: 'wx', // 支付方式 wx:微信
  out_trade_no : '', // 第三方订单号
  body : '' , // 订单说明
  detail : '' , // 订单详情
  total_fee : 1 , // 订单金额,精确到分
  redirect_url : '' , // 支付完成跳转链接
  payment_type : 'JSAPI'
  payment_user : '' // wx JSAPI传openid
}
```

返回数据:
```json
{
    "code": 0,
    "message": "OK",
    "data": {
        "return_code": "SUCCESS",
        "return_msg": "OK",
        "appid": "wx9070c69e2b42f307",
        "mch_id": "1488745772",
        "device_info": "WEB",
        "nonce_str": "kks7jGtvLDUKluAE",
        "sign": "F15A53ED8977B4B72B5794418DEDC770",
        "result_code": "SUCCESS",
        "prepay_id": "wx2018020209525904d36cfbe10191571498",
        "trade_type": "JSAPI"
    }
}
```