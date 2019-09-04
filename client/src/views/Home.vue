<template>
  <div class="home">
    <div class="clans-wrapper">
      <div class="clans box box-hover">
        <div id="banner">
          <p>CLANS</p>
        </div>
        <div id="clans">
          <Loading v-bind:active_loading="this.clans_loading_active" />
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
    </div>
    <div class="postcards">
      <PostUploadCard />
      <Loading v-bind:active_loading="this.loading_active" />
      <PostCard
        v-for="post in this.posts"
        v-bind:key="post.postID"
        v-bind:id="post.postID"
        v-bind:authorID="post.userID"
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
import Loading from "../components/Loading.vue";
import Cookie from "js-cookie";
import env_variables from "../environment_variables.json";
export default {
  components: { ClanCard, PostUploadCard, PostCard, Loading },
  data() {
    return {
      clans: [],
      posts: [],
      loading_active: false,
      clans_loading_active: false
    };
  },
  created() {
    this.loadClans();
    if (this.$store.getters.currentClanID != null) {
      this.loadPosts(this.$store.getters.currentClanID);
    }
  },
  methods: {
    handleClanClicked: function(clanid) {
      this.$store.commit("changeCurrentClanID", clanid);
      this.posts = [];
      this.loadPosts(clanid);
    },
    loadClans() {
      this.clans_loading_active = true;
      fetch(env_variables.BASE_URL + "clans", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          userid: Cookie.get("id")
        }
      })
        .then(res => res.json())
        .then(clans => {
          this.clans = clans;
          this.clans_loading_active = false;
        });
    },
    loadPosts(clanid) {
      this.loading_active = true;
      fetch(env_variables.BASE_URL + "clanPosts", {
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
          this.loading_active = false;
        });
    }
  }
};

/**
 * Method for loading posts specifik to a certain clan.
 */
let loadPosts = (component, clanid) => {};
</script>






<style scoped>
.home {
  display: grid;
  grid-template-areas: "a b";
  grid-template-rows: calc(100vh - 60px);
  grid-template-columns: 200px calc(100% - 200px);
}
.clans-wrapper {
  grid-area: a;
  width: 100%;
  height: 100%;
  padding: 10px;
  overflow: visible;
}
.clans {
  height: 100%;
  padding: 0px;
}
#banner {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30px;
  background-color: rgb(30, 144, 255);
  color: white;
}
#banner > p {
  margin: 0px;
  padding: 0px;
}
#clans {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
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

@media only screen and (max-width: 600px) {
  .home {
    display: grid;
    grid-template-areas:
      "a"
      "b";
    grid-template-columns: 100%;
    grid-template-rows: 60px calc(100vh - 120px); /* Wierd solution */
  }

  /* make the clans banner invisible */
  #banner {
    height: 0px;
    overflow: hidden;
  }
  /* make the clans section smaller */
  .clans-wrapper {
    height: 100%;
    width: 100%;
    padding: 0px;
  }
  #clans {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    overflow: scroll;
  }
}
</style>
