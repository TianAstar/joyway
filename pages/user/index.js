//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: null
  },
  login: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    wx.openSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          app.login(function () {
            that.setData({
              userInfo: app.globalData.userInfo
            })
          });
        }
      }
    })
  },
  onShow: function (options) {
    var that = this
    //调用应用实例的方法获取全局数据
    app.upDateUserInfo()
    that.setData({
      userInfo: app.globalData.userInfo
    })
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    that.setData({
      userInfo: app.globalData.userInfo
    })
  }
})
