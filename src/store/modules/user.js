import { getToken } from "@/utils/auth";
const state = {
  name: "",
  avatar: require("@/assets/imgs/avatar.gif"),
  token: getToken()
};

const mutations = {
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  }
};

const actions = {
  // user login
  // login({ commit }, userInfo) {
  //   const { username, password } = userInfo;
  //   return new Promise((resolve, reject) => {
  //     if ((username = "admin" && password)) {
  //       let data = {
  //         token: 222,
  //       };
  //       commit("SET_TOKEN", data.token);
  //       setToken(data.token);
  //       resolve();
  //     } else {
  //       reject("错误");
  //     }
  //   });
  // },
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
