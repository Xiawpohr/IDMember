import * as types from './mutationTypes'
import friendApi from '@/api/friend.js'

const state = {
  isFetchingAll: false,
  errorMassenge: '',
  friends: []
}

const mutations = {
  [types.FETCH_FRIENDS_PENDING](state) {
    state.isFetchingAll = true
  },
  [types.FETCH_FRIENDS_SUCCESS](state, friends) {
    state.isFetchingAll = false
    state.friends = [...friends]
  },
  [types.FETCH_FRIENDS_FAILURE](state, error) {
    state.isFetchingAll = false
    state.errorMassenge = error
  }
}

const actions = {
  async fetchAll({ commit }) {
    commit(types.FETCH_FRIENDS_PENDING)
    try {
      const friends = await friendApi.fetchAll()
      commit(types.FETCH_FRIENDS_SUCCESS, friends)
    } catch (e) {
      commit(types.FETCH_FRIENDS_FAILURE, e)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
