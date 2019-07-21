var Cloud = require('../../utils/av-weapp-min.js')
var Classify = new Cloud.Query('classify');
var objId
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classdata: '',
    imgUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    objId = options.objId
    var query = new Cloud.Query('classify');
    query.get(objId).then(function (res) {
      that.setData({
        classdata: res.attributes,
        imgUrl: res.attributes.imgUrl
      })
    }, function (error) {
      wx.showToast({
        title: '加载错误',
      })
    });
  },

  handleAdd: function (ev) {
    var classdata = ev.detail.value;
    classdata.imgUrl = this.data.imgUrl;

    if (objId == '') {//发布新的分类
      var classify = new Classify();
      for (var attr in classdata) {
        classify.set(attr, classdata[attr])
      }

      classify.save().then(function (result) {
        // console.log(result)
        wx.showToast({
          title: '发布成功',
        }),
          wx.navigateBack({
            delta: 1
          })

      })
    } else {//编辑分类
      var that = this;
      var update = Cloud.Object.createWithoutData('classify', objId);
      for (var attr in classdata) {
        update.set(attr, classdata[attr])
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