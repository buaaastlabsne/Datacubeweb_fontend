import axios from 'axios'

const service = axios.create({
  baseURL: 'http://127.0.0.1:8000/api'
})

export default {
  request: (request) => {
    service.request({
      method: request.method,
      url: request.url,
      data: request.data,
    })
    .then(response => {
      if (response.data.code < 300) {
        typeof request.success === 'function' && request.success(response.data.data)
      } else {
        typeof request.error === 'function' && request.error(response.data)
      }
    })
    .catch(error => {
      typeof request.error === 'function' && request.error(error)
    })
  }
}