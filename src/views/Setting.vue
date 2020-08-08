<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="iconfont">&#xe621;</i>
        <span>系统设置</span>
        <slot name="addBtn"></slot>
      </div>
      <div>
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="系统名称">
                <el-input v-model="formInline.title" placeholder="系统名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
            </el-form-item>
          </el-form>
      </div>
      <div>
          <el-upload
            class="avatar-uploader"
            action="http://api.lm.5c.work/resource"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
    data() {
        return {
            formInline: {
                title: window.sessionStorage.getItem('title'),
            },
            imageUrl: window.sessionStorage.getItem('bg')
        }
    },
    methods: {
        onSubmit() {
          this.$http.put(
            '/title',
            this.formInline
          ).then(result => {
            if (result.status == 200) {
              this.$message('修改成功');
              window.sessionStorage.setItem('title', this.formInline.title)
            }
          })
        },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || 'image/png';
        const isLt20M = file.size / 1024 / 1024 < 20;

        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG 格式!');
        }
        if (!isLt20M) {
          this.$message.error('上传图片大小不能超过 20MB!');
        }
        return isJPG && isLt20M;
      }
    }
}
</script>
<style lang="css">
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>