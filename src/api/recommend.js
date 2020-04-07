import request from './request'

export const getRequestBanner = () => {
  return request.get("/banner");
};