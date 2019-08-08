<template>
  <div class="friend-request-grid">
    <div class="profile-picture">
      <img v-bind:src="this.profilePicture" />
    </div>
    <div class="profile-info">
      <p>{{this.username}}</p>
      <p style="font-size:10px;">sent you a friend request!</p>
      <p>{{this.time.substring(11, 16)}}</p>
    </div>
    <div class="buttons">
      <div class="button" id="confirm" v-on:click="confirmRequest()">
        <img src="../../assets/plus.png" />
      </div>
      <div class="button" id="deny" v-on:click="denyRequest()">
        <img src="../../assets/plus.png" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["requestID", "fromUser", "username", "profilePicture", "time"],
  methods: {
    // send via sockets that you accept the friend request.
    confirmRequest() {
      let json = {
        requestid: this.requestID,
        accepted_userid: this.fromUser
      };
      this.$socket.emit("ACCEPTED_FRIEND_REQUEST", JSON.stringify(json));
    },
    // send via sockets that you deny the friend request.
    denyRequest() {
      let json = {
        requestid: this.requestID,
        denied_userid: this.fromUser
      };
      this.$socket.emit("DENY_FRIEND_REQUEST", JSON.stringify(json));
    }
  }
};
</script>

<style scoped>
.friend-request-grid {
  display: grid;
  padding: 3px;
  grid-template-areas: "a b c";
  grid-template-rows: 50px;
  grid-template-columns: 50px 100px calc(100% - 150px);
  border-bottom: rgb(235, 238, 241) solid 1px;
}
.friend-request-grid:hover {
  background-color: rgb(250, 250, 250);
}
.profile-picture {
  grid-area: a;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
.profile-picture > img {
  width: 40px;
  height: 40px;
  border: 1px solid grey;
  border-radius: 100%;
}

.profile-info {
  grid-area: b;
  overflow: hidden;
}
.profile-info > p {
  margin: 0px;
  padding: 0px;
  font-size: 12px;
}

.buttons {
  grid-area: c;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.buttons > .button {
  height: 30px;
  width: 30px;
  border-radius: 100%;
  margin: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.buttons > .button:hover {
  cursor: pointer;
}

.buttons > .button > img {
  height: 60%;
  width: 60%;
  filter: invert(100%);
}
#confirm {
  background-color: #238823;
}
#deny {
  background-color: #d2222d;
}
#deny > img {
  transform: rotate(45deg);
}
</style>