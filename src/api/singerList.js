import request from './request'

// 歌手分类
export const getSingerClassify = ()=>{
  return [
    {
      name: "华语男",
      cat: "1001"
    },
    {
      name: "华语女",
      cat: "1002"
    },
    {
      name: "华语组合",
      cat: "1003"
    },
    {
      name: "欧美男",
      cat: "2001"
    },
    {
      name: "欧美女",
      cat: "2002"
    },
    {
      name: "欧美组合",
      cat: "2003"
    },
    {
      name: "日本男",
      cat: "6001"
    },
    {
      name: "日本女",
      cat: "6002"
    },
    {
      name: "日本组合",
      cat: "6003"
    },
    {
      name: "韩国男",
      cat: "7001"
    },
    {
      name: "韩国女",
      cat: "7002"
    },
    {
      name: "韩国组合",
      cat: "7003"
    },
    {
      name: "其他男歌手",
      cat: "4001"
    },
    {
      name: "其他女歌手",
      cat: "4002"
    },
    {
      name: "其他组合",
      cat: "4003"
    }
  ]
}
// 歌手列表
export const getRequestArtistList = (cat,offset=0,initial='') => {
  return request.get(`/artist/list?cat=${cat}&offset=${offset}&limit=50&initial=${initial}`)
}
