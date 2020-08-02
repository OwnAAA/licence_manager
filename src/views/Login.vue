<template>
  <div class="login_container">
    <el-row class="full">
      <el-col :xs="24" :sm="24" :md="14" style="height: 100%;" class="hidden-sm-and-down">
        <img width="100%" height="100%" class="bg" src="https://gratisography.com/wp-content/uploads/2019/11/gratisography-laptop-colorful-keys-800x525.jpg"/>
      </el-col>
      <el-col :xs="24" :sm="24" :md="14" class="hidden-md-and-up">
        <img width="100%" class="bg" src="https://gratisography.com/wp-content/uploads/2019/11/gratisography-laptop-colorful-keys-800x525.jpg"/>
      </el-col>
      <el-col :xs="22" :sm="22" :md="8" :offset="2" :pull="1" style="margin-top: 20%;">
        <br/>
        <el-card class="box-card">
          <h3>LM授权管理系统</h3>
          <!-- 登录表单 -->
          <el-form
            :model="loginForm"
            :rules="login_rules"
            ref="loginForm"
            label-width="0px"
          >
            <!-- 账号 -->
            <el-form-item prop="username">
              <el-input v-model.trim="loginForm.username" prefix-icon="el-icon-user-solid" placeholder="请输入帐号"></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password">
              <el-input v-model="loginForm.password" type="password" prefix-icon="el-icon-lock" placeholder="请输入密码" @keyup.enter.native="login('loginForm')"></el-input>
            </el-form-item>
            <!-- 登录按钮 -->
            <el-form-item class="login_btn">
              <el-button type="primary" @click="login('loginForm')">登录</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <!-- <div class="login_box"> -->
    <!-- </div> -->
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
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
            auth: this.loginForm,
            data: this.loginForm.username.length > 10 ? {
              scope: 'agent',
            } : {},
            validateStatus: () => {
              return true
            }
          })
            .then(result => {
              console.log(result)
              if (result.status !== 200) {
                return this.$message.error('登录失败')
              }
              this.$message.success('您已成功登入')
              window.sessionStorage.setItem('scope', result.data.token_scope)
              window.sessionStorage.setItem('token', result.data.access_token)
              window.sessionStorage.setItem('datatime', result.data.expires_in)

              if (result.data.token_scope === 'admin') {
                return this.$router.push('/agentPreview')
              }
              this.$router.push('/')
            })
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
.full {
  /* align-items: center; */
  height: 100%;
  /* display: flex; */
  margin: 0;
}
.bg {
  object-fit: cover;
}
.logo {
  font-weight: lighter;
  font-size: 15px;
  text-align: center;
  width: 120px;
  height: 130px;
  margin-top: 20%;
  /* position: absolute;
  margin-top: -300px; */
}

.login_container {
  width: 100%;
  height: 100%;
  background-color: #1e1e2d;
}
.login_box {
  background: #f7f7f7;
  /* opacity: 0.9; */
  border: 1px solid #afb0b2;
  width: 450px;
  height: 300px;
  border-radius: 7px;
  /* position: absolute;
  top: 50%;
  left: 50%; */
  /* transform: translate(-50%, -50%); */
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
  margin-bottom: 0;
}
</style>
