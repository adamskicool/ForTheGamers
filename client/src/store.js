import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false
  },
  mutations: {
    changeLoggedIn(state, loggedInValue) {
      state.loggedIn = loggedInValue;
    }
  },
  getters: {
    loggedIn: state => state.loggedIn
  },
  actions: {

  }
})
