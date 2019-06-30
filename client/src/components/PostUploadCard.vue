<template>
  <div class="upload-post-grid box box-hover" v-show="validClanID()">
    <div class="banner">
      <p>NEW POST</p>
    </div>
    <div class="message">
      <!-- <input type="textarea" placeholder="Message" wrap="true" v-model="message" /> -->
      <textarea placeholder="Message" v-model="message"></textarea>
    </div>
    <div class="image">
      <input type="text" placeholder="Image URL" v-model="imageURL" />
    </div>
    <div class="upload">
      <input type="button" value="Upload" v-on:click="uploadPost()" />
    </div>
  </div>
</template>

<script>
import Cookie from "js-cookie";
export default {
  data() {
    return {
      message: "",
      imageURL: "",
      imageFileData: null
    };
  },
  methods: {
    uploadPost() {
      if (this.message != "") {
        let url = "";
        if (this.imageURL == "") {
          url = null;
        } else {
          url = this.imageURL;
        }
        fetch("http://localhost:8989/api/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userid: Cookie.get("id"),
            clanid: this.$store.getters.currentClanID,
            message: this.message,
            imageURL: url,
            imageFile: this.imageFileData
          })
        })
          .then(res => res.json())
          .then(res => {
            this.message = "";
            this.imageURL = "";
            // console.log(res);
            //emit to parent if it was succesfull.
          });
      }
    },
    validClanID() {
      if (this.$store.getters.currentClanID == null) {
        return false;
      } else {
        return true;
      }
    },
    processFile(event) {
      this.imageFileData = event.target.files[0];
      console.log(this.imageFileData);
    }
  }
};
</script>

<style scoped>
.upload-post-grid {
  display: grid;
  grid-template-areas:
    "a a"
    "b b"
    "c d";
  grid-template-columns: 225px 225px;
  grid-template-rows: 30px 70px 40px;
  padding: 0px;
}

.banner {
  grid-area: a;
}

.message  {
  grid-area: b;
}
.message > textarea {
  width: 450px;
  height: 70px;
  padding: 5px;
  outline: none;
  border: none;
  resize: none;
}

.image {
  grid-area: c;
}

.upload {
  grid-area: d;
}
p {
  font-size: 16px;
  padding: 0px;
  margin: 3px;
}

.banner {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30px;
  background-color: rgb(30, 144, 255);
  color: white;
}
</style>