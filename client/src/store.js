import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false,
    currentClanID: null,
    userConversations: []
  },
  mutations: {
    logout(state) {
      state.loggedIn = false;
      state.currentClanID = null;
      state.userConversations = [];
    },
    changeLoggedIn(state, loggedInValue) {
      state.loggedIn = loggedInValue;
    },
    changeCurrentClanID(state, currentClanID) {
      state.currentClanID = currentClanID;
    },
    removeCurrentClanID(state) {
      state.currentClanID = null;
    },
    openUserConversation(state, {userID, username}) {
      let foundDouble = false;
      for(var i = 0; i < state.userConversations.length; i++) {
        if(state.userConversations[i].userID == userID) {
          foundDouble = true;
        }
      }
      if(!foundDouble) {
        state.userConversations.unshift({
          userID: userID,
          username: username
        });
      }
    }
  },
  getters: {
    loggedIn: state => state.loggedIn,
    currentClanID: state => state.currentClanID,
    userConversations: state => state.userConversations
  },
  actions: {

  }
})
