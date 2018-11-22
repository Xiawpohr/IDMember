import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { shallowMount } from '@vue/test-utils'
import Signup from '@/views/Signup.vue'
import SignupForm from '@/components/SignupForm.vue'

Vue.use(Vuex)
Vue.use(Vuetify)

let wrapper, state, actions, store

beforeEach(() => {
  state = {
    isLoading: false,
    id: null
  }
  actions = {
    signup: jest.fn()
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
  wrapper = shallowMount(Signup, { localVue: Vue, store })
})

it('should render the component', () => {
  expect(wrapper.html()).toMatchSnapshot()
})

it('should render SignupForm component', () => {
  expect(wrapper.contains(SignupForm)).toBe(true)
})

it('should sign up user when recieving submitted event', () => {
  const auth = {
    email: 'test@example.com',
    password: '123456'
  }
  const signupForm = wrapper.find(SignupForm)
  signupForm.vm.$emit('submitted', auth)
  expect(actions.signup).toHaveBeenCalled()
})
