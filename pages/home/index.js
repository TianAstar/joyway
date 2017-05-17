var app = getApp()
Page({
  data: {
    markers: [],
    longitude: null,
    latitude: null
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    var that = this;
    that.venueslist()
  },
  getLoaction: function () {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        // var latitude = res.latitude;
        // var longitude = res.longitude;
        // var speed = res.speed;
        // var accuracy = res.accuracy;
        var tmpvenue = that.data.markers
        var marker = {
          id: 1,
          longitude: res.longitude,
          latitude: res.latitude,
          iconPath: "/images/map/site.png",
          title: "我的位置",
          width: 30,
          height: 30,
        }
        tmpvenue.push(marker)
        that.setData({
          markers: tmpvenue,
          longitude: res.longitude,
          latitude: res.latitude
        })
      }
    });
  },
  venueslist: function () {
    var that = this;
    wx.request({
      url: app.globalData.api.venueslist,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      success: function (res) {
        var tmp = res.data.venuesList
        var markers = []
        for (var i = 0; i < tmp.length; i++) {
          markers[i] = {}
          markers[i].longitude = tmp[i].xaxis
          markers[i].latitude = tmp[i].yaxis
          markers[i].title = tmp[i].name
          markers[i].iconPath = "/images/map/icon.png"
          markers[i].width = 36
          markers[i].height = 41
        }
        that.setData({
          markers: markers
        })
      }
    })
  },
  userSetting: function () {
    var that = this;
    wx.openSetting({
      success: (res) => {
        res.authSetting = {
          "scope.userLocation": true
        },
          that.getLoaction()
      }
    })
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成
    var that=this
    that.getLoaction()
  },
  onShow: function () {
    var that = this
    that.getLoaction()
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