import request from './request'

// 轮播图
export const getRequestBanner = () => {
  return request.get('/banner')
}

// 推荐歌单
export const getRequestRecommendList = () => {
  return request.get('/personalized')
}