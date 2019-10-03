// component/songsheet_list/anySong-list.js
const API = require('../../API/api');

Page({

  data: {
    songsheet: [], //歌单全部
  },

  onLoad: function () {
    wx.showLoading({
      title: '加载中',
    });
    this.getsongsheet();
  },
  getsongsheet: function () {
    API.getsongsheet({
      hasTaste: 'false'
    }).then(res => {
      wx.hideLoading()
      if (res.code === 200) {
        this.setData({
          songsheet: res.result, //全部歌单30
        })
      }
    })
  },
  showSheet: function (e) {
    var id = e.currentTarget.dataset.id;
    // console.log(id)
    wx.navigateTo({
      url: '../../component/songsheet_list/songsheet-list?id=' + id,
    })
  },
})