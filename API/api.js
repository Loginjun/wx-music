const API_BASE_URL = 'http://47.100.48.11:4000';
const request = (url, data) => {
  let _url = API_BASE_URL + url;
  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      method: "get",
      data: data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(request) {
        resolve(request.data)

      },
      fail(error) {
        reject(error)
      }
    })
  });
}

module.exports = {
  gethotsongs: (data) => {
    return request('/search/hot', data)//热搜接口
  },
  searchSuggest: (data) => {
    return request('/search/suggest', data)//搜索建议接口
  },
  searchResult: (data) => {
    return request('/search', data)//搜索结果接口
  },
  getBanner: (data) => {
    return request('/banner', data)//轮播
  },
  getRecommendmv: (data) => {
    return request('/personalized/mv', data) //推荐MV
  },
  getHotsheet:(data) =>{
    return request('/top/playlist?limit=60',data)  //热门歌单
  },
  getRankingList: (data) => {
    return request('/toplist/detail',data)  //排行榜
  },
  getSingerList:(data)=>{
    return request('/toplist/artist',data)  //歌手榜
  },
  getsongsheet: (data) => {
    return request('/personalized?limit=', data)//推荐歌单接口
  },
  getNewmv:(data)=>{
    return request('/mv/first?limit=',data) //最新mv
  },
  getNewsong:(data)=>{
    return request('/personalized/newsong',data) //推荐新音乐
  },
  getNetease:(data)=>{
    return request('/mv/exclusive/rcmd?limit=', data) //网易出品MV
  },
  getHkTwai:(data)=>{
    return request('/mv/first?area=港台&limit=',data) //港台mv
  },
  getMainland: (data) => {
    return request('/mv/first?area=内地&limit=', data) //内地mv
  },
  getEuropeUsa:(data) => {
    return request('/mv/first?area=欧美&limit=', data) //欧美mv
  },
  getKorea: (data) => {
    return request('/mv/first?area=韩国&limit=', data) //韩国mv
  },
  getJapan: (data) => {
    return request('/mv/first?area=日本&limit=', data) //日本mv
  }

}