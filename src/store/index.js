import Vue from 'vue'
import Vuex from 'vuex'
import datamining from './modules/datamining'
import analysis from './modules/analysis'
import configs from './modules/configs'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    
  },
  mutations: {
    
  },
  actions: {
    
  },
  getters: {

  },
  modules: {
    datamining,
    analysis,
    configs
  }
})
