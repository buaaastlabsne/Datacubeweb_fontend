import restapi from '@/api/restapi'

const datamining = {
  state: {
    bookList: [],
    algorithms: [
      {
        algorithmId: 'fafafeegwg1341',
        algorithmName: 'K-means聚类分析',
      },
      {
        algorithmId: 'fagagteege2344',
        algorithmName: 'FCM聚类分析'
      },
      {
        algorithmId: 'fafafeegwg313',
        algorithmName: 'SVR预测回归',
      }
    ],
  },
  mutations: {
    LIST_BOOKS: (state, data) => state.bookList = data
  },
  actions: {
    listBooks: ({ commit }) => {
      return new Promise((resolve, reject) => {
        restapi.request({
          method: 'get',
          url: `/show_books`,
          success: sdata => {
            commit('LIST_BOOKS', sdata)
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

export default datamining
