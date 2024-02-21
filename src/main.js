import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

// Styles
import "./assets/styles/bootstrap.css"
import "./assets/styles/app.scss"
import "./assets/styles/scss/index.scss"

const router = new VueRouter({
  routes: []
})

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
