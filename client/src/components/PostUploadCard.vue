<template>
  <div class="box upload-post-grid" v-show="validClanID()">
    <p>NEW POST</p>
    <input type="textfield" placeholder="Message" v-model="message" id="message">
    <!-- <input type="file" @change="processFile($event)"> -->
    <input type="text" placeholder="Image URL" v-model="imageURL" id="image">
    <input type="button" value="Upload" v-on:click="uploadPost()" id="upload">
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
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 450px;
  height: auto;
}
p {
  font-size: 16px;
  padding: 0px;
  margin: 3px;
}
#message {
  width: 100%;
  height: auto;
  font-size: 14px;
}
#image {
}
</style>