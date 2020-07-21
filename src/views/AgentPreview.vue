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
        <el-button
          type="primary"
          style="float: right;margin-top:-10px"
          @click="$router.push('/addagent')"
        >新增代理商</el-button>
      </div>
      <!-- 搜索 -->
      <el-row>
        <el-col :span="8">
          <el-input
            placeholder="Search..."
            prefix-icon="el-icon-search"
            v-model.trim="queryInfo.name"
            clearable
            @change="changeInput"
          ></el-input>
        </el-col>
        <el-button type="primary" plain style="margin-left:60px" @click="getAgentList">搜索</el-button>
      </el-row>
      <!-- 代理商列表 -->

      <el-table :data="agentList" border>
        <el-table-column label="id" prop="agent_uuid"></el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="缩写" prop="short_name"></el-table-column>
        <el-table-column label="联系人" prop="connect_name"></el-table-column>
        <el-table-column label="联系电话" prop="connect_phone"></el-table-column>
        <!-- 操作列 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-dropdown>
              <!-- 管理 -->
              <el-button class="rightBtns" size="small" icon="el-icon-setting"></el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <!-- 添加产品 -->
                  <el-button type="text" @click="turnToAddProduct(scope.row)">
                    <i class="el-icon-plus"></i>添加产品
                  </el-button>
                </el-dropdown-item>
                <!-- 产品管理  -->
                <el-dropdown-item>
                  <el-button type="text" @click="turnToProjectManager(scope.row)">
                    <i class="el-icon-coin"></i>产品管理
                  </el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <!-- 编辑 -->
            <el-button
              class="rightBtns"
              size="small"
              icon="el-icon-edit-outline"
              @click="turnToEdit(scope.row)"
            ></el-button>
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
      this.$http.get('/agents', this.queryInfo.name ? this.queryInfo : '')
        .then(result => {
          if (result.status == 200) {
            this.agentList = result.data
          }
        })
    },
    // 清空输入框重新拉取列表
    changeInput() {
      if (this.queryInfo.name == '') {
        this.getAgentList();
      }
    },
    //跳转产品编辑页
    turnToAddProduct(msg) {
      this.$router.push({
        path: '/addProduct',
        query: {
          agent_uuid: msg.agent_uuid,
          name:msg.name
        }
      });
    },
      //跳转产品管理页
    turnToProjectManager(msg) {
      this.$router.push({
        path: '/productManager',
        query: {
          agent_uuid: msg.agent_uuid,
          name:msg.name
        }
      });
    },
    // 跳转编辑
    turnToEdit(msg) {
      this.$router.push({
        path: '/addagent',
        query: {
          name: msg.name,
          short_name: msg.short_name,
          connect_name: msg.connect_name,
          connect_phone: msg.connect_phone,
          agent_uuid: msg.agent_uuid
        }
      });
    },
    // 删除
    async handleDel(msg) {
      this.queryInfo.agent_uuid = msg.agent_uuid;
      const delRes = await this.$confirm('确认删除吗？删除后无法还原,并且可能会造成部分用户数据错误', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err);
      if (delRes == 'confirm') {
        this.$http.del('/agent/' + this.queryInfo.agent_uuid)
          .then(result => {
            if (result.status == 204) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              //重新获取列表
              this.getAgentList();
            }
          })
      } else {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
    }
  }
}
</script>
<style lang="css" scoped>
.el-icon-coin {
  padding-right: 10px;
}
.el-icon-plus {
  padding-right: 10px;
}
</style>
