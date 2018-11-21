import Home from '@/views/Home.vue'
import Friends from '@/views/Friends.vue'
import Profile from '@/views/Profile.vue'
import Login from '@/views/Login.vue'
import Signup from '@/views/Signup.vue'
import authGuard from './authGuard.js'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter: authGuard
  },
  {
    path: '/friends',
    name: 'friend',
    component: Friends,
    beforeEnter: authGuard
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    beforeEnter: authGuard
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  }
]

export default routes
