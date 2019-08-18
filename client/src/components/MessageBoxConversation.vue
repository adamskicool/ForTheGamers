<template>
  <div class="message-box slide-top">
    <div class="message-top">
      <a
        data-toggle="collapse"
        v-bind:href="'#message-body-wrapper' + this.conversationID"
        style="position: fixed; height: 25px; width: 200px;"
      ></a>
      <p>{{this.username}}</p>
    </div>
    <div class="collapse" v-bind:id="'message-body-wrapper' + this.conversationID">
      <div class="message-body"></div>
    </div>
  </div>
</template>
<script>
const env_var = require("./../environment_variables.json");
import Cookie from "js-cookie";
export default {
  props: ["conversationID", "username"]
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Nunito");
.message-box {
  right: 20px;
  width: 180px;
  height: auto;
  z-index: 13;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  margin-right: 10px;
}
.message-top {
  position: relative;
  width: 100%;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(24, 202, 63);
  border-radius: 5px 5px 0px 0px;
}
.message-top > p {
  color: white;
}
.message-body {
  width: 100%;
  height: 300px;
  background-color: white;
  overflow-y: scroll;
  border-left: solid rgb(221, 223, 226) 1px;
  border-right: solid rgb(221, 223, 226) 1px;
}
p {
  /* font-family: "Nunito", sans-serif; */
  padding: 0px;
  margin: 0px;
}

.slide-top {
  -webkit-animation: slide-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: slide-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

@-webkit-keyframes slide-top {
  0% {
    -webkit-transform: translateY(20px);
    transform: translateY(20px);
  }
  100% {
    -webkit-transform: translateY(0px);
    transform: translateY(0px);
  }
}
@keyframes slide-top {
  0% {
    -webkit-transform: translateY(20px);
    transform: translateY(20px);
  }
  100% {
    -webkit-transform: translateY(0px);
    transform: translateY(0px);
  }
}

@media only screen and (max-width: 600px) {
  .message-box {
    display: none;
  }
}
</style>

