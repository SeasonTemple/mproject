<template>
  <div class="box">
    <el-form ref="detailForm" :model="detailForm" label-width="auto" class="detailStyle">
      <el-form-item class="user-avatar " label="我的头像">
        <el-upload class="avatar-uploader" ref="upload" action="https://jsonplaceholder.typicode.com/posts/"
          :before-upload="beforeAvatarUpload" :on-preview="handlePictureCardPreview" list-type="picture-card"
          :on-progress="handleUpload" :on-remove="handleRemove" :on-success="handleAvatarSuccess">
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" :append-to-body='true'>
          <img width="100%" :src="detailForm.imageUrl" alt="头像">
        </el-dialog>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="detailForm.username" minlength="8" maxlength="20" show-word-limit placeholder="请输入你的用户名"
          clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="detailForm.password" minlength="8" maxlength="20" show-password placeholder="请输入你的密码"
          clearable></el-input>
      </el-form-item>
      <el-form-item label="真实姓名">
        <el-input v-model="detailForm.realName" minlength="2" maxlength="10" style="width:60%;" placeholder="请输入你的真实姓名"
          clearable></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="detailForm.phone" maxlength="11" show-word-limit style="width:60%;" placeholder="请输入你的手机号"
          clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="detailForm.sex" text-color="#F2F6FC" fill="#67C23A">
          <el-radio-button label="男"></el-radio-button>
          <el-radio-button label="女"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input-number v-model="detailForm.age" :min="1" :max="100" size="medium" placeholder="输入或按钮调节">
        </el-input-number>
      </el-form-item>
      <el-form-item label="职位">
        <el-input v-model="detailForm.position" maxlength="20" placeholder="请输入你的职位名称" style="width:72%;" clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input v-model="detailForm.idNum" maxlength="18" show-word-limit style="width:72%;" placeholder="请输入你的身份证号码"
          clearable></el-input>
      </el-form-item>
      <el-form-item label="职工号">
        <el-input v-model="detailForm.empId" maxlength="18" show-word-limit style="width:72%;" placeholder="请输入你的职工编号"
          clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="所属项目组">
        <el-input v-model="detailForm.groupName" maxlength="10" placeholder="请输入你所属的项目组名称" style="width:72%" readonly
          clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="所属部门">
        <el-input v-model="detailForm.departmentName" maxlength="10" placeholder="请输入你所属的部门名称" style="width:72%"
          readonly clearable></el-input>
      </el-form-item>
      <el-form-item label="直属上级">
        <el-input v-model='detailForm.leaderName' minlength="2" maxlength="10" placeholder="请输入你的直属上级全名"
          style="width:72%" readonly clearable></el-input>
      </el-form-item>
      <el-form-item label="入职日期">
        <el-date-picker v-model="detailForm.createTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime"
          :picker-options="pickerOptions" readonly clearable>
        </el-date-picker>
      </el-form-item>
      <el-form-item label="上次登录时间">
        <el-date-picker v-model="detailForm.lastLogin" value-format="yyyy-MM-dd HH:mm:ss" type="datetime"
          :picker-options="pickerOptions" readonly clearable>
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">提交修改</el-button>
        <el-button @click="resetForm('detailForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    name: 'profile',
    data() {
      let dialogVisible = false;
      let disabled = false;
      let detailForm = {
        imageUrl: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        username: '廖某人',
        password: '.z54564',
        realName: '廖文岵',
        phone: '110',
        sex: '男',
        age: '21',
        position: 'Python删库员',
        idNum: '51025198704013312',
        empId: '192382149870231001',
        createTime: new Date(),
        groupName: '大国中医',
        departmentName: '传销部',
        leaderName: '习近平',
        lastLogin: new Date()
      };
      const pickerOptions = {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      };
      return {
        dialogVisible,
        disabled,
        detailForm,
        pickerOptions
      }
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.detailForm.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isRightType = file.type === 'image/jpeg' || 'image/jpg' || 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
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
        this.$refs.upload.abort(file);
        this.$refs.upload.clearFiles();
      },
      handlePictureCardPreview(file) {
        this.detailForm.imageUrl = file.url;
        this.dialogVisible = true;
      },
      handleUpload(event, file, fileList) {
        return fileList.splice(0).push.call(fileList, file);
      },
      uploadFailed(err, file) {
        this.$message({
          message: `${err}`,
          offset: 300,
          type: 'error'
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    mounted() {
      this.wow().init();
      this.$refs.upload.fileList.push({
        'uid': '20200012',
        'url': 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
      })
    }
  }
</script>

<style scoped src="@/assets/css/detail.css"></style>
<style>
  /* .avatar-uploader .el-upload {
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
  } */
</style>