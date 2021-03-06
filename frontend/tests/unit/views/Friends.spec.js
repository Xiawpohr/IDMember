import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Friends from '@/views/Friends.vue'
import UserList from '@/components/UserList.vue'
import { users } from '@/fixtures/users.js'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper, state, actions, store

beforeEach(() => {
  state = {
    friends: users
  }
  actions = {
    fetchAll: jest.fn()
  }
  store = new Vuex.Store({
    modules: {
      friend: {
        namespaced: true,
        state,
        actions
      }
    }
  })
  wrapper = shallowMount(Friends, {
    localVue,
    store
  })
})

it('should render the component', () => {
  expect(wrapper.html()).toMatchSnapshot()
})

it('should render UserList && FriendItem component', () => {
  expect(wrapper.contains(UserList)).toBe(true)
})

it('should pass users prop to UserList component', () => {
  const userList = wrapper.find(UserList)
  expect(userList.vm.users).toBe(state.friends)
})

it('should fetch all friends when the component created', () => {
  expect(actions.fetchAll).toHaveBeenCalled()
})
