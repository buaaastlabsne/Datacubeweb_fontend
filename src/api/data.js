import axios from 'axios'

// 后台api地址
const backendAddr = 'http://127.0.0.1:8000/api/'

export function getData (dataSource, showStyle, scope) {
    let url = backendAddr
    url += '?dataSource=' + dataSource
    url += '&showStyle=' + showStyle
    url += '&lonMin=' + scope[0]
    url += '&lonMax=' + scope[1]
    url += '&latMin=' + scope[2]
    url += '&latMax=' + scope[3]
    url += '&heightMin=' + scope[4]
    url += '&heightMax=' + scope[5]
    axios.get(url)
      .then(response => {
        return response.data.data
      })
      .catch(error => {

      })
}