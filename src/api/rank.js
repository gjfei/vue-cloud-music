import request from './request'

/**
 * 排行榜页面接口 /rank
 */

/**
 * 调用此接口，可获取所有榜单内容摘要 接口地址
 */
export const getRequestRankList = () => {
  return request.get('/toplist/detail')
}