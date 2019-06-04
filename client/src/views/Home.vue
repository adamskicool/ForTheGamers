<template>
  <div class="home">
    <div class>
      <PostCard
        v-for="post in this.posts"
        v-bind:key="post.postID"
        v-bind:id="post.postID"
        v-bind:author="post.username"
        v-bind:image="post.imageURL"
        v-bind:message="post.message"
        v-bind:timestamp="post.time"
      />
    </div>
  </div>
</template>





<script>
import PostCard from "../components/PostCard.vue";
export default {
  components: { PostCard },
  data() {
    return {
      posts: []
    };
  },
  created() {
    //fetch the posts of user with userid = 2
    fetch("http://localhost:8989/api/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        userid: 2
      }
    })
      .then(res => res.json())
      .then(posts => {
        //console.log(posts);
        this.posts = posts;
      });
  }
};
</script>






<style scoped>
.home {
  width: 100vw;
  padding: 10px 20% 10px 20%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
}
</style>
