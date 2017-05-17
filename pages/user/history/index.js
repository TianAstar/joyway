var app = getApp()
Page({
  data: {
    consumptionList: null
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    var that = this
    wx.request({
      url: app.globalData.api.recordlist,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        client: "WechatClient",
        token: wx.getStorageSync('userToken'),
        pageIndex: 1,
        pageSize: 20
      },
      method: 'GET',
      success: function (res) {
        var tmp = res.data.consumptionList
        for (var i = 0; i < tmp.length; i++) {
          tmp[i].timeSpan = that.timeFormat(tmp[i].timeSpan)
          tmp[i].createTime=that.formatTime(tmp[i].createTime)
        }
        that.setData({
          consumptionList: tmp,
        })
      }
    })
  },
  formatTime: function (date) {
    return new Date(parseInt(date)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ") 
  },
  timeFormat: function (time) {
    return Math.ceil(time / 1000 / 60) + "分钟"
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow: function () {
    // 生命周期函数--监听页面显示
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