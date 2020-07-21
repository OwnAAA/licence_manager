<template>
  <div id="header_wrap">
    <el-header>
      <el-dropdown>
        <div class="el-dropdown-link user_info_contanier">
          <i class="el-icon-menu" style="color:#3f4254;font-size:20px"></i>
        </div>
        <el-dropdown-menu slot="dropdown" style="width:140px">
          <el-dropdown-item>
            <el-button class="logout_btn" @click="logout">退出登入</el-button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: {
        userName: ''
      }
    }
  },
  created() {
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
#header_wrap {
  position: fixed;
  top: 0;
  right: 0;
  left: 300px;
  box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);
  z-index: 200;
}
/* 头部 */
.el-header {
  background-color: #fff;
  /* background-image: linear-gradient(#9bace4, #bad1fa); */
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-bottom: 1px solid #eee;
}
/* 头部 */
.user_info_contanier {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 30px;
}

/* 头部下拉子菜单按钮 */
.logout_btn {
  background: transparent;
  border-width: 0px;
  outline: none;
}
.el-dropdown-item {
  size: 3.125em;
}
</style>