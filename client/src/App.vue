<template>
  <div id="app">
    <div class="grid">
      <div class="header">
        <Header v-on:menu_clicked="handleMenuClicked" />
      </div>
      <div class="content">
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </div>
    </div>
    <SideMenu ref="side-menu" />
    <MessageBox />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import SideMenu from "./components/SideMenu.vue";
import MessageBox from "./components/MessageBox.vue";
import GroupBox from "./components/GroupBox.vue";
export default {
  components: {
    Header,
    SideMenu,
    MessageBox,
    GroupBox
  },
  data() {
    return {
      sidemenu: null
    };
  },
  mounted() {
    //find the side menu and store a refrence to it in this component.
    // console.log(this.$refs["side-menu"]);
    this.sidemenu = this.$refs["side-menu"];
  },
  methods: {
    handleMenuClicked() {
      this.sidemenu.toggleMenu();
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Noto+Sans+HK&display=swap");
@import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro&display=swap");
#app {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  /* font-family: "Noto Sans HK", sans-serif; */
  /* font-family: "Roboto", sans-serif; */
  font-family: "Source Sans Pro", sans-serif;
}
.grid {
  display: grid;
  grid-template-areas:
    "a"
    "b";
  grid-template-rows: 60px calc(100vh - 60px);
  grid-template-columns: 100vw;
}
.header  {
  grid-area: a;
}
.content {
  grid-area: b;
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
  margin: 2px;
  padding: 5px;
  border-radius: 3px;
}

.box-hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 200ms ease;
}
.box-hover:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transform: scale(1.002);
}

/* For fading between different views */
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.15s;
  transition-property: opacity;
  transition-timing-function: ease-in-out;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.header-empty {
  width: 100vw;
  height: 60px;
}
</style>


