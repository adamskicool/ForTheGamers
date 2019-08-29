<template>
  <div :class="[this.alignment, 'scale-up-ver-bottom']">
    <div class="profile-picture">
      <img v-bind:src="this.userProfilePicture" />
    </div>
    <div class="message">
      <p>{{this.message}}</p>
    </div>
    <div class="timestamp">
      <p>{{this.formatTimestamp(this.timestamp)}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["message", "timestamp", "userProfilePicture", "alignment"],
  methods: {
    formatTimestamp(timestamp) {
      let day_ago = new Date();
      day_ago.setDate(day_ago.getDate() - 1);
      if (new Date(timestamp) < day_ago) {
        return timestamp.substring(0, 10);
      } else {
        return timestamp.substring(11, 16);
      }
    }
  }
};
</script>

<style scoped>
.left,
.right {
  display: grid;
  grid-template-areas:
    ". b"
    "a b"
    ". b"
    ". c";
  grid-template-columns: 23px calc(100% - 23px);
  grid-template-rows: 5px 23px auto;
  height: auto;
  width: 80%;
}
.right {
  grid-template-areas:
    "b ."
    "b a"
    "b ."
    "c .";
  grid-template-columns: calc(100% - 25px) 25px;
  grid-template-rows: 5px 25px auto auto;
  margin-left: calc(20%);
}
.right > .message {
  background-color: rgb(24, 202, 63);
  color: white;
}

.message {
  grid-area: b;
  height: auto;
  width: 100%;
  margin-top: 5px;
  padding: 4px;
  border-radius: 13px;
  background-color: whitesmoke;
}
.message > p {
  font-size: 13px;
  margin: 0px;
  padding: 0px 3px 0px 3px;
}
.profile-picture {
  grid-area: a;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1px;
}
.profile-picture > img {
  height: 90%;
  width: 90%;
  border-radius: 100%;
}

.timestamp {
  grid-area: c;
  height: auto;
}
.timestamp > p {
  padding: 0px;
  margin: 0px;
  font-size: 0px;
  transition: font-size linear 100ms;
  transition-delay: 1s;
}
.message:hover ~ .timestamp > p {
  font-size: 8px;
}
</style>