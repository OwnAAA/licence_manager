<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="iconfont">&#xe621;</i>
        <span>{{this.$route.query.name}}&nbsp;产品管理</span>
        <el-button
          type="primary"
          style="float: right;margin-top:-10px"
          @click="turnNew()"
        >新增产品</el-button>
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
        <el-button type="primary" plain style="margin-left:60px" @click="getproductList">搜索</el-button>
      </el-row>
      <!-- 产品列表 -->
      <el-table :data="productList" border>
        <el-table-column label="id" prop="project_uuid"></el-table-column>
        <el-table-column label="名称" prop="project_name"></el-table-column>
        <el-table-column label="编号" prop="project_no"></el-table-column>
        <el-table-column label="代理天数" prop="free_days"></el-table-column>
        <!-- <el-table-column label="预留" prop="connect_phone"></el-table-column> -->
        <!-- 操作列 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 编辑 -->
            <el-button
              class="rightBtns"
              size="small"
              icon="el-icon-edit-outline"
              @click="turnToAddProduct(scope.row)"
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
      productList: [],
      // 搜索
      queryInfo: {
        name: ''
      },
    }
  },
  created() {
    this.getproductList()
  },
  methods: {
    // 获取列表
    getproductList() {
      this.$http.get('/agent/' + this.$route.query.agent_uuid + '/projects',
        this.queryInfo.name ? this.queryInfo : '')
        .then(result => {
          if (result.status == 200) {
            this.productList = result.data
          }
        })
    },
    //跳转产品编辑页
    turnToAddProduct(msg) {
      this.$router.push({
        path: '/addProduct',
        query: {
          id: msg.id,
          name: this.$route.query.name,
          agent_uuid: this.$route.query.agent_uuid,
          project_name: msg.project_name,
          project_no: msg.project_no,
          free_days: msg.free_days
        }
      });
    },
    turnNew(){
      this.$router.push({
        path: '/addProduct',
        query: {
          agent_uuid: this.$route.query.agent_uuid,
          name: this.$route.query.name,
        }
      })
    },
    // 删除产品
    async handleDel(msg) {
      this.queryInfo.project_no = msg.id;
      const delRes = await this.$confirm('确认删除吗？删除后无法还原,并且可能会造成部分用户数据错误', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err);
      if (delRes == 'confirm') {
        this.$http.del('/agent/' + this.queryInfo.agent_uuid + '/project/' + this.queryInfo.project_no)
          .then(result => {
            if (result.status == 204) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              //重新获取列表
              this.getproductList();
            }
          })
      } else {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
    },
    //  清空输入框重新拉取列表
    changeInput() {
      if (this.queryInfo.name == '') {
        this.getproductList();
      }
    }
  }
}
</script>
<style lang="css" scoped>
</style>
