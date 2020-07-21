<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 登录表单 -->
      <el-form
        :model="loginForm"
        :rules="login_rules"
        ref="loginForm"
        label-width="0px"
        class="login_form"
      >
        <!-- 账号 -->
        <el-form-item prop="username">
          <el-input v-model.trim="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item class="login_btn">
          <el-button type="primary" @click="login('loginForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: 'test4you'
      },
      login_rules: {
        username: [
          { required: true, message: '账号不能为空', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在3-15个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 30, message: '长度在6-30个字符', trigger: 'blur' },
          {
            required: true,
            message: '必须为纯字母或纯数字或字母和数字组成',
            pattern: '^[0-9]|[a-zA-Z]|[a-zA-Z0-9]',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // login () {
    async login(loginForm) {

      this.$refs[loginForm].validate(async val => {
        if (val) {

          axios({
            method: 'post',
            url: '/authenticate',
            auth: this.loginForm
          })
            .then(result => {
              // if (result.status !== 200) {
              //   return this.$message.error('登录失败')
              // }
              this.$message.success('您已成功登入')
              window.sessionStorage.setItem('token', result.data.access_token)
              window.sessionStorage.setItem('datatime', result.data.expires_in)
              this.$router.push('/dashboard')
            })
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
.login_container {
  width: 100%;
  height: 100%;
  background-color: #1e1e2d;
}
.login_title {
  position: absolute;
  top: 25%;
  left: 30%;
  font-size: 2em;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  color: #fff;
}
.login_box {
  background-color: #fff;
  /* opacity: 0.9; */
  border: 1px solid #afb0b2;
  width: 450px;
  height: 300px;
  border-radius: 7px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
/* 输入框 */
.el-input__inner {
  margin: 15px 0;
}
/* 图标 */
.el-input__prefix {
  font-size: 1.25em;
}
/* 登录按钮 */
.login_btn {
  display: flex;
  justify-content: flex-end;
}
</style>
