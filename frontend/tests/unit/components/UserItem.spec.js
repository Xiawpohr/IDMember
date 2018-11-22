import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { shallowMount } from '@vue/test-utils'
import UserItem from '@/components/UserItem.vue'
import { currentUser } from '@/fixtures/users.js'

Vue.use(Vuex)
Vue.use(Vuetify)

let wrapper, state, getters, actions, store

beforeEach(() => {
  state = {
    requestedFriendIds: [],
    confirmingFriendIds: [currentUser.id],
    friends: [currentUser, currentUser, currentUser]
  }
  getters = {
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
  actions = {
    request: jest.fn(),
    confirm: jest.fn()
  }
  store = new Vuex.Store({
    modules: {
      friend: {
        namespaced: true,
        state,
        getters,
        actions
      }
    }
  })
  wrapper = shallowMount(UserItem, {
    localVue: Vue,
    propsData: {
      user: currentUser
    },
    store
  })
})

it('should render the component with user prop', () => {
  expect(wrapper.html()).toMatchSnapshot()
})
