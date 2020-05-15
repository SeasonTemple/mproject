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
      >
        <el-form-item class="user-avatar" label="我的头像" prop="avatarUrl">
          <el-upload
            class="avatar-uploader"
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :before-upload="beforeAvatarUpload"
            :on-preview="handlePictureCardPreview"
            list-type="picture-card"
            :on-progress="handleUpload"
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
            v-bind="formState"
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
            v-bind="formState"
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
            v-bind="formState"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="detailForm.phone"
            maxlength="11"
            show-word-limit
            :style="formItemWidth"
            placeholder="填写你的手机号"
            v-bind="formState"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group
            v-model="detailForm.sex"
            text-color="#F2F6FC"
            fill="#67C23A"
            size="medium"
            v-bind="formState"
          >
            <el-radio-button :label=1>男</el-radio-button>
            <el-radio-button :label=0>女</el-radio-button>
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
            v-bind="formState"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input
            v-model="detailForm.email"
            maxlength="25"
            placeholder="请输入你的职位名称"
            :style="formItemWidth"
            v-bind="formState"
          ></el-input>
        </el-form-item>
        <el-form-item label="籍贯">
          <el-input
            v-model="detailForm.origin"
            maxlength="25"
            placeholder="请输入你的籍贯"
            :style="formItemWidth"
            v-bind="formState"
          ></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idNumber">
          <el-input
            v-model="detailForm.idNumber"
            maxlength="18"
            show-word-limit
            :style="formItemWidth"
            placeholder="填写你的身份证号码"
            v-bind="formState"
          ></el-input>
        </el-form-item>
        <el-form-item label="职工号" prop="id">
          <el-input
            v-model="detailForm.id"
            :style="formItemWidth"
            placeholder="填写你的职工编号"
            v-bind="formState"
          ></el-input>
        </el-form-item>
        <el-form-item label="职位所属" prop="belongTo">
          <el-cascader
            :options="belongOpts"
            :style="formItemWidth"
            v-bind="formState"
            :props="{ expandTrigger: 'hover' }"
          >
            <template slot-scope="{ node, data }">
              <span>{{ data.label }}</span>
              <span v-if="!node.isLeaf">({{ data.children.length }})</span>
            </template>
          </el-cascader>
        </el-form-item>
        <el-form-item label="直属上级" prop="leaderName">
          <el-input
            v-model="detailForm.leaderName"
            minlength="2"
            maxlength="10"
            placeholder="您的直属上级姓名"
            :style="formItemWidth"
            v-bind="formState"
          ></el-input>
        </el-form-item>
        <el-form-item label="入职日期" prop="createTime">
          <el-date-picker
            v-model="detailForm.createTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            :picker-options="pickerOptions"
            :style="formItemWidth"
            v-bind="formState"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="上次登录" prop="lastLogin">
          <el-date-picker
            v-model="detailForm.lastLogin"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            :picker-options="pickerOptions"
            :style="formItemWidth"
            v-bind="formState"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit('detailForm')">提交修改</el-button>
          <el-button @click="resetForm('detailForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!-- <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
      <template v-for="(p, index) in progressGroup.progress">
        <el-col :xs="4" :sm="6" :md="8" :lg="8" :xl="8" :class="{circleGroup:true}" :key="index">
          <el-progress v-if="p.type == 'line'" :type="p.type" :percentage="p.percentage" :text-inside="p.textInside"
            :color="progressGroup.colors" :stroke-width="p.strokeWidth" :show-text="p.showText"></el-progress>
          <el-progress v-else :type="p.type" :percentage="p.percentage" :color="progressGroup.colors"
            :stroke-width="p.strokeWidth" :width="p.width" :show-text="p.showText" :stroke-linecap="p.strokeLineCap">
          </el-progress>
        </el-col>
      </template>
    </el-col>-->
  </el-row>
</template>
<script>
export default {
  name: "detail",
  props: {
    userDetail: Object
  },
  data() {
    let formItemWidth = "width:90%";
    let dialogVisible = false;
    let disabled = false;
    let formState = {
      readonly: true,
      clearable: true,
      disabled: false
    };
    let belongOpts = [
      {
        label: "前端开发部",
        departmentName: "zhinan",
        departmentId: "1",
        children: [
          {
            label: "天气App项目",
            groupName: "shejiyuanze",
            groupId: "2",
            children: [
              {
                label: "Python删库工程师",
                position: "shejiyuanze",
                positionId: "2"
              }
            ]
          },
          {
            label: "设计原则",
            groupName: "shejiyuanze",
            groupId: "2",
            children: [
              {
                label: "一致",
                position: "shejiyuanze",
                positionId: "2"
              }
            ]
          }
        ]
      }
    ];
    let detailForm = {
      avatarUrl:
        "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
      userName: "廖某人",
      passWord: ".z54564",
      realName: "廖文岵",
      phone: "110",
      sex: "1",
      age: 21,
      email: "512743568@qq.com",
      origin: "四川省成都市金牛区",
      idNumber: "51025198704013312",
      id: "192382149870231001",
      createTime: new Date(),
      groupName: "大国中医",
      belongTo: [],
      departmentName: "传销部",
      leaderName: "庄爱玲" || "无",
      lastLogin: new Date()
    };
    let rules = {
      leaderName: {
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
    let progressGroup = {
      progress: [
        {
          percentage: 12,
          type: "circle",
          strokeWidth: 8,
          textInside: false,
          status: "",
          width: 140,
          showText: true,
          strokeLineCap: "round"
        },
        {
          percentage: 21,
          type: "circle",
          strokeWidth: 8,
          textInside: false,
          status: "",
          width: 140,
          showText: true,
          strokeLineCap: "round"
        },
        {
          percentage: 24,
          type: "line",
          strokeWidth: 20,
          textInside: true,
          status: "",
          width: 150,
          showText: true,
          strokeLineCap: ""
        }
      ],
      colors: [
        {
          color: "#f56c6c",
          percentage: 20
        },
        {
          color: "#e6a23c",
          percentage: 40
        },
        {
          color: "#5cb87a",
          percentage: 60
        },
        {
          color: "#1989fa",
          percentage: 80
        },
        {
          color: "#6f7ad3",
          percentage: 100
        }
      ]
    };
    return {
      rules,
      dialogVisible,
      disabled,
      detailForm,
      formItemWidth,
      pickerOptions,
      belongOpts,
      formState,
      progressGroup
    };
  },
  methods: {
    initDetail() {
      let data = this.userDetail;
      console.log(data)
      if (data != "" || data != null) {
        Object.assign(this.detailForm, data);
      }
    },
    handleAvatarSuccess(res, file) {
      this.detailForm.avatarUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isRightType =
        file.type === "image/jpeg" || "image/jpg" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isRightType) {
        this.$message({
          message: "上传头像图片只能是 JPG 格式!",
          offset: 100,
          type: "error"
        });
      }
      if (!isLt2M) {
        this.$message({
          message: "上传头像图片大小不能超过 2MB!",
          offset: 200,
          type: "error"
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
    handleUpload(event, file, fileList) {
      return fileList.splice(0).push.call(fileList, file);
    },
    uploadFailed(err, file) {
      this.$message({
        message: `${err}`,
        offset: 300,
        type: "error"
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  mounted() {
    this.wow().init();
    this.$refs.upload.fileList.push({
      uid: "20200012",
      url: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
    });
    this.initDetail();
  }
};
</script>

<style scoped src="@/assets/css/detail.css"></style>