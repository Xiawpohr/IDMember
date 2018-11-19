import { shallowMount } from '@vue/test-utils'
import ProfileForm from '@/components/ProfileForm.vue'

const user = { firstName: 'Arthur', lastName: 'Hsiao' }

let wrapper

beforeEach(() => {
  wrapper = shallowMount(ProfileForm)
})

it('should render the component', () => {
  expect(wrapper.html()).toMatchSnapshot()
})

it('should call submitted event when submitting form', () => {
  wrapper.setData({
    ...user
  })
  const button = wrapper.find('button')
  button.trigger('click')
  button.trigger('submit')
  expect(wrapper.emitted('submitted')[0]).toEqual([user])
})
