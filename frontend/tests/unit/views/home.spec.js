import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Home from '@/views/Home.vue'
import UserList from '@/components/UserList.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
let wrapper, state, actions, store

beforeEach(() => {
  state = {
    users: [{ name: 'Arthur' }, { name: 'Robert' }]
  }
  actions = {
    fetchUsers: jest.fn()
  }
  store = new Vuex.Store({
    modules: {
      user: {
        namespaced: true,
        state,
        actions
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

it('should render UserList component', () => {
  const userList = wrapper.find(UserList)
  expect(userList.exists()).toBe(true)
})

it('should pass users prop to UserList component', () => {
  const userList = wrapper.find(UserList)
  expect(userList.vm.users).toBe(state.users)
})

it('should fetch users when the component created', () => {
  expect(actions.fetchUsers).toHaveBeenCalled()
})
