<template>
  <div class="top-header">
    <el-col>
      <!-- 导航头 -->
      <div class="logo">
        METRONIC
        <el-dropdown :hide-on-click="false">
          <span class="el-dropdown-link">
            <el-button
              type="text"
              icon="el-icon-magic-stick"
              circle
              @clcik="logout"
            ></el-button>
          </span>
          <el-dropdown-menu slot="dropdown" style="width: 100%">
            <el-dropdown-item>代理商管理</el-dropdown-item>
            <el-dropdown-item>添加代理商</el-dropdown-item>
            <el-dropdown-item>代理商一览</el-dropdown-item>
            <el-dropdown-item>用户管理</el-dropdown-item>
            <el-dropdown-item>用户管理</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button
          type="text"
          icon="el-icon-switch-button"
          circle
          style="color: #fff; float: right; margin-top: 10px;"
        ></el-button>
      </div>
    </el-col>
  </div>
</template>
<script>
export default {
  name: 'TopNav',
  data() {
    return {
    }
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
  }
}
</script>
<style lang="css" scoped>
.top-header {
  width: 100%;
  height: 60px;
  position: absolute;
}
.top-header .logo {
  background-color: #1a1a27;
  height: 60px;
  line-height: 60px;
  padding-left: 25px;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 2px;
  color: #fff;
}
</style>