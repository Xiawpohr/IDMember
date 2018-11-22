import Vue from 'vue'
import Vuetify from 'vuetify'
import { shallowMount } from '@vue/test-utils'
import UserList from '@/components/UserList.vue'

Vue.use(Vuetify)

let wrapper
let users = [{ id: 1, name: 'Arthur' }, { id: 2, name: 'Robert' }]

beforeEach(() => {
  wrapper = shallowMount(UserList, {
    localVue: Vue,
    propsData: {
      users
    }
  })
})

it('should render the component', () => {
  expect(wrapper.html()).toMatchSnapshot()
})
