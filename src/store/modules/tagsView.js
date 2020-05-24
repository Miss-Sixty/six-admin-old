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
        state.visitedViews.splice(i, 1);
        break;
      }
    }
  },

  CLOSE_RIGHT_TAG: (state, view) => {
    const len = state.visitedViews.length;
    for (let i = 0; i < len; i++) {
      if (state.visitedViews[i].path === view.path) {
        state.visitedViews = state.visitedViews.splice(0, i + 1);
        break;
      }
    }

    router.push(state.visitedViews[state.visitedViews.length - 1]);
  },

  CLOSE_OTHER: (state, view) => {
    state.visitedViews = [view];
    router.push(state.visitedViews[0]);
  }
};

const actions = {
  addView({ commit }, view) {
    commit("ADD_VISITED_VIEW", view);
  },

  delView({ commit, state }, { view, route }) {
    if (1 === state.visitedViews.length) {
      if (view.path === "/home") {
        return Message({
          message: "不可关闭最后一页",
          type: "warning"
        });
      }

      commit("DEL_VISITED_VIEW", view);
      return router.push("/home");
    }

    if (view.path === route.path) {
      commit("DEL_VISITED_VIEW", view);
      return router.push(
        state.visitedViews[state.visitedViews.length - 1].path
      );
    }

    commit("DEL_VISITED_VIEW", view);
  },

  closeRightTag({ commit }, view) {
    commit("CLOSE_RIGHT_TAG", view);
  },

  closeOther({ commit }, view) {
    commit("CLOSE_OTHER", view);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
