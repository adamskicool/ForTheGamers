<template>
  <div class="card-grid">
    <div class="card-title">
      <p>{{this.title}}</p>
    </div>
    <div class="card-description">
      <p>{{this.description}}</p>
    </div>
    <div class="card-images">
      <div id="blurr-field"></div>
      <img v-bind:src="this.images[this.currentImageIndex]">
      <div v-show="this.images.length > 1" class="controlls">
        <div class="image-button" id="image-button-previous" v-on:click="previousImage()">
          <img src="../assets/arrow.png">
        </div>
        <div class="image-button" id="image-button-next" v-on:click="nextImage()">
          <img src="../assets/arrow.png">
        </div>
      </div>
    </div>
  </div>
</template>





<script>
export default {
  props: ["id", "title", "description", "images"],
  data() {
    return {
      currentImageIndex: 0
    };
  },
  methods: {
    previousImage() {
      if (this.currentImageIndex - 1 < 0) {
        this.currentImageIndex = this.images.length - 1;
      } else {
        this.currentImageIndex--;
      }
    },
    nextImage() {
      if (this.currentImageIndex >= this.images.length - 1) {
        this.currentImageIndex = 0;
      } else {
        this.currentImageIndex++;
      }
    }
  }
};
</script>





<style scoped>
.card-grid {
  display: grid;
  grid-template-areas:
    "a b"
    ". b"
    "c b";
  grid-template-rows: 20px 10px 200px;
  grid-template-columns: 40% 60%;
  background-color: rgb(255, 255, 255);
  border: rgb(221, 223, 226) solid 1px;
  border-radius: 4px;
  margin: 5px;
}
.card-title {
  grid-area: a;
}
.card-description {
  grid-area: c;
  font-size: 12px;
  padding: 5px;
  overflow: scroll;
}
.card-images {
  grid-area: b;
  position: relative;
  overflow: hidden;
}

.card-images > img {
  height: 100%;
  position: absolute;
  top: -9999px;
  bottom: -9999px;
  left: -9999px;
  right: -9999px;
  margin: auto;
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
</style>
