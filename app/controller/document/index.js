const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

// 文档

router.get('/' , async (req , res) => {
  // res.send('hello world!')
  let list = fs.readFileSync(path.join(__dirname , './../../../doc/list.json')).toString()

  res.locals.lists = JSON.parse(list)
  res.render('document/index')
})

router.post('/info' , async(req , res) => {
  let buf = fs.readFileSync(path.join(__dirname , './../../../doc/dev/'+ req.body.name +'.md'))

  res.send(buf.toString())
})


module.exports = router