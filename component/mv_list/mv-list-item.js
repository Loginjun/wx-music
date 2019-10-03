// component/mv_list/mv-list-item.js
const API_BASE_URL = 'http://47.100.48.11:4000';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mvdetail:[],       //MV内容详情
    hotComments:[],    //热门评论
    moreComments:[],   //最新评论
    total:[]          //评论总数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    var queryId = options.id;
    console.log('mv-queryId ==> ', queryId);
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: API_BASE_URL + '/mv/detail?mvid=' + queryId,  //拿MV详情
      data: {},
      method: 'GET',
      success: function (res) {
        wx.hideLoading();
        var datas = res.data;
        // console.log(datas.data)
        that.setData({
          mvdetail: datas.data
        })
      },
      fail: function (err) {
        console.log(err)
      }
    });
    wx.request({
      url: API_BASE_URL + '/comment/mv?id=' + queryId,  //拿mv的评论数据
      data:{},
      method:'GET',
      success: function(res){
        console.log(res.data.hotComments)
        that.setData({
          hotComments: res.data.hotComments,
          moreComments: res.data.comments,
          total: res.data.total
        })
      },
      fail: function (err) {
        console.log(err)
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