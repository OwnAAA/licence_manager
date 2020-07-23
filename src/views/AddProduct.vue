<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="iconfont">&#xe621;</i>
        <span>{{title}}产品</span>
      </div>

      <!-- 产品表单 -->
      <el-form ref="formListRef" :rules="ruleValidate" :model="formlist" label-width="120px">
        <el-row :gutter="10">
          <el-form-item label="代理商名称" prop="name">
            <el-col>
              <el-input disabled placeholder="输入代理商名称" v-model.trim="formlist.name"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row :gutter="10">
          <el-form-item label="产品名" prop="project_name">
            <el-col>
              <el-input placeholder="请输入产品名称" v-model.trim="formlist.project_name"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row :gutter="10">
          <el-form-item label="编号" prop="project_no">
            <el-col>
              <el-input placeholder="请输入编号" v-model.trim="formlist.project_no"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row :gutter="10">
          <el-form-item label="注册赠送天数" prop="free_days">
            <el-col>
              <el-input placeholder="请输入注册免费赠送天数" v-model.trim="formlist.free_days"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
        <!-- 提交+重置按钮-->
        <el-form-item style="margin-left:200px">
          <el-button type="primary" @click="addProduct()">提交</el-button>
          <el-button type="primary" @click="resetForm()" plain>重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
// import LMTable from '../components/LMTable'

export default {
  data() {
    return {
      title: '添加',
      formlist: {
        name: this.$route.query.name,
        project_name: this.$route.query.project_name,
        project_no: this.$route.query.project_no,
        free_days: this.$route.query.free_days,
        agent_uuid: this.$route.query.agent_uuid,
        id: this.$route.query.id
      },
      ruleValidate: {
        project_name: [
          { required: true, message: '产品名不能为空', trigger: 'blur' },
        ],
        project_no: [
          { required: true, message: '编号不能为空', trigger: 'blur' },
        ],
        free_days: [
          { required: true, message: '请输入正确天数', pattern: '^[0-9]*$', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.isAdd()
  },
  methods: {
    isAdd() {
      if (this.formlist.project_name != undefined) {
        this.title = '编辑'
      }
    },
    addProduct() {
      // 通过project_no判断是否为更新操作
      if (this.$route.query.project_no != undefined) {
        this.updateProject();
      } else {
        this.$refs.formListRef.validate(async val => {
          if (val) {
            this.$http.post(
              '/agent/' + this.formlist.agent_uuid + '/project',
              this.formlist
            ).then(result => {
              if (result.status == 201) {
                this.$message('提交成功');
                //  清空表单
                this.resetForm();
                this.$router.push({
                  path: '/productManager',
                  query: {
                    agent_uuid: this.$route.query.agent_uuid,
                  }
                })
              }
            })
          }
        })
      }
    },
    updateProject() {
      // this.getproductList()
      this.$refs.formListRef.validate(async val => {
        if (val) {
          this.$http.put(
            '/agent/' + this.formlist.agent_uuid + '/project/' + this.formlist.id,
            this.formlist
          ).then(result => {
            if (result.status == 200) {
              this.$message('修改成功');
              //  清空表单
              this.resetForm();
            }
          })
        }
      })
    },
    // 重置
    resetForm() {
      this.$refs.formListRef.resetFields();
      // this.formlist = {}
    }
  }
}
</script>
<style lang="css" scoped>
.el-form {
  margin: 0 auto;
  width: 40vw;
}
.el-button {
  margin-right: 20px;
}
</style> 