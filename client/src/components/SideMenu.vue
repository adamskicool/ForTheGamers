<template>
  <div class="menu-wrapper" ref="menu">
    <div class="menu">
      <div class="friend-requests">
        <div class="section">
          <p>Friend Requests ({{this.friendRequests.length}})</p>
        </div>
        <FriendRequestCard
          v-for="request in this.friendRequests"
          v-bind:key="request.requestID"
          v-bind:fromUser="request.fromUser"
          v-bind:username="request.fromUsername"
          v-bind:profilePicture="request.fromProfilePicture"
          v-bind:time="request.time"
        />
        <div class="section">
          <p>Recent Nofitication ({{this.recentNotifications.length}})</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Howl, Howler } from "howler";
import Cookie from "js-cookie";
import FriendRequestCard from "./NotificationComponents/FriendRequestCard.vue";
export default {
  components: {
    FriendRequestCard
  },
  data() {
    return {
      current_width: "0px",
      menu_ref: null,
      friendRequests: [],
      recentNotifications: [],
      //does not work as of yet!
      notification_sound: new Howl({
        src: [
          "client/src/assets/Full Despicable Me Theme Song - Pharrell Williams.mp3"
        ]
      })
    };
  },
  /**
   * When created, this component subscribes to multiple socket.io-events for different
   * happenings, namely:
   * 1. An incomming friend request.
   * 2. More to come...
   */
  created() {
    //fetch current friend requests.
    this.updateFriendRequests();

    this.sockets.subscribe("FRIEND_REQUEST_UPDATE", data => {
      console.log(data);
      this.playNotificationsSound();
      // console.log(this.notification_sound);
      this.friendRequests.push(JSON.parse(data));
    });
  },
  mounted() {
    this.menu_ref = this.$refs["menu"];
    // console.log(this.menu_ref);
  },
  methods: {
    toggleMenu() {
      if (this.current_width == "250px") {
        this.current_width = "0px";
      } else {
        this.current_width = "250px";
      }
      this.menu_ref.style.width = this.current_width;
    },
    playNotificationsSound() {
      // alert("Playing sounds!");

      this.notification_sound.play();
    },
    updateFriendRequests() {
      fetch("http://localhost:8989/api/friendRequests", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          userid: Cookie.get("id")
        }
      })
        .then(res => res.json())
        .then(res => (this.friendRequests = res));
    }
  }
};
</script>

<style scoped>
.menu-wrapper {
  position: absolute;
  top: 60px;
  right: 0px;
  height: calc(100vh - 60px);
  width: 0px;
  background-color: white;
  border-left: rgb(221, 223, 226) solid 1px;
  transition: all 300ms ease-in-out;
  overflow: scroll;
  z-index: 12;
}
.menu {
  height: 100%;
  width: 250px;
  padding-bottom: 40px;
}

.friend-requests {
  width: 100%;
  height: auto;
}
.friend-requests > .section {
  height: 25px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: rgb(240, 240, 240);
}
.friend-requests > .section > p {
  font-size: 14px;
  color: grey;
  margin: 0px;
  margin-right: 5px;
}
</style>