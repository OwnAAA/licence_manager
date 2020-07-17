<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="iconfont">&#xe621;</i>
        <span>添加代理商</span>
        <slot name="addBtn"></slot>
      </div>

      <!-- 代理商表单 -->

      <el-form ref="formListRef" :rules="ruleValidate" :model="formlist" label-width="100px">
        <el-row :gutter="10">
          <el-form-item label="代理商名称" prop="name">
            <el-col>
              <el-input placeholder="输入代理商名称" v-model="formlist.name"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row :gutter="10">
          <el-form-item label="代理商缩写" prop="short_name">
            <el-col>
              <el-input placeholder="输入代理商缩写" v-model="formlist.short_name"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row :gutter="10">
          <el-form-item label="联系人" prop="connect_name">
            <el-col>
              <el-input placeholder="输入联系人" v-model="formlist.connect_name"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row :gutter="10">
          <el-form-item label="联系电话" prop="connect_phone">
            <el-col>
              <el-input
                placeholder="输入联系电话"
                v-model="formlist.connect_phone"
              ></el-input>
            </el-col>
          </el-form-item>
        </el-row>
        <!-- 提交+重置按钮-->
        <el-form-item style="text-align:center">
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
  components: {
    // LMTable
  },
  data() {
    return {
      formlist: {
        name: '',
        short_name: '',
        connect_name: '',
        connect_phone: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' },
            {max: 36, message: '长度在36个字符内', trigger: 'blur' }
        ],
        short_name: [
          { required: true, message: '缩写不能为空', trigger: 'blur' },
            {max: 16, message: '长度在16个字符内', trigger: 'blur' }
        ],
        connect_name: [
          { required: true, message: '联系人不能为空', trigger: 'blur' },
            { max: 36, message: '长度在36个字符内', trigger: 'blur' }
        ],
        connect_phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
            { max: 11, message: '请输入正确的手机号',  pattern: '^1[345789][0-9]{9}$',trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 重置
    resetForm() {
      // this.$refs.formListRef.resetFields();
      
    },
    // 添加代理商
    addAgent() {
      // console.log(this.$refs.formListRef)
      this.$refs.formListRef.validate(async val => {
        const tokenStr = window.sessionStorage.getItem('token')
        if (val) {
          this.$http({
            method: 'post',
            url: '/agent',
            headers: {
              'Authorization': 'Bearer ' + tokenStr,
              'Content-Type': 'application/json'
            },
            data: this.formlist,

          }).then(result => {
           if(result.status!==200){
             console.log('aaaa')
           }else{
            console.log(result)
             this.$message('提交成功');
            //  清空表单
             this.resetForm();
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
</style> 