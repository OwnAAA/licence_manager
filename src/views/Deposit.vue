<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="iconfont">&#xe621;</i>
        <span>{{this.$route.query.phone}}&nbsp;充值</span>
      </div>
      <!-- 代理商表单 -->
      <el-form ref="formListRef" :rules="ruleValidate" :model="formlist" label-width="100px">
        <el-row :gutter="10">
          <el-form-item label="用户" prop="phone">
            <el-col>
              <el-input disabled placeholder="请输入用户" v-model.trim="formlist.phone"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row :gutter="10">
          <el-form-item label="金额" prop="consume">
            <el-col>
              <el-input placeholder="请输入金额" v-model.trim="formlist.consume"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row :gutter="10">
          <el-form-item label="购买天数" prop="days_add">
            <el-col>
              <el-input placeholder="请输入购买天数" v-model.trim="formlist.days_add"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
        <!-- 提交+重置按钮-->
        <el-form-item style="margin-left:200px">
          <el-button type="primary" @click="submitDeposit()">提交</el-button>
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
      formlist: {
        user_uuid: this.$route.query.id,
        consume: '',
        days_add: '',
        phone: this.$route.query.phone,
      },
      ruleValidate: {
        consume: [
          { required: true, message: '金额不能为空', trigger: 'blur' },
          { message: '请输入正确的金额', pattern: '^[0-9]*$', trigger: 'blur' }
        ],
        days_add: [
          { required: true, message: '购买天数不能为空', trigger: 'blur' },
          { message: '请输入正确的天数', pattern: '^[0-9]*$', trigger: 'blur' }
        ]
      }
    }
  },
  created() {

  },
  methods: {
    // 重置
    resetForm() {
      this.$refs.formListRef.resetFields();
      // this.formlist = {}
    },
    // 提交充值
    submitDeposit() {
      this.$refs.formListRef.validate(async val => {
        if (val) {
          this.$http.post('/credit', this.formlist).then(result => {
            if (result.status !== 201) {
              console.log('aaaa')
            } else {
              this.$message('提交成功');
              //  清空表单
              this.resetForm();
              this.$router.push({
                path: '/record',
                query: { phone: this.formlist.phone, user_uuid: this.formlist.user_uuid }
              });
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