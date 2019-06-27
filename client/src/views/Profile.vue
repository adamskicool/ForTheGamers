<template>
  <div class="profile-grid">
    <div class="profile-cover">
      <ProfileCoverLarge
        v-if="this.profileName != null"
        v-bind:username="this.profileName"
        v-bind:profilePicture="this.profilePicture"
        v-bind:created="this.joinDate"
        v-bind:backgroundPicture="this.backgroundPicture"
      />
      <!-- <img v-if="this.profilePicture != null" v-bind:src="this.profilePicture"> -->
    </div>
    <!-- <div class="profile-description">
      <h6>{{this.profileName}}</h6>
      <p>Joined: {{this.joinDate}}</p>
    </div>-->
    <div class="content-left">
      <FriendsCard/>
    </div>
    <div class="content-right">
      <ClansCard v-bind:id="this.$route.params.userid"/>
    </div>
  </div>
</template>

<script>
import Cookie from "js-cookie";
import FriendsCard from "../components/ProfileComponents/FriendsCard.vue";
import ClansCard from "../components/ProfileComponents/ClansCard.vue";
import ProfileCoverLarge from "../components/ProfileComponents/ProfileCoverLarge.vue";
import ProfileCoverSmall from "../components/ProfileComponents/ProfileCoverSmall.vue";
export default {
  components: {
    FriendsCard,
    ClansCard,
    ProfileCoverLarge,
    ProfileCoverSmall
  },
  data() {
    return {
      userid: null,
      profilePicture: null,
      backgroundPicture: null,
      profileName: null,
      joinDate: null
    };
  },
  methods: {
    updateProfile(id) {
      this.userid = id;
      fetch("http://localhost:8989/api/user", {
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
    }
  },
  /**
   * When loading the profile, get the profile-details for the user.
   */
  created() {
    this.updateProfile(this.$route.params.userid);
  },
  /**
   * When a user updates the params in the URL - the new profile is loaded.
   */
  beforeRouteUpdate(to, from, next) {
    if (to.name == "Profile") {
      next();
      this.updateProfile(this.$route.params.userid);
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
</style>