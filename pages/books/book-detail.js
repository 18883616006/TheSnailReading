// pages/book-detail/book-detail.js
var Cloud = require('../../utils/av-weapp-min.js')
var objId;
var page = 1; //记录用户上拉加载的次数
var bookid;
var Review = Cloud.Object.extend('Review');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: true,
    isAdd: false,  //是否加入书桌的状态控制
    isreviewShow: false,
    isWrite: false,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 最强大脑
    var that = this;
    objId = options.id || '5d11bae3a91c9300727bfe11';
    bookid = objId;
    var query = new Cloud.Query('Book');
    query.equalTo('objectId', objId);
    query.find().then(function (res) {
      var clog = res[0].attributes.catalog.split('$');
      res[0].attributes.catalog = clog;
      that.setData({
        detailData: res[0].attributes,
        isAdd: res[0].attributes.bookAdd || false // 3,对本地的isAdd数据进行初始化
      })
    })

    wx.getUserInfo({
      success: function (res) {
        var avatarUrl = 'userInfo.avatarUrl';
        var nickName = 'userInfo.nickName';
        that.setData({
          [avatarUrl]: res.userInfo.avatarUrl,
          [nickName]: res.userInfo.nickName,
        })
      }
    })

  },
  handlesubmit: function (ev) {  //确认发布
    var review = ev.detail.value;
    if (review.word != null && review.word != "") {
      // console.log(ev)
      var view = new Review();
      view.set('word', review.word)
      view.set('bookId', bookid.toString())

      view.set('username', this.data.userInfo.nickName)
      view.set('userimage', this.data.userInfo.avatarUrl)

      view.save().then(function (res) {
        wx.showToast({
          title: '发布成功',
        })
      })
      this.setData({
        isWrite: !this.data.isWrite,
      })
    }else{
      wx.showToast({
        icon: 'none',
        title: '请先输入内容',
      })
    }
  },
  handlewrite: function () {
    this.setData({
      isWrite: !this.data.isWrite,
    })
  },
  handleTab: function (ev) {
    var idx = ev.currentTarget.dataset.abc;
    var isshow = idx > 0 ? false : true
    this.setData({
      isShow: isshow
    })
  },
  handleAdd: function () { //加入书桌按钮功能 
    // 1，完成本地加入书桌的交互功能 
    var isadd = !this.data.isAdd;
    var str = isadd ? '加入成功' : '移出成功';

    var that = this;
    // 2，实时修改LeanCloud数据库中对应图书的【书桌信息】
    var update = Cloud.Object.createWithoutData('Book', objId);
    update.set('bookAdd', isadd);  //可以为已有数据新增一个字段
    // update.set('bookname', '硅谷钢铁侠');  // 可以对已有数据的已有字段进行修改
    update.save().then(function (res) {
      wx.showToast({
        title: str,
      })
      that.setData({
        isAdd: isadd
      })
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
  onReachBottom: function (options) {
    wx.showLoading({
      title: '正在加载',
    });
    var that = this;
    this.setData({
      isreviewShow: true,
    })
    var query = new Cloud.Query('Review');
    query.equalTo('bookId', bookid);
    query.find().then(function (res) {
      wx.hideLoading();
      var Len = res.length;
      if (Len > 0) {
        var arr = [];  //用以存储过滤后的数据
        for (var i = 0; i < Len; i++) {
          arr.push(res[i].attributes)
        }
        that.setData({
          reviewData: arr,
          reviewNum: arr.length,
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