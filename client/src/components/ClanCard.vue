<template>
  <div class="clan-grid" v-on:click="$emit('clicked', id)">
    <!-- Visa stock-clan bild om bild-URL inte finns tillgängligt! -->
    <img
      v-if="imageExists(this.logo)"
      v-bind:class="{ selected: isSelected() }"
      v-bind:src="this.logo"
    />
    <img v-else v-bind:class="{ selected: isSelected() }" src="../assets/clan_default.jpg" />

    <p
      v-if="this.name.length > this.nameMaxLength"
    >{{this.name.substring(0, this.nameMaxLength) + "..."}}</p>
    <p v-else class="clan-name">{{this.name}}</p>
  </div>
</template>

<script>
export default {
  props: ["id", "logo", "name"],
  data() {
    return {
      nameMaxLength: 18
    };
  },
  methods: {
    imageExists(image_url) {
      var http = new XMLHttpRequest();
      http.open("HEAD", image_url, false);
      http.send();
      return http.status != 404;
    },
    isSelected() {
      if (this.$store.state.currentClanID == this.id) {
        return true;
      } else {
        return false;
      }
    }
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
.selected {
  transform: scale(1.1);
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
@media only screen and (max-width: 600px) {
  .clan-grid {
    width: auto;
    height: auto;
    border-radius: 80px;
  }
  .clan-name {
    display: none;
  }
}
</style>