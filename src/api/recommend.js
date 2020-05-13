import request from './request'

/**
 * 推荐页面 /
 */

/**
 * 调用此接口，可获取banner（轮播图）数据
 * @param {Object} [params]
 * @param {number} [params.type] 0: pc 1: android 2: iphone 3: ipad
 */
export const getRequestBanner = params => {
  return request.get('/banner', { params })
}

/**
 * 调用此接口，可获取banner（轮播图）数据
 * @param {Object} [params]
 * @param {number} [params.limit] limit取出数量，默认为30（不支持offset）
 */
export const getRequestRecommendList = params => {
  return request.get('/personalized',{params})
}