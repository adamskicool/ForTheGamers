<template>
  <div class="clans box">
    <div class="clan" v-for="clan in this.clans" v-bind:key="clan.clanID">
      <img v-bind:src="clan.logo">
      <p>{{clan.name}}</p>
    </div>
  </div>
</template>

<script>
import Cookie from "js-cookie";
export default {
  data() {
    return {
      clans: null
    };
  },
  created() {
    fetch("http://localhost:8989/api/clans", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        userid: Cookie.get("id")
      }
    })
      .then(res => res.json())
      .then(res => (this.clans = res));
  }
};
</script>

<style scoped>
.clans {
  height: 100px;
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