<template>
  <div class="profile-cover-large box">
    <div class="content">
      <img v-bind:src="this.profilePicture">
      <p>{{this.username}}</p>
      <p>Joined: {{this.created}}</p>
    </div>
    <div class="background">
      <img v-bind:src="this.backgroundPicture">
    </div>
  </div>
</template>

<script>
export default {
  props: ["username", "profilePicture", "created", "backgroundPicture"]
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
.content > p {
  margin: 4px;
  padding: 0px 4px 0px 4px;
  color: white;
  background-color: black;
  border-radius: 10px;
  border: solid 1px white;
}
</style>