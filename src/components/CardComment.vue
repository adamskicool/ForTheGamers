<template>
  <div class="comment">
    <div class="comment-author-time">
      <p id="author">{{this.author}}</p>
      <p id="timestamp">{{this.time}}</p>
    </div>
    <p id="message">{{this.message}}</p>
    <input type="button" value="Comment" id="comment-comment">
    <div class="subcomments">
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
</template>
<script>
import CardComment from "./CardComment";
export default {
  props: ["author", "message", "time", "comments"],
  components: { CardComment },
  name: "CardComment"
};
</script>
<style scoped>
.comment {
  width: 100%;
  margin: 0px;
}
.comment > p {
  font-size: 12px;
  margin: 2px;
}

.comment-author-time {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  justify-items: flex-start;
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
  width: 90%;
  float: right;
}

#comment-comment {
  width: 60px;
  height: 20px;
  font-size: 10px;
}
</style>