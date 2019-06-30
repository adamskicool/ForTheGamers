<template>
  <div class="profile-cover-large box">
    <div class="content">
      <img v-bind:src="this.profilePicture" />
      <p>{{this.username}}</p>
      <p>Joined: {{this.created}}</p>
      <button v-show="!me()" v-on:click="sendFriendRequest()">+ friend request</button>
    </div>
    <div class="background">
      <img v-bind:src="this.backgroundPicture" />
    </div>
  </div>
</template>

<script>
import Cookie from "js-cookie";
export default {
  props: [
    "userid",
    "username",
    "profilePicture",
    "created",
    "backgroundPicture"
  ],
  methods: {
    me() {
      console.log(this.userid + " = " + Cookie.get("id"));
      if (this.userid == Cookie.get("id")) {
        console.log("true");
        return true;
      } else {
        console.log("false");
        return false;
      }
    },
    sendFriendRequest() {
      let socket_content = JSON.stringify({
        user1: Cookie.get("id"),
        user2: this.userid
      });
      this.$socket.emit("FRIEND_REQUEST_SENT", socket_content);
    }
  },
  created() {
    this.sockets.subscribe("FRIEND_REQUEST_TEST", data => {
      console.log(data);
    });
  }
};
</script>

<style scoped>
.profile-cover-large {
  padding: 0px;
  border-radius: 10px;
  width: 100%;
  height: auto;
  position: relative;
  overflow: hidden;
}
.background {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  overflow: hidden;
  z-index: 2;
  transition: all 700ms ease;
}
.background > img {
  width: 100%;
  height: 100%;
}
/* transform the sibling, that is the background... */
.content:hover ~ .background {
  transform: scale(1.03);
}

.content {
  position: relative;
  top: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  z-index: 100;
}
.content > img {
  width: 120px;
  height: 120px;
  border-radius: 100%;
  border: solid 2px white;
}
.content > p,
button {
  margin: 4px;
  padding: 0px 4px 0px 4px;
  color: white;
  background-color: black;
  border-radius: 10px;
  border: solid 1px white;
}
.content > button:hover {
  background-color: rgb(50, 50, 50);
}
.content > button:active {
  outline: none;
}
</style>