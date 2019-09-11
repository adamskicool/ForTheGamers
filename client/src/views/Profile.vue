<template>
  <div class="profile-grid">
    <div class="profile-cover">
      <ProfileCoverLarge
        v-if="this.profileName != null"
        v-bind:userid="this.userid"
        v-bind:username="this.profileName"
        v-bind:profilePicture="this.profilePicture"
        v-bind:created="this.joinDate"
        v-bind:backgroundPicture="this.backgroundPicture"
      />
    </div>
    <div class="content-left">
      <div class="friends box box-hover">
        <p>Friends</p>
        <FriendCardSmall
          v-for="friend in this.friends"
          v-bind:userID="friend.friendUser"
          v-bind:username="friend.friendUsername"
          v-bind:profilePicture="friend.friendProfilePicture"
        />
      </div>
    </div>
    <div class="content-right">
      <div class="clans box box-hover">
        <p>Clans</p>
        <ClanCardSmall
          v-for="clan in this.clans"
          v-bind:key="clan.clanID"
          v-bind:id="clan.clanID"
          v-bind:name="clan.name"
          v-bind:logo="clan.logo"
          v-bind:backgroundPicture="clan.backgroundPicture"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Cookie from "js-cookie";
import FriendCardSmall from "../components/ProfileComponents/FriendCardSmall.vue";
import ClanCardSmall from "../components/ProfileComponents/ClanCardSmall.vue";
import ProfileCoverLarge from "../components/ProfileComponents/ProfileCoverLarge.vue";
import ProfileCoverSmall from "../components/ProfileComponents/ProfileCoverSmall.vue";
import env_variables from "../environment_variables.json";
export default {
  components: {
    FriendCardSmall,
    ClanCardSmall,
    ProfileCoverLarge,
    ProfileCoverSmall
  },
  data() {
    return {
      userid: null,
      profilePicture: null,
      backgroundPicture: null,
      profileName: null,
      joinDate: null,
      clans: null,
      friends: null
    };
  },
  methods: {
    updateProfile(id) {
      this.userid = id;
      // Fetch the users profile.
      fetch(env_variables.BASE_URL + "user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          userid: id
        }
      })
        .then(res => res.json())
        .then(res => {
          this.profilePicture = res.profilePicture;
          this.backgroundPicture = res.backgroundPicture;
          this.profileName = res.username;
          this.joinDate = res.created.substring(0, 10);
        });
    },
    updateClans(id) {
      // fetch the users clans.
      fetch(env_variables.BASE_URL + "clans", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          userid: id
        }
      })
        .then(res => res.json())
        .then(res => {
          this.clans = res;
          // console.log(res);
        });
    },
    updateFriends(id) {
      fetch(env_variables.BASE_URL + "friends", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          userid: id
        }
      })
        .then(res => res.json())
        .then(res => {
          this.friends = res;
        });
    }
  },
  /**
   * When loading the profile, get the profile-details for the user.
   */
  created() {
    this.updateProfile(this.$route.params.userid);
    this.updateClans(this.$route.params.userid);
    this.updateFriends(this.$route.params.userid);
  },
  /**
   * When a user updates the params in the URL - the new profile is loaded.
   */
  beforeRouteUpdate(to, from, next) {
    if (to.name == "Profile") {
      this.updateProfile(to.params.userid);
      this.updateClans(to.params.userid);
      this.updateFriends(to.params.userid);
      next();
    } else {
      next();
    }
  }
};
</script>

<style scoped>
.profile-grid {
  display: grid;
  grid-template-areas:
    ". . a a a a . ."
    ". . . c c . . ."
    ". . b b d d . .";
  grid-template-rows: auto auto auto;
  grid-template-columns: auto 2% 15% 75px 75px 15% 2% auto;
  z-index: 13;
}

.profile-cover {
  margin-top: 10px;
  grid-area: a;
}

.profile-description {
  grid-area: c;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.profile-description > p,
h1 {
  margin: 3px;
  padding: 0px;
}
.profile-description > p {
  font-size: 14px;
}

.content-left {
  grid-area: b;
}
.friends {
  width: 100%;
}

.content-right {
  grid-area: d;
}
.content-left,
.content-right {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.content-left,
.content-right > div {
  width: 100%;
  height: auto;
}

.content-left,
.content-right > div > p {
  margin: 0px;
}
</style>