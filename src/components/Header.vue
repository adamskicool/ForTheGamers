<template>
  <div class="header-grid">
    <!-- Placeholder for the logo ForTheGamers -->
    <div class="logo">
      <!-- <img src="../assets/logo.svg"> -->
    </div>
    <!-- Main options for navigating the different part of the application -->
    <div class="main-options">
      <div class="option">
        <button>Give Away Tävlingar</button>
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
export default {
  methods: {
    redirect(path) {
      this.$router.push(path);
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
    "b . . . ."
    "b . a . .";
  grid-template-columns: 5vw 10vw 70vw 10vw 5vw;
  grid-template-rows: 10px 50px;
  background-color: rgb(30, 144, 255);
  z-index: 1;
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
.logo {
  grid-area: b;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 40px;
}
.logo > img {
  height: 90%;
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
</style>
