<template>
  <div v-show="this.$store.getters.loggedIn" class="menu-wrapper" ref="menu">
    <div class="menu">
      <div class="friend-requests">
        <div class="section">
          <p>Friend Requests ({{this.friendRequests.length}})</p>
        </div>
        <FriendRequestCard
          v-for="request in this.friendRequests"
          v-bind:key="request.requestID"
          v-bind:requestID="request.requestID"
          v-bind:fromUser="request.fromUser"
          v-bind:username="request.fromUsername"
          v-bind:profilePicture="request.fromProfilePicture"
          v-bind:time="request.time"
        />
        <div class="section">
          <p>Recent Nofitication ({{this.recentNotifications.length}})</p>
        </div>
        <FriendRequestCard
          v-for="request in this.recentNotifications"
          v-bind:key="request.requestID"
          v-bind:requestID="request.requestID"
          v-bind:fromUser="request.fromUser"
          v-bind:username="request.fromUsername"
          v-bind:profilePicture="request.fromProfilePicture"
          v-bind:time="request.time"
        />
        <div class="section">
          <p>Options</p>
        </div>
        <LogoutCard v-on:logout="toggleMenu()" />
      </div>
    </div>
  </div>
</template>

<script>
import Cookie from "js-cookie";
import FriendRequestCard from "./NotificationComponents/FriendRequestCard.vue";
import LogoutCard from "./NotificationComponents/LogoutCard.vue";
import env_variables from "../environment_variables.json";
export default {
  components: {
    FriendRequestCard,
    LogoutCard
  },
  data() {
    return {
      current_width: "0px",
      menu_ref: null,
      friendRequests: [],
      recentNotifications: []
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
      this.recentNotifications.push(JSON.parse(data));
    });

    this.sockets.subscribe("NOTIFICATION_UPDATE", data => {
      console.log(data);
      let parsed_data = JSON.parse(data);
      this.applyServerUpdateOptions(parsed_data.UPDATE_OPTION);
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
        this.updateFriendRequests();
        this.current_width = "250px";
      }
      this.menu_ref.style.width = this.current_width;
    },
    /**
     * This method accounts for the following server update actions:
     * 1. UPDATE_FRIEND_REQUESTS
     */
    applyServerUpdateOptions(action) {
      if (action == "UPDATE_FRIEND_REQUESTS") {
        this.updateFriendRequests();
      }
    },
    updateFriendRequests() {
      fetch(env_variables.BASE_URL + "friendRequests", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          userid: Cookie.get("id")
        }
      })
        .then(res => res.json())
        .then(res => {
          // console.log(res);
          if (res.success != false) {
            this.friendRequests = res;
          }
        });
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
  z-index: 14;
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
  border-bottom: rgb(210, 210, 210) solid 1px;
}
.friend-requests > .section > p {
  font-size: 14px;
  color: grey;
  margin: 0px;
  margin-right: 5px;
}
</style>