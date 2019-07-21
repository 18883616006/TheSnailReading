// pages/read-detail/read-detail.js
var listD = require('../../utils/listData.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailData:[],
    isCollect: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options) //通过options拿到上个页面传递的参数
    var idx = options.abc;
    // console.log(listD[idx])
    this.setData({
      detailData: listD[idx]
    })
  },
  handleCollect: function () {
    var iscollect = !this.data.isCollect;
    if (iscollect) {
      wx.showToast({
        title: '已收藏',
        icon: 'none'
      })
    } else {
      wx.showToast({
        title: '已取消',
        icon: 'none'
      })
    }
    this.setData({
      isCollect: iscollect
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