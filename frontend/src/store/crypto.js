import * as types from './mutationTypes.js'
import { sendCoin } from '@/eth.js'

const state = {
  isSending: false,
  error: '',
  receipts: []
}

const mutations = {
  [types.SEND_COIN_PENDING](state) {
    state.isSending = true
  },
  [types.SEND_COIN_SUCCESS](state, receipt) {
    state.isSending = true
    state.receipts = [receipt, ...state.receipts]
  },
  [types.SEND_COIN_FAILURE](state, e) {
    state.isSending = true
    state.error = e
  }
}

const actions = {
  async sendCoin({ commit, rootState }, { to, value }) {
    commit(types.SEND_COIN_PENDING)
    try {
      const from = rootState.user.currentUser.account
      const receipt = await sendCoin(from, to, value)
      commit(types.SEND_COIN_SUCCESS, receipt)
    } catch (e) {
      commit(types.SEND_COIN_FAILURE, e)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
