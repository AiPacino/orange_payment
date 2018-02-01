### 接口

#### 下单
地址 `/payment/createOrder?access_token=[]&business_id=[]`

请求 ：
```js
{
  method: 'wx', // 支付方式
  out_trade_no : '', // 第三方订单号
  body : '' , // 订单说明
  detail : '' , // 订单详情
  total_fee : 100 , // 订单金额,精确到分
  redirect_url : '' , // 支付完成跳转链接
}
```