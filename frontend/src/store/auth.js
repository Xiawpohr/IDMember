import * as types from './mutationTypes.js'
import authApi from '@/api/auth.js'

const state = {
  isLoading: false,
  errorMassenge: '',
  id: null,
  email: null,
  token: null
}

const mutations = {
  [types.LOGIN_PENDING](state) {
    state.isLoading = true
  },
  [types.LOGIN_SUCCESS](state, authenticatedUser) {
    state.isLoading = false
    state.id = authenticatedUser.id
    state.email = authenticatedUser.email
    state.token = authenticatedUser.token
  },
  [types.LOGIN_FAILURE](state, error) {
    state.isLoading = false
    state.errorMassenge = error
  }
}

const actions = {
  async login({ commit }, auth) {
    commit(types.LOGIN_PENDING)
    try {
      const authenticatedUser = await authApi.login(auth)
      commit(types.LOGIN_SUCCESS, authenticatedUser)
    } catch (e) {
      commit(types.LOGIN_FAILURE, e)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
