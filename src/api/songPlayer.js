import request from './request'

/**
 * 播放器接口
 */

/**
 * 拼接歌曲地址
 * 
 * @param {string} id 音乐id
 */

export const getRequestSongUrl = id => {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}
/**
 * 调用此接口，引入音乐id（支持多个id，使用,替换），并添加歌曲详情（注意：歌曲封面现在需要通过专辑内容接口获取）
 * 
 * @param {Object} params 
 * @param {string} params.ids ids音乐id，如ids=347230
 */
export const getRequestSongDetail = params => {
  return request.get('/song/detail', { params })
}

/**
 * 引入音乐id或对应音乐的歌词（
 * 
 * @param {Object} params 
 * @param {string} params.id 音乐id
 */
export const getRequestLyric = params => {
  return request.get('/lyric', { params })
}