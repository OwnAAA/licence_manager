<template>
  <div>
    <el-main>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <i class='iconfont'>&#xe621;</i>
          <slot name="card_title">
            <span class="card_title"></span>
          </slot>
          <slot name="addBtn"></slot>
        </div>
        <slot>
          <!-- 搜索 -->
          <div>
            <el-row>
              <el-col :span="4">
                <el-input placeholder="Search..." prefix-icon="el-icon-search" clearable></el-input>
              </el-col>
              <!-- 代理商一览占位 -->
              <el-col :span="9">
                <div class="box">
                  <slot name="itemTitle"></slot>
                  <slot name="selectBtn"></slot>
                </div>
              </el-col>
              <el-button type="primary" plain>搜索</el-button>
            </el-row>
          </div>
          <div>
            <!-- 代理商列表 -->



            <el-table>

              <slot name="table_title" :data="tableTitle">              
              <el-table-column v-for="(item,key) in tableTitle" :label="item" prop="item" :key="key"></el-table-column>
               
             <el-table-column label="操作">
                <template>
                  <el-button class="rightBtns" size="small" icon="el-icon-setting"></el-button>
                  <el-button
                    class="rightBtns"
                    size="small"
                    icon="el-icon-edit-outline"
                    @click="edit"
                  ></el-button>
                  <el-button
                    class="rightBtns"
                    size="small"
                    icon="el-icon-delete"
                    @click="del(row.id)"
                  ></el-button>
                </template>
              </el-table-column></slot>
            </el-table>
          </div>
          <!-- 分页 -->
          <el-pagination
            background
            layout=" total,prev, pager, next,jumper"
            :page-size="6"
            :total="20"
          ></el-pagination>
        </slot>
      </el-card>
    </el-main>
  </div>
</template>
<script>

export default {
  name: 'TMTable',
  data() {
    return {
      isShow: true,
      // 列表参数对象(测试)
      tableTitle : {id:'id',dataValue:'名称',abbr:'缩写',contact:'联系人',tel:'联系电话'}
    }
  },
  methods: {
    edit() {
      this.$router.push('/addagent')
    }
  }
}
</script>
<style lang="css" scoped>

.el-main {
  width: 69vw;
  margin: 0 auto;
}
.clearfix {
  margin-bottom: 20px;
}
.el-row {
  padding-top: 0px;
}
.el-table {
  margin-top: 20px;
}
.rightBtns {
  border: none;
  background-color: transparent;
  font-size: 14px;
}
.rightBtns:hover {
  background-color: #fff;
}
.el-pagination {
  text-align: center;
  margin-top: 20px;
}
</style>