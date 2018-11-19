import { shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'
import BottomNav from '@/components/BottomNav.vue'

Vue.use(Vuetify)

it('should render the component', () => {
  const wrapper = shallowMount(BottomNav, { localVue: Vue })
  expect(wrapper.html()).toMatchSnapshot()
})
