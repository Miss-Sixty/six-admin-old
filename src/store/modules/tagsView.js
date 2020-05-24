import router from "@/router";
import { Message } from "element-ui";
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

  delView({ commit, state }, view) {
    const len = state.visitedViews.length;
    if (1 === len) {
      if (view.path !== "/home") {
        commit("DEL_VISITED_VIEW", view);
        return router.push("/home");
      }

      return Message({
        message: "不可关闭最后一页",
        type: "warning"
      });
    }

    commit("DEL_VISITED_VIEW", view);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
