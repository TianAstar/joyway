var app = getApp();
Page({
  data: {
    src: null,
    userInfo: null
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    var that = this
    //调用应用实例的方法获取全局数据
    that.setData({
      userInfo: app.globalData.userInfo,
      src: app.globalData.api.qrcode,
    })
  },
  login: function () {
    var that = this;
    //调用应用实例的方法获取全局数据
    wx.openSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          app.login(function () {
            that.setData({
              userInfo: app.globalData.userInfo,
              src: app.globalData.api.qrcode,
            });
          });
        }
      }
    })
  },
  onReady: function () {
    var that = this;
    setInterval(function () {
      var time = new Date().getTime();
      that.setData({
        src: app.globalData.api.qrcode + "&time=" + time,
      });
    }, 10000)
  },
  onShow: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.upDateUserInfo()
    that.setData({
      userInfo: app.globalData.userInfo,
      src: app.globalData.api.qrcode,
    })
  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏
  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载
  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作
  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数
  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})