//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    let wxLogin = () => {
      // 登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          console.log(res.code)
          wx.request({
            url: 'https://api.cc512.com/api/mini/login',
            data: { code: res.code },
            header: {},
            method: 'POST',
            dataType: 'json',
            success: (res) => {
              // console.log(res)
              let data = res.data
              console.log(data)
              if (data.code == 0) {
                wx.setStorageSync('sessionKey', data.data)
              }
            },
            fail: (res) => { },
            complete: (res) => { },
          })
        }
      })
    }

    wx.checkSession({
      success: (res) => {
        console.log(res)
        try {
          let sessionKey = wx.getStorageSync('sessionKey')
          if (sessionKey){
            console.log(sessionKey)

          }else {
            console.log(false)
            wxLogin()
          }
        }catch (err){
          console.log(err)
        }
        
      },
      fail: () => {
        wxLogin()
      },
      complete: (res) => {

      },
    })

    
    // 获取用户信息
    wx.getSetting({
      success: res => {
        
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})