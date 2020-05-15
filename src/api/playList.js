import request from './request'

/**
 * 歌单页面接口/play-list
 */

/**
 * 调用此接口，可获取歌单分类，包含类别信息
 */
export const getRequestPlayListCatlist = () => {
  return request.get('/playlist/catlist')
}

/**
 * 推荐歌单
 * 
 * @param {Object} params 
 * @param {string} [params.order] 'new'和'hot'，分别对应最新和最热，默认为'hot'
 * @param {string} [params.cat] cat标签，例如“华语”，“古风”，“欧美”，“流行”，默认为“全部”，可从歌单分类接口获取
 * @param {number} [params.limit] 取出评论数量，默认为50
 * @param {string} [params.offset] 分解数量，用于分页，如:(评论页数-1）* 50，其中50为limit的值
 */
export const getRequestPlayList = params => {
  return request.get('/top/playlist', { params })
}

/**
 * 调用此接口，可获取所有榜单内容摘要 
 */
export const getRequestRankList = () => {
  return request.get('/toplist/detail')
}

/**
 * 歌单能看到歌单名字，但看不到具体的歌单内容，调用此接口，指向歌单id，可以获取对应的歌单内的所有的音乐，但返回的trackIds是完整的， tracks则是不完整的，可拿全部trackIds请求一次song/detail接口获取所有歌曲的详情（https://github.com/Binaryify/NeteaseCloudMusicApi/issues/452）
 * 
 * @param {Object} params 
 * @param {string} [params.id] 歌单id
 * @param {string} [params.s] 歌单最近的s一个收藏者
 */
export const getRequestPlayListDetail = params => {
  return request.get('/playlist/detail', { params })
}

/**
 * 专辑 id, 可获得专辑内容
 * 
 * @param {Object} params 
 * @param {string} [params.id] 专辑 id
 */
export const getRequestAlbumDetail = params => {
  return request.get('/album', { params })
}
