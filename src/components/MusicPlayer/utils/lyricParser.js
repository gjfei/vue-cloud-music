/**
 * 传入歌词，按照正则表达式解析
 *
 * @param  {[String]} data 歌词格式 '[time] 歌词'
 * @return {[Array]}       [{time:时间,text:歌词}]
 */
export default function (data) {
  const result = []
  data = data.split('\n') // 回车分割数组
  data.forEach(item => {
    if (item) {
      let time = item.slice(item.indexOf('[') + 1, item.indexOf(']')).split(':') // 获取时间
      time = Number(time[0]) * 60 + Number(time[1]) // 转换成秒
      const text = item.slice(item.indexOf(']') + 1) // 获取歌词内容
      // 歌词为空
      if (text) {
        const obj = {
          time,
          text
        }
        result.push(obj)
      }
    }
  })
  return result
}