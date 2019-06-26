<template>
  <div class="friends box"></div>
</template>

<script>
import Cookie from "js-cookie";
export default {
  data() {
    return {};
  },
  created() {
    // fetch("http://localhost:8989/api/friends", {
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