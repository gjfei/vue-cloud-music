import request from './request'

// 排行榜单
export const getRequestRankList = () => {
  return request.get('/toplist/detail')
}