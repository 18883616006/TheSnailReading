// pages/classify/classify.js
var Cloud = require('../../utils/av-weapp-min.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  handleClassify: function (ev) {
    var cfyId = ev.currentTarget.dataset.cfy;
    wx.navigateTo({
      url: '/pages/books/books?cfy=' + cfyId,
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
    var that = this
    wx.showLoading({
      title: '拼命加载中~',
    })

    var that = this
    var query = new Cloud.Query('classify') 
    query.notEqualTo('isDel', true)
    query.find().then(function (res) {  
      var arrhot = [];
      var arrclass = [];
      var Len = res.length;
      for (var i = 0; i < Len; i++) {
        res[i].attributes.objId = res[i].id
        if (res[i].attributes.ishot == 'hot') {
          arrhot.push(res[i].attributes)
        } else {
          arrclass.push(res[i].attributes)
        }

      }
      that.setData({
        hot: arrhot,
        classify: arrclass
      })
      wx.hideLoading()
    })
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