<template>
  <div class="give-away-grid">
    <div class="give-away-cards">
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
      <p>Search bar</p>
    </div>
  </div>
</template>





<script>
import GiveAwayCard from "../components/GiveAwayCard.vue";
export default {
  components: { GiveAwayCard },
  data() {
    return {
      giveaways: []
    };
  },
  created() {
    fetch("http://localhost:8989/api/giveAways", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        this.giveaways = res;
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
  grid-template-rows: 200px auto;
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
