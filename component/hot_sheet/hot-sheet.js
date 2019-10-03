// component/hot_sheet/hot-sheet.js
const API = require('../../API/api');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hotsheet:[] //热门歌单
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    this.getHotsheet()
  },
  getHotsheet:function(){
    API.getHotsheet({

    }).then(res => {
      wx.hideLoading()
      console.log(res)
      if (res.code === 200) {
        this.setData({
          hotsheet: res.playlists //热门歌单
        })
      }
    })
  },
  showSheet: function (e) {
    var id = e.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: '../../component/songsheet_list/songsheet-list?id=' + id,
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