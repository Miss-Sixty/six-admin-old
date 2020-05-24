const state = {
  reload: true
};

const mutations = {
  RELOAD: state => {
    state.reload = !state.reload;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
