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
      bardata,
      bardata,
      bardata
    ]
  },
  mutations: {
    ADD_DATA: (state, data) => state.dataList.push(data)
  },
  actions: {
    addEnvData: ({ commit }, dataInfo) => {
      console.log(dataInfo)
      return new Promise((resolve, reject) => {
        let postBody = new FormData()
        let url = '/data'
        postBody.set('source', dataInfo.dataSource)
        postBody.set('lonMin', dataInfo.scope.lonMin)
        postBody.set('lonMax', dataInfo.scope.lonMax)
        postBody.set('latMin', dataInfo.scope.latMin)
        postBody.set('latMax', dataInfo.scope.latMax)
        postBody.set('heightMin', dataInfo.scope.heightMin)
        postBody.set('heightMax', dataInfo.scope.heightMax)
        postBody.set('measure', dataInfo.measure)
        console.log(postBody.get('lonMin'))
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
