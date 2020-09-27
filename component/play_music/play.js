// play.js
// const API_BASE_URL = 'http://47.100.48.11:4000';
// const API_BASE_URL = 'http://neteasecloudmusicapi.zhaoboy.com';

const API_BASE_URL = 'https://musicapi.leanapp.cn';
const API_URL = 'https://music.163.com';
const app = getApp();

Page({
  data: {
    isPlay: '',     //播放状态
    song: [],       //歌曲详情
    singerName:'',   //歌手名
    songImg:'',     //专辑照片
    innerAudioContext: {},  
    time:'',
    lyric: [],     //歌词
    show: true,
    showLyric: true,
    songid: [],
    history_songId: [],
    scrolltop:0
    // currentTime:'',  
    // duration:''
  },
  // onLond,第一次进入则获取到index.js传来的歌曲id --> id传给wx.request的URL，获取到歌曲详情 -->

  onLoad: function (options) {
    console.log('歌曲id',options);
    const audioid = options.id; // onLoad()后获取到歌曲视频之类的id
    this.play(audioid); //把从wxml获取到的值传给play()
  },

  play: function (audioid) {
    const audioId = audioid;
    // console.log(that.data.songid)
    app.globalData.songId = audioId;  //让每一个要播放的歌曲ID给全局变量的songId
    console.log('把', app.globalData.songId, '传入全局变量中')

    const innerAudioContext = wx.createInnerAudioContext();
    var musicUrl = API_URL+'/song/media/outer/url?id='+audioId+'.mp3'
    this.setData({
      innerAudioContext,
      isPlay: true,
      music_url : musicUrl
    })

    // 请求歌曲音频的地址，失败则播放出错，成功则传值给createBgAudio(后台播放管理器，让其后台播放)
    // wx.request({
    //   // url:  API_URL + '/song/media/outer/url?id='+audioId+'.mp3',
    //   url: API_BASE_URL + '/song/url',
    //   data: {
    //     id: audioId
    //   },
    //   method: 'GET',
    //   success: res => {
    //     // console.log('歌曲音频url:', res.data.data[0])
    //     if (res.data.data[0].url === null) {  //如果是MV 电台 广告 之类的就提示播放出错，并返回首页
    //       // console.log('播放出错')
    //       wx.showModal({
    //         content: '服务器开了点小差~~',
    //         cancelColor: '#DE655C',
    //         confirmColor: '#DE655C',
    //         showCancel: false,
    //         confirmText: '返回',
    //         complete() {
    //           wx.navigateBack({
    //             delta: 1
    //           })
    //         }
    //       })
    //     } else {
    //       // 异步操作先等song赋值后才能拿到歌名赋值给后台播放器
    //       setTimeout(()=>{
    //         this.createBgAudio(res.data.data[0]);
    //       },100)
    //       // this.frontAudio(res.data.data[0])
    //     }
    //   }
    // })

    //获取到歌曲音频，则显示出歌曲的名字，歌手的信息，即获取歌曲详情；如果失败，则播放出错。
    wx.request({
      url: API_BASE_URL + '/song/detail',
      data: {
        ids: audioId    //必选参数ids
      },
      method: 'GET',
      success: res => {
        // console.log('歌曲详情', res);
        if (res.data.songs.length === 0) {
          // console.log('无法获取到资源')
          wx.showModal({
            content: '服务器开了点小差~~',
            cancelColor: '#DE655C',
            confirmColor: '#DE655C',
            showCancel: false,
            confirmText: '返回',
            complete() {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        } else {
          // console.log(res.data.songs[0].ar[0].name)   //歌手名字
          this.setData({
            song: res.data.songs[0],               //获取到歌曲的详细内容，传给song
            songImg: res.data.songs[0].al.picUrl,   //歌背景图  因为下面要用到，传给后台的播放器
            singerName: res.data.songs[0].ar[0].name  //歌手名字
          })
          // console.log(res.data.songs[0].name)
          app.globalData.songName = res.data.songs[0].name;
        }
      },
    })

    // 获取歌词
    wx.request({
      
      // url: API_BASE_URL + '/lyric',
      url: API_URL + '/api/song/media',
      data:{
        id:audioId
      },
      method: 'GET',
      success: res => {
        // console.log('歌词',res.data)
        // 整理拿到的数组歌词
        // let arr = res.data.lrc.lyric;
        let arr = res.data.lyric;

        let timearr = arr.split('[') 
        let obj = {}
        let lyricArr = []
        // seek 为键  歌词为value
        timearr.forEach((item) => {

          let key = parseInt(item.split(']')[0].split(':')[0]) * 60 + parseInt(item.split(']')[0].split(':')[1])

          let val = item.split(']')[1]

          obj[key] = val
        })
        for (let key in obj) {
          lyricArr.push(obj[key])  //把上面数据全都push到lyricArr里面
        }

        lyricArr = lyricArr.slice(0, lyricArr.length - 1)   //截取数组，去掉数组最后一个undefined

        // console.log(lyricArr)
        this.setData({
          lyric: lyricArr   //赋值
        })
      },
      fail: res => {
        // fail
      },
      complete: res => {
        // complete
      },
    })
  },

  createBgAudio(res) {
    console.log('createBgAudio====>',res)

    const bgAudioManage = wx.getBackgroundAudioManager(); //获取全局唯一的背景音频管理器。并把它给实例bgAudioManage
    app.globalData.bgAudioManage = bgAudioManage;         //把实例bgAudioManage(背景音频管理器) 给 全局
    bgAudioManage.src = res.url;                          // res.url 在createBgAudio 为 mp3音频  url为空，播放出错
    bgAudioManage.title = this.data.song.name;            //把title 音频标题 给实例
    bgAudioManage.coverImgUrl = this.data.songImg         //专辑图片
    bgAudioManage.singer = this.data.singerName           //歌手名

    const history_songId = this.data.history_songId
    const historySong = {
      // id: res.id
      id: app.globalData.songId,
      songName: app.globalData.songName
    }
    history_songId.push(historySong)
    bgAudioManage.onPlay(res => {                         // 监听背景音频播放事件
      this.setData({
        isPlay: true,
        history_songId
      })
    });

    bgAudioManage.onEnded(() => {                  //监听背景音乐自然结束事件，结束后自动播放下一首。自然结束，调用go_lastSong()函数，即歌曲结束自动播放下一首歌
      this.go_lastSong();
    })
    wx.setStorageSync('historyId', history_songId); //把historyId存入缓存
  },

  // --------------进度条----------------------
  // bindtimeupdate(res) {
  //   console.log(res)
  //   // console.log('bindtimeupdate', parseInt(res.detail.currentTime), '时间总时长-->', parseInt(res.detail.duration));
  //   var start = parseInt(res.detail.currentTime);
  //   var total = parseInt(res.detail.duration);
  //   start = this.formatTime(start);
  //   total = this.formatTime(total);
  //   console.log('开始', start, '总', total)
  //   var demo = start / total;
  //   var left = demo.
  //     this.setData({
  //       currentTime: start,
  //       duration: total
  //     })
  // },
  // formatTime: function (second) {
  //   // 分钟
  //   // 秒钟
  //   var min = Math.floor((second % 3600) / 60);
  //   var sec = Math.floor(second % 60);
  //   // console.log(min , sec)
  //   // 三目运算
  //   min = min < 10 ? "0" + min : min;
  //   sec = sec < 10 ? "0" + sec : sec;
  //   // 返回格式化的时间
  //   return min + ":" + sec;
  // },

  // 播放和暂停
  handleToggleBGAudio() {
    // const innerAudioContext = app.globalData.innerAudioContext;
    const bgAudioManage = app.globalData.bgAudioManage;
    const { isPlay } = this.data;
    if (isPlay) {
      bgAudioManage.pause();
      // innerAudioContext.pause();handleToggleBGAudio
    } else {
      bgAudioManage.play();
      // innerAudioContext.play();
    }
    this.setData({
      isPlay: !isPlay
    })
    console.log(this.data.isPlay)
  },

  // 点击切换歌词和封面
  showLyric() {
    const { showLyric } = this.data;
    this.setData({
      showLyric: !showLyric
    })
  },

  go_index: function () {
    // console.log(1)
    // wx.reLaunch({
    //   url:'../pages/index/index'
    // })
    wx.navigateBack({
      delta: 1
    })
  },

  go_lastSong: function () {
    let that = this;
    const lastSongId = app.globalData.waitForPlaying;
    // console.log(lastSongId)
    const songId = lastSongId[Math.floor(Math.random() * lastSongId.length)]; //随机选取lastSongId数组的一个元素
    // console.log(songId)

    that.data.songid = songId;
    this.play(songId)//传进play()方法中
    app.globalData.songId = songId;
    // console.log(that.data.songid);

    // wx.getStorageSync({
    //   key: 'songid',
    //   success: function (res) {
    //     console.log(res.data)
    //   }
    // })
  },
  
})