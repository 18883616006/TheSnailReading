var Cloud = require('../../utils/av-weapp-min.js')
var objId
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookdata:'',
    imgUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    objId=options.objId||''
    if (objId == null || objId == '' || objId==""){

    }
    else{
      var query = new Cloud.Query('Book');
      query.get(objId).then(function (res) {
        that.setData({
          bookdata: res.attributes,
          imgUrl: res.attributes.imgurl
        })
      }, function (error) {
        wx.showToast({
          title: '加载错误',
        })
      });
    }
  },

  handleAdd:function(ev){
    var bookdata = ev.detail.value;
    bookdata.imgurl = this.data.imgUrl;

    if (objId==''){
      var book = new Book();
      for (var attr in bookdata) {
        book.set(attr, bookdata[attr])
      }

      book.save().then(function (result) {
        // console.log(result)
        wx.showToast({
          title: '发布成功',
        }),
          wx.navigateBack({
            delta:1
          })

      })
    }else{
      var that = this;
      var update = Cloud.Object.createWithoutData('Book', objId);
      for (var attr in bookdata) {
        update.set(attr, bookdata[attr])
      } 
      update.save().then(function (res) {
        wx.showToast({
          title: '发布成功',
        }),
          wx.navigateBack({
            delta: 1
          })
      })
    }
  },
  
  handleUpload: function () { //上传图片
    var that = this;
    wx.chooseImage({
      count: 2,
      success: function (res) {
        var tempFile = res.tempFilePaths[0] //拿到本地图片的临时存放路径

        new Cloud.File('file-name', {  //使用LeanCloud提供的方法，创建图片资源对象
          blob: {
            uri: tempFile,
          },
        }).save().then(function (obj) { //图片资源对象save成功后的回调
          var url = obj.attributes.url //得到上传成功后图片的线上路径
          that.setData({
            imgUrl: url
          })
        })

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
    var that = this
    var query = new Cloud.Query('Book');
    query.get(objId).then(function (res) {
      that.setData({
        bookdata: res.attributes,
        imgUrl: res.attributes.imgurl
      })
    }, function (error) {
      wx.showToast({
        title: '加载错误',
      })
    });
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