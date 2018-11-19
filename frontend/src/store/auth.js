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
  [types.SIGNUP_PENDING](state) {
    state.isLoading = true
  },
  [types.SIGNUP_SUCCESS](state, registeredUser) {
    state.isLoading = false
    state.id = registeredUser.id
    state.email = registeredUser.email
    state.token = registeredUser.token
  },
  [types.SIGNUP_FAILURE](state, error) {
    state.isLoading = false
    state.errorMassenge = error
  },
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
  async signup({ commit }, auth) {
    commit(types.SIGNUP_PENDING)
    try {
      const registeredUser = await authApi.signup(auth)
      commit(types.SIGNUP_SUCCESS, registeredUser)
    } catch (e) {
      commit(types.SIGNUP_FAILURE, e)
    }
  },
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
