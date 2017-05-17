Page({
    data: {
        markers: null,
        longitude: null,
        latitude: null
    },
    onLoad: function (options) {
        // 生命周期函数--监听页面加载
        var that = this;
        wx.getLocation({
            type: 'gcj02',
            success: function (res) {
                // var latitude = res.latitude;
                // var longitude = res.longitude;
                // var speed = res.speed;
                // var accuracy = res.accuracy;
                that.setData({
                    markers: [{
                        id:1,
                        longitude: res.longitude,
                        latitude: res.latitude,
                        iconPath: "/images/map/site.png",
                        title:"我的位置",
                        width: 30,
                        height: 30,
                    },
                    {
                        longitude: 121.442237,
                        latitude: 31.316484,
                        iconPath: "/images/map/icon.png",
                        title:"东茭泾绿地篮球场",
                        width: 36,
                        height: 41,
                    },
                    {
                        longitude: 121.4675611925,
                        latitude: 31.2474547809,
                        iconPath: "/images/map/icon.png",
                        title:"交通公园篮球场",
                        width: 36,
                        height: 41,
                    }
                    ],
                    longitude:res.longitude,
                    latitude: res.latitude
                })
            }
        });
    },
    getLoaction:function(){
        var that = this;
        wx.openSetting({
          success: (res) => {
            res.authSetting = {
              "scope.userLocation": true
            },
             wx.getLocation({
            type: 'gcj02',
            success: function (res) {
                // var latitude = res.latitude;
                // var longitude = res.longitude;
                // var speed = res.speed;
                // var accuracy = res.accuracy;
                that.setData({
                    markers: [{
                        id:1,
                        latitude: res.latitude,
                        longitude: res.longitude,
                        iconPath: "/images/map/site.png",
                        title:"我的位置",
                        width: 19,
                        height: 32.5,
                    },
                    {
                        latitude: res.latitude+0.001,
                        longitude: res.longitude+0.001,
                        iconPath: "/images/map/icon.png",
                        width: 36,
                        height: 41,
                    },
                    {
                        latitude: res.latitude+0.002,
                        longitude: res.longitude+0.002,
                        iconPath: "/images/map/icon.png",
                        width: 36,
                        height: 41,
                    }
                    ],
                    latitude: res.latitude,
                    longitude: res.longitude,
                })
            }
        });
          }
        })
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
        String7
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