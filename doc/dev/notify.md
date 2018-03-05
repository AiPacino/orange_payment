### 支付消息通知

在用户支付成功后，平台会对商户提供的消息通知地址下发支付成功消息通知，消息通知采用 HTTP POST发送,数据类型为JSON

#### 消息通知json数据说明

```json
{
  result_code : 'SUCCESS'|'FAIL', // 支付结果，SUCCESS成功,FAIL失败
  method : '' ,// 支付方式
  app_id : '', // 商户appId
  out_trade_no : '', // 支付平台订单号
  out_order_no : '', // 支付订单号
  body : '', // 支付下单描述
  detail : '', // 支付信息详情
  total_fee : '', // 支付金额
  redirect_url '':// 跳转地址,
  payment_type : '', // 支付类型
  payment_user : '', // 支付用户' ,
  payment_info : '' , // 支付信息，json数据,wx获alipay返回数据
  sign ：'' // 数据签名
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