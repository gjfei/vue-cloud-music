import request from './request'

// 歌单分类
export const getRequestPlayListCatlist = () => {
  return request.get('/playlist/catlist')
}

// 推荐歌单
export const getRequestPlayList = (cat='',offset=0) => {
  return request.get(`/top/playlist?cat=${cat}&offset=${offset}&limit=30`)
}

// 排行榜单
export const getRequestRankList = () => {
  return request.get('/toplist/detail')
}

// 歌单详情
export const getRequestPlayListDetail = (id) => {
  return request.get(`/playlist/detail?id=${id}`)

}