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
          <el-col :span="5">
            <!-- 搜索框 -->
            <el-input
              placeholder="Search..."
              prefix-icon="el-icon-search"
              clearable
              v-model.trim="queryInfo.phone"
              @change="changeInput"
            ></el-input>
          </el-col>
          <!-- 代理商选择器 -->
          <el-col :span="2" v-if="scope === 'admin'">
            <span class="itemTitle">代理商：</span>
          </el-col>
          <el-col :span="9" v-if="scope === 'admin'">
            <el-select v-model="value" clearable placeholder="请选择" @change="indexSelect($event)">
              <el-option v-for="(item,key) in agentName" :key="key" :value="item"></el-option>
            </el-select>
          </el-col>
          <el-button type="primary" plain style="margin-left:50px" @click="getUsertList">搜索</el-button>
        </el-row>
      </div>
      <div>
        <!-- 代理商列表 -->
        <el-table :data="userInfo" border>
          <el-table-column prop="user_uuid" label="id"></el-table-column>
          <el-table-column prop="phone" label="手机号"></el-table-column>
          <el-table-column prop="name" label="代理商"></el-table-column>
          <el-table-column prop="project_name" label="产品"></el-table-column>
	  <el-table-column prop="description" label="备注"></el-table-column>
          <el-table-column prop="created_at" label="注册时间"></el-table-column>
          <el-table-column prop="expired_at" label="会员到期日"></el-table-column>
          <!-- 操作列 -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-dropdown>
                <!-- 管理 -->
                <el-button class="rightBtns" size="small" icon="el-icon-setting"></el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <!-- 用户充值 -->
                    <el-button type="text" @click="turnToDeposit(scope.row)">
                      <i class="el-icon-plus"></i>充值
                    </el-button>
                  </el-dropdown-item>
                  <!-- 充值记录  -->
                  <el-dropdown-item>
                    <el-button type="text" @click="turnToRecord(scope.row)">
                      <i class="el-icon-coin"></i>充值记录
                    </el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
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
      </div>
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
      queryInfo: {},
      // 代理商名称
      agentName: {},
      value: '',
      scope: '',

    }
  },
  created() {
    this.scope = window.sessionStorage.getItem('scope')
    if (this.scope === 'agent') {
      this.queryInfo.agent_uuid = window.sessionStorage.getItem('uuid')
    }
    this.getUsertList();
  },
  methods: {
    // 获取用户列表
    getUsertList() {
      // console.log(this.$refs.formlist)
      this.$http.get('users', this.queryInfo)
        .then(result => {
          if (result.status == 200) {
            this.userInfo = result.data
            this.getName()
          }
        })
    },
    getName() {
      // 获取並过滤重复代理商名称
      this.userInfo.map(item => {
        if (!this.agentName[item.agent_uuid]) {
          this.agentName[item.agent_uuid] = item.name
        }
      })
    },
    // 清空文本框重新拉取列表
    changeInput() {
      if (this.queryInfo.phone == '') {
        this.getUsertList();
      }
    },
    changeSelect() {
      if (this.queryInfo.phone == '') {
        this.getUsertList();
      }
    },
    //获取选中值 
    indexSelect(event) {
      //  this.queryInfo.name = event
      for (let i in Object.values(this.agentName)) {
        if (Object.values(this.agentName)[i] == event) {
          this.queryInfo.agent_uuid = Object.keys(this.agentName)[i];
        }
      }
      // 当select为空,重新拉取列表
      if (event == '') {
        this.queryInfo.agent_uuid = '';
        this.getUsertList();

      }
    },
    // 充值路由跳转
    turnToDeposit(msg) {
      console.log()
      this.$router.push({
        path: '/deposit',
        query: { phone: msg.phone, id: msg.user_uuid }
      });
    },
    // 充值记录路由跳转
    turnToRecord(msg) {
      this.$router.push({
        path: '/record',
        query: {
          phone: msg.phone,
          user_uuid: msg.user_uuid
        }
      });
    },
    // 删除
    async handleDel(msg) {
      this.queryInfo.user_uuid = msg.user_uuid;
      const delRes = await this.$confirm('确认删除吗?删除后无法恢复', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err);
      if (delRes == 'confirm') {
        this.$http.del('/user/' + this.queryInfo.user_uuid)
          .then(result => {
            if (result.status == 204) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              //重新获取列表
              this.getUsertList();
            }
          })
      }
    }
  }
}
</script>
<style lang="css" scoped>
.itemTitle {
  color: #3f4254;
  font-size: 14px;
  display: inline-block;
  margin: 10px 10px;
  width: 100px;
  padding-left: 20px;
}
.el-select {
  width: 330px;
}
.el-icon-coin {
  padding-right: 10px;
}
.el-icon-plus {
  padding-right: 10px;
}
</style>
