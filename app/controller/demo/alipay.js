const express = require('express')
const router = express.Router()
const config = require('./../../../config/index')
const httpUtils = require('./../../../utils/http_utils')
const log = require('./../../../lib/log')('demo-alipay')
const Uuid = require('./../../../utils/uuid_utils')

router.get('/' , (req ,res) => {

})

router.get('/test' , (req , res) => {
  let data = {
    "code": 0,
    "message": "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\r\n<html xmlns=\"http://www.w3.org/1999/xhtml\">\r\n<head>\r\n<title>֧\ufffd\ufffd\ufffd\ufffd - \ufffd\ufffd\ufffd\ufffd֧\ufffd\ufffd \ufffd\ufffdȫ\ufffd\ufffd\ufffd٣\ufffd</title>\r\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=gb2312\" />\r\n<meta http-equiv=\"x-ua-compatible\" content=\"ie=7\" />\r\n<meta name=\"description\" content=\"\ufffdй\ufffd\ufffd\ufffd\ufffdĵ\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd֧\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffdṩ\ufffd\ufffd\" />\r\n<meta name=\"keywords\" content=\"\ufffd\ufffd\ufffdϹ\ufffd\ufffd\ufffd/\ufffd\ufffd\ufffd\ufffd֧\ufffd\ufffd/\ufffd\ufffdȫ֧\ufffd\ufffd/\ufffd\ufffdȫ\ufffd\ufffd\ufffd\ufffd/\ufffd\ufffd\ufffd\ufffd\ufffdȫ/֧\ufffd\ufffd/֧\ufffd\ufffd\ufffd\ufffd,\ufffd\ufffd\ufffd\ufffd/\ufffd\ufffd\ufffd\ufffd,\ufffdտ\ufffd/\ufffd\ufffd\ufffd\ufffd,ó\ufffd\ufffd/\ufffd\ufffd\ufffd\ufffdó\ufffd\ufffd\" />\r\n\r\n\r\n<link rel=\"icon\" href=\"https://img.alipay.net:443/img/icon/favicon.ico\" type=\"image/x-icon\" />\r\n<link rel=\"shortcut icon\" href=\"https://img.alipay.net:443/img/icon/favicon.ico\" type=\"image/x-icon\" />\r\n<link rel=\"stylesheet\" type=\"text/css\" href=\"https://img.alipay.net:443/assets/c/global/global_v1.css?t=20081119.css\" />\r\n<link rel=\"stylesheet\" type=\"text/css\" href=\"https://img.alipay.net:443/assets/c/sys/sys.tabs.css?t=20080709.css\" />\r\n<link rel=\"stylesheet\" type=\"text/css\" href=\"https://img.alipay.net:443/assets/c/typography/ot.old.css?t=20080709.css\" />\r\n<link rel=\"stylesheet\" type=\"text/css\" href=\"https://img.alipay.net:443/assets/c/typography/as.kt.css?t=20080709.css\" />\r\n\r\n\r\n</head>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\t\t\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n<!--[if gte IE 6]>\r\n<script type='text/javascript' src='https://img.alipay.net:443/js/sys/sys.object.js?t=20080122.js' defer='defer'></script>\r\n<![endif]-->\r\n\r\n<style type=\"text/css\">\r\n.topsearch{font-size:12px;position:relative;}\r\n.topsearch form{margin:-2px 0 0 0;padding:0}\r\n.topsearch form input{width:94px;height:13px;line-height:13px;border:1px solid #d7d7d7;padding:2px 2px 0 2px;font-size:12px}\r\n.topsearch form button{width:40px;height:18px;margin:0 0 0 4px;border:1px solid #d7d7d7;background:#f3f3f3;padding:0}\r\n.topsearch .xnews{border:0;position:absolute;top:0;right:-15px}\r\n#Header #QuickLinks .QuickLinksMore{position:relative;}\r\n#Header #QuickLinks .QuickLinksMore ol{display:none;position:absolute;top:18px;left:5px;float:none;width:65px;text-align:left;z-index:9999;text-align:left;border:1px solid #ccc;background:#fff;margin:0;padding:5px 0}\r\n#Header #QuickLinks .QuickLinksMore ol li{display:block;float:none;background:none;margin:0;padding:2px 3px;text-align:center}\r\n#Header #QuickLinks .QuickLinksMore ol li a{text-decoration:none;color:#666;margin:0;padding:0}\r\n#Header #QuickLinks .QuickLinksMore ol li a:hover{color:#f60}\r\n}\r\n</style>\r\n<!-- Header start-->\r\n<div id=\"Header\" class=\"clearfix\">\r\n  <!-- HeadTop start-->\r\n  <div id=\"HeadTop\">\r\n                    <div id=\"Logo\">\r\n\t\t<a href=\"https://www.alipay.com\" class=\"logo\"></a>\r\n\t</div>\r\n            \r\n       \t <div id=\"QuickLinks\" style=\"padding-top:8px\">\r\n      \t<ul>\r\n\t\t\t<li class=\"topsearch\" style=\"background:none\"><form id=\"topsearch\" name=\"topsearch\" action=\"https://help.alipay.com/support/search_new_result.htm\" method=\"get\" onsubmit=\"return checkTopSearch()\">\r\n\t\t\t\t\t\t\t<input type=\"hidden\" name=\"_form_token\" value=\"926aea65c10e77abbff1bae2f422830d3b3738763b6b427aa8698588a5dd4c72GZ00\"/>\r\n\t\t\t<input id=\"word\" name=\"word\" type=\"text\"/><button type=\"submit\">\ufffd\ufffd\ufffd\ufffd</button></form></li>\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t<li><a href=\"https://help.alipay.com/support/index.htm\" target=\"_blank\">\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd</a></li>\r\n\t\t\t<li><a href=\"https://jifen.alipay.com/index.htm?src=yy_jifen_sy01\" target=\"_blank\">\ufffd\ufffd\ufffdֻ\ufffd\ufffd\ufffd</a></li>\r\n\t\t\t<li id=\"QuickLinksMore1\" class=\"QuickLinksMore\">\r\n\t\t\t\t<a href=\"https://wow.alipay.com?src=wow_home\">\ufffdۣ\ufffd֧\ufffd\ufffd\ufffd\ufffd</a>\r\n\t\t\t\t<ol>\r\n\t\t\t\t\t<li><a href=\"https://wow.alipay.com/shop.htm?src=shop_home\">\ufffd\ufffd&nbsp;\ufffd\ufffd&nbsp;\ufffd\ufffd</a></li>\r\n\t\t\t\t\t<li><a href=\"https://wow.alipay.com/overseas.htm?src=overseas_home\">\ufffd\ufffd\ufffd⹺\ufffd\ufffd</a></li>\r\n\t\t\t\t\t<li><a href=\"https://market.alipay.com/alipay/customer_index.htm?src=customer_home\">\ufffd\ufffd\ufffd\ufffd\ufffd̼\ufffd</a></li>\r\n\t\t\t\t\t<li><a href=\"https://wow.alipay.com/services.htm?src=services_home\">\ufffd\ufffdԱ\ufffd\ufffd\ufffd\ufffd</a></li>\r\n\t\t\t\t</ol>\r\n\t\t\t</li>\r\n\t\t\t</ul>\r\n<script type=\"text/javascript\">\r\nvar searchInfo=document.getElementById(\"word\");\r\nfunction searchclearInfoJs(){\r\n\tif(searchInfo.value==\"\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\")\r\n\t{\r\n\t\tsearchInfo.style.color=\"#000\";\r\n\t\tsearchInfo.value=\"\";\r\n\t}\r\n}\r\n\r\nfunction searchinputInfoJs(){\r\n\tif(searchInfo.value==\"\"){\r\n\t\tsearchInfo.style.color=\"#999\";\r\n\t\tsearchInfo.value=\"\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\";\r\n\t}\r\n}\r\nif(searchInfo!=undefined){\r\n\tif(searchInfo.value==\"\"||searchInfo.value==\"\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\")\r\n\t{\r\n\t\tsearchInfo.style.color=\"#999\";\r\n\t\tsearchInfo.value=\"\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\";\r\n\t\tsearchInfo.onfocus=function(){\r\n\t\tsearchclearInfoJs();\r\n\t\t}\r\n\t\tsearchInfo.onblur=function(){\r\n\t\tsearchinputInfoJs();\r\n\t\t}\r\n\t}\r\n}\r\nfunction showMore(obj){\r\nvar oMore=document.getElementById(obj);\r\nvar oMoreUl=oMore.getElementsByTagName(\"ol\")[0];\r\nif(document.all){//ie\r\n\toMore.setAttribute(\"onmouseover\",eval(function(){oMoreUl.style.display=\"block\";}));\r\n\toMore.setAttribute(\"onmouseout\",eval(function(){oMoreUl.style.display=\"none\";}));\r\n\toMoreUl.setAttribute(\"onmouseover\",eval(function(){oMoreUl.style.display=\"block\";}));\r\n\toMoreUl.setAttribute(\"onmouseout\",eval(function(){oMoreUl.style.display=\"none\";}));\r\n}else{//ff\r\n\toMore.addEventListener(\"mouseover\", function(){oMoreUl.style.display=\"block\";}, false);\r\n\toMore.addEventListener(\"mouseout\", function(){oMoreUl.style.display=\"none\";}, false);\r\n\toMoreUl.addEventListener(\"mouseover\", function(){oMoreUl.style.display=\"block\";}, false);\r\n\toMoreUl.addEventListener(\"mouseout\", function(){oMoreUl.style.display=\"none\";}, false);\r\n}\r\n}\r\nshowMore(\"QuickLinksMore1\");\r\nfunction checkTopSearch(){\r\nif(searchInfo.value==\"\"||searchInfo.value==\"\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\"){\r\n\talert(\"\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd \ufffd磺\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\");\r\n\treturn false;\r\n}\r\nreturn true;\r\n}\r\n</script>\r\n\t<ul style=\"clear:both\">\r\n\t\t<li class=\"Inpour\" style=\"background:none\"><a href=\"https://www.alipay.com/user/inpour_request.htm?src=yy_content_czbutton\"><img style=\"position:absolute;top:-15px;margin-left:70px;\"src=\"https://img.alipay.net:443/assets/i/base/icon/sjf.gif\"  width=\"43\" height=\"22\" border=\"0\" alt=\"\ufffd\ufffdֵ\ufffdͻ\ufffd\ufffd\ufffd\"/></a></li>\r\n\t\t\t\t\t\t\t\t<li><a href=\"https://trust.alipay.com\" target=\"_blank\">\ufffd\ufffd\ufffdμƻ\ufffd</a></li>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li>\ufffd\ufffd\ufffdã\ufffd\ufffd\ufffd <a href=\"https://www.alipay.com/user/reg_select.htm\" >ע\ufffd\ufffd</a> \ufffd\ufffd <a href=\"https://www.alipay.com/user/login.htm\">\ufffd\ufffd¼</a></li>\r\n\t\t\t\t\t\t\t\r\n\t\t</ul>\r\n\t  </div>\r\n\t   </div>\r\n  <!-- HeadTop ending-->\r\n    </div>\r\n<!-- Header ending-->\r\n\r\n\r\n\r\n<div id=\"Info\">\r\n\t<div class=\"ExclaimedInfo\">\r\n\t<strong>\ufffd\ufffd\ufffdԴ\ufffd\ufffd\ufffd\ufffd\ufffdص\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffdԴ\ufffdأ\ufffd\ufffd\ufffd\ufffd·\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd</strong>\r\n    <div class=\"Todo\">\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd invalid-signature \ufffd\ufffd\ufffd\ufffdԭ\ufffd\ufffd: \ufffd\ufffdǩ\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffdǩ\ufffd\ufffd\ufffdַ\ufffd\ufffd\ufffd\ufffd\ufffdǩ\ufffd\ufffd˽Կ\ufffd\ufffdӦ\ufffdù\ufffdԿ\ufffdǷ\ufffdƥ\ufffd䣬\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffdɵ\ufffd\ufffd\ufffdǩ\ufffdַ\ufffd\ufffd\ufffdΪ\ufffd\ufffdapp_id=2016090900470172&amp;amp;biz_content={&amp;quot;subject&amp;quot;:&amp;quot;ceshi&amp;quot;,&amp;quot;body&amp;quot;:&amp;quot;&amp;quot;,&amp;quot;out_trade_no&amp;quot;:&amp;quot;8e5151210fcd4122936a20d650c45d73&amp;quot;,&amp;quot;total_amount&amp;quot;:&amp;quot;1&amp;quot;,&amp;quot;product_code&amp;quot;:&amp;quot;QUICK_WAP_WAY&amp;quot;,&amp;quot;notify_url&amp;quot;:&amp;quot;http://pay.cc512.com/api/notify/alipay&amp;quot;}&amp;amp;charset=utf-8&amp;amp;format=json&amp;amp;method=alipay.trade.wap.pay&amp;amp;return_url=http://www.baidu.com&amp;amp;sign_type=RSA2&amp;amp;timestamp=2018-02-05 14:06:45&amp;amp;version=1.0 </div>\r\n        <ul>\r\n      <li>˵\ufffd\ufffd:\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffdΪ\ufffd\ufffd\ufffdӿڼ\ufffd\ufffdɵ\ufffd\ufffdԶ\ufffd\ufffd\ufffd\ufffd\ufffd\ufffdô\ufffd\ufffd\ufffd\ufffd\ufffd\ufffdѣ\ufffd\ufffd\ufffd\ufffd\ufffdϵ\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffdԴ\ufffd\ufffdվ\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffdվ\ufffd\ufffd\ufffdɽӿڵĴ\ufffd\ufffd\ufffd</li>\r\n    </ul>\r\n\t<ul><div class=\"HelpSubmit\">\r\n\t\t\t\t\t<b>\ufffd\ufffd\ufffd\ufffdû\ufffd\ufffd\ufffd\ufffd\ufffd<input type=\"button\" value=\"\ufffd\ufffd\ufffd\ufffd\ufffdҴ\ufffd\" onclick=\"window.open('https://open.alipay.com/search/searchDetail.htm?tabType=support&keyword=invalid-signature','_self')\">\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd<a href=\"https://openclub.alipay.com/index.php?m=bbs&c=forumlist\">\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd</a>\ufffd\ufffd\r\n\t\t\t\t\t</b></div></ul>\r\n\t</div>\r\n</div>\r\n\r\n\r\n<!--footer start-->\r\n<div id=\"Foot\">\r\n  <div class=\"Shell clearfix\">\r\n    <ul>\r\n      <li><a href=\"https://www.alipay.com/static/aboutalipay/about.htm\" target=\"_blank\">\ufffd\ufffd\ufffd\ufffd֧\ufffd\ufffd\ufffd\ufffd</a></li>\r\n      <li><a href=\"https://ue.alipay.com\" target=\"_blank\">\ufffd\ufffd\ufffd\ufffdƻ\ufffd</a></li>\r\n      <li><a href=\"https://blog.alipay.com\" target=\"_blank\">\ufffdٷ\ufffd\ufffd\ufffd\ufffd\ufffd</a></li>\r\n      <li><a href=\"https://job.alipay.com\" target=\"_blank\">\ufffd\ufffd\ufffd\ufffdӢ\ufffd\ufffd</a></li>\r\n      <li><a href=\"https://www.alipay.com/static/aboutalipay/contact.htm\" target=\"_blank\">\ufffd\ufffdϵ\ufffd\ufffd\ufffd\ufffd</a></li>\r\n            <li><a href=\"https://market.alipay.com/ospay/index.htm\" target=\"_blank\">International Business</a></li>\r\n      <li><a href=\"https://www.alipay.com/static/aboutalipay/englishabout.htm\" target=\"_blank\">About Alipay</a></li>\r\n    </ul>\r\n  </div>\r\n  \r\n  <ul class=\"CopyRight clearfix\">\r\n  <li><a href=\"https://www.alipay.com/static/phone/alipay_phone.htm?src=yy_sy_sjzf\" target=\"_blank\">\ufffd绰֧\ufffd\ufffd\ufffd\ufffd</a>\ufffd\ufffd400-66-13800 | \ufffdֻ\ufffd֧\ufffd\ufffd\ufffd\ufffd\ufffd\ufffdwap.alipay.com</li>\r\n  <li>֧\ufffd\ufffd\ufffd\ufffd\ufffd\ufffdȨ\ufffd\ufffd\ufffd\ufffd 2004-2018 ALIPAY.COM</li>\r\n  </ul>\r\n  <div id=\"ServerNum\">openapi-2-1-2.daily.alipay.net</div>\r\n</div>\r\n<!--footer ending-->\r\n"
  }

  res.send(data.message)
})

module.exports = router