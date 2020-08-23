import restapi from '@/api/restapi'
import linedata from '@/assets/dataset/linedata.js'
import bardata from '@/assets/dataset/bardata.js'

const analysis = {
  state: {
    dashboards: [
      {
        dashboardId: 'fafafeegwg13413',
        dashboardName: '北半球标准大气',
      },
      {
        dashboardId: 'fagagteege23434',
        dashboardName: '综合气象大面分集'
      },
      {
        dashboardId: 'fafafeegwg3413',
        dashboardName: '大气风场数据分析',
      }
    ],
    dataList: [
      {
        "list": linedata.list
      },
      bardata
    ]
  },
  mutations: {
    ADD_DATA: (state, data) => state.dataList.push(data)
  },
  actions: {
    addData: ({ commit }, dataSource, scope) => {
      return new Promise((resolve, reject) => {
        let postBody = new FormData()
        let url = '/api/analysis'
        postBody.set('dataSource', dataSource)
        postBody.set('lonMin', scope[0])
        postBody.set('lonMax', scope[1])
        postBody.set('latMin', scope[2])
        postBody.set('latMax', scope[3])
        postBody.set('heightMin', scope[4])
        postBody.set('heightMax', scope[5])
        postBody.set('measure', measure)
        restapi.request({
          method: 'post',
          url: url,
          data: postBody,
          success: sdata => {
            commit('ADD_DATA', sdata)
            resolve(sdata)
          },
          error: reject
        })
      })
    },
  },
  getters: {

  }
}

export default analysis
