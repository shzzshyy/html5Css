import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    counter: 2000
  },
  mutations: {
    increatement() {
      state.counter ++
    },
    decreament() {
      state.counter --
    }
  },
})

export default store