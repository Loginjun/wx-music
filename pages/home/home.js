// pages/home/home.js
const API = require('../../API/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    screenWidth: 0,
    swiperHeight: 0,

    banner:[], //轮播
    songsheet_index: [], //首页歌单列表前6
    songsheet:[], //全部歌单
    newmv:[], //最新mv
    newsong:[], //最新歌曲


    //是否显示图片指示点
    isHasDots: true,
    //未激活指示点颜色
    dotsColor: "rgba(225,225,225,.35)",
    //激活指示点颜色
    dotsActiveColor: '#d43c33',
    //是否自动轮播
    isAutoPlay: true,
    //自动轮播时间
    interval: 3000,
    //动画执行时间
    duration: 1000,
    isCircular: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    // wx.showLoading({
    //   title: '加载中',
    // });
    this.getBanner();
    this.getsongsheet();
    this.getNewmv();
    this.getNewsong();
    // wx.request({
    //   url: 'http://47.100.48.11:4000/banner',
    //   data:{},
    //   method:'GET',
    //   success:function(res){
    //     var datas = res.data;
    //     console.log(datas.banners)
    //     that.setData({ banner: datas.banners })
    //   },
    //   fail:function(){

    //   }
    // })
    //获取系统信息
    var info = wx.getSystemInfoSync();
    console.log('info ==> ', info);

    that.setData({
      screenWidth: info.screenWidth
    })
  },

  getBanner: function () {
    API.getBanner({
      
    }).then(res => {
      if (res.code === 200) { //更加严谨
        this.setData({
          banner: res.banners
        })
      }
    })
  },
  getsongsheet: function () {
    API.getsongsheet({
      hasTaste: 'false'
    }).then(res => {
      // wx.hideLoading()
      if (res.code === 200) {
        // console.log(res.result.slice(0,6))
        this.setData({
          songsheet: res.result, //全部歌单30
          songsheet_index: res.result.slice(0, 6) //歌单前6
        })
      }
    })
  },
  getNewmv:function(){
    API.getNewmv({

    }).then(res=>{
      if (res.code === 200) { //更加严谨
        this.setData({
          newmv:res.data.slice(0,4)
        })
      }
    })
  },
  getNewsong:function(){
    API.getNewsong({

    }).then(res => {
      if (res.code === 200) { //更加严谨
        this.setData({
          newsong: res.result
        })
      }
    })
  },
  loadedImg: function (e) {

    // console.log('e ==> ', e.detail.height);
    //获取原图尺寸
    var originWidth = e.detail.width;
    var originHeight = e.detail.height;

    var height = this.data.screenWidth / originWidth * originHeight;
    // console.log('height ==> ', height);
    this.setData({
      swiperHeight: height
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
  showInput: function (e) {
    wx: wx.navigateTo({
      url: '../search/search'
    })
  },
  showMvRecommend:function(e){
    wx.navigateTo({
      url: '../../component/mv_recommend/mv-recommend', //跳推荐MV
    })
  },
  showHotsheet:function(e){
    wx.navigateTo({
      url: '../../component/hot_sheet/hot-sheet', //跳热门歌单
    })
  },
  showRankingList:function(e){
    wx.navigateTo({
      url: '../../component/ranking_list/ranking-list', //跳排行榜
    })
  },
  showHotSongList:function(e){
    wx.navigateTo({
      url: '../../component/hot_song/hot-song', //跳热歌榜
    })
  },
  showSingerList:function(e){
    wx.navigateTo({
      url: '../../component/singer_list/singer-list', //跳歌手榜
    })
  },
  showSheet:function(e){
    var id = e.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: '../../component/songsheet_list/songsheet-list?id=' +id, //跳歌单详情
    })
  },
  showAnySheet:function(e){
    wx.navigateTo({
      url: '../../component/songsheet_list/anySong-list',  //跳所有歌单
    })
  },
  showMV:function(e){
    var id = e.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: '../../component/mv_list/mv-list-item?id=' + id, //跳最新mv
    })
  },
  showAnyMV:function(e){
    wx.navigateTo({
      url: '../../component/mv_list/mv-list',   //跳全部mv
    })
  },
  playSong:function(e){
    var id = e.currentTarget.dataset.id;
    console.log('songId==>',id)
    wx.navigateTo({
      url: '../../component/play_music/play?id=' +id,   //跳播放音乐
    })
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