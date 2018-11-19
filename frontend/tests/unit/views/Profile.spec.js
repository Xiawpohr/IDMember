import { shallowMount, createLocalVue } from '@vue/test-utils'
import Profile from '@/views/Profile.vue'
import ProfileForm from '@/components/ProfileForm.vue'

const localVue = createLocalVue()
const user = { id: 1, firstName: 'Arthur', lastName: 'Hsiao' }
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
  const profileForm = wrapper.find(ProfileForm)
  wrapper.setData({ currentUser: user })
  expect(profileForm.vm.user).toEqual(user)
})

it('should save user information when recieving submmited', () => {
  const saveUser = jest.fn()
  const profileForm = wrapper.find(ProfileForm)
  wrapper.setData({ currentUser: user })
  wrapper.setMethods({ saveUser })

  profileForm.vm.$emit('submitted', user)
  expect(saveUser).toHaveBeenCalled()
  expect(saveUser.mock.calls[0][0]).toEqual(user)
})
