<template>
  <div class="search-view">
    <SearchBar/>
  </div>
</template>
<script>
import SearchBar from "../components/SearchBar.vue";
export default {
  components: { SearchBar }
};
</script>
<style scoped>
.search-view {
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
</style>
