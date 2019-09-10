<template>
  <div class="search-view">
    <div class="middle">
      <SearchBar v-on:searched="handleSearchInput" />
      <Loading v-bind:active_loading="this.searching" />
    </div>
    <div class="smaller-middle">
      <SearchResultProfile
        v-for="result in this.searchResults"
        v-bind:userID="result.userID"
        v-bind:profilePicture="result.profilePicture"
        v-bind:username="result.username"
        v-bind:gamesInCommon="['Battlefield 1', 'Battlefield V']"
      />
    </div>
  </div>
</template>
<script>
import SearchBar from "../components/SearchComponents/SearchBar.vue";
import SearchResultProfile from "../components/SearchComponents/SearchResultProfile.vue";
import Loading from "../components/Loading.vue";
import env_variables from "../environment_variables.json";
export default {
  components: { SearchBar, SearchResultProfile, Loading },
  data() {
    return {
      searching: false,
      searchResults: []
    };
  },
  methods: {
    handleSearchInput(username) {
      this.searchResults = [];
      this.searching = true;
      //use the parameters and search for users by quering the API.
      fetch(env_variables.BASE_URL + "filteredUsers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          username: username
        }
      })
        .then(res => res.json())
        .then(res => {
          this.searching = false;
          console.log(res);
          this.searchResults = res;
        });
    }
  }
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
.middle {
  width: 60%;
  max-width: 600px;
}
.smaller-middle {
  width: 50%;
  max-width: 550px;
}
</style>
