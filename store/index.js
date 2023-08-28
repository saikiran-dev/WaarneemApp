import Vue from 'vue'
import Vuex from 'vuex'
import drawer from './modules/drawer'
import record from './modules/record'

Vue.use(Vuex)

export default () =>
  new Vuex.Store({
    modules: {
      drawer,
      record,
    },
  })
