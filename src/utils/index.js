export const setScrollLeft = (el, to, from, duration = 300) => {
  const diff = to - from // 差值
  const count = duration / 10
  const step = diff / count
  let i = 0 // 计数
  const timerId = setInterval(() => {
    if (i < count - 1) {
      el.scrollLeft += step
      i++
    } else {
      el.scrollLeft = to
      clearInterval(timerId)
    }
  }, 10)
}