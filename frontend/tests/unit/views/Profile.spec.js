import { shallowMount, createLocalVue } from '@vue/test-utils'
import Profile from '@/views/Profile.vue'
import ProfileForm from '@/components/ProfileForm.vue'

const localVue = createLocalVue()

let wrapper

beforeEach(() => {
  wrapper = shallowMount(Profile, {
    localVue
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
  const user = { name: 'Arthur', gender: 'male' }
  const profileForm = wrapper.find(ProfileForm)
  wrapper.setData({ currentUser: user })
  expect(profileForm.vm.user).toEqual(user)
})
