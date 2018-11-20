import Vue from 'vue'
import Vuetify from 'vuetify'
import { shallowMount } from '@vue/test-utils'
import ProfileForm from '@/components/ProfileForm.vue'

Vue.use(Vuetify)

const user = {
  firstName: 'Arthur',
  lastName: 'Hsiao',
  email: 'test@example.com',
  phone: '1234567890',
  bio: 'This is biography.',
  gender: 'male',
  birthday: '1993/06/23'
}

let wrapper

beforeEach(() => {
  wrapper = shallowMount(ProfileForm, { localVue: Vue })
})

it('should render the component', () => {
  expect(wrapper.html()).toMatchSnapshot()
})

// it('should call submitted event when submitting form', () => {
//   wrapper.setData({
//     ...user,
//     valid: true
//   })
//   const button = wrapper.find('[type="submit"]')
//   button.trigger('click')
//   button.trigger('submit')
//   expect(wrapper.emitted('submitted')[0]).toEqual([user])
// })
