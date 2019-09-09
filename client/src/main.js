import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
// Import the styles directly. (Or you could add them via script tags.)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false

import env_var from "./environment_variables.json";
import Cookie from "js-cookie";

//anslut socket.io
import VueSocketIO from 'vue-socket.io'
Vue.use(new VueSocketIO({
  debug: false,
  connection: env_var.SOCKET_CONNECTION_URL_LOCAL,
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  },
  options: {}, //Optional options
}))

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
