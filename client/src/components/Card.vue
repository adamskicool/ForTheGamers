<template>
  <div class="card-wrapper">
    <!-- själva kortet -->
    <div class="card">
      <p class="author-post">{{this.author}}</p>
      <p class="timestamp-post">{{this.timestamp.substring(0, 10)}}</p>
      <p class="message">{{this.message}}</p>
      <img v-if="checkImage()" class="image" v-bind:src="this.image">
      <div
        class="expand-comments"
        data-toggle="collapse"
        v-bind:href="'#idis' + this.id"
        title="Press to show comments"
        v-on:click="loadComments()"
      >
        <img src="../assets/expand.png">
      </div>
    </div>
    <!-- Kommentar fält! -->
    <div class="comments-wrapper collapse" v-bind:id="'idis' + this.id">
      <div class="comments">
        <!-- meddelande som visas om det inte finns några kommentarer -->
        <div v-if="Object.keys(this.comments).length == 0">
          <p style="font-size: 14px;">No comments... yet...</p>
        </div>
        <!-- Skriv kommentar -->
        <div class="comment-input">
          <input type="text" placeholder="Write a comment...">
          <input type="button" value="Send">
        </div>
        <!-- Visa alla kommentarer-->
        <CardComment
          v-for="comment in this.comments"
          v-bind:key="comment.timestamp"
          v-bind:author="comment.userID"
          v-bind:message="comment.message"
          v-bind:time="comment.time.substring(0, 10)"
          v-bind:comments="comment.comments"
        />
      </div>
    </div>
  </div>
</template>
<script>
import CardComment from "./CardComment";
export default {
  props: ["id", "author", "title", "message", "image", "timestamp", "likes"],
  components: { CardComment },
  data() {
    return {
      comments: {}
    };
  },
  methods: {
    /**
     * Kolla att bilden inte är tomm.
     */
    checkImage() {
      return this.image.length != 0;
    },
    //load the comments specific to this post with postID = this.id.
    loadComments() {
      let postID = this.id;
      //fetch the comments to this post.
      fetch("http://localhost:8989/api/comments", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          postid: postID
        }
      })
        .then(res => res.json())
        .then(comments => {
          console.log(comments);
          this.comments = comments;
        });
    }
  }
};
</script>
<style>
.card-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 3px;
}
.comment-input {
  position: relative;
  bottom: 0px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.comment-input > input {
  width: 100%;
  border-radius: 10px;
  border: solid grey 1px;
  padding-left: 10px;
  font-size: 14px;
}

.card,
.comments-wrapper {
  font-family: "Open Sans", sans-serif;
  width: 450px;
  border: none;
  background-color: rgb(255, 255, 255);
  border: rgb(221, 223, 226) solid 1px;
  border-radius: 4px;
  padding: 10px;
}
.comments-wrapper {
  width: 440px;
  height: auto;
}

.author-post {
  font-size: 12px;
  font-weight: bolder;
  color: rgb(57, 90, 150);
  margin: 2px;
}
.timestamp-post {
  font-size: 10px;
}
.message {
  font-size: 14px;
}
.image {
  width: 100%;
  border: solid grey 2px;
}
.timestamp-comment {
  padding: 0px;
  margin: 0px;
  font-size: 10px;
}

.expand-comments {
  display: flex;
  flex-direction: row-reverse;

  width: 100%;
  height: 15px;
  margin-top: 10px;
}
.expand-comments:hover {
  cursor: pointer;
}
.expand-comments > img {
  height: 100%;
}
</style>

