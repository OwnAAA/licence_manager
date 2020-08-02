<template>
  <div class="top-header">
    <el-col>
      <!-- 导航头 -->
      <div class="logo">
        LM授权管理系统
        <el-dropdown :hide-on-click="false">
          <span class="el-dropdown-link">
            <el-button type="text" icon="el-icon-magic-stick" circle></el-button>
          </span>
          <el-dropdown-menu slot="dropdown" style="width: 200px;">
            <span>代理商管理</span>
            <el-dropdown-item>
              <el-button type="text" @click="$router.push('/addAgent')">
                <i class="iconfont">&#xe605;</i>添加代理商
              </el-button>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-button type="text" @click="$router.push('/agentPreview')">
                <i class="iconfont">&#xe605;</i>代理商一览
              </el-button>
            </el-dropdown-item>
            <span>用户管理</span>
            <el-dropdown-item>
              <el-button type="text" @click="$router.push('/userManager')">
                <i class="iconfont">&#xe605;</i>用户管理
              </el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button
          icon="el-icon-switch-button"
          circle
          style="color: #fff; float: right; margin-top: 10px;"
          @click="logout()"
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
.el-dropdown-menu span {
  font-size: 14px;
  margin-left: 20px;
  color: #606266;
}
.el-button {
  background-color: transparent;
  border: none;
  padding-left: 0;
}

</style>