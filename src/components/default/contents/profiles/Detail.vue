<template>
  <el-row
    :class="{box:true}"
    :xs="19"
    :sm="20"
    :md="22"
    :lg="24"
    :xl="24"
    type="flex"
    justify="space-around"
  >
    <el-col :xs="19" :sm="18" :md="18" :lg="14" :xl="16">
      <el-form
        ref="detailForm"
        :model="detailForm"
        label-width="80px"
        label-position="left"
        :class="{detailStyle:true}"
        :rules="rules"
        hide-required-asterisk
      >
        <el-form-item class="user-avatar" label="我的头像" prop="avatarUrl">
          <el-upload
            class="avatar-uploader"
            ref="upload"
            action="/tusu/?a=upload"
            :http-request="handleUpload"
            :before-upload="beforeAvatarUpload"
            :on-preview="handlePictureCardPreview"
            list-type="picture-card"
            :on-remove="handleRemove"
            :on-success="handleAvatarSuccess"
          >
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
            <img width="100%" :src="detailForm.avatarUrl" alt="你的头像" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="用户名" prop="userName">
          <el-input
            v-model="detailForm.userName"
            minlength="8"
            maxlength="20"
            show-word-limit
            :style="formItemWidth"
            placeholder="填写你的用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passWord">
          <el-input
            v-model="detailForm.passWord"
            minlength="8"
            maxlength="20"
            show-password
            :style="formItemWidth"
            placeholder="填写你的密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realName">
          <el-input
            v-model="detailForm.realName"
            minlength="2"
            maxlength="10"
            :style="formItemWidth"
            show-word-limit
            placeholder="填写你的真实姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="detailForm.phone"
            maxlength="11"
            show-word-limit
            :style="formItemWidth"
            placeholder="填写你的手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group
            v-model="detailForm.sex"
            text-color="#F2F6FC"
            fill="#67C23A"
            size="medium"
          >
            <el-radio-button :label="1">男</el-radio-button>
            <el-radio-button :label="0">女</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input-number
            v-model="detailForm.age"
            :min="1"
            :max="100"
            size="small"
            controls-position="right"
            placeholder="你的年龄"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input
            v-model="detailForm.email"
            maxlength="25"
            placeholder="请输入你的职位名称"
            :style="formItemWidth"
          ></el-input>
        </el-form-item>
        <el-form-item label="籍贯">
          <el-input
            v-model="detailForm.origin"
            maxlength="25"
            placeholder="请输入你的籍贯"
            :style="formItemWidth"
          ></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idNumber">
          <el-input
            v-model="detailForm.idNumber"
            maxlength="18"
            show-word-limit
            :style="formItemWidth"
            placeholder="填写你的身份证号码"
          ></el-input>
        </el-form-item>
        <el-form-item label="职工号" prop="id">
          <el-input
            v-model="detailForm.id"
            :style="formItemWidth"
            placeholder="填写你的职工编号"
            :readonly="formState.readonly"
            :disabled="formState.disabled"
            :clearable="formState.clearable"
          ></el-input>
        </el-form-item>
        <el-form-item label="职位" prop="position">
          <el-input
            v-model="detailForm.position"
            :style="formItemWidth"
            placeholder="填写你的职位"
            :readonly="formState.readonly"
            :disabled="formState.disabled"
            :clearable="formState.clearable"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属" prop="belongTo">
          <el-input
            v-model="detailForm.belongTo"
            :style="formItemWidth"
            placeholder="填写你的所在 部门/组"
            :readonly="formState.readonly"
            :disabled="formState.disabled"
            :clearable="formState.clearable"
          ></el-input>
          <!-- <el-cascader
            clearable
            v-model="detailForm.belongTo"
            :style="formItemWidth"
            :options="belongOpts"
            :formState="formState"
            :props="{ expandTrigger: 'hover' }"
            @change="handleChange"
            value-key="belongTo"
          >
            <template slot-scope="{ node, data }">
              <span class="demonstration">{{ data.label }}</span>
              <span v-if="!node.isLeaf">({{ data.children.length }})</span>
            </template>
          </el-cascader>-->
        </el-form-item>
        <el-form-item label="入职日期" prop="createTime">
          <el-date-picker
            v-model="detailForm.createTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            :picker-options="pickerOptions"
            :style="formItemWidth"
            :readonly="formState.readonly"
            :disabled="formState.disabled"
            :clearable="formState.clearable"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="上次登录" prop="lastLogin">
          <el-date-picker
            v-model="detailForm.lastLogin"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            :picker-options="pickerOptions"
            :style="formItemWidth"
            :readonly="formState.readonly"
            :disabled="formState.disabled"
            :clearable="formState.clearable"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit('detailForm')">提交修改</el-button>
          <el-button @click="resetForm('detailForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
