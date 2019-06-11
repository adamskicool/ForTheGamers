<template>
  <div class="card-grid">
    <div class="card-title">
      <p>{{this.company}}</p>
    </div>
    <div class="card-description">
      <p>{{this.description}}</p>
    </div>
    <div class="card-images">
      <img v-if="this.images[0] != null" v-bind:src="this.images[this.currentImageIndex].image">
      <div v-show="this.images.length > 1" class="controlls">
        <div class="image-button" id="image-button-previous" v-on:click="previousImage()">
          <img src="../assets/arrow.png">
        </div>
        <div class="image-button" id="image-button-next" v-on:click="nextImage()">
          <img src="../assets/arrow.png">
        </div>
      </div>
    </div>
    <div class="card-info">
      <button>Enter giveaway</button>
      <p v-if="this.numberOfContestants != null">{{this.numberOfContestants}}</p>
      <p v-else>0</p>
      <img src="../assets/contestant.png">
      <p id="end-date">Expires: {{this.endDate.substring(0, 10)}}</p>
    </div>
  </div>
</template>





<script>
// import { Picker } from "emoji-mart-vue";
export default {
  // components: { Picker },
  props: [
    "id",
    "title",
    "description",
    "company",
    "numberOfContestants",
    "endDate"
  ],
  data() {
    return {
      currentImageIndex: 0,
      images: []
    };
  },
  mounted() {
    //get the images for this giveaway.
    fetch("http://localhost:8989/api/giveAwayImages", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        giveawayid: this.id
      }
    })
      .then(res => res.json())
      .then(res => {
        this.images = res;
      });
  },
  methods: {
    //switch to the previous image.
    previousImage() {
      if (this.currentImageIndex - 1 < 0) {
        this.currentImageIndex = this.images.length - 1;
      } else {
        this.currentImageIndex--;
      }
    },
    //switch to the next image.
    nextImage() {
      if (this.currentImageIndex >= this.images.length - 1) {
        this.currentImageIndex = 0;
      } else {
        this.currentImageIndex++;
      }
    },
    onInput() {}
  }
};
</script>





<style scoped>
.card-grid {
  display: grid;
  grid-template-areas:
    "a b"
    ". b"
    "c b"
    "d b";
  grid-template-rows: 20px 10px 160px 30px;
  grid-template-columns: 40% 60%;
  background-color: rgb(255, 255, 255);
  border: rgb(221, 223, 226) solid 1px;
  border-radius: 4px;
  margin: 10px;
  padding: 0px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 200ms ease;
}
.card-grid:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transform: scale(1.005);
}
.card-title {
  grid-area: a;
  padding: 4px;
}
.card-description {
  grid-area: c;
  font-size: 12px;
  padding: 5px;
  overflow: scroll;
}
.card-images {
  grid-area: b;
  display: flex;
  justify-content: flex-end;
  position: relative;
  overflow: hidden;
}

.card-images > img {
  height: 100%;
  /* position: absolute;
  top: -9999px;
  bottom: -9999px;
  left: -9999px;
  right: -9999px; */
  /* margin: auto; */
  z-index: 1;
}

.card-images > .controlls {
  position: absolute;
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: flex-end;
  bottom: 0px;
  z-index: 3;
  opacity: 0;
  transition: opacity ease-in-out 100ms;
}
.card-images > .controlls:hover {
  opacity: 1;
}

.card-images > .controlls > .image-button {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 100%;
  width: 20px;
  height: 20px;
  border: none;
  margin: 10px;
}
.card-images > .controlls > .image-button:hover {
  background-color: rgba(255, 255, 255, 1);
  cursor: pointer;
}
.card-images > .controlls > .image-button > img {
  height: 75%;
  width: 75%;
}
#image-button-previous > img {
  transform: rotate(90deg);
}
#image-button-next > img {
  transform: rotate(-90deg);
}

.card-info {
  grid-area: d;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  padding: 5px;
}
.card-info > p {
  padding: 0px;
  margin: 3px;
  font-size: 14px;
}
.card-info > img {
  height: 60%;
}
.card-info > #end-date {
  font-size: 10px;
  color: green;
}
.card-info > button {
  height: auto;
  width: auto;
  font-size: 10px;
  border: none;
  outline: none;
  border-radius: 10px;
  background-color: rgb(30, 144, 255);
  color: white;
}
.card-info > button:hover {
  background-color: rgb(30, 90, 255);
}
</style>
