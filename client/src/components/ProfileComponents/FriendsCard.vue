<template>
  <div class="friends box box-hover"></div>
</template>

<script>
import Cookie from "js-cookie";
import env_variables from "../../environment_variables.json";
export default {
  data() {
    return {};
  },
  created() {
    // fetch(env_variables.BASE_URL + "friends", {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     userid: Cookie.get("id")
    //   }
    // })
    //   .then(res => res.json())
    //   .then(res => console.log(res));
  }
};
</script>

<style scoped>
.friends {
  height: 100px;
  width: 95%;
}
</style>