import dayjs from "dayjs";
import { BelongTo, ModifyDetail, UploadImg } from "_a/profile.js";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "detail",
  props: {
    userDetail: Object
  },
  data() {
    let backup = {
      belongTo: ""
    };
    let formItemWidth = "width:90%";
    let dialogVisible = false;
    let formState = {
      readonly: true,
      disabled: true,
      clearable: false
    };
    let belongOpts = "";
    let detailForm = {
      avatarUrl: "",
      userName: "",
      passWord: "",
      realName: "",
      phone: "",
      sex: "",
      age: Number,
      email: "",
      origin: "",
      idNumber: "",
      id: "",
      position: "",
      createTime: "",
      belongTo: "",
      lastLogin: ""
    };
    let rules = {
      leader: {
        required: true,
        message: "请输入您的上级姓名",
        trigger: "blur"
      }
    };
    const pickerOptions = {
      disabledDate(time) {
        return time.getTime() > Date.now();
      },
      shortcuts: [
        {
          text: "今天",
          onClick(picker) {
            picker.$emit("pick", new Date());
          }
        },
        {
          text: "昨天",
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit("pick", date);
          }
        },
        {
          text: "一周前",
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit("pick", date);
          }
        }
      ]
    };
    return {
      backup,
      rules,
      dialogVisible,
      detailForm,
      formItemWidth,
      pickerOptions,
      belongOpts,
      formState
    };
  },
  methods: {
    ...mapActions({
      GET_UserDetail: "main/GET_UserDetail"
    }),
    uploadImage() {
      console.log("图片上传！");
    },
    initDetail() {
      this.GET_UserDetail()
        .then(res => {
          let { depId, groupId } = res;
          this.initOpts({ depId, groupId }, res);
        })
        .catch(err => {
          this.$message.error({
            dangerouslyUseHTMLString: true,
            message: `<strong>获取用户信息异常：${err.msg}</strong> `,
            offset: 100,
            duration: 2000
          });
        });
    },
    initOpts(flag, value) {
      BelongTo()
        .then(res => {
          let data = res.data.data;
          let code = res.data.code;
          if (code == 10200 || code == 10201) {
            let dep = data.departments.find(dep => flag.depId == dep.id);
            let group = data.projects
              .filter(pro => flag.depId == pro.depId)
              .find(pro => pro.id == flag.groupId);
            Object.assign(this.detailForm, value);
            this.detailForm.belongTo = dep.depName + " / " + group.projectName;
            Object.assign(this.backup, this.detailForm);
            this.$refs.upload.fileList.push({
              url: this.detailForm.avatarUrl
            });
          } else {
            this.$message.error({
              dangerouslyUseHTMLString: true,
              message: `<strong>获取部门、组信息失败：${res.msg}</strong> `,
              offset: 100,
              duration: 2000
            });
          }
        })
        .catch(err => {
          this.$message.error({
            dangerouslyUseHTMLString: true,
            message: `<strong>接口调用失败：${err}</strong> `,
            offset: 100,
            duration: 2000
          });
        });
    },
    handleAvatarSuccess(res, file) {
      this.detailForm.avatarUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isRightType =
        file.type === "image/jpeg" || "image/jpg" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isRightType) {
        this.$message.error({
          message: "上传头像图片只能是 JPG 格式!",
          offset: 100,
        });
      }
      if (!isLt2M) {
        this.$message.error({
          message: "上传头像图片大小不能超过 2MB!",
          offset: 200,
        });
      }
      return isRightType && isLt2M;
    },
    handleRemove(file, fileList) {
      this.$refs.upload.abort(file);
      this.$refs.upload.clearFiles();
    },
    handlePictureCardPreview(file) {
      this.detailForm.avatarUrl = file.url;
      this.dialogVisible = true;
    },
    handleUpload(event) {
      console.log("正在上传图片！");
      console.log(event.file);
      // console.log(new File(event.file, event.file.name))
      // const reader = new FileReader();
      // reader.readAsBinaryString(event.file);
      // let target = [];
      // reader.onload = function(y) {
      //   let binary = this.result;
      UploadImg(event.file)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
      // };
      // return fileList.splice(0).push.call(fileList, file);
    },
    uploadFailed(err, file) {
      this.$message.error({
        message: `${err}`,
        offset: 300,
      });
    },
    resetForm: function(formName) {
      Object.assign(this.detailForm, this.backup);
    },
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let send = this.detailForm;
          let { attendance, salt, salary, ...o } = this.detailForm;
          console.log(o);
          ModifyDetail(o)
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleChange(value) {
      console.log(value);
    },
    formatBelongTo: function(value) {
      this.belongOpts = value;
    }
  },
  computed: {},
  watch: {
    // formatBelongTo(value) {
    //   let flag = this.detailForm.belongTo;
    //   console.log("formatBelongTo");
    //   if (flag == "" || flag == null)
    //     this.detailForm.belongTo = this.belongOpts;
    // }
  },
  mounted() {
    this.wow().init();
    // this.$refs.upload.fileList.push({
    //   uid: "20200012",
    //   url: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
    // });
    if (this.detailForm.userName == "") {
      this.initDetail();
    }
  }
};
</script>

<style scoped src="@/assets/css/detail.css"></style>