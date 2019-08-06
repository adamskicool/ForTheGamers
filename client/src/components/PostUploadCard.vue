<template>
  <div class="upload-post-wrapper">
    <div class="upload-post-grid box box-hover" v-show="validClanID()">
      <div class="message">
        <!-- <input type="textarea" placeholder="Message" wrap="true" v-model="message" /> -->
        <textarea placeholder="Compose new post..." v-model="message"></textarea>
      </div>
      <div class="image">
        <input type="text" placeholder="Add image by entering URL" v-model="imageURL" />
      </div>
      <div class="upload">
        <input type="button" value="Send" v-on:click="uploadPost()" />
      </div>
    </div>
  </div>
</template>

<script>
import Cookie from "js-cookie";
import env_variables from "../environment_variables.json";
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
        fetch(env_variables.BASE_URL + "post", {
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
.upload-post-wrapper {
  /* display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 3px; */
  width: 90%;
  max-width: 500px;
}

.upload-post-grid {
  display: grid;
  grid-template-areas:
    "b"
    "c"
    "d";
  grid-template-columns: 100%;
  grid-template-rows: 70px 30px 30px;
  padding: 0px;
}

.message  {
  grid-area: b;
}
.message > textarea {
  width: 100%;
  height: 70px;
  padding: 5px;
  outline: none;
  border: none;
  resize: none;
}

.image {
  grid-area: c;
  font-size: 12px;
}
.image > input {
  width: 50%;
}

.upload {
  grid-area: d;
  font-size: 12px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.upload > input {
  height: 70%;
  width: 30%;
  border-radius: 5px;
  margin: 5px;
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