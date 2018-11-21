import store from '@/store/index.js'

export default (to, from, next) => {
  if (store.state.auth.id === null) {
    next('/login')
  }
  next()
}
