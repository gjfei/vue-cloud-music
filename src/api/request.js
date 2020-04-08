import axios from 'axios'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.response.use(
  res => {
    if(res.data.code===200){
      return res.data
    }
  },
  err => {
    console.log(err, "网络错误")
  }
)

export default service