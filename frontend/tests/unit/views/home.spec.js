import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Home from '@/views/Home.vue'
import UserList from '@/components/UserList.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
let wrapper, state, store

beforeEach(() => {
  state = {
    users: [{ name: 'Arthur' }, { name: 'Robert' }]
  }
  store = new Vuex.Store({
    state
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
