<template>
  <div id="nav_wrap">
    <el-col>
      <!-- 导航头 -->
      <div class="nav_title">METRONIC</div>
      <!-- 导航菜单 -->
      <el-menu
        background-color="transparent"
        active-text-color="#fff"
        text-color="#9899AC"
        unique-opened
        router
      >
        <span class="nav_text">CUSTOM</span>
        <el-submenu index="1">
          <template slot="title">
            <span>
              <span class="svg-icon menu-icon">
                <!--begin::Svg Icon | path:assets/media/svg/icons/Design/Bucket.svg-->
                <!--end::Svg Icon-->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  version="1.1"
                >
                  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <rect x="0" y="0" width="24" height="24" />
                    <path
                      d="M5,5 L5,15 C5,15.5948613 5.25970314,16.1290656 5.6719139,16.4954176 C5.71978107,16.5379595 5.76682388,16.5788906 5.81365532,16.6178662 C5.82524933,16.6294602 15,7.45470952 15,7.45470952 C15,6.9962515 15,6.17801499 15,5 L5,5 Z M5,3 L15,3 C16.1045695,3 17,3.8954305 17,5 L17,15 C17,17.209139 15.209139,19 13,19 L7,19 C4.790861,19 3,17.209139 3,15 L3,5 C3,3.8954305 3.8954305,3 5,3 Z"
                      fill="#494b74"
                      fill-rule="nonzero"
                      transform="translate(10.000000, 11.000000) rotate(-315.000000) translate(-10.000000, -11.000000)"
                    />
                    <path
                      d="M20,22 C21.6568542,22 23,20.6568542 23,19 C23,17.8954305 22,16.2287638 20,14 C18,16.2287638 17,17.8954305 17,19 C17,20.6568542 18.3431458,22 20,22 Z"
                      fill="#494b74"
                      opacity="0.3"
                    />
                  </g>
                </svg>
              </span>
              代理商管理
            </span>
          </template>
          <el-menu-item-group>
            <span></span>
            <el-menu-item index="addagent"><i class="iconfont">&#xe605;</i>添加代理商</el-menu-item>
            <el-menu-item index="agentPreview"><i class="iconfont">&#xe605;</i>代理商一览</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
           <span class="svg-icon menu-icon">
                <!--begin::Svg Icon | path:assets/media/svg/icons/Design/Bucket.svg-->
                <!--end::Svg Icon-->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  version="1.1"
                >
                  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <rect x="0" y="0" width="24" height="24" />
                    <path
                      d="M5,5 L5,15 C5,15.5948613 5.25970314,16.1290656 5.6719139,16.4954176 C5.71978107,16.5379595 5.76682388,16.5788906 5.81365532,16.6178662 C5.82524933,16.6294602 15,7.45470952 15,7.45470952 C15,6.9962515 15,6.17801499 15,5 L5,5 Z M5,3 L15,3 C16.1045695,3 17,3.8954305 17,5 L17,15 C17,17.209139 15.209139,19 13,19 L7,19 C4.790861,19 3,17.209139 3,15 L3,5 C3,3.8954305 3.8954305,3 5,3 Z"
                      fill="#494b74"
                      fill-rule="nonzero"
                      transform="translate(10.000000, 11.000000) rotate(-315.000000) translate(-10.000000, -11.000000)"
                    />
                    <path
                      d="M20,22 C21.6568542,22 23,20.6568542 23,19 C23,17.8954305 22,16.2287638 20,14 C18,16.2287638 17,17.8954305 17,19 C17,20.6568542 18.3431458,22 20,22 Z"
                      fill="#494b74"
                      opacity="0.3"
                    />
                  </g>
                </svg>
              </span>
              <span>
              用户管理
            </span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="userManager"><i class="iconfont">&#xe605;</i>用户管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
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
    }
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
  margin-right:15px;
}
</style>