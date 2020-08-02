<template>
  <div>
    <div id="header_wrap">
      <el-header>
        <el-dropdown>
          <div class="el-dropdown-link user_info_contanier">
            <i class="el-icon-menu" style="color:#3f4254;font-size:20px"></i>
          </div>
          <el-dropdown-menu slot="dropdown" style="width:140px">
            <el-dropdown-item>
              <el-button class="logout_btn" @click="dialogFormVisible = true">修改密码</el-button>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-button class="logout_btn" @click="logout">退出登入</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
    </div>

    <el-dialog title="修改密码" width="300px" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form">
        <el-form-item>
          <el-input placeholder="请输入旧密码" v-model="form.old_password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入新密码" v-model="form.new_password" show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changePwd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {},
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
    resetForm() {
      this.$refs.form.resetFields();
      this.form = {}
    },
    changePwd() {
      this.$refs.form.validate(async val => {
        if (val) {
          this.form.scope = window.sessionStorage.getItem('scope')
          this.$http.patch(
            '/password',
            this.form
          ).then(result => {
            if (result.status == 204) {
              this.$message('修改成功');
              //  清空表单
              this.resetForm();
              this.dialogFormVisible = false
            } else {
              this.$message('修改失败, 请检查密码正确性');
            }
          })
        }
      })
    }
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