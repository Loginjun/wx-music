// component/mv_recommend/mv-recommend.js
const API = require('../../API/api');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    recommendmv:[], //精选MV
    neteasemv:[],   //网易出品
    hongktaiw:[],  //港台
    mainland:[],  //内地
    europeusa:[],  //欧美
    koreamv:[],   //韩国
    japanmv:[]    //日本
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    this.getRecommendmv(), //精选MV
    this.getNetease(),    //网易出品
    this.getHkTwai(),     //港台
    this.getMainland(),   //内地
    this.getEuropeUsa(),   //欧美
    this.getKorea(),      //韩国
    this.getJapan()       //日本
  },
  getRecommendmv:function(){
    API.getRecommendmv({
      
    }).then(res => {
      wx.hideLoading()
      if (res.code === 200) {
        this.setData({
          recommendmv: res.result, //推荐mv 数量4
        })
      }
    })
  },
  getNetease:function(){
    API.getNetease({
      
    }).then(res => {
      wx.hideLoading()
      if (res.code === 200) {
        this.setData({
          neteasemv: res.data.slice(0, 4), //推荐mv 数量4
        })
      }
    })
  },
  getMainland:function(){
    API.getMainland({

    }).then(res => {
      wx.hideLoading()
      if (res.code === 200) {
        this.setData({
          mainland: res.data.slice(0, 4), //推荐mv 数量4
        })
      }
    })
  },
  getHkTwai: function () {
    API.getHkTwai({
     
    }).then(res => {
      wx.hideLoading()
      if (res.code === 200) {
        this.setData({
          hongktaiw: res.data.slice(0, 4), //推荐mv 数量4
        })
      }
    })
  },
  getEuropeUsa:function(){
    API.getEuropeUsa({

    }).then(res => {
      wx.hideLoading()
      if (res.code === 200) {
        this.setData({
          europeusa: res.data.slice(0, 4), //推荐mv 数量4
        })
      }
    })
  },
  getKorea:function(){
    API.getKorea({

    }).then(res => {
      wx.hideLoading()
      if (res.code === 200) {
        this.setData({
          koreamv: res.data.slice(0, 4), //推荐mv 数量4
        })
      }
    })
  },
  getJapan:function(){
    API.getJapan({

    }).then(res => {
      wx.hideLoading()
      if (res.code === 200) {
        this.setData({
          japanmv: res.data.slice(0, 4), //推荐mv 数量4
        })
      }
    })
  },
  showMV: function (e) {
    var id = e.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: '../../component/mv_list/mv-list-item?id=' + id, //跳mv
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