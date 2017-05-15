// pages/login/index.js
var app = getApp()
Page({
  data: {
    phone: null,
    flag: 0,
    codeflag: 0,
    codeInfo: "获取验证码",
    code: null
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  bindKeyInput: function (e) {
    // 手机号验证
    var that = this
    if ((/^1[3|4|5|8][0-9]\d{8}$/.test(e.detail.value))) {
      that.setData({
        phone: e.detail.value,
        codeflag: 1
      })
    } else {
      that.setData({
        codeflag: 0
      })
    }
  },
  bindCodeInput: function (e) {
    // 验证码验证
    var that = this
    if (e.detail.value == that.data.code) {
      that.setData({
        flag: 1
      })
    } else {
      that.setData({
        flag: 0
      })
    }
  },
  getCode: function () {
    // 获取验证码
    var that = this
    if (that.data.codeflag) {
      //发起请求
      that.countDown()
      wx.request({
        url: app.globalData.api.sendCode,
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          mobile: that.data.phone
        },
        method: 'POST',
        success: function (res) {
          var sms=JSON.parse(res.data.params.sms_param)
          that.setData({
            code: sms.code
          })
        }
      })
    }
  },
  countDown: function () {
    // 倒计时
    var that = this
    var count = 60
    var time = setInterval(function () {
      if (count == 0) {
        clearInterval(time);
        that.setData({
          codeflag: 1,
          codeInfo: "重新获取",
        })
      } else {
        that.setData({
          codeflag: 0,
          codeInfo: count + "s后重新获取",
        })
        count--
      }
    }, 1000)
  },
  connect: function () {
    var that = this
    if (that.data.flag) {
      // 发起绑定请求
      wx.request({
        url: app.globalData.api.bindphone,
        data: {
          client: "WechatClient",
          token: wx.getStorageSync('userToken'),
          code: that.data.code,
          mobile: that.data.phone,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function (res) {
          if (res.data.code==200){
            wx.showToast({
              title: '绑定成功',
            })
            app.upDateUserInfo()
            wx.redirectTo({
              url: '/pages/user/balance/index',
            })
          }else{
            wx.showToast({
              title: '服务器维护中。。。',
            })
          }
        }
      })
    }
  },
  onUnload: function () {
    // 页面关闭
  }
})