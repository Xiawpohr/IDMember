import Vue from 'vue'
import Vuex from 'vuex'
import user from './user.js'
import friend from './friend.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    friend
  }
})
