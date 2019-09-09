<template>
  <div class="search-result-profile box box-hover">
    <div class="picture">
      <img class="rounded-image" v-bind:src="profilePicture" alt />
    </div>
    <div class="name">
      <h6>{{this.username}}</h6>
    </div>
    <div class="games-in-common">
      <p
        v-for="game in this.gamesInCommon"
        style="font-size:10px; margin: 2px; padding: 0px;"
      >{{game}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["userID", "username", "profilePicture", "gamesInCommon"]
};
</script>

<style scoped>
.search-result-profile {
  width: 100%;
  margin: 5px;
  max-width: 800px;
  display: grid;
  grid-template-areas:
    "a b"
    "a c";
  grid-template-columns: 50px calc(100% - 50px);
  grid-template-rows: 20px 30px;
}

.picture {
  grid-area: a;
  display: flex;
  justify-content: center;
  align-items: center;
}

.name {
  grid-area: b;
}

.games-in-common {
  grid-area: c;
  display: flex;
  flex-direction: row;
}
</style>