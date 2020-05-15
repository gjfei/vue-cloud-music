import request from './request'

/**
 * 歌手分类
 */
export const getSingerClassify = () => {
  const type = [
    {
      name: '全部',
      val: -1
    },
    {
      name: '男歌手',
      val: 1
    },
    {
      name: '女歌手',
      val: 2
    },
    {
      name: '乐队',
      val: 3
    }
  ]
  const area = [
    {
      name: '全部',
      val: -1
    },
    {
      name: '华语',
      val: 7
    },
    {
      name: '欧美',
      val: 96
    },
    {
      name: '日本',
      val: 8
    },
    {
      name: '韩国',
      val: 16
    },
    {
      name: '其他',
      val: 0
    }]
  const initial = [
    {
      name: '全部',
      val: ''
    },
    {
      name: 'A',
      val: 'A'
    },
    {
      name: 'B',
      val: 'B'
    },
    {
      name: 'C',
      val: 'C'
    },
    {
      name: 'D',
      val: 'D'
    },
    {
      name: 'E',
      val: 'E'
    },
    {
      name: 'F',
      val: 'F'
    },
    {
      name: 'G',
      val: 'G'
    },
    {
      name: 'H',
      val: 'H'
    },
    {
      name: 'I',
      val: 'I'
    },
    {
      name: 'J',
      val: 'J'
    },
    {
      name: 'K',
      val: 'K'
    },
    {
      name: 'L',
      val: 'L'
    },
    {
      name: 'M',
      val: 'M'
    },
    {
      name: 'N',
      val: 'N'
    },
    {
      name: 'O',
      val: 'O'
    },
    {
      name: 'P',
      val: 'P'
    },
    {
      name: 'Q',
      val: 'Q'
    },
    {
      name: 'R',
      val: 'R'
    },
    {
      name: 'S',
      val: 'S'
    },
    {
      name: 'T',
      val: 'T'
    },
    {
      name: 'U',
      val: 'U'
    },
    {
      name: 'V',
      val: 'V'
    },
    {
      name: 'W',
      val: 'W'
    },
    {
      name: 'X',
      val: 'X'
    },
    {
      name: 'Y',
      val: 'Y'
    },
    {
      name: 'Z',
      val: 'Z'
    }
  ]
  return [{ title: '首字母', key: 'initial', list: initial }, { title: '分类', key: 'type', list: type }, { title: '语种', key: 'area', list: area }]
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

/**
 * 歌手列表
 * 
 * @param {Object} params 
 * @param {string} params.id
 */
export const getRequestArtistDetail = params => {
  return request.get('/artists', { params })
}



/**
 * 传入专辑 id, 可获得专辑内容
 * 
 * @param {Object} params 
 * @param {string} [params.id] 专辑 id
 */
export const getRequestAlbumDetail = params => {
  return request.get('/album', { params })
}