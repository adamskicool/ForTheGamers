<template>
  <div class="search-view">
    <SearchBar />
    <SearchResultProfile
      v-bind:profilePicture="'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuXiYCO1tNZu9zZdH47aZo8Gqn4ecFViSXDNHa1h7j2ChsIEaEGg'"
      v-bind:username="'Borderlands Craze fan 23333'"
      v-bind:gamesInCommon="['Battlefield 1', 'Battlefield V']"
    />
  </div>
</template>
<script>
import SearchBar from "../components/SearchBar.vue";
import SearchResultProfile from "../components/SearchComponents/SearchResultProfile.vue";
export default {
  components: { SearchBar, SearchResultProfile }
};
</script>
<style scoped>
.search-view {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
</style>
