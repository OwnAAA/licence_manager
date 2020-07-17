<template>
  <div>
    <!-- <LMTable>
          <span slot="card_title">代理商一览</span>
          <el-button type="primary" style="float: right; " slot="addBtn">新增代理商</el-button>
          <el-button size="small" icon="el-icon-edit-outline" slot="editDataBtn"></el-button> 
    </LMTable>-->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="iconfont">&#xe621;</i>
        <span>代理商管理</span>
        <el-button type="primary" style="float: right;margin-top:-10px">新增代理商</el-button>
      </div>
      <!-- 搜索 -->
      <div>
        <el-row>
          <el-col :span="8">
            <el-input
              placeholder="Search..."
              prefix-icon="el-icon-search"
              v-model="queryInfo.name"
              clearable
            ></el-input>
          </el-col>
          <el-button type="primary" plain style="margin-left:60px" @click="getAgentList">搜索</el-button>
        </el-row>
      </div>
      <div>
        <!-- 代理商列表 -->

        <el-table :data="agentList" border>
          <el-table-column label="id" prop="agent_uuid"></el-table-column>
          <el-table-column label="名称" prop="name"></el-table-column>
          <el-table-column label="缩写" prop="short_name"></el-table-column>
          <el-table-column label="联系人" prop="connect_name"></el-table-column>
          <el-table-column label="联系电话" prop="connect_phone"></el-table-column>
          <!-- 操作列 -->
          <el-table-column label="操作">
            <template>
              <el-button class="rightBtns" size="small" icon="el-icon-edit-outline"></el-button>
              <el-button class="rightBtns" size="small" icon="el-icon-delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <el-pagination background layout=" total,prev, pager, next,jumper" :page-size="6" :total="10"></el-pagination>
    </el-card>
  </div>
</template>
<script>

// import LMTable from '../components/LMTable'
export default {
  data() {
    return {
      // 代理商数组
      agentList: [],
      // 搜索
      queryInfo: {
        name: ''
      },
    }
  },
  created() {
    this.getAgentList()
  },
  methods: {
    // 获取代理商列表
    getAgentList() {
      // console.log(this.$refs.formlist)
      const tokenStr = window.sessionStorage.getItem('token')
      this.$http({
        method: 'get',
        url: '/agents',
        headers: {
          'Authorization': 'Bearer ' + tokenStr,
          'Content-Type': 'application/json'
        },
        params: this.queryInfo.name ? this.queryInfo : ''
      }).then(result => {
        if (result.status == 200) {
          // console.log(result.data)
          this.agentList = result.data
          // console.log(this.agentList )
        }
      })
    }
  }
}
</script>
<style lang="css" scoped>
</style>
