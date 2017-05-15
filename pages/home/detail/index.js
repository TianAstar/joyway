// pages/home/detail/index.js
var app = getApp()
Page({
  data:{
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    venue:null
  },
  onLoad:function(options){
    var that=this
    wx.request({
            url: app.globalData.api.venues+options.id,
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'GET',
            success: function (res) {
              var tmp=res.data.venues
              tmp.banner=JSON.parse(tmp.banner)
              for(var i=0;i<tmp.banner.length;i++){
                  tmp.banner[i].file=app.globalData.domain+tmp.banner[i].file
                }
              that.setData({
                venue:res.data.venues
              })
            }
          })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})