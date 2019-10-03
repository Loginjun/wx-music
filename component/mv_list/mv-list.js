// component/mv_list/mv-list.js
const API = require('../../API/api');
Page({

  data: {
    anymv:[] //所有最新mv
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.showLoading({
      title: '加载中',
    });
    this.getNewmv();
  },
  getNewmv: function () {
    API.getNewmv({

    }).then(res => {
      wx.hideLoading()
      if (res.code === 200) { //更加严谨
        this.setData({
          anymv: res.data
        })
      }
    })
  },
  showMV: function (e) {
    var id = e.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: '../mv_list/mv-list-item?id=' + id, //跳mv
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