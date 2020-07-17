<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="iconfont">&#xe621;</i>
        <span>用户管理</span>
        <slot name="addBtn"></slot>
      </div>
      <!-- 搜索 -->
      <div>
        <el-row>
          <el-col :span="4">
            <!-- 搜索框 -->
            <el-input
              placeholder="Search..."
              prefix-icon="el-icon-search"
              clearable
              v-model="queryInfo.phone"
            ></el-input>
          </el-col>
          <!-- 代理商选择器 -->
          <el-col :span="2">
              <span class="itemTitle">代理商：</span>
              </el-col>
              <el-col :span="8">
              <el-select v-model="value" clearable placeholder="请选择">
                <el-option
                  v-for="item in userInfo"
                  :key="item.agent_uuid"
                  :value="item.name"
                ></el-option>
              </el-select>
            
          </el-col>
          <el-button type="primary" plain style="margin-left:50px" @click="getUsertList">搜索</el-button>
        </el-row>
      </div>
      <div>
        <!-- 代理商列表 -->
        <el-table :data="userInfo" border>
          <el-table-column prop="agent_uuid" label="id"></el-table-column>
          <el-table-column prop="connect_phone" label="手机号"></el-table-column>
          <el-table-column prop="name" label="代理商"></el-table-column>
          <!-- <el-table-column prop="regist" label="注册时间"></el-table-column> -->
          <el-table-column prop="expired_at" label="会员到期日"></el-table-column>
          <!-- 操作列 -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!-- 管理 -->
              <el-dropdown>
                <el-button class="rightBtns" size="small" icon="el-icon-setting"></el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <i class="el-icon-plus"></i>记录
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <i class="el-icon-coin"></i>充值记录
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <!-- 编辑 -->
              <el-button class="rightBtns" size="small" icon="el-icon-edit-outline"></el-button>
              <!-- 删除 -->
              <el-button class="rightBtns" size="small" icon="el-icon-delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <el-pagination background layout=" total,prev, pager, next,jumper" :page-size="6" :total="20"></el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 用户列表
      userInfo: [],
      // 搜索
      queryInfo: {
        phone: '',
      },
      value: '',
      searchInput:''
    }
  },
  created() {
    this.getUsertList()
  },
  methods: {
    // 获取用户列表
    getUsertList() {
      // console.log(this.$refs.formlist)
      const tokenStr = window.sessionStorage.getItem('token')
      this.$http({
        method: 'get',
        url: '/users',
        headers: {
          'Authorization': 'Bearer ' + tokenStr,
          'Content-Type': 'application/json'
        },
        params:this.queryInfo
      }).then(result => {
        if (result.status == 200) {
          this.userInfo = result.data
        }
      })
    },
  }
}
</script>
<style lang="css" scoped>
.itemTitle {
  color: #3f4254;
  font-size: 14px;
  display: inline-block;
  margin: 10px 25px;
  width:100px;
}
.el-select {
  width: 330px;
}
/* 小图标间距 */
i {
  padding-right: 10px;
}
</style>