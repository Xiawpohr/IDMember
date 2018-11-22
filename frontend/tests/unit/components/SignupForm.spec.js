import Vue from 'vue'
import Vuetify from 'vuetify'
import { shallowMount } from '@vue/test-utils'
import SignupForm from '@/components/SignupForm.vue'

Vue.use(Vuetify)

let wrapper

beforeEach(() => {
  wrapper = shallowMount(SignupForm, { localVue: Vue })
})

it('should render the component', () => {
  expect(wrapper.html()).toMatchSnapshot()
})

// it('should call submittd event when submitting the form', () => {
//   const auth = { email: 'test@example.com', password: '123456' }
//   wrapper.setData({
//     ...auth
//   })
//   const button = wrapper.find('button')
//   button.trigger('click')
//   button.trigger('submit')
//   expect(wrapper.emitted('submitted')[0]).toEqual([auth])
// })
