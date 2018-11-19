import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Login from '@/views/Login.vue'
import LoginForm from '@/components/LoginForm.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper, actions, store

beforeEach(() => {
  actions = {
    login: jest.fn()
  }
  store = new Vuex.Store({
    modules: {
      auth: {
        namespaced: true,
        actions
      }
    }
  })
  wrapper = shallowMount(Login, {
    localVue,
    store
  })
})

it('should render the component', () => {
  expect(wrapper.html()).toMatchSnapshot()
})

it('should render LoginForm component', () => {
  expect(wrapper.contains(LoginForm)).toBe(true)
})

it('should authenticate user when recieving submitted event', () => {
  const auth = {
    email: 'test@example.com',
    password: '123456'
  }
  const loginForm = wrapper.find(LoginForm)
  loginForm.vm.$emit('submitted', auth)
  expect(actions.login).toHaveBeenCalled()
})
