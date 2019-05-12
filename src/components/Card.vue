<template>
  <div class="card-wrapper">
    <div class="card">
      <p class="author-post">{{this.author}}</p>
      <p class="timestamp-post">{{this.timestamp}}</p>
      <p class="message">{{this.message}}</p>
      <img class="image" v-bind:src="this.image">
      <div
        class="expand-comments"
        data-toggle="collapse"
        v-bind:href="'#idis' + this.id"
        title="Press to show comments"
      >
        <img src="../assets/expand.png">
      </div>
    </div>
    <div class="collapse" v-bind:id="'idis' + this.id">
      <div class="comments">
        <div class="comment" v-for="comment in this.comments" v-bind:key="comment.timestamp">
          <p class="author-comment">{{comment.author}}</p>
          <p class="timestamp-comment">{{comment.timestamp}}</p>
          <p class="message-comment">{{comment.message}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: [
    "id",
    "author",
    "title",
    "message",
    "image",
    "timestamp",
    "likes",
    "comments"
  ],
  methods: {}
};
</script>
<style scoped>
.card-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 5px;
}
.card,
.comments {
  font-family: "Open Sans", sans-serif;
  width: 450px;
  border: none;
  background-color: rgb(255, 255, 255);
  border: rgb(221, 223, 226) solid 1px;
  padding: 10px;
}
.comments {
  width: 440px;
}
.author-post,
.author-comment {
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
}
.timestamp-comment {
  padding: 0px;
  margin: 0px;
  font-size: 10px;
}
.message-comment {
  font-size: 12px;
  margin-top: 5px;
  background-color: whitesmoke;
  border-radius: 10px;
  padding: 4px;
}

.expand-comments {
  display: flex;
  flex-direction: row-reverse;

  width: 100%;
  height: 15px;
  margin-top: 10px;
}
.expand-comments > img {
  height: 100%;
}
</style>

