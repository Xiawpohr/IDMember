import * as types from './mutationTypes'
import userApi from '@/api/user.js'

const state = {
  isFetchingAllUsers: false,
  errorMassenge: '',
  users: []
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
