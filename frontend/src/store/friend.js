import * as types from './mutationTypes'
import friendApi from '@/api/friend.js'

const state = {
  isFetchingAll: false,
  isAdding: false,
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
  },
  [types.ADD_FRIEND_PENDING](state) {
    state.isAdding = true
  },
  [types.ADD_FRIEND_SUCCESS](state, friend) {
    state.isAdding = false
    state.friends = [friend, ...state.friends]
  },
  [types.ADD_FRIEND_FAILURE](state, error) {
    state.isAdding = false
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
  },
  async addFriend({ commit }, friendId) {
    commit(types.ADD_FRIEND_PENDING)
    try {
      const newFriend = await friendApi.create(friendId)
      commit(types.ADD_FRIEND_SUCCESS, newFriend)
    } catch (e) {
      commit(types.ADD_FRIEND_FAILURE, e)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
