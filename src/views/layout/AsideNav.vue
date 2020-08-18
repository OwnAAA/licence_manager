<template>
  <div id="nav_wrap">
    <el-col>
      <!-- 导航头 -->
      <div class="nav_title">{{title}}</div>
      <!-- 导航菜单 -->
      <el-menu
        background-color="transparent"
        active-text-color="#fff"
        text-color="#9899AC"
        router
        :default-openeds='["1", "2"]'
      >
        <el-submenu index="1" v-if="scope !== 'agent'">
          <template slot="title">
            <span>
              <span class="svg-icon menu-icon">
                <i class="el-icon-s-custom"></i>
              </span>
              代理商管理
            </span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="addagent"><i class="iconfont">&#xe605;</i>添加代理商</el-menu-item>
            <el-menu-item index="agentPreview"><i class="iconfont">&#xe605;</i>代理商一览</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
           <span class="svg-icon menu-icon">
              <span class="svg-icon menu-icon">
                <i class="el-icon-user"></i>
              </span>
              用户管理
            </span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="userManager"><i class="iconfont">&#xe605;</i>用户管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="Setting" v-if="scope !== 'agent'">
          <i class="el-icon-setting"></i>
          <span slot="title">系统设置</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </div>
</template>
<script>
import 'element-ui/lib/theme-chalk/display.css';

export default {
  name: 'AsideNav',
  data() {
    return {
      title: window.sessionStorage.getItem('title'),
      scope: '',
    }
  },
  created() {
    this.$nextTick(() => {
      this.scope = window.sessionStorage.getItem('scope')
        
      this.$http.get(
        '/setting'
      ).then(result => {
        
        this.title = result.data.title

        window.sessionStorage.setItem('title', result.data.title)
        window.sessionStorage.setItem('bg', result.data.bg)

      })
      
    })
  }
}
</script>
<style lang="css">
/* 左侧菜单顶部 */

#nav_wrap {
  position: fixed;
  width: 300px;
  height: 100vh;
  background-color: #1e1e2d;
}
.nav_title {
  background-color: #1a1a27;
  height: 70px;
  line-height: 70px;
  padding-left: 27px;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 2px;
  color: #fff;
}
/* 导航宽度 */
.el-menu {
  width: 100%;
}
/* 导航鼠标悬停 */
.el-submenu__title:hover {
  background-color: #1a1a27 !important;
  color: #fff !important;
}
.el-menu-item:hover {
  background-color: #1a1a27 !important;
  color: #fff !important;
}
/* 导航鼠标点击 */
.el-menu-item is-active {
  background: #1a1a27 !important;
}

/* 分组标题Custom */
.nav_text {
  color: #4c4e6f;
  font-size: 12px;
  margin-left: 25px;
  font-family: Poppins, Helvetica, "sans-serif";
}
/* svg */

.svg-icon{
  margin-top: -6px;
  display: inline-block;
}
</style>