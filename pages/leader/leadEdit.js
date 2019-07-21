var Cloud = require('../../utils/av-weapp-min.js')
var objId
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leaderdata: '',
    imgUrlAph: '',
    imgUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    objId = options.objId
    console.log(objId)
    var query = new Cloud.Query('Leader');
    query.get(objId).then(function (res) {
      that.setData({
        leaderdata: res.attributes,
        imgUrlAph: res.attributes.aPhoto,
        imgUrl: res.attributes.bigImg
      })
    }, function (error) {
      wx.showToast({
        title: '加载错误',
      })
    });
  },

  handleAdd: function (ev) {
    var leaderdata = ev.detail.value;
    leaderdata.imgUrlAph = this.data.aPhoto;
    leaderdata.imgurl = this.data.bigImg;

    if (objId == '') {
      var lead = new Leader();
      for (var attr in leaderdata) {
        lead.set(attr, leaderdata[attr])
      }

      lead.save().then(function (result) {
        // console.log(result)
        wx.showToast({
          title: '发布成功',
        }),
          wx.navigateBack({
            delta: 1
          })

      })
    } else {
      var that = this;
      var update = Cloud.Object.createWithoutData('Leader', objId);
      for (var attr in leaderdata) {
        update.set(attr, leaderdata[attr])
      }
      update.save().then(function (result) {
        wx.showToast({
          title: '发布成功',
        }),
          wx.navigateBack({
            delta: 1
          })
      })
    }


  },

  handleUpload: function (ev) { //上传图片
    var abc = ev.currentTarget.dataset.abc;
    console.log(abc)
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
          if (abc == 1) {
            that.setData({
              imgUrlAph: url
            })
          } else {
            that.setData({
              imgUrl: url
            })
          }

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