import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userid: 1,
    logintoken: null
  },
  mutations: {
    addLoginCred(state, userid, logintoken) {
      state.userid = userid;
      state.logintoken = logintoken
    }
  },
  getters: {
    userid: state => state.userid
  },
  actions: {

  }
})
