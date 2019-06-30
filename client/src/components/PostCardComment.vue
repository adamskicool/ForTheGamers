<template>
  <div class="comment">
    <!-- The comment grid -->
    <div class="comment-grid">
      <!-- Profile picture -->
      <div class="comment-profile-picture">
        <img v-bind:src="this.profilePicture" />
      </div>
      <!-- Author and time -->
      <div class="comment-author-time">
        <a href="profile" id="author">{{this.author}}</a>
        <p id="timestamp">{{this.time}}</p>
      </div>
      <!-- Actuals comment message -->
      <div class="comment-message">
        <p id="message">{{this.message}}</p>
      </div>
      <!-- Buttons for viewing replies, add a new reply -->
      <div class="comment-buttons">
        <input
          type="button"
          value="Reply"
          id="comment-comment"
          data-toggle="collapse"
          :data-target="'#commentid' + this.commentID"
        />
        <input
          v-show="this.numberOfComments != null"
          type="button"
          value="View comments"
          id="comments-comment"
          v-on:click="loadComments()"
        />
        <img
          v-show="this.somebody_is_commenting"
          src="../assets/kermit_typing.gif"
          id="someone-is-typing-gif"
        />
      </div>
      <!-- Input fields for replying to a comment -->
      <div class="comment-comment-input collapse" :id="'commentid' + this.commentID">
        <input
          type="text"
          placeholder="Write a response"
          id="comment-comment-input"
          v-model="newComment"
        />
        <input type="button" value="send" v-on:click="comment()" />
      </div>
    </div>
    <!-- loading gif for when loading subcomments -->
    <Loading v-bind:active_loading="this.loading_subcomments" />
    <!-- Section showing all the subcomments/replies to the comments, is loaded
    by other buttons above!-->
    <div class="subcomments">
      <PostCardComment
        v-for="comment in this.comments"
        v-bind:key="comment.timestamp"
        v-bind:postID="postID"
        v-bind:commentID="comment.postCommentID"
        v-bind:numberOfComments="comment.numberOfComments"
        v-bind:author="comment.username"
        v-bind:profilePicture="comment.profilePicture"
        v-bind:message="comment.message"
        v-bind:time="comment.time.substring(0, 10)"
        v-bind:comments="comment.comments"
      />
    </div>
  </div>
</template>







<script>
import PostCardComment from "./PostCardComment";
import Loading from "./Loading.vue";
import Cookie from "js-cookie";
export default {
  props: [
    "postID",
    "commentID",
    "numberOfComments",
    "author",
    "profilePicture",
    "message",
    "time"
  ],
  components: { PostCardComment, Loading },
  name: "PostCardComment",
  data() {
    return {
      newComment: "", //text for the new comment
      somebody_is_commenting: false, //if the kermit-gif is shown or not.
      comments: [], //the comments.
      currentTimeout: null, //for typing gif.
      loading_subcomments: false
    };
  },
  methods: {
    /*
      Load all comments that belong to this comment
    */
    loadComments() {
      this.comments = [];
      this.loading_subcomments = true;
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
          //console.log(comments);
          this.comments = comments;
          this.loading_subcomments = false;
        });
    },
    /*
    Function for adding a comment to a comment to this comment.
    */
    comment() {
      let comment = this.newComment;
      this.newComment = "";
      let socket_content = JSON.stringify({
        userid: Cookie.get("id"),
        postid: this.postID,
        message: comment,
        commentedComment: this.commentID
      });
      this.$socket.emit("COMMENT_INCOMMING", socket_content);
    },
    /*
    function for sending a focus request for a comment, this is so that all clients
    that can see this comment can also see that someone is replying on it!
    */
    sendFocusUpdate() {
      let socket_content = JSON.stringify({
        commentedComment: this.commentID
      });
      this.$socket.emit("COMMENT_FOCUS_REQUEST", socket_content);
    }
  },

  /*
  When this component is created it subscribes to the COMMENT_UPDATE and COMMENT_FOCUS
  events in order to be able to refresh new comments and to show the "someone is typing"-indicator
  (a.k.a. Kermit the frog).
  */
  created() {
    //When a new comments has been sent.
    this.sockets.subscribe("COMMENT_UPDATE", data => {
      let parsed_data = JSON.parse(data);
      if (this.commentID == parsed_data.commentedComment) {
        this.loading_subcomments = true;
        this.somebody_is_commenting = true;
        console.log("COMMENT_UPDATE");
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
            this.loading_subcomments = false;
          });
      }
    });
    //when focus is given to a specific comment.
    this.sockets.subscribe("COMMENT_FOCUS", data => {
      let parsed_data = JSON.parse(data);
      if (this.commentID == parsed_data.commentedComment) {
        this.somebody_is_commenting = true;
        clearTimeout(this.currentTimeout);
        this.currentTimeout = setTimeout(() => {
          this.somebody_is_commenting = false;
        }, 2000);
      }
    });
  },
  /*
  Watch functions, works lite onchange events but Vue.js does not support then very well.
  */
  watch: {
    /*
    When typing a new comment, send a focus request indicating to other clients that 
    you are typing.
    */
    newComment: function(oldVal, newVal) {
      let socket_content = JSON.stringify({
        commentedComment: this.commentID
      });
      this.$socket.emit("COMMENT_FOCUS_REQUEST", socket_content);
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
    "p a"
    "p b"
    ". b"
    ". c"
    ". d"
    ". e";
  grid-template-columns: 10% 90%;
  grid-template-rows: 20px 30px auto 20px auto auto;
}
.comment-profile-picture {
  grid-area: p;
  display: grid;
  justify-content: center;
  align-items: center;
}
.comment-profile-picture > img {
  width: 32px;
  height: 32px;
  border-radius: 100%;
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

.comment-comment-input {
  grid-area: d;
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
#message,
#comment-comment-input {
  font-size: 12px;
  background-color: whitesmoke;
  border-radius: 10px;
  padding: 4px;
}
#someone-is-typing-gif {
  width: 20px;
}

.subcomments {
  grid-area: e;
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