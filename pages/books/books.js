// pages/books/books.js
var Cloud = require('../../utils/av-weapp-min.js')
var Book = Cloud.Object.extend('Book')
var page = 1; //记录用户上拉加载的次数
var cfy;  //将图书分类提升为全局变量
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
    // console.log(options)
    // 拿上个页面传递过来的分类编号cfy，跟LeanCloud数据库Book表中的所有数据的classify做对比
    var that = this;
    cfy = options.cfy || '1';  //解决直接打开当前页面，cfy没有值导致的报错问题
    var query = new Cloud.Query('Book') //创建查询对象
    query.equalTo('classify', cfy)  //设置查询条件
    query.notEqualTo('isDel', true)
    query.limit(12)
    query.find().then(function (res) {  //执行查询操作，得到查询结果
      // res是一个内容较复杂的数组，将我们需要的attributes信息，过滤出来后，放在一个新数组中，供页面使用    
      var arr = [];  //用以存储过滤后的数据
      var Len = res.length;
      for (var i = 0; i < Len; i++) {
        res[i].attributes.objId = res[i].id//在将attributes放入arr之前，先在attributes中放入id
        arr.push(res[i].attributes)
      }
      // setData操作可以为页面动态设置数据，一次性添加的数据不宜过多
      that.setData({
        booksData: arr
      })
    })

  },
  handleDetail: function (ev) {
    var obId = ev.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/books/book-detail?id=' + obId,
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
    // console.log(cfy)
    wx.showLoading({
      title: '正在加载',
    })
    var that = this;
    var bdata = this.data.booksData; //获取已经加载到的所有图书数据
    var query = new Cloud.Query('Book');
    query.equalTo('classify', cfy)
    query.limit(12)
    query.skip(page * 12);
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