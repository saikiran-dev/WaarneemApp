const state = {
  drawer: false,
}

const mutations = {
  SET_DRAWER(state, value) {
    state.drawer = value
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}
