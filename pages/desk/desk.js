// pages/desk/desk.js
var Cloud = require('../../utils/av-weapp-min.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 0,
    isShow: false,  //控制书桌所有图书列表的显示
    isCheckShow: false, //控制勾选按钮的显示隐藏
    footShow:false, //控制管理界面的底部工具栏
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  handleChange: function (ev) {
    var idx = ev.detail.current;
    this.setData({
      num: idx
    })
  },
  handleDetial:function(ev){
    var bookid = ev.currentTarget.dataset.bookid; //获取勾选图书的序号
    console.log(bookid);
    wx.navigateTo({
      url: '/pages/books/book-detail?id=' + bookid,
    })
    // console.log(this.data.deskData);
  },
  handleShow: function () {
    this.setData({
      isShow: true
    })
  },
  handleHide: function () {//隐藏遮罩
    this.setData({
      isShow: false
    })
  },
  handleCheck: function (ev) { //【2】每个图书的勾选事件
    var idx = ev.currentTarget.dataset.idx; //获取勾选图书的序号
    var deskdata = this.data.deskData;  //获取所有数据
    deskdata[idx].isCheck = !deskdata[idx].isCheck; //找到点击的那条数据，并修改其勾选状态
    this.setData({
      deskData: deskdata
    })
  },
  handleEdit: function () { //控制勾选按钮的显示隐藏
    var ischeckshow = !this.data.isCheckShow;
    this.setData({
      isCheckShow: ischeckshow,
      footShow: !this.data.footShow,
    })
  },
  handleDel: function () {  //【删除】批量移出书桌
    var deskdata = this.data.deskData;
    var objects = [];  //存放被勾选图书信息
    for (var i = 0; i < deskdata.length; i++) {
      if (deskdata[i].isCheck) {
        var update = Cloud.Object.createWithoutData('Book', deskdata[i].objId)
        update.set('bookAdd', false);
        objects.push(update)
      }
    }
    var that=this
    
    Cloud.Object.saveAll(objects).then(function (res) {
      
      var Len = res.length
      for (var i = 0; i < Len; i++) {
        for (var j = 0; j < deskdata.length; j++) {
          if (res[i].id == deskdata[j].objId) {
            deskdata.splice(j, 1);
            that.setData({
              deskData: deskdata
            })
            break;
          }
        }
      }

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
    var that = this;
    var query = new Cloud.Query('Book');
    query.equalTo('bookAdd', true)
    query.find().then(function (res) {
      var Len = res.length;
      var arr = [];
      for (var i = 0; i < Len; i++) {
        res[i].attributes.objId = res[i].id;
        res[i].attributes.isCheck = false; //【1】为每一本图书新增一个控制勾选的字段
        arr.push(res[i].attributes)
      }
      that.setData({
        deskData: arr,
        isShow:false
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})