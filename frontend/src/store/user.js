import * as types from './mutationTypes'
import userApi from '@/api/user.js'

const state = {
  isFetchingAllUsers: false,
  isFetchingCurrentUser: false,
  isSaving: false,
  errorMassenge: '',
  users: [],
  currentUser: {}
}

const mutations = {
  [types.FETCH_USERS_PENDING](state) {
    state.isFetchingAllUsers = true
  },
  [types.FETCH_USERS_SUCCESS](state, users) {
    state.isFetchingAllUsers = false
    state.users = [...users]
  },
  [types.FETCH_USERS_FAILURE](state, error) {
    state.isFetchingAllUsers = false
    state.errorMassenge = error
  },
  [types.FETCH_CURRENT_USER_PENDING](state) {
    state.isFetchingCurrentUser = true
  },
  [types.FETCH_CURRENT_USER_SUCCESS](state, currentUser) {
    state.isFetchingCurrentUser = false
    state.currentUser = { ...currentUser }
  },
  [types.FETCH_CURRENT_USER_FAILURE](state, error) {
    state.isFetchingCurrentUser = false
    state.errorMassenge = error
  },
  [types.SAVE_USER_PENDING](state) {
    state.isSaving = true
  },
  [types.SAVE_USER_SUCCESS](state, user) {
    state.isSaving = false
    state.currentUser = { ...user }
  },
  [types.SAVE_USER_FAILURE](state, error) {
    state.isSaving = false
    state.errorMassenge = error
  }
}

const actions = {
  async fetchUsers({ commit }) {
    commit(types.FETCH_USERS_PENDING)
    try {
      const users = await userApi.fetchAll()
      commit(types.FETCH_USERS_SUCCESS, users)
    } catch (e) {
      commit(types.FETCH_USERS_FAILURE, e)
    }
  },
  async fetchCurrentUser({ commit }) {
    commit(types.FETCH_CURRENT_USER_PENDING)
    try {
      const currentUser = await userApi.fetchCurrentUser()
      commit(types.FETCH_CURRENT_USER_SUCCESS, currentUser)
    } catch (e) {
      commit(types.FETCH_CURRENT_USER_FAILURE, e)
    }
  },
  async saveUser({ commit, state }, user) {
    commit(types.SAVE_USER_PENDING)
    try {
      const updatedUser = await userApi.update({
        ...state.currentUser,
        ...user
      })
      commit(types.SAVE_USER_SUCCESS, updatedUser)
    } catch (e) {
      commit(types.SAVE_USER_FAILURE, e)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
