<template>
  <div class="message-box">
    <!-- <div class="message-notification">
      <img src="./../assets/notification-dot.png" />
      <p>{{this.unreadMessages}}</p>
    </div>-->
    <div class="message-top">
      <a
        data-toggle="collapse"
        href="#message-body-wrapper"
        style="position: fixed; height: 25px; width: 200px;"
      ></a>
      <p>Messages</p>
    </div>
    <div class="collapse" id="message-body-wrapper">
      <div class="message-body">
        <div class="switch">Här ska vara en toggle</div>
        <ConversationCardSmall
          v-for="message in this.conversations"
          v-bind:key="message.fromUserID"
          v-bind:fromUserID="message.fromUserID"
          v-bind:fromUserName="message.fromUserName"
          v-bind:fromProfilePicture="message.fromProfilePicture"
          v-bind:numberOfMessages="message.numberOfMessages"
          v-bind:latestTimestamp="message.latestTimestamp"
          v-on:openConversation="openConversation"
        />
      </div>
    </div>
  </div>
</template>
<script>
const env_var = require("./../environment_variables.json");
import ConversationCardSmall from "./MessageComponents/ConversationCardSmall.vue";
import Cookie from "js-cookie";
export default {
  components: { ConversationCardSmall },
  data() {
    return {
      show_messages: false,
      unreadMessages: 0,
      conversations: []
    };
  },
  created() {
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
        console.log(res);
        this.conversations = res;
      });
  },
  methods: {
    toggleShowMessages() {
      this.show_messages = !this.show_messages;
    },
    openConversation(userID, username, userProfilePicture) {
      // this.$emit("openConversation", userID, username);
      //add the conversation to the existing converstaions in the store.
      this.$store.commit("openUserConversation", {
        userID,
        username,
        userProfilePicture
      });
    }
  }
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Nunito");
.message-box {
  right: 20px;
  width: 200px;
  height: auto;
  z-index: 13;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  margin-right: 10px;
}
.message-notification {
  position: absolute;
  top: -8px;
  right: -5px;
  height: 17px;
  width: 17px;
  z-index: 14;
}
.message-notification > img {
  position: absolute;
  height: 100%;
  width: 100%;
}
.message-notification > p {
  position: absolute;
  font-size: 12px;
  top: 0px;
  left: 5px;
  color: whitesmoke;
}
.message-top {
  position: relative;
  width: 100%;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(30, 144, 255);
  border-radius: 5px 5px 0px 0px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.14);
}
.message-top > p {
  color: white;
}
.message-body {
  width: 100%;
  height: 300px;
  background-color: white;
  overflow-y: scroll;
  border-left: solid rgb(221, 223, 226) 1px;
  border-right: solid rgb(221, 223, 226) 1px;
}
p {
  /* font-family: "Nunito", sans-serif; */
  padding: 0px;
  margin: 0px;
}

.switch {
  width: 100%;
  height: 30px;
}

@media only screen and (max-width: 600px) {
  .message-box {
    display: none;
  }
}
</style>

