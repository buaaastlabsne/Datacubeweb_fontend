import restapi from '@/api/restapi'

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
    wind0: []
  },
  mutations: {
    GET_WIND0: (state, data) => state.wind0 = data
  },
  actions: {
    getWind0: ({ commit }) => {
      return new Promise((resolve, reject) => {
        restapi.request({
          method: 'get',
          url: `/testjson`,
          success: sdata => {
            commit('GET_WIND0', sdata)
            resolve(sdata)
          },
          error: reject
        })
      })
    }
  },
  getters: {

  }
}

export default analysis
