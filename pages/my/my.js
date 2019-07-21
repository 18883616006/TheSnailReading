// pages/my/my.js
const app = getApp()
var Cloud = require('../../utils/av-weapp-min.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    var query = new Cloud.Query('tb_user');
    query.equalTo('nickName', e.detail.userInfo.nickName);
    query.equalTo('isDel', false); 
    query.find().then(function (res) {
      if (res.length == 0) {
        var User = Cloud.Object.extend('tb_user');
        var user = new User();
        var userdata = e.detail.userInfo;
        for (var attr in userdata) {
          user.set(attr, userdata[attr])
        } 
        user.save().then(function (result) {
          // console.log(result)
          wx.showToast({
            title: '注册成功',
          })
        })
      } else {
        wx.showToast({
          title: '欢迎登录',
        })
      }
      // var clog = res[0].attributes.catalog.split('$');
      // res[0].attributes.catalog = clog;
      // that.setData({
      //   detailData: res[0].attributes,
      //   isAdd: res[0].attributes.bookAdd || false // 3,对本地的isAdd数据进行初始化
      // })
    })

    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })


  },
  handlebookManage:function(){
    wx.navigateTo({
      url: '/pages/my/libraryManage',
    })
  },
  handlereadManage:function(){
    wx.navigateTo({
      url: '/pages/leader/leadManage',
    })
  },
  handleclassifyManage:function(){
    wx.navigateTo({
      url: '/pages/classify/classifyManage',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})