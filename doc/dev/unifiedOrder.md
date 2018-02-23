### 接口域名
`http://open.cc512.com`

### 统一下单接口请求地址
`POST /payment/unifiedOrder`

#### 请求 ：
```js
{
  app_id : '', // 商户注册之后产生的appId
  method: 'wx', // 支付方式 wx:微信 | alipay: 支付宝
  out_trade_no : '', // 第三方订单号
  body : '' , // 订单说明
  detail : '' , // 订单详情，非必须
  total_fee : 1 , // 订单金额,精确到分
  redirect_url : '' , // 支付完成跳转链接
  payment_type : '' // 参见支付类型说明
  payment_user : '' // wx JSAPI传openid，其他情况不传
}
```

#### 返回数据:
```json
{
  "code": 0|其他, // 0:成功 非0:失败
  "message": "", // 请求说明
  "data": {
      "result_code": "", //结果说明,成时返回success
      "method": "wx", // 支付方式
      "app_id": "", // 商户app_id
      "out_trade_no": "", // 传入外部订单号
      "out_order_no": "", // 平台生成订单号
      "body": "", // 下单描述
      "detail": "",
      "total_fee": "", // 下单金额，精确到分
      "redirect_url": "", // 支付完成跳转链接
      "payment_type": "", // 支付类型
      "payment_info": { // 下单返回信息, json字符串
        "code_url" : "" , // 二维码链接,生成二维码用
        "prepay_id" : "" , // 预支付Id

        "pay_url_wap" : "" , // h5支付链接,payment_type为wap时返回
        "pay_url_pc" : "" , // pc支付链接,payment_type为pc时返回
      },
      "sign": "" // 返回签名
  }
}
```

#### 支付类型说明 

+ wx : 微信支付
 + JSAPI ：公众号支付
 + NATIVE ： 原生扫码支付
 + MWEB ：h5支付
 + APP ：app支付

+ alipay ：支付宝
 + wap ：手机网站支付
 + pc ：pc网站支付
 + code ：扫码支付