import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Profile from '@/views/Profile.vue'
import ProfileForm from '@/components/ProfileForm.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

const user = { id: 1, firstName: 'Arthur', lastName: 'Hsiao' }
let wrapper, state, actions, store

beforeEach(() => {
  state = {
    currentUser: user
  }
  actions = {
    fetchCurrentUser: jest.fn().mockResolvedValue(user),
    saveUser: jest.fn().mockResolvedValue(user)
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
  wrapper = shallowMount(Profile, {
    localVue,
    store
  })
})

it('should render the component', () => {
  expect(wrapper.html()).toMatchSnapshot()
})

it('should render ProfileForm component', () => {
  const profileForm = wrapper.find(ProfileForm)
  expect(profileForm.exists()).toBe(true)
})

it('should pass user prop to the ProfileForm component', () => {
  const profileForm = wrapper.find(ProfileForm)
  expect(profileForm.vm.user).toEqual(user)
})

it('should fetch current user when the component created', () => {
  expect(actions.fetchCurrentUser).toHaveBeenCalled()
})

it('should save user information when recieving submmited', () => {
  const profileForm = wrapper.find(ProfileForm)
  profileForm.vm.$emit('submitted', user)
  expect(actions.saveUser).toHaveBeenCalled()
  expect(actions.saveUser.mock.calls[0][1]).toEqual(user)
})
