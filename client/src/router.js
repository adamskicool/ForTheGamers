import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import GiveAway from './views/GiveAway.vue'
import Search from './views/Search.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
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
