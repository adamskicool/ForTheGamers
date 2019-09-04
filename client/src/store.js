import Vue from 'vue'
import Vuex from 'vuex'
const env_var = require("./environment_variables.json")
import Cookie from "js-cookie"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false,
    currentClanID: null,
    /**
     * An object that is placed inside userConversations must consist, at least, of these components:
     * {
     *  userID: "User id of the user whom you´re chatting with.",
     *  userProfilePicture: "Profile image of the user to chat with."
     *  username: "Username of the user to chat with."
     *  messages: [
     *    {
     *      fromUserID: "",
     *      fromUsername: "",
     *      message: "",  
     *      messageID: "",
     *      profilePicture: "URL",
     *      timestamp: "xx/xx/xx yy:yy:yy",      
     *    },
     *    ...
     *  ]
     * }
     */
    userConversations: [],
    conversationList: []
  },
  mutations: {
    logout(state) {
      state.loggedIn = false;
      state.currentClanID = null;
      state.userConversations = [];
      state.conversationList = [];
    },
    changeLoggedIn(state, loggedInValue) {
      state.loggedIn = loggedInValue;
      if(state.loggedIn) {
        this.commit("updateConversationList");
      }
    },
    changeCurrentClanID(state, currentClanID) {
      state.currentClanID = currentClanID;
    },
    removeCurrentClanID(state) {
      state.currentClanID = null;
    },
    /**
     * Update the converstaions.
     */
    updateConversationList(state) {
      //get the messages related to the user that is logged in.
      fetch(env_var.BASE_URL + "userConversations", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          userid: Cookie.get("id")
        }
      })
        .then(res => res.json())
        .then(res => {
          // console.log(res);
          state.conversationList = res;
        });
    },
    /**
     * Open a new conversation box, preloaded with the messages of the conversation
     * TODO: Right now it reads all messages at the start, change this to read the 10 first, and
     * succesively load more as the user scrolls up to read more messages.
     */
    openUserConversation(state, { userID, username, userProfilePicture }) {
      console.log(state.userConversations);
      let foundDouble = false;
      for (var i = 0; i < state.userConversations.length; i++) {
        if (state.userConversations[i].userID == userID) {
          foundDouble = true;
        }
      }
      //ifall konversationen inte redan var öppen... öppna den!
      if (!foundDouble) {
        let json = {
          userID: userID, //användarID på den personen som konversationen tillhör
          username: username,
          userProfilePicture: userProfilePicture,
          messages: []
        }
        //hämta alla meddelanden som tillhör konversationen.
        fetch(env_var.BASE_URL + "conversationMessages", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            user1: Cookie.get("id"),
            user2: userID
          }
        })
          .then(res => res.json())
          .then(res => {
            json.messages = res
            // console.log(res);
            state.userConversations.unshift(json);
          });
      }
    },
    /**
     * Update a conversation with a new message. this is here for snappy updates via the integrated socket.io component.
     */
    updateConversation(state, { conversationID, fromUser, profilePicture, message, timestamp }) {
      //hitta den konversation med användare ID fromUserID
      for (var i = 0; i < state.userConversations.length; i++) {
        if (state.userConversations[i].userID == conversationID) {
          //TODO: Lägg till i databasen så att båda användarnas profilbilder finns med.
          let json = {
            fromUserID: fromUser,
            profilePicture: profilePicture,
            message: message,
            timestamp: timestamp
          }
          //lägg till meddelandet i konversationen.
          state.userConversations[i].messages.unshift(json)
          break;
        }
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
