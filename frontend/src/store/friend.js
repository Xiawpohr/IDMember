import * as types from './mutationTypes'
import friendApi from '@/api/friend.js'

const state = {
  isFetchingAll: false,
  isFetchingRequests: false,
  isFetchingConfirmations: false,
  isRequesting: false,
  errorMassenge: '',
  friends: [],
  confirmingFriendIds: [],
  requestedFriendIds: []
}

const getters = {
  isRequestedFriend(state) {
    return userId => {
      return state.requestedFriendIds.indexOf(userId) !== -1
    }
  },
  isWaitingForConfirmingFriend(state) {
    return userId => {
      return state.confirmingFriendIds.indexOf(userId) !== -1
    }
  },
  isFriend(state) {
    return userId => {
      return state.friends.findIndex(friend => friend.id === userId) !== -1
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
  [types.FETCH_FRIEND_CONFIRMATIONS_PENDING](state) {
    state.isFetchingConfirmations = true
  },
  [types.FETCH_FRIEND_CONFIRMATIONS_SUCCESS](state, friendIds) {
    state.isFetchingConfirmations = false
    state.confirmingFriendIds = [...friendIds]
  },
  [types.FETCH_FRIEND_CONFIRMATIONS_FAILURE](state, error) {
    state.isFetchingConfirmations = false
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
  },
  [types.CONFIRM_FRIEND_PENDING](state) {
    state.isConfirming = true
  },
  [types.CONFIRM_FRIEND_SUCCESS](state, friend) {
    state.isConfirming = false
    state.confirmingFriendIds = state.confirmingFriendIds.filter(
      id => id !== friend.id
    )
    state.friends = [friend, ...state.friends]
  },
  [types.CONFIRM_FRIEND_FAILURE](state, error) {
    state.isConfirming = false
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
      commit(types.FETCH_FRIEND_REQUESTS_SUCCESS, requestedFriendIds)
    } catch (e) {
      commit(types.FETCH_FRIEND_REQUESTS_FAILURE, e)
    }
  },
  async fetchFriendConfirmations({ commit }) {
    commit(types.FETCH_FRIEND_CONFIRMATIONS_PENDING)
    try {
      const friendConfirmations = await friendApi.fetchConfirmations()
      const ConfirmingFriendIds = friendConfirmations.map(req => req.from)
      commit(types.FETCH_FRIEND_CONFIRMATIONS_SUCCESS, ConfirmingFriendIds)
    } catch (e) {
      commit(types.FETCH_FRIEND_CONFIRMATIONS_FAILURE, e)
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
  },
  async confirm({ commit }, friendId) {
    commit(types.CONFIRM_FRIEND_PENDING)
    try {
      const friend = await friendApi.confirm(friendId)
      commit(types.CONFIRM_FRIEND_SUCCESS, friend)
    } catch (e) {
      commit(types.CONFIRM_FRIEND_FAILURE, e)
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
