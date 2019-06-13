<template>
  <div class="header-grid" v-show="this.$store.getters.loggedIn">
    <!-- Options to login -->
    <div class="logout">
      <button v-on:click="logout()">Log out</button>
    </div>
    <!-- Main options for navigating the different part of the application -->
    <div class="main-options">
      <div class="option">
        <button v-on:click="redirect('/giveaway')">Give Aways</button>
      </div>
      <div class="option">
        <button>Profil</button>
      </div>
      <div class="option">
        <button v-on:click="redirect('/search')">Hitta Gamers</button>
      </div>
      <div class="option">
        <button v-on:click="redirect('/home')">Flöde</button>
      </div>
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
    logout() {
      Cookie.remove("JWT");
      Cookie.remove("id");
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
  position: sticky;
  top: 0px;
  display: grid;
  grid-template-areas:
    "b . c"
    "b a c";
  grid-template-columns: 15vw 70vw 15vw;
  grid-template-rows: 10px 50px;
  background-color: rgb(30, 144, 255);
  z-index: 2;
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
  font-family: "Nunito", sans-serif;
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
.logout > button {
  background: none;
  border: none;
  outline: none;
  color: white;
}
.login-drop-down {
  position: relative;
  top: 60px;
  left: 0px;
  width: 200px;
  height: 200px;
  background-color: green;
}
</style>
