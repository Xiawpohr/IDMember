import { shallowMount } from '@vue/test-utils'
import UserItem from '@/components/UserItem.vue'

const user = { id: 1, name: 'Arthur' }

it('should render the component with user prop', () => {
  const userItem = shallowMount(UserItem, {
    propsData: {
      user
    }
  })
  expect(userItem.html()).toMatchSnapshot()
})
