// pages/home/site/index.js
var app = getApp()
Page({
  data:{
    venues:null
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that=this
    wx.request({
            url: app.globalData.api.venueslist,
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'GET',
            success: function (res) {
              var tmp=res.data.venuesList
              for(var i=0;i<tmp.length;i++){
                tmp[i].banner=JSON.parse(tmp[i].banner)
                for(var j=0;j<tmp[i].banner.length;j++){
                  tmp[i].banner[j].file=app.globalData.domain+tmp[i].banner[j].file
                }
              }
              that.setData({
                venues:tmp
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