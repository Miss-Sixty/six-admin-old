const state = {
  name: "",
  avatar: require("@/assets/imgs/avatar.gif")
};

const mutations = {
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  }
};

const actions = {
  //   // user login
  //   login({ commit }, userInfo) {
  //     const { username, password } = userInfo;
  //     return new Promise((resolve, reject) => {});
  //   },
  //   // get user info
  //   getInfo({ commit, state }) {
  //     return new Promise((resolve, reject) => {});
  //   },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
