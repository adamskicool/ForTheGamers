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
    <div class="messaging" v-show="this.$store.getters.loggedIn">
      <!-- <MessageBoxConversation v-bind:conversationID="1" v-bind:username="'Sara'" />
      <MessageBoxConversation v-bind:conversationID="2" v-bind:username="'Johan Carlsson'" />-->
      <MessageBoxConversation
        v-for="conversation in this.$store.state.userConversations"
        v-bind:key="conversation.userID"
        v-bind:conversationID="conversation.userID"
        v-bind:username="conversation.username"
        v-bind:userProfilePicture="conversation.userProfilePicture"
        v-bind:messages="conversation.messages"
      />
      <!-- <MessageBox v-on:openConversation="openConversation" /> -->
      <MessageBox />
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import SideMenu from "./components/SideMenu.vue";
import MessageBox from "./components/MessageBox.vue";
import MessageBoxConversation from "./components/MessageBoxConversation.vue";
import GroupBox from "./components/GroupBox.vue";
export default {
  components: {
    Header,
    SideMenu,
    MessageBox,
    MessageBoxConversation,
    GroupBox
  },
  data() {
    return {
      sidemenu: null,
      conversations: []
    };
  },
  mounted() {
    //find the side menu and store a refrence to it in this component.
    this.sidemenu = this.$refs["side-menu"];
  },
  created() {
    this.sockets.subscribe("MESSAGE_RECIEVED", data => {
      let parsed_data = JSON.parse(data);
      // console.log(parsed_data);
      this.$store.commit("updateConversation", parsed_data);
    });
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
  grid-template-rows: 60px calc(100% - 60px);
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
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 200ms ease;
}
.box-hover:hover {
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.15);
  /* transform: scale(1.001); */
}

.rounded-image {
  height: 90%;
  width: 90%;
  border-radius: 100%;
  border: 1px solid rgb(220, 220, 220);
}

/**
  General styling for buttons.
 */
.input-field {
  outline: none;
  border: none;
  background-color: whitesmoke;
  border-radius: 10px;
  color: black;
}
.blue-button {
  outline: none;
  border: none;
  background-color: rgb(30, 144, 255);
  border-radius: 10px;
  color: white;
}

/* For fading between different views */
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.1s;
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

.messaging {
  position: fixed;
  bottom: 0px;
  height: 40px;
  width: 100vw;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding-right: 20px;
  padding-left: 20px;
  overflow: visible;
  z-index: 13;
}

/* animation, add this when you want the div to slide up on creation. */
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

/* 
 * TODO: This animations is janky, it isn´t working 
 * correctly and affects the wrong target when adding new messages
 */
.scale-up-ver-bottom {
  -webkit-animation: scale-up-ver-bottom 0.4s
    cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation: scale-up-ver-bottom 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}

/* ----------------------------------------------
 * Generated by Animista on 2019-8-29 22:2:8
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation scale-up-ver-bottom
 * ----------------------------------------
 */
@-webkit-keyframes scale-up-ver-bottom {
  0% {
    -webkit-transform: scaleY(0);
    transform: scaleY(0);
    -webkit-transform-origin: 0% 100%;
    transform-origin: 0% 100%;
  }
  100% {
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
    -webkit-transform-origin: 0% 100%;
    transform-origin: 0% 100%;
  }
}
@keyframes scale-up-ver-bottom {
  0% {
    -webkit-transform: scaleY(0.4);
    transform: scaleY(0.4);
    -webkit-transform-origin: 0% 100%;
    transform-origin: 0% 100%;
  }
  100% {
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
    -webkit-transform-origin: 0% 100%;
    transform-origin: 0% 100%;
  }
}
</style>


