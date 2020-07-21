<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="iconfont">&#xe621;</i>
        <span>{{queryInfo.phone}}&nbsp;充值记录</span>
        <el-button
          type="primary"
          style="float: right;margin-top:-10px"
          @click="turnToDeposit(queryInfo)"
        >新增充值</el-button>
      </div>
      <!-- 充值记录列表 -->
      <el-table :data="useRecordInfo" border>
        <el-table-column label="id" prop="user_uuid"></el-table-column>
        <!-- <el-table-column label="时间" prop="time"></el-table-column> -->
        <el-table-column label="金额" prop="consume"></el-table-column>
        <el-table-column label="天数" prop="days_add"></el-table-column>
        <!-- 操作列 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 删除 -->
            <el-button
              class="rightBtns"
              size="small"
              icon="el-icon-delete"
              @click="handleDel(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>

export default {
  data() {
    return {
      queryInfo: {
        phone: this.$route.query.phone,
        user_uuid: this.$route.query.user_uuid
      },
      //  用户记录信息
      useRecordInfo: [],
      // 跳转充值
      turnToDeposit(msg) {
        console.log(msg)
        this.$router.push({
          path: '/deposit',
          query: { phone: msg.phone, id: msg.user_uuid }
        });
      }
    }
  },
  created() {
    this.getUserRecord()
  },
  methods: {
    // 获取用户记录信息
    getUserRecord() {
      this.$http.get('credits', this.queryInfo)
        .then(result => {
          if (result.status == 200 && result.user_uuid == this.user_uuid) {
            this.useRecordInfo = result.data
          }
        })
    },
    // 删除
   async handleDel(msg) {
      this.queryInfo.id = msg.id;
      const delRes =await this.$confirm('确认删除吗？删除该充值记录,会将次充值天数从用户产品到期时间中扣除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err);
      console.log(delRes)
      if (delRes == 'confirm') {
        this.$http.del('/credit/' + this.queryInfo.id)
          .then(result => {
            if (result.status == 204) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              //重新获取列表
              this.getUserRecord();
            }
          })
      }
    }
  }
}
</script>
<style lang="css" scoped>
</style>
