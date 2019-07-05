<template>
  <div class="header-grid" v-show="this.$store.getters.loggedIn">
    <!-- Options to login -->
    <div class="logout">
      <div class="menu-button">
        <img src="../assets/menu.png" v-on:click="$emit('menu_clicked')" />
      </div>
      <!-- <button v-on:click="logout()">Log out</button> -->
    </div>
    <!-- Main options for navigating the different part of the application -->
    <div class="main-options">
      <div class="option">
        <button v-on:click="redirect('/giveaway')">Give Aways</button>
      </div>
      <div class="option">
        <button v-on:click="redirectProfile()">Profile</button>
      </div>
      <div class="option">
        <button v-on:click="redirect('/search')">Search</button>
      </div>
      <div class="option">
        <button v-on:click="redirect('/home')">Home</button>
      </div>
    </div>
    <div class="logo bounce-top">
      <h3>CLANDOO</h3>
    </div>
  </div>
</template>

<script>
const Cookie = require("js-cookie");
export default {
  methods: {
    redirect(path) {
      this.$router.push(path);
    },
    redirectProfile() {
      this.$router.push("/profile/" + Cookie.get("id"));
    },
    logout() {
      Cookie.remove("JWT");
      Cookie.remove("id");
      this.$store.commit("changeCurrentClanID", null);
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Nunito");
/* 
Setup the grid of the header.
*/
.header-grid {
  position: absolute;
  top: 0px;
  display: grid;
  grid-template-areas:
    "b . c"
    "b a c";
  grid-template-columns: 200px calc(100vw - 400px) 200px;
  grid-template-rows: 10px 50px;
  z-index: 10;
  background-color: rgb(30, 144, 255);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}
/*
Style the main options of the header... the buttons in the middle of the header.
*/
.main-options {
  grid-area: a;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.option {
  height: 100%;
  padding: 0px 10px 0px 10px;
  margin: 0px 5px 0px 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px 8px 0px 0px;
}
.option > button {
  border: none;
  background-color: rgba(0, 0, 0, 0);
  outline: none;
  /* font-family: "Nunito", sans-serif; */
  font-size: 15px;
  color: white;
}
.option > button:hover {
  color: black;
}
.option:hover {
  background-color: rgb(233, 235, 238);
  color: black;
}

.logout {
  grid-area: c;
  display: flex;
  justify-content: center;
  align-items: center;
}
.logout > .menu-button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
.logout > .menu-button > img {
  height: 25px;
  width: 25px;
  filter: invert(100%);
}
.logout > .menu-button > img:hover {
  cursor: pointer;
}

.login-drop-down {
  position: relative;
  top: 60px;
  left: 0px;
  width: 200px;
  height: 200px;
  background-color: green;
}

@import url("https://fonts.googleapis.com/css?family=Aladin|Amita|Delius+Swash+Caps|Delius+Unicase|Grand+Hotel|Itim|Just+Me+Again+Down+Here|Leckerli+One|Merienda+One|Niconne|Norican|Pacifico|Rancho|Rochester|Vibur|Yesteryear&display=swap");
.logo {
  grid-area: b;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-family: "Delius swash caps", cursive;
}
.logo > h3 {
  margin: 0px;
}
.side-menu {
  grid-area: d;
  pointer-events: none;
}

.bounce-top {
  -webkit-animation: bounce-top 0.9s both;
  animation: bounce-top 0.9s both;
}

@keyframes bounce-top {
  0% {
    -webkit-transform: translateY(-45px);
    transform: translateY(-45px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
    opacity: 1;
  }
  24% {
    opacity: 1;
  }
  40% {
    -webkit-transform: translateY(-24px);
    transform: translateY(-24px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  65% {
    -webkit-transform: translateY(-12px);
    transform: translateY(-12px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  82% {
    -webkit-transform: translateY(-6px);
    transform: translateY(-6px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  93% {
    -webkit-transform: translateY(-4px);
    transform: translateY(-4px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  25%,
  55%,
  75%,
  87% {
    -webkit-transform: translateY(0px);
    transform: translateY(0px);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  100% {
    -webkit-transform: translateY(0px);
    transform: translateY(0px);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
    opacity: 1;
  }
}
</style>
