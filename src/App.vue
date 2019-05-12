<template>
  <div id="app">
    <Header/>
    <router-view/>
    <MessageBox/>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import MessageBox from "./components/MessageBox.vue";
import GroupBox from "./components/GroupBox.vue";
export default {
  components: {
    Header,
    MessageBox,
    GroupBox
  }
};
</script>

<style>
#app {
  height: 100vh;
}
.messages {
  position: absolute;
  bottom: 0px;
  width: 100vw;
  display: flex;
  flex-direction: row-reverse;
}
.box {
  background-color: white;
  border: rgb(221, 223, 226) solid 1px;
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
}
</style>


