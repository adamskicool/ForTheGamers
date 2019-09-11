<template>
  <div class="friend-card-small-grid" v-on:click="redirectToProfile()">
    <div class="profile-pic">
      <img class="rounded-image" v-bind:src="profilePicture" />
    </div>
    <div class="username">
      <h6>{{this.username}}</h6>
    </div>
  </div>
</template>

<script>
export default {
  props: ["userID", "username", "profilePicture"],
  methods: {
    redirectToProfile() {
      // this.$router.push("profile/" + this.userID);
      this.$router.push({
        name: "Profile",
        params: { userid: this.userID }
      });
    }
  }
};
</script>

<style scoped>
.friend-card-small-grid {
  display: grid;
  grid-template-areas: "a b";
  grid-template-rows: 40px;
  grid-template-columns: 40px calc(100% - 40px);
  border-radius: 5px;
}
.friend-card-small-grid:hover {
  cursor: pointer;
  background-color: whitesmoke;
}

.profile-pic {
  grid-area: a;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.username {
  grid-area: b;
  display: flex;
  align-items: center;
}
</style>