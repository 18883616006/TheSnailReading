// pages/my/libraryManage.js
var Cloud = require('../../utils/av-weapp-min.js')
var page = 1
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    var query = new Cloud.Query('classify') //创建查询对象
    query.notEqualTo('isDel', true)
    query.limit(9)
    query.find().then(function (res) {  //执行查询操作，得到查询结果   
      var arr = [];  //用以存储过滤后的数据
      var Len = res.length;
      for (var i = 0; i < Len; i++) {
        res[i].attributes.objId = res[i].id//在将attributes放入arr之前，先在attributes中放入id
        arr.push(res[i].attributes)
      }
      that.setData({
        classData: arr
      })
    })
  },
  handlechange: function () {
    wx.navigateTo({
      url: '/pages/classify/classifyManageEdit',
    })
  },
  handledel: function (ev) {
    var that = this;
    var objId = ev.currentTarget.dataset.id;
    var classdata = this.data.classData
    var update = Cloud.Object.createWithoutData('classify', objId);
    update.set('isDel', true);
    update.save().then(function (update) {
      var Len = classdata.length
      for (var i = 0; i < Len; i++) {
        if (classdata[i].objId == objId) {
          classdata.splice(i, 1);
          that.setData({
            classData: classdata
          })
        }
      }
    })

  },
  handleedit: function (ev) {
    var objId = ev.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/classify/classifyManageEdit?objId=' + objId,
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
    wx.showLoading({
      title: '正在加载',
    })
    var that = this;
    var bdata = this.data.classData; //获取已经加载到的所有图书数据
    var query = new Cloud.Query('classify');
    query.notEqualTo('isDel', true)
    query.limit(9)
    query.skip(page * 9);
    query.find().then(function (res) {
      wx.hideLoading();
      var Len = res.length;
      if (Len > 0) {
        var arr = [];  //用以存储过滤后的数据
        for (var i = 0; i < Len; i++) {
          res[i].attributes.objId = res[i].id
          arr.push(res[i].attributes)
        }
        var newArr = bdata.concat(arr); //新数据与元数据合并
        that.setData({
          classData: newArr
        })
        page++;
      } else {
        wx.showToast({
          title: '我是有底线的',
          icon: 'none'
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})