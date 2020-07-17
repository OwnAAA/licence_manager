<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="iconfont">&#xe621;</i>
        <span>充值</span>
        <slot name="addBtn"></slot>
      </div>
    </el-card>
  </div>
</template>
<script>

export default {
    name:'deposit'
}
</script>
<style lang="css" scoped>
.el-form {
  margin: 0 auto;
  width: 40vw;
}
</style> 