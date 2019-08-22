<template>
  <div :class="['message-bubble-small', this.alignment]">
    <div class="message">
      <p>{{this.message}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["message", "alignment"]
};
</script>

<style scoped>
.message-bubble-small {
  flex-basis: content;
  height: auto;
  width: 70%;
}
.message {
  height: auto;
  width: 100%;
  margin-top: 5px;
  padding: 5px;
  border-radius: 20px;
  background-color: whitesmoke;
}
.message > p {
  font-size: 13px;
  margin: 0px;
  padding: 0px 3px 0px 3px;
}
.left {
  /* margin-right: 30%; */
}
.right {
  margin-left: calc(30%);
}
.right > .message {
  background-color: rgb(24, 202, 63);
  color: white;
}
.right > .message > p {
  /* text-align: right; */
}
</style>