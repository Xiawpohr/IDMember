import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import Login from '@/views/Login.vue'
import LoginForm from '@/components/LoginForm.vue'

Vue.use(Vuex)
Vue.use(Vuetify)

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper, state, actions, store

beforeEach(() => {
  state = {
    isLoading: false,
    id: null
  }
  actions = {
    login: jest.fn()
  }
  store = new Vuex.Store({
    modules: {
      auth: {
        namespaced: true,
        state,
        actions
      }
    }
  })
  wrapper = shallowMount(Login, {
    localVue: Vue,
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
