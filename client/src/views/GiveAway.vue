<template>
  <div class="give-away-grid">
    <div class="give-away-cards">
      <Loading v-bind:active_loading="this.loading_active" />
      <GiveAwayCard
        v-for="giveaway in this.giveaways"
        v-bind:id="giveaway.giveAwayID"
        v-bind:key="giveaway.giveAwayID"
        v-bind:title="giveaway.title"
        v-bind:logo="giveaway.companyLogoURL"
        v-bind:company="giveaway.companyName"
        v-bind:description="giveaway.smallDescription"
        v-bind:numberOfContestants="giveaway.numberOfContestants"
        v-bind:endDate="giveaway.endDate"
      />
    </div>
    <div class="give-away-search-bar">
      <!-- TODO: Set funtions for handling search bar press. -->
      <GiveAwaySearchBar />
    </div>
  </div>
</template>





<script>
import GiveAwayCard from "../components/GiveAwayCard.vue";
import GiveAwaySearchBar from "../components/GiveAwaySearchBar.vue"
import Loading from "../components/Loading.vue";
import env_variables from "../environment_variables.json";
export default {
  components: { GiveAwayCard, GiveAwaySearchBar, Loading },
  data() {
    return {
      giveaways: [],
      loading_active: false
    };
  },
  created() {
    this.loading_active = true;
    fetch(env_variables.BASE_URL + "giveAways", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        this.giveaways = res;
        this.loading_active = false;
        // console.log(res);
      });
  }
};
</script>





<style scoped>
.give-away-grid {
  display: grid;
  grid-template:
    ". a b ."
    ". a . .";
  grid-template-columns: auto 600px 200px auto;
  grid-template-rows: 200px calc(100vh - 200px - 60px);
  overflow: scroll;
}
div {
  padding: 4px;
}
.give-away-cards {
  grid-area: a;
}
.give-away-search-bar {
  grid-area: b;
}
</style>
