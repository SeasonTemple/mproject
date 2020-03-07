<template>
  <div class="box">
    <div class="user-avatar">
      <el-upload class="avatar" 
      action="https://jsonplaceholder.typicode.com/posts/" 
      :before-upload="beforeAvatarUpload"
        list-type="picture-card" 
        :on-preview="handlePictureCardPreview" 
        :on-remove="handleRemove" 
        :on-exceed="handleOverLimit"
        :limit="1"
        :show-file-list="false" v-model="imageUrl">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible" :append-to-body='true'>
        <img width="100%" :src="imageUrl" alt="头像">
      </el-dialog>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'profile',
    data() {
      let imageUrl = '';
      let dialogVisible = false;
      let disabled = false;
      return {
        imageUrl,
        dialogVisible,
        disabled
      }
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isRightType = file.type === 'image/jpeg' || 'image/jpg' || 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 1;
        // const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isRightType) {
          this.$message({
            message: '上传头像图片只能是 JPG 格式!',
            offset: 100,
            type: 'error'
          })
        }
        if (!isLt2M) {
          this.$message({
            message: '上传头像图片大小不能超过 2MB!',
            offset: 200,
            type: 'error'
          })
        }
        return isRightType && isLt2M;
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.imageUrl = file.url;
        this.dialogVisible = true;
      },
      uploadFailed(file) {
        this.$message({
          message: '上传头像失败!',
          offset: 300,
          type: 'error'
        })
      },
      handleOverLimit(files, fileList){
        console.log(`${JSON.stringify(files)}/${JSON.stringify(fileList)}`)
        this.$message({
          message: '只能上传一张头像!',
          offset: 300,
          type: 'error'
        })
      }
    },
    mounted() {
      this.wow().init();
    }
  }
</script>

<style scoped src="@/assets/css/detail.css"></style>
<style>
  /* .avatar .el-upload--picture-card { 
    border: 1px dashed #d9d9d9;
    border-radius: 50% !important;
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
  } */
</style>