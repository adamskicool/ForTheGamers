<template>
  <div class="clans box box-hover">
    <p>Clans:</p>
    <div class="clan" v-for="clan in this.clans" v-bind:key="clan.clanID">
      <img v-bind:src="clan.logo">
      <p>{{clan.name}}</p>
    </div>
  </div>
</template>

<script>
import Cookie from "js-cookie";
export default {
  props: ["id"],
  data() {
    return {
      clans: null
    };
  },
  methods: {
    update() {
      fetch("http://localhost:8989/api/clans", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          userid: this.id
        }
      })
        .then(res => res.json())
        .then(res => (this.clans = res));
    }
  },
  created() {
    this.update();
  },
  updated() {
    this.update();
  }
};
</script>

<style scoped>
.clans {
  height: auto;
  width: 95%;
}

.clan {
  display: flex;
}

.clan > img {
  width: 40px;
  height: 40px;
  border-radius: 100%;
}
</style>