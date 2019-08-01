<template>
  <div v-show="this.active_loading" class="loading-gif">
    <img src="../assets/loading_double_ring.gif" />
  </div>
</template>

<script>
export default {
  props: ["active_loading"]
};
</script>

<style scoped>
.loading-gif {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: auto;
  /* padding: 20px; */
}
.loading-gif > img {
  width: 10%;
}
</style>