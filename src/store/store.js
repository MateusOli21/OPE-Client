import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    teacherSeeGroupDetails: false
  },
  mutations: {
    teacherSeeGroupDetails (state, teacherSeeGroupDetails) {
      state.teacherSeeGroupDetails = teacherSeeGroupDetails
    }
  },
  getters: {
    teacherSeeGroupDetails: state => state.teacherSeeGroupDetails
  }
})
