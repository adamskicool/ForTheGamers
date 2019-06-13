<template>
  <div class="home">
    <div class="clans-wrapper">
      <div id="banner">
        <p>CLANS</p>
      </div>
      <div id="clans">
        <ClanCard
          v-for="clan in this.clans"
          v-bind:key="clan.clanID"
          v-bind:id="clan.clanID"
          v-bind:logo="clan.logo"
          v-bind:name="clan.name"
          v-on:clicked="handleClanClicked"
        />
      </div>
    </div>
    <div class="postcards">
      <PostUploadCard/>
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
import ClanCard from "../components/ClanCard.vue";
import PostUploadCard from "../components/PostUploadCard.vue";
import PostCard from "../components/PostCard.vue";
import Cookie from "js-cookie";
export default {
  components: { ClanCard, PostUploadCard, PostCard },
  data() {
    return {
      clans: [],
      posts: []
    };
  },
  created() {
    fetch("http://localhost:8989/api/clans", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        userid: Cookie.get("id")
      }
    })
      .then(res => res.json())
      .then(clans => {
        this.clans = clans;
      });

    //fetch the posts of user with userid = 2
    fetch("http://localhost:8989/api/clanPosts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        clanid: 2
      }
    })
      .then(res => res.json())
      .then(posts => {
        //console.log(posts);
        this.posts = posts;
      });
  },
  methods: {
    handleClanClicked: function(clanid) {
      this.posts = [];
      fetch("http://localhost:8989/api/clanPosts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          clanid: clanid
        }
      })
        .then(res => res.json())
        .then(posts => {
          //console.log(posts);
          this.posts = posts;
        });
    }
  }
};
</script>






<style scoped>
.home {
  display: grid;
  grid-template-areas: "a b";
  grid-template-rows: calc(100vh - 60px);
  grid-template-columns: 200px calc(100vw - 200px);
}
.clans-wrapper {
  grid-area: a;
  width: 100%;
  height: auto;
  background-color: rgb(255, 255, 255);
  border: rgb(221, 223, 226) solid 1px;
  border-radius: 4px;
  margin: 8px;
  overflow: scroll;
}
.clans-wrapper > #banner {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30px;
  background-color: rgb(30, 144, 255);
  color: white;
}
.clans-wrapper > #banner > p {
  margin: 0px;
  padding: 0px;
}
.clans-wrapper > #clans {
  padding: 8px;
}
.postcards {
  grid-area: b;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: scroll;
  padding-top: 5px;
  padding-bottom: 30px;
}
</style>
