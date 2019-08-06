import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false,
    currentClanID: null
  },
  mutations: {
    changeLoggedIn(state, loggedInValue) {
      state.loggedIn = loggedInValue;
    },
    changeCurrentClanID(state, currentClanID) {
      state.currentClanID = currentClanID;
    },
    removeCurrentClanID(state) {
      state.currentClanID = null;
    }
  },
  getters: {
    loggedIn: state => state.loggedIn,
    currentClanID: state => state.currentClanID
  },
  actions: {

  }
})
