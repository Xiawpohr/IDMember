import { shallowMount } from '@vue/test-utils'
import Login from '@/views/Login.vue'
import LoginForm from '@/components/LoginForm.vue'

let wrapper

beforeEach(() => {
  wrapper = shallowMount(Login)
})

it('should render the component', () => {
  expect(wrapper.html()).toMatchSnapshot()
})

it('should render LoginForm component', () => {
  expect(wrapper.contains(LoginForm)).toBe(true)
})

// it('should authenticate user when recieving submitted event', () => {
//   const auth = {
//     email: 'test@example.com',
//     password: '123456'
//   }
//   const login = jest.fn()
//   const loginForm = wrapper.find(LoginForm)
//   loginForm.vm.$emit('submitted', auth)
//   wrapper.setMethods({
//     login
//   })
//   expect(login).toHaveBeenCalled()
//   expect(login.mock.calls[0][0]).toEqual(auth)
// })
