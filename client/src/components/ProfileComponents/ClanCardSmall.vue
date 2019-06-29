<template>
  <div class="clan box">
    <div class="content">
      <img v-bind:src="this.logo" alt>
      <p>{{this.name}}</p>
    </div>
    <div class="background">
      <img v-bind:src="this.backgroundPicture">
    </div>
  </div>
</template>

<script>
import Cookie from "js-cookie";
export default {
  props: ["id", "name", "logo", "backgroundPicture"]
};
</script>

<style scoped>
.clan {
  position: relative;
  height: auto;
  border-radius: 10px;
  padding: 0px;
  overflow: hidden;
  padding: 4px;
  margin-top: 5px;
}

.content {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 2;
}
.content > img {
  width: 30px;
  height: 30px;
  border-radius: 100%;
}
.content > p {
  margin: 0px;
  margin-left: 4px;
  color: white;
}

.background {
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 1;
}
.background > img {
  width: 100%;
  filter: blur(0.5px) brightness(100%);
  transition: all 200ms ease-in-out;
}
.background:hover > img {
  filter: blur(0px);
}
.content:hover ~ .background > img {
  filter: blur(0px) brightness(90%);
}
</style>