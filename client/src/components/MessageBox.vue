<template>
  <div class="message-box" v-show="this.$store.getters.loggedIn">
    <div class="message-notification">
      <img src="./../assets/notification-dot.png">
      <p>{{1}}</p>
    </div>
    <div class="message-top">
      <a
        data-toggle="collapse"
        href="#message-body-wrapper"
        style="position: fixed; height: 25px; width: 100%;"
      ></a>
      <p>Meddelanden</p>
    </div>
    <div class="collapse" id="message-body-wrapper">
      <div class="message-body">
        <div v-for="group in this.groups" class="message-grid">
          <p class="from">{{group.groupID}}</p>
          <p class="message">{{group.messages[0].message}}</p>
          <div class="timestamp">
            <p>{{group.messages[0].timestamp.substring(0, 10)}}</p>
            <p>{{group.messages[0].timestamp.substring(11, 16)}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const env_var = require("./../environment_variables.json");
export default {
  data() {
    return {
      show_messages: false,
      unreadMessages: 9,
      groups: []
    };
  },
  created() {
    //get the messages related to the user that is logged in.
    let userid = 2;
    fetch(env_var.BASE_URL + "/messages", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        userid: userid
      }
    })
      .then(res => res.json())
      .then(res => {
        this.groups = res;
      });
  },
  methods: {
    toggleShowMessages() {
      this.show_messages = !this.show_messages;
    }
  }
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Nunito");
.message-box {
  position: fixed;
  bottom: 0px;
  right: 50px;
  width: 200px;
  height: auto;
  margin-right: 20px;
  z-index: 10;
}
.message-notification {
  position: absolute;
  top: -8px;
  right: -5px;
  height: 17px;
  width: 17px;
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
  width: 100%;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(30, 144, 255);
  border-radius: 5px 5px 0px 0px;
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
  font-family: "Nunito", sans-serif;
  padding: 0px;
  margin: 0px;
}
.message-grid {
  width: 100%;
  padding: 2px 5px 2px 5px;
  display: grid;
  grid-template-areas:
    "a c"
    "b c";
  grid-template-columns: 70% 30%;
  grid-template-rows: 20px 30px;
  border-bottom: solid rgb(221, 223, 226) 1px;
}
.message-grid:hover {
  background-color: whitesmoke;
  cursor: pointer;
}
.message-grid > .from {
  grid-area: a;
  font-size: 12px;
  overflow: hidden;
}
.message-grid > .message {
  grid-area: b;
  font-size: 10px;
  overflow: hidden;
}
.message-grid > .timestamp {
  grid-area: c;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 8px;
  overflow: hidden;
}
</style>

