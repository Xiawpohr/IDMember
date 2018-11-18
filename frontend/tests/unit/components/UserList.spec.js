import { shallowMount } from '@vue/test-utils'
import UserList from '@/components/UserList.vue'
import UserItem from '@/components/UserItem.vue'

let wrapper
let users = [{ id: 1, name: 'Arthur' }, { id: 2, name: 'Robert' }]

beforeEach(() => {
  wrapper = shallowMount(UserList, {
    propsData: {
      users
    }
  })
})

it('should render the component', () => {
  expect(wrapper.html()).toMatchSnapshot()
})

it('should render the UserItem component', () => {
  const userItem = wrapper.find(UserItem)
  expect(userItem.exists()).toBe(true)
})

it('should loop users to render UserIten components', () => {
  const userItems = wrapper.findAll(UserItem)
  expect(userItems.length).toBe(users.length)
})

it('should pass individual user to each UserItem component', () => {
  const index = 1
  const userItem = wrapper.findAll(UserItem).at(index)
  expect(userItem.vm.user).toEqual(users[index])
})
