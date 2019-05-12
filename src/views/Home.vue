<template>
  <div class="home">
    <div class>
      <Card
        v-for="card in this.cards"
        v-bind:key="card.id"
        v-bind:id="card.id"
        v-bind:author="card.author"
        v-bind:title="card.title"
        v-bind:image="card.image"
        v-bind:message="card.message"
        v-bind:timestamp="card.timestamp"
        v-bind:comments="card.comments"
      />
    </div>
  </div>
</template>

<script>
import Card from "../components/Card.vue";
export default {
  components: { Card },
  data() {
    return {
      cards: []
    };
  },
  created() {
    //for testing-purposes
    document.cookie = "userid = 2";
    let card = {
      id: "1",
      author: "Sara Langefors",
      title: "Bajs",
      message: "Det är ju inte så nice... ;)",
      timestamp: "2019/04/19 14:32",
      comments: [
        {
          author: "Adam Torkkeli-Johansson",
          timestamp: "2019/04/19 14:56",
          message: "Håller helt med finis! <3"
        },
        {
          author: "Adam Torkkeli-Johansson",
          timestamp: "2019/04/19 14:58",
          message: "Får jag chans på dig?"
        }
      ]
    };
    let card3 = {
      id: "3",
      author: "Sara Langefors",
      title: "Bajs",
      message: "Spela med mig imorgon? Gärna nya BFV ;)",
      image:
        "https://tieroneesports.com/wp-content/uploads/2018/09/Open-Beta-BFV-Poster-1024x576.png",
      timestamp: "2019/04/19 14:32",
      comments: [
        {
          author: "Adam Torkkeli-Johansson",
          timestamp: "2019/04/19 14:56",
          message: "Sure! Vilken tid?"
        },
        {
          author: "Sara Langefors",
          timestamp: "2019/04/19 14:58",
          message: "Kl 20? :)"
        }
      ]
    };
    let card2 = {
      id: "2",
      author: "Sara Langefors",
      title: "Bajs",
      message: "Någon som vet om man borde köpa nya borderlands 3?",
      image:
        "https://www.nordichardware.se/wp-content/uploads/Borderlands-3.jpg",
      timestamp: "2019/04/19 14:32",
      comments: [
        {
          author: "Adam Torkkeli-Johansson",
          timestamp: "2019/04/19 14:56",
          message: "Mjää, köp tvåan på rea istället!"
        }
      ]
    };
    this.cards.push(card);
    this.cards.push(card3);
    this.cards.push(card2);
  }
};
</script>

<style scoped>
.home {
  width: 100vw;
  padding: 10px 20% 10px 20%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
</style>
