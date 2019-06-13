<template>
  <div class="clan-grid" v-on:click="$emit('clicked', id)">
    <img v-bind:src="this.logo">
    <p
      v-if="this.name.length > this.nameMaxLength"
    >{{this.name.substring(0, this.nameMaxLength) + "..."}}</p>
    <p v-else>{{this.name}}</p>
  </div>
</template>

<script>
export default {
  props: ["id", "logo", "name"],
  data() {
    return {
      nameMaxLength: 18
    };
  }
};
</script>

<style scoped>
.clan-grid {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 50px;
  width: 100%;
  padding: 5px;
  border-radius: 4px;
}
.clan-grid:hover {
  background-color: whitesmoke;
  cursor: pointer;
}
.clan-grid:active {
  background-color: rgb(238, 238, 238);
  cursor: pointer;
}

.clan-grid > img {
  height: 40px;
  width: 40px;
  border-radius: 100%;
  border: 1px solid rgb(221, 223, 226);
}
p {
  font-size: 12px;
  font-weight: bolder;
  width: auto;
  margin: 4px;
  padding: 0px;
}
</style>