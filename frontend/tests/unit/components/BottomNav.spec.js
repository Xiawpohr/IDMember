import { shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import BottomNav from '@/components/BottomNav.vue'

Vue.use(Vuex)
Vue.use(Vuetify)

const state = {
  id: 1
}

const store = new Vuex.Store({
  modules: {
    auth: {
      state
    }
  }
})

it('should render the component', () => {
  const wrapper = shallowMount(BottomNav, { localVue: Vue, store })
  expect(wrapper.html()).toMatchSnapshot()
})
