import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import Profile from './views/Profile.vue'
import GiveAway from './views/GiveAway.vue'
import Search from './views/Search.vue'

Vue.use(Router)

let router = new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/profile/:userid',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/giveaway',
      name: 'GiveAway',
      component: GiveAway
    }
  ]
})
import store from './store'
router.beforeEach((to, from, next) => {
  // console.log("JWT: " + Cookie.get("JWT"))
  // console.log("ID: " + Cookie.get("id"))

  //Om vi försöker accessa en view där man måste vara inloggad, kolla användaren först
  validUserInfo().then(valid => {
    if (to.name != "Login") {
      if (valid) {
        store.commit('changeLoggedIn', true)
        next()
      } else {
        store.commit('changeLoggedIn', false)
        next('/login')
      }
    }
    else {
      if (!valid) {
        store.commit('changeLoggedIn', false)
        next();
      } else {
        store.commit('changeLoggedIn', true)
        next('/home')
      }
    }
  })
})


const Cookie = require('js-cookie')
import env_variables from "./environment_variables.json";
let validUserInfo = async () => {
  //validate the JSON Web token with the server
  let res = await fetch(env_variables.BASE_URL + "authenticate", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authentication: Cookie.get("JWT"),
      id: Cookie.get("id")
    }
  });
  let result = await res.json();

  if (result.success == true) {
    return true;
  } else {
    return false;
  }
}


export default router
