import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Home from '@/views/Home.vue'
import UserList from '@/components/UserList.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
let wrapper, state, userActions, friendActions, store

beforeEach(() => {
  state = {
    users: [{ name: 'Arthur' }, { name: 'Robert' }]
  }
  userActions = {
    fetchUsers: jest.fn()
  }
  friendActions = {
    fetchFriendRequests: jest.fn(),
    fetchFriendConfirmations: jest.fn()
  }
  store = new Vuex.Store({
    modules: {
      user: {
        namespaced: true,
        state,
        actions: userActions
      },
      friend: {
        namespaced: true,
        actions: friendActions
      }
    }
  })
  wrapper = shallowMount(Home, {
    localVue,
    store
  })
})

it('should render the component', () => {
  expect(wrapper.html()).toMatchSnapshot()
})

it('should render UserList && UserItem components', () => {
  expect(wrapper.contains(UserList)).toBe(true)
})

it('should pass users prop to UserList component', () => {
  const userList = wrapper.find(UserList)
  expect(userList.vm.users).toBe(state.users)
})

it('should fetch users when the component created', () => {
  expect(userActions.fetchUsers).toHaveBeenCalled()
})

it('should fetch friend requests when the component created', () => {
  expect(friendActions.fetchFriendRequests).toHaveBeenCalled()
})

it('should fetch friend confirmations when the component created', () => {
  expect(friendActions.fetchFriendConfirmations).toHaveBeenCalled()
})
