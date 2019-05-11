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
</style>


