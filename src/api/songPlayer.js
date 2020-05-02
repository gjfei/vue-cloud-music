import request from './request'

//拼接出歌曲的url链接
export const getRequestSongUrl = id => {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}
// 获取歌曲详情 传入音乐 id(支持多个 id, 用 , 隔开)
export const getRequestSongDetail = ids => {
  return request.get(`/song/detail?ids=${ids}`)
}
// 获取歌词
export const getRequestLyric = id => {
  return request.get(`/lyric?id=${id}`)
}