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

export const setScrollTop = (el, to, from, duration = 300) => {
  const diff = to - from // 差值
  const count = duration / 10
  const step = diff / count
  let i = 0 // 计数
  const timerId = setInterval(() => {
    if (i < count - 1) {
      el.scrollTop += step
      i++
    } else {
      el.scrollTop = to
      clearInterval(timerId)
    }
  }, 10)
}
// 随机数
export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// 防抖
export const debounce = (func, delay) => {
  let timer
  console.log(timer)
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
      console.log(1)
    }
    timer = setTimeout(() => {
      console.log(123456)
      func.apply(this, args)
      clearTimeout(timer)
    }, delay)
  };
};
