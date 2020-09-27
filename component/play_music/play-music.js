// component/play_music/play-music.js
// const API_BASE_URL = 'http://neteasecloudmusicapi.zhaoboy.com';
const API_BASE_URL = 'https://musicapi.leanapp.cn';

Page({
  /* 页面的初始数据 */
  data: {
    isplaying: false,   //播放开关
    song:[],          //拿音乐 +url 就是音乐地址
    songdetail:[],    //歌曲详情
    currentTime:'',  //当前播放时间
    duration:'',   //总时长
    width:'',   //进度条的宽
    slider_value:''  //进度条当前值
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    var queryId = options.id;
    wx.showLoading({
      title: '加载中',
    });
    // 获取歌曲url
    wx.request({
      url:  'https://music.163.com/song/media/outer/url?id='+queryId+'.mp3',
      // url: API_BASE_URL +'/song/url?br=128000&id='+ queryId,
      data: {},
      method: 'GET',
      success: function (res) {
        wx.hideLoading();
        var datas = res.data.data[0];
        // console.log(datas)
        that.setData({
          song: datas,
        })
      },
      fail: res => wx.showToast({
        title: '网络异常',
      }),
    })
    // 获取歌曲信息
    wx.request({
      url: API_BASE_URL + '/song/detail?ids=' + queryId,
      data: {},
      method: 'GET',
      success: function (res) {
        wx.hideLoading();
        var songdatas = res.data.songs;
        // console.log(res.data.songs)
        that.setData({
          songdetail: songdatas,
        })
      },
      fail: res => wx.showToast({
        title: '网络异常',
      }),
    })

   
  },

  /* 生命周期函数--监听页面显示 */
   
  onShow: function () {
    let that = this;
    this.audioCtx = wx.createAudioContext('myAudio');
    this.audioCtx.play();
    // 获取max最大值 即slidee的宽度
    wx.createSelectorQuery().select('.slider').boundingClientRect(function (rect) {
      console.log('slder宽',rect.width)
      that.setData({
        width: rect.width
      })
    }).exec();

  },
  changeState() {
    if (!this.data.isplaying) {
      this.audioCtx.pause()//歌曲暂停
    } else {
      this.audioCtx.play()//歌曲播放
    }
    this.setData({
      isplaying: !this.data.isplaying
    })
  },
  bindtimeupdate(res) {
    console.log(res)
    // console.log('bindtimeupdate', parseInt(res.detail.currentTime), '时间总时长-->', parseInt(res.detail.duration));
    var start = parseInt(res.detail.currentTime);
    var total = parseInt(res.detail.duration);
    // 计算比例
    var demo = start / total;    
    var left = demo * (this.data.width - 4)
    console.log('应走的left', left, demo)

    start = this.formatTime(start);
    total = this.formatTime(total);
    console.log('开始',start,'总',total)
    
    this.setData({
      currentTime: start,
      duration: total,
      slider_value : left,
    })
    if (start == total){
      this.data.isplaying = !this.data.isplaying;
      this.audioCtx.pause();//歌曲暂停
    }
  },
  // 拖动进度条，到指定位置
  hanle_slider_change(e) {
    const position = e.detail.value
    this.seekCurrentAudio(position)
  },

  formatTime: function(second){
    // 分钟
    // 秒钟
    var min = Math.floor((second % 3600) / 60);
    var sec = Math.floor(second % 60);
    // console.log(min , sec)
    // 三目运算
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    // 返回格式化的时间
    return min + ":" + sec;
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