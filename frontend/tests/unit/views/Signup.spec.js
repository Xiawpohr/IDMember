import { shallowMount } from '@vue/test-utils'
import Signup from '@/views/Signup.vue'
import SignupForm from '@/components/SignupForm.vue'

let wrapper

beforeEach(() => {
  wrapper = shallowMount(Signup)
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
  const signup = jest.fn()
  const signupForm = wrapper.find(SignupForm)
  wrapper.setMethods({
    signup
  })
  signupForm.vm.$emit('submitted', auth)
  expect(signup).toHaveBeenCalled()
})
