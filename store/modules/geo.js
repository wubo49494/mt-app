const state = () => ({
  position: {}
})

const mutations = {
  setPosition (state, val) {
    state.position = val
  },
  setCity (state, val) {
    state.position.city = val
  }
}

const actions = {
  setPOsition: ({
    commit
  }, position) => {
    commit('setPosition', position)
  },
  setCity: ({ commit }, city) => {
    commit('setCity', city)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}