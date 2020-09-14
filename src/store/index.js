import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'

const store = Vuex.createStore({
  modules: {
    app,
  },
  getters
})

export default store
