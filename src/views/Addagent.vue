<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="iconfont">&#xe621;</i>
        <span>{{title}}代理商</span>
      </div>

      <!-- 代理商表单 -->

      <el-form ref="formListRef" :rules="ruleValidate" :model="formlist" label-width="100px">
        <el-row :gutter="10">
          <el-form-item label="代理商名称" prop="name" :error="errorMsg['name']">
            <el-col>
              <el-input placeholder="输入代理商名称" v-model.trim="formlist.name"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row :gutter="10">
          <el-form-item label="代理商缩写" prop="short_name" :error="errorMsg['short_name']">
            <el-col>
              <el-input placeholder="输入代理商缩写" v-model.trim="formlist.short_name"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row :gutter="10">
          <el-form-item label="联系人" prop="connect_name" :error="errorMsg['connect_name']">
            <el-col>
              <el-input placeholder="输入联系人" v-model.trim="formlist.connect_name"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row :gutter="10">
          <el-form-item label="联系电话" prop="connect_phone" :error="errorMsg['connect_phone']">
            <el-col>
              <el-input placeholder="输入联系电话" v-model.trim="formlist.connect_phone"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
        <!-- 提交+重置按钮-->
        <el-form-item style="margin-left:200px">
          <el-button type="primary" @click="addAgent()">提交</el-button>
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
      title:'添加',
      formlist: {
        name: this.$route.query.name,
        short_name: this.$route.query.short_name,
        connect_name: this.$route.query.connect_name,
        connect_phone: this.$route.query.connect_phone,
        agent_uuid: this.$route.query.agent_uuid,
      },
      ruleValidate: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' },
          { max: 36, message: '长度在36个字符内', trigger: 'blur' }
        ],
        short_name: [
          { required: true, message: '缩写不能为空', trigger: 'blur' },
          { max: 16, message: '长度在16个字符内', trigger: 'blur' }
        ],
        connect_name: [
          { required: true, message: '联系人不能为空', trigger: 'blur' },
          { max: 36, message: '长度在36个字符内', trigger: 'blur' }
        ],
        connect_phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { max: 11, message: '请输入正确的手机号', pattern: '^1[345789][0-9]{9}$', trigger: 'blur' }
        ]
      },
      // 自定义错误提示
      errorMsg: {
        name: '',
        short_name: '',
        connect_name: '',
        connect_phone: ''
      },
    }
  },
  created() {
    this.isAdd()
  },
  methods: {
    isAdd() {
      if (this.formlist.name != undefined) {  
        this.title = '编辑'
      }
    },
    // 重置
    resetForm() {
      this.$refs.formListRef.resetFields();
      this.formlist = {}

    },
    // 添加代理商
    addAgent() {
      // 通过agent_uuid判断是否为更新操作
      if (this.$route.query.agent_uuid != undefined) {
        this.updateAgent();
      } else {
        // console.log(this.$refs.formListRef)
        this.$refs.formListRef.validate(async val => {
          if (val) {
            this.$http.post(
              '/agent',
              this.formlist
            ).then(result => {
              if (result.status == 201) {
                this.$message('提交成功');
                //  清空表单
                this.resetForm();
              } else {
                let errors = result.data.errors
                for (let key of Object.keys(errors)) {
                  this.$set(this.errorMsg, key, errors[key][0])
                }
              }
            })
          }
        })
      }
    },
    updateAgent() {
      this.$refs.formListRef.validate(async val => {
        if (val) {
          this.$http.put(
            '/agent/' + this.formlist.agent_uuid,
            this.formlist
          ).then(result => {
            if (result.status == 200) {
              this.$message('修改成功');
              //  清空表单
              this.resetForm();
              this.$router.push('/agentPreview')
            }
          })
        }
      })
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