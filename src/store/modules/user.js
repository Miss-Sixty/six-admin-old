import { getToken, setToken } from "@/utils/auth";
import { login, getInfo } from "@/api/user";
const state = {
  name: "",
  avatar: "",
  token: getToken(),
  roles: [],
  introduction: ""
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
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction;
  }
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then(res => {
          const { token } = res.data;
          commit("SET_TOKEN", token);
          setToken(token);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  //   // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then(res => {
          const { data } = res;
          console.log(data);
          if (!data) {
            reject("验证失败，请重新登录。");
          }

          const { roles, name, avatar, introduction } = data;

          //  // 角色必须是非空数组
          if (!roles || roles.length <= 0) {
            reject("getInfo:角色必须为非null数组！");
          }

          commit("SET_ROLES", roles);
          commit("SET_NAME", name);
          commit("SET_AVATAR", avatar);
          commit("SET_INTRODUCTION", introduction);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
