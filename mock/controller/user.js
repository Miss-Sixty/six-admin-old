const tokens = {
  admin: {
    token: "admin-token"
  },
  editor: {
    token: "editor-token"
  }
};

const users = {
  "admin-token": {
    roles: ["admin"],
    introduction: "超级管理员",
    avatar: "https://s1.ax1x.com/2020/05/19/Y4NK81.gif",
    name: "Super Admin"
  },
  "editor-token": {
    roles: ["editor"],
    introduction: "我是一名编辑",
    avatar: "https://s1.ax1x.com/2020/05/19/Y4NK81.gif",
    name: "Normal Editor"
  }
};

export default [
  // user login
  {
    url: "/user/login",
    type: "post",
    response: config => {
      const { username } = config.body;
      const token = tokens[username];

      // mock error
      if (!token) {
        return {
          code: 500,
          message: "帐号或密码错误!"
        };
      }

      return {
        code: 200,
        data: token
      };
    }
  },

  // get user info
  {
    url: "/user/info.*",
    type: "get",
    response: config => {
      const { token } = config.query;
      const info = users[token];

      // mock error
      if (!info) {
        return {
          code: 500,
          message: "登录失败，无法获取用户详细信息。"
        };
      }

      return {
        code: 200,
        data: info
      };
    }
  },

  // user logout
  {
    url: "/user/logout",
    type: "post",
    response: () => {
      return {
        code: 200,
        data: "success"
      };
    }
  }
];
