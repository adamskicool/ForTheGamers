<template>
  <div class="message-box slide-top">
    <div class="message-top">
      <a
        data-toggle="collapse"
        v-bind:href="'#message-body-wrapper' + this.conversationID"
        style="position: fixed; height: 25px; width: 200px;"
      ></a>
      <p>{{this.username}}</p>
      <div class="exit-button" v-on:click="closeConversation">
        <img src="../assets/exit.png" />
      </div>
    </div>
    <div class="collapse" v-bind:id="'message-body-wrapper' + this.conversationID">
      <div class="message-body">
        <div class="message-view">
          <MessageBubbleSmall
            v-for="message in this.messages"
            v-bind:key="message.messageID"
            v-bind:message="message.message"
            v-bind:timestamp="message.timestamp"
            v-bind:userProfilePicture="message.profilePicture"
            v-bind:alignment="checkAlignment(message)"
          />
        </div>
        <div class="message-input">
          <input type="text" placeholder="Type message .." v-model="inputMessage" />
        </div>
        <div class="emoji-picker">
          <!-- <picker
            class="picker"
            v-show="this.showEmojiPicker"
            title="Pick your emoji..."
            v-bind:emojiSize="20"
            v-bind:sheetSize="64"
            v-bind:showPreview="false"
            v-bind:infiniteScroll="false"
            @select="addEmoji"
          />-->
          <button @mousedown.prevent="toggleEmojiPicker()"></button>
        </div>
        <div class="message-button" v-on:click="sendMessage()">
          <img src="../assets/send.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const env_var = require("./../environment_variables.json");
import Cookie from "js-cookie";
import MessageBubbleSmall from "./MessageComponents/MessageBubbleSmall.vue";
import { Picker } from "emoji-mart-vue";
export default {
  props: ["conversationID", "username", "userProfilePicture", "messages"],
  components: {
    MessageBubbleSmall,
    Picker
  },
  created() {
    // alert(this.userProfilePicture);
  },
  data() {
    return {
      inputMessage: "",
      showEmojiPicker: false
    };
  },
  methods: {
    checkAlignment(message) {
      // console.log(message.fromUserID);
      if (message.fromUserID != Cookie.get("id")) {
        return "left";
      } else {
        return "right";
      }
    },
    closeConversation() {
      this.$store.commit("closeConversation", this.conversationID);
    },
    sendMessage() {
      let message = this.inputMessage;
      if (message != null && message != "") {
        let data = {
          fromUser: Cookie.get("id"),
          toUser: this.conversationID,
          message: message
        };
        this.$socket.emit("MESSAGE_SENT", JSON.stringify(data));
        this.inputMessage = null;
      }
    },
    toggleEmojiPicker() {
      this.showEmojiPicker = !this.showEmojiPicker;
    },
    addEmoji(emoji) {
      this.inputMessage += emoji.native;
    }
  }
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Nunito");
.message-box {
  right: 20px;
  width: 180px;
  height: auto;
  z-index: 13;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  margin-right: 10px;
}
.message-top {
  position: relative;
  width: 100%;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(24, 202, 63);
  border-radius: 5px 5px 0px 0px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.14);
}
.message-top > p {
  color: white;
  font-size: 14px;
}
.exit-button {
  position: absolute;
  right: -7px;
  top: -12px;
  height: 20px;
  width: 20px;
}
.exit-button:hover {
  cursor: pointer;
}
.exit-button > img {
  height: 100%;
  width: 100%;
}

.message-body {
  display: grid;
  grid-template-areas:
    "a a a"
    "b d c";
  grid-template-rows: 265px 35px;
  grid-template-columns: calc(100% - 35px - 35px) 35px 35px;
  background-color: white;
  border-left: solid rgb(221, 223, 226) 1px;
  border-right: solid rgb(221, 223, 226) 1px;
}
p {
  /* font-family: "Nunito", sans-serif; */
  padding: 0px;
  margin: 0px;
}

.message-view {
  grid-area: a;
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-start;
  overflow-y: scroll; /* TODO: Fix scrolling */
  padding: 3px;
}
.message-input {
  grid-area: b;
  padding: 0px;
}
.message-input > input {
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 5px;
  font-size: 12px;
  background-color: white;
}
.message-button {
  grid-area: c;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.message-button > img {
  height: 50%;
  width: 50%;
}
.message-button > img:hover {
  opacity: 0.5;
  cursor: pointer;
}
.message-button > img:active {
  opacity: 0.8;
}
.message-input,
.message-button {
  border-top: 1px solid whitesmoke;
}

.emoji-picker {
  position: relative;
  grid-area: d;
  z-index: 100;
  /* overflow: hidden; */
  /* display: none; */
}
.emoji-picker > .picker {
  position: absolute;
  bottom: 150px;
  left: -200px;
}
.emoji-picker > button {
  /* position: fixed;
  bottom: 0px;
  left: 0px; */
}

@media only screen and (max-width: 600px) {
  .message-box {
    display: none;
  }
}
</style>

