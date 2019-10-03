// component/ranking_list/ranking-list.js
const API = require('../../API/api');
Page({
 
  data: {
    officialList:[],  //官方榜
    recommendList:[],  //推荐榜
    moreList:[]  //更多榜单
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    this.getRankingList();
  },
  getRankingList:function(){
    API.getRankingList({

    }).then(res => {
      wx.hideLoading()
      // console.log(res)
      if (res.code === 200) {
        this.setData({
          officialList: res.list.slice(0,4), //
          recommendList:res.list.slice(4,10),   //
          moreList:res.list.slice(10,26) //
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