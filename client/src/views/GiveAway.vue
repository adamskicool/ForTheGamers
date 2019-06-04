<template>
  <div class="give-away-grid">
    <div class="give-away-cards">
      <GiveAwayCard
        v-for="giveaway in this.giveaways"
        v-bind:id="giveaway.id"
        v-bind:key="giveaway.id"
        v-bind:title="giveaway.title"
        v-bind:description="giveaway.description"
        v-bind:images="giveaway.images"
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
    //fill the giveaway with active giveaways!
    let testGiveaway = {
      id: 1,
      title: "Steelseries headset x65",
      description:
        "These new headphones will blow your mind, they are totally awesome and provide each gamer with industry leading force software that actually pull your ears while you are gaming, all from the comfort of your gaming setup...",
      images: [
        "https://images-na.ssl-images-amazon.com/images/I/61wMnQhL5cL._SY550_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/51QlcyOdvyL._SX425_.jpg"
      ]
    };
    let testGiveaway2 = {
      id: 2,
      title: "Halo 4 giveaway!",
      description:
        "Halo 4 is a first-person shooter developed by 343 Industries and published by Microsoft Studios for the Xbox 360 video game console. The seventh video game installment in the Halo franchise, the game was released on November 6, 2012. Halo 4's story follows a cybernetically enhanced human supersoldier, Master Chief, and his artificial intelligence construct Cortana, as they encounter unknown threats while exploring an ancient civilization's planet. The player assumes the role of Master Chief, who battles remnants of the former military alliance of alien races known as the Covenant and mechanical warriors of the Forerunner empire known as the Prometheans. The game features a selection of weapons, enemies, and game modes not present in previous titles of the series.",
      images: [
        "https://store-images.s-microsoft.com/image/apps.56698.65836138375483356.d1034d7b-8f8b-4453-99c9-f114455e8e51.f7ec0c0d-6bd0-4c52-ba05-fa67ab535ddd?mode=scale&q=90&h=1080&w=1920",
        "https://img.game.co.uk/ml2/2/3/6/1/236147_scr1_a.png"
      ]
    };
    let testGiveaway3 = {
      id: 3,
      title: "BIG Logitech giveway!",
      description:
        "For our fans we are giving away ten gaming mouses g502 and ten gaming keyboards! Enter the contest to get a chance to win!",
      images: [
        "https://cdn.pji.nu/product/standard/280/3470915.jpg",
        "https://www.logitechg.com/content/dam/gaming/en/products/g613/g613-hero-desktop.png.imgw.2816.2816.png"
      ]
    };
    this.giveaways.push(testGiveaway);
    this.giveaways.push(testGiveaway2);
    this.giveaways.push(testGiveaway3);
  }
};
</script>





<style scoped>
.give-away-grid {
  display: grid;
  grid-template:
    ". a b ."
    ". a . .";
  grid-template-columns: auto 500px 100px auto;
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
