const path = require('path')

module.exports = {

  lists : [
    {method : 'appInfoByAppId' , key : 'app_info:${appId}' , params : ['appId'] , name : 'app信息'},
    {method : 'blogAppByAppId' , key : 'blog_app:${appId}' , params : ['appId'] , name : 'blogApp信息(废弃)'},
    {method : 'blogAppByHost' , key : 'blog_app:${host}' , params : ['host'] , name : 'blogApp信息Byhost'},
    {method : 'blogCategorys' , key : 'blog_categorys:${blogId}' , params : ['blogId'] , name : 'blogCategroy列表'},
    {method : 'blogTags' , key : 'blog_tags:${blogId}' , params : ['blogId'] , name : 'blogTags标签'},
  ],

  output : [
    {path : path.join(__dirname , './../../admin/app/proxy')},
    {path : path.join(__dirname , './../../blog/app/proxy')},
  ]
}