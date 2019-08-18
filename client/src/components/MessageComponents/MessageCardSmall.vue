<template>
  <div class="message-grid">
    <p class="from">{{this.fromUserName}}</p>
    <p class="message">{{this.numberOfMessages}}</p>
    <div class="timestamp">
      <p>{{this.latestTimestamp.substring(11, 16)}}</p>
    </div>
    <div class="profile-picture">
      <img v-bind:src="this.fromProfilePicture" />
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "fromUserID",
    "fromUserName",
    "fromProfilePicture",
    "numberOfMessages",
    "latestTimestamp"
  ]
};
</script>

<style scoped>
.message-grid {
  width: 100%;
  padding: 3px;
  display: grid;
  grid-template-areas:
    "p a c"
    "p b c";
  grid-template-columns: 40px calc(100% - 70px) 30px;
  grid-template-rows: 20px 20px;
  border-bottom: solid rgb(221, 223, 226) 1px;
}
.message-grid:hover {
  background-color: whitesmoke;
  cursor: pointer;
}
.message-grid:active {
  background-color: rgb(240, 240, 240);
  cursor: pointer;
}
.from {
  grid-area: a;
  font-size: 12px;
  overflow: hidden;
}
.message {
  grid-area: b;
  font-size: 10px;
  overflow: hidden;
}
.timestamp {
  grid-area: c;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 8px;
  overflow: hidden;
}
.profile-picture {
  grid-area: p;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.profile-picture > img {
  height: 90%;
  width: 90%;
  border-radius: 100%;
  border: 1px solid rgb(230, 230, 230);
  z-index: 100;
}

p {
  /* font-family: "Nunito", sans-serif; */
  padding: 0px;
  margin: 0px;
}
</style>