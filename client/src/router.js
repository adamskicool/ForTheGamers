import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import GiveAway from './views/GiveAway.vue'
import Search from './views/Search.vue'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
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


router.beforeEach((to, from, next) => {
  //Om vi försöker accessa en view där man måste vara inloggad, kolla användaren först
  validUserInfo().then(result => {
    if (to.name != "Login") {
      if (result) {
        console.log("Gå till next()")
        next()
      } else {
        next('/login')
      }
    }
    else {
      next();
    }
  })
})


const Cookie = require('js-cookie')
let validUserInfo = async () => {
  //validate the JSON Web token with the server
  let res = await fetch("http://localhost:8989/api/authenticate", {
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
