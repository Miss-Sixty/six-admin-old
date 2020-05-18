<template>
  <div
    class="login"
    :style="{ 'background-image': `url(${settings.loginBg})` }"
  >
    <el-form
      :model="loginForm"
      :rules="loginRules"
      ref="loginForm"
      class="login-form"
    >
      <p class="login-form__title">{{ settings.title }}</p>
      <el-form-item prop="username">
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名"
          prefix-icon="el-icon-user"
          clearable
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          ref="password"
          v-model="loginForm.password"
          placeholder="密码"
          clearable
          show-password
          prefix-icon="el-icon-lock"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          style="width:100%"
          @click="loginChange"
          :loading="loding"
          >登录</el-button
        >
      </el-form-item>
      <div class="login-form__tips">
        <p>
          <span>账号 : admin</span>
          <span>密码 : 随便填</span>
        </p>
        <p>
          <span>账号 : editor</span>
          <span>密码 : 随便填</span>
        </p>
      </div>
    </el-form>
  </div>
</template>
<script>
import settings from "@/settings";
export default {
  name: "Login",
  data() {
    return {
      settings: settings,
      loding: false,
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  mounted() {
    if (this.loginForm.username === "") {
      this.$refs.username.focus();
    } else if (this.loginForm.password === "") {
      this.$refs.password.focus();
    }
  },
  methods: {
    loginChange() {
      this.$refs["loginForm"].validate(valid => {
        if (valid) {
          this.loding = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push("/");
              this.loding = false;
            })
            .catch(() => {
              this.loding = false;
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  height: 100vh;
  overflow: hidden;
  &-form {
    width: 400px;
    padding: 30px 45px;
    margin: 200px auto;
    text-align: center;
    border-radius: 6px;
    background-color: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(20px);
    &__title {
      font-size: 26px;
      margin-bottom: 35px;
      font-weight: bold;
    }

    &__tips {
      text-align: left;
      font-size: 14px;
      p {
        &:first-of-type {
          margin-bottom: 10px;
        }
        span:first-of-type {
          margin-right: 16px;
        }
      }
    }
  }
}
</style>
