import restapi from '@/api/restapi'

const datamining = {
  state: {
    bookList: []
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
