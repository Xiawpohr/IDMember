import * as types from './mutationTypes'
import friendApi from '@/api/friend.js'

const state = {
  isFetchingAll: false,
  isFetchingRequests: false,
  isRequesting: false,
  errorMassenge: '',
  friends: [],
  waitingForConfirmingFriendIds: [],
  requestedFriendIds: []
}

const getters = {
  isRequestedFriend(state) {
    return userId => {
      return state.requestedFriendIds.indexOf(userId) !== -1
    }
  }
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
  [types.FETCH_FRIEND_REQUESTS_PENDING](state) {
    state.isFetchingRequests = true
  },
  [types.FETCH_FRIEND_REQUESTS_SUCCESS](state, friendIds) {
    state.isFetchingRequests = false
    state.requestedFriendIds = [...friendIds]
  },
  [types.FETCH_FRIEND_REQUESTS_FAILURE](state, error) {
    state.isFetchingRequests = false
    state.errorMassenge = error
  },
  [types.REQUEST_FRIEND_PENDING](state) {
    state.isRequesting = true
  },
  [types.REQUEST_FRIEND_SUCCESS](state, friend) {
    state.isRequesting = false
    state.requestedFriendIds = [friend.id, ...state.requestedFriendIds]
  },
  [types.REQUEST_FRIEND_FAILURE](state, error) {
    state.isRequesting = false
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
  async fetchFriendRequests({ commit }) {
    commit(types.FETCH_FRIEND_REQUESTS_PENDING)
    try {
      const friendRequests = await friendApi.fetchRequests()
      const requestedFriendIds = friendRequests.map(req => req.to)
      console.log(friendRequests)
      commit(types.FETCH_FRIEND_REQUESTS_SUCCESS, requestedFriendIds)
    } catch (e) {
      commit(types.FETCH_FRIEND_REQUESTS_FAILURE, e)
    }
  },
  async request({ commit }, friendId) {
    commit(types.REQUEST_FRIEND_PENDING)
    try {
      await friendApi.request(friendId)
      commit(types.REQUEST_FRIEND_SUCCESS, { id: friendId })
    } catch (e) {
      commit(types.REQUEST_FRIEND_FAILURE, e)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
