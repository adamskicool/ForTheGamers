<template>
  <div class="card-wrapper">
    <!-- själva kortet -->
    <div class="card box box-hover">
      <a v-on:click="$router.push('profile/' + authorID)" class="author-post">{{this.author}}</a>
      <p class="timestamp-post">{{this.timestamp.substring(0, 10)}}</p>
      <p class="message">{{this.message}}</p>
      <img v-if="checkImage()" class="image" v-bind:src="this.image" />
      <div
        class="expand-comments"
        data-toggle="collapse"
        v-bind:href="'#idis' + this.id"
        title="Press to show comments"
      >
        <img src="../assets/expand.png" />
      </div>
    </div>
    <!-- Kommentar fält! -->
    <div class="box comments-wrapper collapse" v-bind:id="'idis' + this.id">
      <div class="comments">
        <!-- meddelande som visas om det inte finns några kommentarer -->
        <div v-if="Object.keys(this.comments).length == 0">
          <p style="font-size: 14px;">No comments... yet...</p>
        </div>
        <!-- Skriv kommentar -->
        <div class="comment-input">
          <input type="text" placeholder="Write a comment..." v-model="newComment" />
          <input type="button" value="Send" v-on:click="comment()" />
        </div>
        <!-- Visa alla kommentarer-->
        <PostCardComment
          v-for="comment in this.comments"
          v-bind:key="comment.timestamp"
          v-bind:postID="id"
          v-bind:commentID="comment.postCommentID"
          v-bind:numberOfComments="comment.numberOfComments"
          v-bind:authorID="comment.userID"
          v-bind:author="comment.username"
          v-bind:profilePicture="comment.profilePicture"
          v-bind:message="comment.message"
          v-bind:time="comment.time.substring(0, 10)"
        />
      </div>
    </div>
  </div>
</template>







<script>
import Cookie from "js-cookie";
import PostCardComment from "./PostCardComment";
import env_variables from "../environment_variables.json";
export default {
  props: [
    "id",
    "authorID",
    "author",
    "title",
    "message",
    "image",
    "timestamp",
    "likes"
  ],
  components: { PostCardComment },
  data() {
    return {
      newComment: "",
      comments: {}
    };
  },
  created() {
    //fetch the comments to this post.
    let postID = this.id;
    fetch(env_variables.BASE_URL + "commentsOnComment", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        postid: postID,
        commentid: -1
      }
    })
      .then(res => res.json())
      .then(comments => {
        //console.log(comments);
        this.comments = comments;
      });
  },
  methods: {
    /**
     * Kolla att bilden inte är tomm.
     */
    checkImage() {
      return this.image.length != 0;
    },
    comment() {
      let comment = this.newComment;
      this.newComment = "";
      fetch(env_variables.BASE_URL + "comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userid: Cookie.get("id"),
          postid: this.id,
          message: comment,
          commentedComment: -1
        })
      }).then(_ => {
        let postID = this.id;
        fetch(env_variables.BASE_URL + "commentsOnComment", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            postid: postID,
            commentid: -1
          }
        })
          .then(res => res.json())
          .then(comments => {
            console.log(comments);
            this.comments = comments;
          });
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
  width: 100%;
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
  /* font-family: "Open Sans", sans-serif; */
  width: 90%;
  max-width: 500px;
  border: none;
  /* background-color: rgb(255, 255, 255);
  border: rgb(221, 223, 226) solid 1px;
  border-radius: 4px;
  padding: 10px; */
}
.comments-wrapper {
  width: 80%;
  height: auto;
}

.author-post {
  font-size: 12px;
  font-weight: bolder;
  color: rgb(57, 90, 150);
  margin: 2px;
}
.author-post:hover {
  cursor: pointer;
}

.timestamp-post {
  font-size: 10px;
}
.message {
  font-size: 14px;
}
.image {
  width: 100%;
  border-radius: 3px;
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

