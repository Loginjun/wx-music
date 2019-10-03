// component/singer_list/singer-list.js
const API = require('../../API/api');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    singerlist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    this.getSingerList()
  },
  getSingerList:function(){
    API.getSingerList({

    }).then(res => {
      wx.hideLoading()
      if (res.code === 200) {
        // console.log(res.list.artists)
        this.setData({
          singerlist: res.list.artists, //全部歌单30
        })
      }
    })
  },
  showSinger:function(e){
    var id = e.currentTarget.dataset.id;
    // console.log(id)
    wx.navigateTo({
      url: '../../component/singer_detail/singer-detail?id=' + id, //跳歌手详情
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