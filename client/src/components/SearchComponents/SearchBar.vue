<template>
  <div class="search-bar box box-hover">
    <!-- <p>Search for gamers</p> -->
    <div class="search-name">
      <input type="text" placeholder="enter username" v-model="username" />
      <div class="search-button smaller" data-toggle="collapse" href="#more-options">
        <img src="../../assets/expand.png" />
      </div>
      <div class="search-button" v-on:click="$emit('searched', username)">
        <img src="../../assets/search.png" />
      </div>
      <!-- <input type="button" value="Search" v-on:click="$emit('searched', username)" /> -->
    </div>
    <div class="more-options-wrapper collapse" id="more-options">
      <div class="more-options"></div>
    </div>
    <!-- <div class="search-games">
      <input type="text" placeholder="Add games" id="add-game" />
      <input type="button" value="Add" v-on:click="addGameToSearch" />
    </div>-->
    <!-- <div class="selected-games">
      <div class="selected-game" v-for="game in this.selectedGames" v-bind:key="game">
        <p>{{game}}</p>
        <img src="../assets/remove.svg" v-on:click="removeSelectedGame(game)" />
      </div>
    </div>-->
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
<style scoped>
.search-bar {
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 30px;
}
.search-name {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0px 10px 0px 10px;
}
.search-button {
  width: 25px;
  height: 25px;
}
.smaller {
  width: 10px;
  height: 10px;
}
.search-button:hover {
  cursor: pointer;
}
.search-button > img {
  height: 100%;
  width: 100%;
}
.search-name > [type="text"] {
  width: calc(100% - 30px - 30px);
  border: none;
  margin: 6px;
  padding: 2px;
  outline: none;
}

.more-options-wrapper {
  width: 100%;
  height: auto;
}
.more-options {
  width: 100%;
  height: 100px;
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
