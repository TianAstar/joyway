//app.js
var domain = "https://jiuhui.doolab.cn"
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var that = this
    try {
      var userToken = wx.getStorageSync('userToken')
      if (userToken) {
        wx.checkSession({
          success: function () {
            var userContext = wx.getStorageSync('userContext')
            that.globalData.userInfo = userContext
            that.globalData.userInfo.avatar = JSON.parse(that.globalData.userInfo.avatar)
            //session 未过期，并且在本生命周期一直有效
          },
          fail: function () {
            //登录态过期
            that.login() //重新登录
          }
        })
      } else {
        that.login() //重新登录
      }
    } catch (e) {

    }
  },
  onShow: function (options) {

  },
  login: function (cb) {
    //调用登录接口
    var that = this
    var cb = cb
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: that.globalData.api.login,
            data: {
              jsCode: res.code
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            success: function (res) {
              if (res.data.code === 200) {
                wx.setStorage({
                  key: 'userToken',
                  data: res.data.token
                });
                wx.setStorage({
                  key: 'userContext',
                  data: res.data.userContext
                });
                that.globalData.api.qrcode = domain + "/consumption/doorQrCode?client=WechatClient&token=" + res.data.token
                that.globalData.userInfo = res.data.userContext
                that.globalData.userInfo.avatar = JSON.parse(that.globalData.userInfo.avatar)
                typeof cb == "function" && cb(that.globalData.userInfo)
              } else {
                that.register(cb);
              }
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
  },
  upDateUserInfo: function () {
    var that=this
    wx.request({
      url: that.globalData.api.updateuser,
      data: {
        client: "WechatClient",
        token: wx.getStorageSync('userToken'),
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      success: function (res) {
        wx.setStorage({
          key: 'userToken',
          data: res.data.token
        });
        wx.setStorage({
          key: 'userContext',
          data: res.data.userContext
        });
        that.globalData.api.qrcode = domain + "/consumption/doorQrCode?client=WechatClient&token=" + res.data.token
        that.globalData.userInfo = res.data.userContext
        that.globalData.userInfo.avatar = JSON.parse(that.globalData.userInfo.avatar)
      }
    })
  },
  register: function (cb) {
    var that = this
    var cb = cb
    wx.login({
      success: function (res) {
        var code = res.code
        wx.getUserInfo({
          success: function (res) {
            wx.request({
              url: that.globalData.api.register,
              data: {
                jsCode: code,
                encryptedData: res.encryptedData,
                iv: res.iv
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              method: 'POST',
              success: function (res) {
                that.globalData.userInfo = res.data.userContext
                that.globalData.api.qrcode = domain + "/consumption/doorQrCode?client=WechatClient&token=" + res.data.token
                that.globalData.userInfo.avatar = JSON.parse(that.globalData.userInfo.avatar)
                typeof cb == "function" && cb(that.globalData.userInfo)
              }
            })
          }
        })
      }
    })

  },
  globalData: {
    userInfo: null,
    domain: domain,
    api: {
      login: domain + "/mina/passport/login",
      register: domain + "/mina/passport/register",
      venueslist: domain + "/venues/list",
      venues: domain + "/venues/get/",
      pay: domain + "/mina/pay/pay",
      updateuser: domain + "/user/info",
      sendCode: domain +"/common/sendCode",
      bindphone: domain + "/user/bind",
      recordlist: domain + "/consumption/record/list",
      qrcode: domain + "/consumption/doorQrCode?client=WechatClient&token=" + wx.getStorageSync('userToken')
    }
  }
})