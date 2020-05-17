import axios from 'axios'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
  withCredentials: true
})

service.interceptors.response.use(
  res => {
    if (res.data.code === 200) {
      return res.data
    }
  },
  err => {
    this.$toast({
      icon: 'error',
      message: err.message
    })
    console.log(err)
  }
)

export default service