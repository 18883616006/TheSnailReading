// pages/read/read.js
//var listD = require('../../utils/listData.js') //引入js数据包模块
var Cloud = require('../../utils/av-weapp-min.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData:[],
    isManage: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var query = new Cloud.Query('Leader') //创建查询对象
    query.notEqualTo('isDel', true)
    query.find().then(function (res) {  //执行查询操作，得到查询结果 
      var arr = [];  //用以存储过滤后的数据
      var Len = res.length;
      for (var i = 0; i < Len; i++) {
        res[i].attributes.objId = res[i].id
        arr.push(res[i].attributes)
      }
      // setData操作可以为页面动态设置数据，一次性添加的数据不宜过多
      that.setData({
        listData: arr
      })
    })

  },

  handlechange: function () {
    wx.navigateTo({
      url: '/pages/leader/leadEdit',
    })
  },
  handledel: function (ev) {
    var that = this;
    var objId = ev.currentTarget.dataset.id;

    var listdata = this.data.listData

    var update = Cloud.Object.createWithoutData('Leader', objId);
    update.set('isDel', true);
    update.save().then(function (update) {
      var Len = listdata.length
      for (var i = 0; i < Len; i++) {
        if (listdata[i].objId == objId) {
          listdata.splice(i, 1);
          that.setData({
            listData: listdata
          })
        }
      }
    })

  },
  handleedit: function (ev) {
    var objId = ev.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/leader/leadEdit?objId=' + objId,
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