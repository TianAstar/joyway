var app = getApp()
Page({
  data: {
    primarySize: 'default',
    disabled: false,
    plain: false,
    loading: false,
    money: [0.01, 10, 100, 200, 300, 500],
    active: [true, false, false, false, false, false],
    amount: null,
    pay: 0.01
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    var that = this
    //调用应用实例的方法获取全局数据
    that.setData({
      amount: app.globalData.userInfo.balance
    })
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow: function () {
    // 生命周期函数--监听页面显示
    var that = this
    //调用应用实例的方法获取全局数据
    that.setData({
      amount: app.globalData.userInfo.balance
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
  toselect: function (e) {
    var money = e.target.dataset.money;
    var index = e.target.dataset.index;
    var length = this.data.money.length;
    var active = [];
    var that = this;
    for (var i = 0; i < length; i++) {
      active[i] = false;
      if (i == index) {
        active[i] = true;
      }
    }
    that.setData({
      active: active,
      pay: money
    });
  },
  topay: function () {
    if (app.globalData.userInfo.mobile){
      var that = this
      that.setData({
        loading: true,
        disabled: true,
      });
      wx.request({
        url: app.globalData.api.pay,
        data: {
          client: "WechatClient",
          token: wx.getStorageSync('userToken'),
          amount: that.data.pay
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function (res) {
          wx.requestPayment({
            'timeStamp': res.data.wepayModel.timeStamp,
            'nonceStr': res.data.wepayModel.nonceStr,
            'package': res.data.wepayModel.package,
            'signType': 'MD5',
            'paySign': res.data.wepayModel.paySign,
            'success': function (res) {
              app.login(function () {
                that.setData({
                  amount: app.globalData.userInfo.balance,
                  loading: false,
                  disabled: false
                });
              });
            },
            'fail': function (res) {
              that.setData({
                loading: false,
                disabled: false,
              });
            }
          })
        }
      })
    }else{
      wx.showModal({
        title: '',
        content: '请先绑定手机后再充值',
        confirmText:'去绑定',
        confirmColor:'#fd621c',
        success: function (res) {
          if (res.confirm) {
            wx.redirectTo({
              url: '/pages/login/index',
            })
          } 
        }
      })
    }

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