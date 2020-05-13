import request from './request'

/**
 * 歌手分类
 */
export const getSingerClassify = () => {
  const type = [
    {
      name: '全部',
      key: -1
    },
    {
      name: '男歌手',
      key: 1
    },
    {
      name: '女歌手',
      key: 2
    },
    {
      name: '乐队',
      key: 3
    }
  ]
  const area = [
    {
      name: '全部',
      key: -1
    },
    {
      name: '华语',
      key: 7
    },
    {
      name: '欧美',
      key: 96
    },
    {
      name: '日本',
      key: 8
    },
    {
      name: '韩国',
      key: 16
    },
    {
      name: '其他',
      key: 0
    }]
  const initial = [
    {
      name: 'A',
      key: 'A'
    },
    {
      name: 'B',
      key: 'B'
    },
    {
      name: 'C',
      key: 'C'
    },
    {
      name: 'D',
      key: 'D'
    },
    {
      name: 'E',
      key: 'E'
    },
    {
      name: 'F',
      key: 'F'
    },
    {
      name: 'G',
      key: 'G'
    },
    {
      name: 'H',
      key: 'H'
    },
    {
      name: 'I',
      key: 'I'
    },
    {
      name: 'J',
      key: 'J'
    },
    {
      name: 'K',
      key: 'K'
    },
    {
      name: 'L',
      key: 'L'
    },
    {
      name: 'M',
      key: 'M'
    },
    {
      name: 'N',
      key: 'N'
    },
    {
      name: 'O',
      key: 'O'
    },
    {
      name: 'P',
      key: 'P'
    },
    {
      name: 'Q',
      key: 'Q'
    },
    {
      name: 'R',
      key: 'R'
    },
    {
      name: 'S',
      key: 'S'
    },
    {
      name: 'T',
      key: 'T'
    },
    {
      name: 'U',
      key: 'U'
    },
    {
      name: 'V',
      key: 'V'
    },
    {
      name: 'W',
      key: 'W'
    },
    {
      name: 'X',
      key: 'X'
    },
    {
      name: 'Y',
      key: 'Y'
    },
    {
      name: 'Z',
      key: 'Z'
    }
  ]
  return [{title:'首字母',list:initial}, {title:'类型',list:type},{title:'地区',list:area}]
}
/**
 * 歌手列表
 * 
 * @param {Object} params 
 * @param {string} [params.initial] A-Z首字母
 * @param {string} [params.type] cat分类，getSingerClassify()里的值
 * @param {string} [params.area] cat分类，getSingerClassify()里的值
 * @param {number} [params.limit] 取出评论数量，默认为50
 * @param {string} [params.offset] 分解数量，用于分页，如:(评论页数-1）* 50，其中50为limit的值
 */
export const getRequestArtistList = params => {
  return request.get('/artist/list', { params })
}
