// pages/my/libraryManage.js
var Cloud = require('../../utils/av-weapp-min.js')
var page=1
Page({

  /**
   * 页面的初始数据
   */
  data: {
    booksData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  handlechange:function(){
    wx.navigateTo({
      url: '/pages/my/libraryManageEdit',
    })
  },
  handledel:function(ev){
    var that=this;
    var objId = ev.currentTarget.dataset.id;
    var booksdata = this.data.booksData
    var update = Cloud.Object.createWithoutData('Book', objId);
    update.set('isDel', true);
    update.save().then(function (update) { 
      var Len = booksdata.length
      for (var i = 0; i < Len;i++){
        if (booksdata[i].objId == objId) {
          booksdata.splice(i, 1);
          that.setData({
            booksData: booksdata
          })
        }
      }
    })

  },
  handleedit:function(ev){
    var objId = ev.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/my/libraryManageEdit?objId=' + objId,
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

    var query = new Cloud.Query('Book') //创建查询对象
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
        booksData: arr
      })
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
    wx.showLoading({
      title: '正在加载',
    })
    var that = this;
    var bdata = this.data.booksData; //获取已经加载到的所有图书数据
    var query = new Cloud.Query('Book');
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
          booksData: newArr
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