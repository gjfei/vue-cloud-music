import Vue from "vue"
import VueToast from "./components"
// toast队列

/// 参考Vant

let toastInstance = null
const defaultOptions = {
  mask: true,
  value: true,
  icon:'',
  message: '',
  duration: 1500
}
// 创建实例对象，如果之前创建过则返回之前的对象
const createInstance = () => {
  if (!toastInstance) {
    const ToastConstructor = Vue.extend(VueToast) // 创建组件的模板（构造函数）
    const toast = new ToastConstructor()
    document.body.appendChild(toast.$mount().$el) // 挂载到 body 下
    toastInstance = toast
  }
  return toastInstance
}
const Toast = (options = {}) => {
  // 获取toast 实例
  const toast = createInstance()
  
  options.hide = () => {
    toast.value = false
  }
  // 合并defaultOptions
  Object.assign(toast, defaultOptions, options)

  clearTimeout(toast.timerId)

  if (toast.duration > 0) {
    toast.timerId = setTimeout(() => {
      toast.hide()
    }, toast.duration)
  }
}

Toast.hide = () => {
  toastInstance.hide()
}
/**
 * 挂载到Vue 在main.js Vue.use(toast) 即可
 * this.$toast({
 * icon: String,
 * mask: Boolean,
 * message: [String, Number],
 * duration: [String, Number],
 * })
 */
Toast.install = () => {
  Vue.use(VueToast)
  Vue.prototype.$toast = Toast
}

export default Toast