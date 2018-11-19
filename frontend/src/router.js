import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Friends from './views/Friends.vue'
import Profile from './views/Profile.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/friends',
      name: 'friend',
      component: Friends
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
