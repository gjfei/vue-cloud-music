import request from './request'

/**
 * 搜索页面 /search
 */

/**
 * 获取默认搜索关键词
 */
export const getRequestSearchDefault = () => {
  return request.get('/search/default')
}

/**
 * 可获取热门搜索列表
 */
export const getRequestSearchHot = () => {
  return request.get('/search/hot/detail')
}

/**
 * 搜索建议
 * @param {Object} params 
 * @param {string} params.keywords 关键词
 * @param {string} [params.type ] 如果传 'mobile' 则返回移动端数据
 */
export const getRequestSearchSuggest = params => {
  return request.get('/search/suggest', { params })
}

/**
 * 传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户 , 关键词可以多个 , 以空格隔开 , 如 " 周杰伦 搁浅 "( 不需要登录 ), 搜索获取的 mp3url 不能直接用 , 可通过 /song/url 接口传入歌曲 id 获取具体的播放链接
 * @param {Object} params 
 * @param {string} params.keywords  关键词
 * @param {string} [params.limit] 默认为 30 offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * @param {string} [params.type] 默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
 * 
 */
export const getRequestSearchList = params => {
  return request.get('/search', { params })
}

/**
 * 获取搜索类型
 */
export const getSearchType = () => {
  return {
    songs: {
      title: '单曲',
      icon: 'musical-note',
      key: 1
    },
    albums: {
      title: '专辑',
      icon: 'play-list',
      key: 10
    },
    artists: {
      title: '歌手',
      icon: 'people',
      key: 100
    },
    playlists: {
      title: '歌单',
      icon: 'play-list',
      key: 1000
    },
    mvs: {
      title: '视频',
      icon: 'stop-square',
      key: 1014
    }
  }
}


