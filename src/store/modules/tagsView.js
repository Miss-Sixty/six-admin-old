const state = {
  visitedViews: []
};

const mutations = {
  ADD_VISITED_VIEW: (state, view) => {
    if (state.visitedViews.some(v => v.path === view.path)) return;
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || "no-name"
      })
    );
    console.log(state.visitedViews);
  },

  DEL_VISITED_VIEW: (state, view) => {
    const len = state.visitedViews.length;
    for (let i = 0; i < len; i++) {
      if (state.visitedViews[i].path === view.path) {
        return state.visitedViews.splice(i, 1);
      }
    }
  }
};

const actions = {
  addView({ commit }, view) {
    commit("ADD_VISITED_VIEW", view);
  },

  delView({ commit }, view) {
    commit("DEL_VISITED_VIEW", view);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
