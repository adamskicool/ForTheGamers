<template>
  <div class="profile-grid">
    <div class="profile-pic">
      <img v-if="this.profilePicture != null" v-bind:src="this.profilePicture">
    </div>
    <div class="profile-description">
      <h6>{{this.profileName}}</h6>
      <p>Joined: {{this.joinDate}}</p>
    </div>
    <div class="content-left">
      <FriendsCard/>
    </div>
    <div class="content-right">
      <ClansCard/>
    </div>
  </div>
</template>

<script>
import Cookie from "js-cookie";
import FriendsCard from "../components/ProfileComponents/FriendsCard.vue";
import ClansCard from "../components/ProfileComponents/ClansCard.vue";
export default {
  components: {
    FriendsCard,
    ClansCard
  },
  data() {
    return {
      profilePicture: null,
      profileName: null,
      joinDate: null
    };
  },
  /**
   * When loading the profile, get the profile-details for the user.
   */
  created() {
    fetch("http://localhost:8989/api/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        userid: Cookie.get("id")
      }
    })
      .then(res => res.json())
      .then(res => {
        this.profilePicture = res.profilePicture;
        this.profileName = res.username;
        this.joinDate = res.created.substring(0, 10);
      });
  }
};
</script>

<style scoped>
.profile-grid {
  display: grid;
  grid-template-areas:
    ". . a a . ."
    ". . c c . ."
    ". b b d d .";
  grid-template-rows: 150px auto auto;
  grid-template-columns: auto 15% 75px 75px 15% auto;
}

.profile-pic {
  padding: 10px;
  grid-area: a;
}
.profile-pic > img {
  height: 100%;
  width: 100%;
  border-radius: 100%;
  border: 2px solid grey;
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