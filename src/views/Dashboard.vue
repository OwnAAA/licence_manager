<template id="dashboard">
  <div class="contanier">
    <el-container>
      <el-aside class="hidden-sm-and-down">
        <AsideNav></AsideNav>
      </el-aside>
      <div class="hidden-md-and-up header">
        <TopNav></TopNav>
      </div>
      <el-container>
        <el-header class="hidden-sm-and-down">
          <Top></Top>
        </el-header>
        <el-main>
          <router-view/>
          <!-- <Right></Right> -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Header from "./layout/Top"
import AsideNav from "./layout/AsideNav"
import TopNav from "./layout/TopNav"

export default {
  name: 'dashboard',
  components: {
    'Top': Header,
    'AsideNav': AsideNav,
    'TopNav': TopNav,
  }
}

</script>
<style lang="css" scoped>
.contanier {
  width: 100%;
  height: 100%;
}
.header {
  height: 60px;
}
</style>