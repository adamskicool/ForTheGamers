<template>
  <div class="comment">
    <div class="comment-grid">
      <div class="comment-author-time">
        <p id="author">{{this.author}}</p>
        <p id="timestamp">{{this.time}}</p>
      </div>
      <div class="comment-message">
        <p id="message">{{this.message}}</p>
      </div>
      <div class="comment-buttons">
        <input type="button" value="Reply" id="comment-comment">
        <input type="button" value="Comments" id="comments-comment" v-on:click="loadComments()">
      </div>
    </div>
    <div class="subcomments">
      <CardComment
        v-for="comment in this.comments"
        v-bind:key="comment.timestamp"
        v-bind:postID="postID"
        v-bind:commentID="comment.postCommentID"
        v-bind:author="comment.username"
        v-bind:message="comment.message"
        v-bind:time="comment.time.substring(0, 10)"
        v-bind:comments="comment.comments"
      />
    </div>
  </div>
</template>
<script>
import CardComment from "./CardComment";
export default {
  props: ["postID", "commentID", "author", "message", "time"],
  components: { CardComment },
  name: "CardComment",
  data() {
    return {
      comments: []
    };
  },
  methods: {
    loadComments() {
      fetch("http://localhost:8989/api/commentsOnComment", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          postid: this.postID,
          commentid: this.commentID
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
<style scoped>
.comment {
  width: 100%;
  margin: 0px;
  height: auto;
}

.comment-grid {
  display: grid;
  grid-template-areas:
    "a"
    "b"
    "c"
    "d";
  grid-template-columns: 100%;
  grid-template-rows: 20px auto 20px auto;
}

.comment-author-time {
  grid-area: a;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.comment-message {
  grid-area: b;
}

.comment-buttons {
  grid-area: c;
  display: flex;
  flex-direction: row;
}

#author {
  font-size: 12px;
  font-weight: bolder;
  color: rgb(57, 90, 150);
  margin: 2px;
}
#timestamp {
  padding: 0px;
  margin: 0px;
  font-size: 8px;
  margin-left: 10px;
}
#message {
  font-size: 12px;
  background-color: whitesmoke;
  border-radius: 10px;
  padding: 4px;
}

.subcomments {
  grid-area: d;
  width: auto;
  margin-left: 30px;
}

input[type="button"] {
  width: auto;
  height: 15px;
  font-size: 8px;
  margin-right: 2px;
  margin-top: 2px;
}
input[type="button"]:hover {
  background-color: rgb(30, 90, 255);
}

#message {
  margin: 0px;
}
</style>