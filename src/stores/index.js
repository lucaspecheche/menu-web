import Vue from 'vue'
import Vuex from 'vuex'

import customers from './customers'
import orders from './orders'
import reports from './reports'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    customers,
    orders,
    reports
  },
  state: {
    userName: 'Pecheche',
    userAvatar: 'avatar.jpg',

    isNavBarVisible: true,

    isAsideVisible: true,
    isAsideMobileExpanded: false
  },
  mutations: {
    basic (state, payload) {
      state[payload.key] = payload.value
    },

    user (state, payload) {
      if (payload.name) {
        state.userName = payload.name
      }

      if (payload.avatar) {
        state.userAvatar = payload.avatar
      }
    },

    asideMobileStateToggle (state, payload = null) {
      const htmlClassName = 'has-aside-mobile-expanded'

      let isShow

      if (payload !== null) {
        isShow = payload
      } else {
        isShow = !state.isAsideMobileExpanded
      }

      if (isShow) {
        document.documentElement.classList.add(htmlClassName)
      } else {
        document.documentElement.classList.remove(htmlClassName)
      }

      state.isAsideMobileExpanded = isShow
    }
  }
})
