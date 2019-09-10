<template>
  <div class="logout-card" v-on:click="logout()">
    <p>Log out</p>
    <div class="logout">
      <img src="../../assets/logout.png" />
    </div>
  </div>
</template>

<script>
import Cookie from "js-cookie";
export default {
  methods: {
    logout() {
      // Emit logged-out event to toggle menu to close.
      let json = {
        userid: Cookie.get("id")
      };
      this.$socket.emit("USER_LOGGED_OUT", JSON.stringify(json));
      //Rmove the logged in cookies!
      Cookie.remove("id");
      Cookie.remove("JWT");
      this.$router.push("/login");
      this.$store.commit("logout");
      this.$emit("logout");
    }
  }
};
</script>

<style scoped>
.logout-card {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  border-bottom: rgb(235, 238, 241) solid 1px;
}
.logout-card:hover {
  background-color: rgb(250, 250, 250);
  cursor: pointer;
}
.logout-card > p {
  margin: 0px;
}
.logout {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 50px;
}
.logout > img {
  height: 50%;
}
</style>