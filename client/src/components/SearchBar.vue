<template>
  <div class="search-bar box box-hover">
    <p>Search for gamers</p>
    <div class="search-name">
      <input type="text" placeholder="Name" v-model="username" />
      <input type="button" value="Search" v-on:click="$emit('searched', username)" />
    </div>
    <div class="search-games">
      <input type="text" placeholder="Add games" id="add-game" />
      <input type="button" value="Add" v-on:click="addGameToSearch" />
    </div>
    <div class="selected-games">
      <div class="selected-game" v-for="game in this.selectedGames" v-bind:key="game">
        <p>{{game}}</p>
        <img src="../assets/remove.svg" v-on:click="removeSelectedGame(game)" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: null,
      selectedGames: []
    };
  },
  created() {
    this.selectedGames.push("Battlefield V");
    this.selectedGames.push("Battlefield 1");
    this.selectedGames.push("Battlefield 4");
  },
  methods: {
    addGameToSearch() {
      let game = document.getElementById("add-game").value;
      this.selectedGames.push(game);
      document.getElementById("add-game").value = "";
    },
    removeSelectedGame(game) {
      for (var i = 0; i < this.selectedGames.length; i++) {
        if (this.selectedGames[i] == game) {
          this.selectedGames.splice(i, 1);
          i--;
        }
      }
    }
  }
};
</script>
<style>
.search-bar {
  width: 100%;
}
.search-bar > p {
  font-size: 16px;
  font-weight: bolder;
}
input[type="text"] {
  background-color: whitesmoke;
  border: none;
  margin: 3px;
  padding: 2px;
  outline: none;
}
input[type="button"] {
  outline: none;
  border: none;
  background-color: rgb(30, 144, 255);
  border-radius: 10px;
  color: white;
}
.selected-games {
  width: 100%;
  height: auto;
  display: flex;
  margin-top: 8px;
  flex-direction: row;
  flex-wrap: wrap;
}
.selected-game {
  display: flex;
  flex-direction: row;
  width: auto;
  height: 25px;
  margin: 3px;
  padding: 3px;
  background-color: rgb(30, 144, 255);
  color: white;
  border-radius: 4px;
}
.selected-game > p {
  font-size: 12px;
}
.selected-game > .remove-button {
  height: 100%;
  display: flex;
  margin-left: 4px;
  justify-content: center;
  align-items: center;
}
.selected-game > .remove-button > img {
  height: 80%;
  width: 100%;
}
</style>
