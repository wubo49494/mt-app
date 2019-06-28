const state = () => ({
  menu: [],
  suggest: [],
  hotword: [],
  view: []

})

const mutations = {
  setMenu(state, val) {
    state.menu = val
  },
  setSuggest(state, val) {
    state.suggest = val
  },
  setHotWord(state, val) {
    state.hotword = val
  },
  setView(state, val) {
    state.view = val
  }
}

const actions = {
  setMenu: ({ commit }, menu) => {
    commit('setMenu', menu)
  },
  setSuggest: ({ commit }, suggest) => {
    commit('setSuggest', hotPlace)
  },
  setHotWord: ({commit}, hotword) => {
    commit('setHotWord', setHotWord)
  },
  setView: ({ commit }, view) => {
    commit('setView', setView)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
