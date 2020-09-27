// component/songsheet_list/songsheet-list.js
const API_BASE_URL = 'https://musicapi.leanapp.cn';

// 歌单详情
Page({
  /**
   * 页面的初始数据
   */
  data: {
    sheetsong: [],
    name:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let that = this;
    var queryId = options.id;
    console.log('queryId ==> ', queryId);
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: API_BASE_URL + '/playlist/detail?id=' + queryId,
      data:{},
      method: 'GET',
      success: function (res) {
        wx.hideLoading();
        var datas = res.data;
        // console.log(datas.playlist)
          that.setData({
            sheetsong: datas.playlist,
            name: datas.playlist.creator
          })
      },
      fail:function(err){
        console.log(err)
      }
    })
    
  },
  playSong: function (e) {
    var id = e.currentTarget.dataset.id;
    console.log('songId==>', id)
    wx.navigateTo({
      url: '../../component/play_music/play?id=' + id,   //跳播放音乐
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