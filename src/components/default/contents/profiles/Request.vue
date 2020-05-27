<template>
  <el-row type="flex">
    <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        :label-width="InputWidth"
        label-position="left"
        :class="{reqForm: true}"
      >
        <el-form-item label="申请人" prop="applicant">
          <el-input v-model="ruleForm.applicant"></el-input>
        </el-form-item>
        <el-form-item label="审核人" prop="auditors">
          <el-transfer
            filterable
            :props="{
              key: 'id',
              label: 'realName'
            }"
            :titles="['可选审核人', '被选审核人']"
            :filter-method="filterMethod"
            filter-placeholder="请输入审核人姓名"
            @change="selectedApplicant"
            v-model="ruleForm.auditors"
            :data="data"
            :class="{transferCss:true}"
          ></el-transfer>
        </el-form-item>
        <el-form-item label="申请类型" prop="type">
          <el-col :span="12">
            <el-radio-group v-model="ruleForm.type" text-color="#F2F6FC" fill="#67C23A" width="60%">
              <el-radio-button :label="0">出差</el-radio-button>
              <el-radio-button :label="1">结婚</el-radio-button>
              <el-radio-button :label="2">生病</el-radio-button>
              <el-radio-button :label="3">产假</el-radio-button>
              <el-radio-button :label="4">丧事</el-radio-button>
              <el-radio-button :label="5">其他</el-radio-button>
            </el-radio-group>
          </el-col>
          <el-col :span="12" v-if="ruleForm.type==5">
            <el-form-item prop="other">
              <el-input v-model="ruleForm.other"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="申请日期" required>
          <el-form-item prop="date1">
            <el-date-picker
              v-model="ruleForm.date1"
              type="datetime"
              placeholder="选择日期时间"
              default-time="8:00:00"
            ></el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="请假日期" required>
          <el-form-item prop="date2">
            <el-date-picker
              v-model="ruleForm.date2"
              type="datetimerange"
              align="right"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['8:00:00', '00:00:00']"
            ></el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="申请理由" prop="reason">
          <el-input type="textarea" v-model="ruleForm.reason" :autosize="true"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交申请</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: "request",
  data() {
    let ruleForm = {
      applicant: "",
      auditors: [],
      type: 0,
      date1: "",
      date2: "",
      reason: "",
      other: ""
    };
    let InputWidth = "auto";
    let data = [];
    const rules = {
      applicant: [
        {
          required: true,
          message: "请输入申请人姓名",
          trigger: "blur"
        },
        {
          min: 2,
          max: 5,
          message: "长度在 3 到 5 个字符",
          trigger: "blur"
        }
      ],
      applicant: [
        {
          validator: this.validateApplicant,
          trigger: "blur"
        }
      ],
      type: [
        {
          required: true,
          message: "请选择申请类型",
          trigger: "change"
        }
      ],
      other: [
        {
          required: false,
          message: "请输入其他申请类型",
          trigger: "blur"
        },
        {
          min: 2,
          max: 5,
          message: "长度在 2 到 5 个字符",
          trigger: "change"
        }
      ],
      date1: [
        {
          type: "date",
          required: true,
          message: "请选择提交申请的日期",
          trigger: "blur"
        }
      ],
      date2: [
        {
          type: "date",
          required: true,
          message: "请选择请假时间段",
          trigger: "blur"
        }
      ],
      reason: [
        {
          required: true,
          message: "请填写申请的理由",
          trigger: "blur"
        }
      ]
    };
    return {
      InputWidth,
      ruleForm,
      rules,
      data
    };
  },
  methods: {
    initData() {
      const data = [];
      const auditors = [
        { realName: "李茂杉", id: "1" },
        { realName: "小小人", id: "2" },
        { realName: "死风者", id: "3" },
        { realName: "憨批", id: "4" },
        { realName: "专家", id: "5" },
        { realName: "演员", id: "6" },
        { realName: "吊毛", id: "7" }
      ];
      auditors.forEach(a =>
        data.push({
          id: a.id,
          realName: a.realName
        })
      );
      Object.assign(this.data, data);
    },
    filterMethod(query, item) {
      return item.realName.indexOf(query) > -1;
      // return item.cities.indexOf(query) > -1;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        this.$confirm("你确定提交申请?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          lockScroll: "true",
          roundButton: true
        })
          .then(() => {
            if (valid) {
              this.$message({
                type: "success",
                message: "提交成功!",
                offset: 230
              });
            } else {
              this.$message({
                type: "error",
                message: "验证失败，操作取消!!",
                offset: 230
              });
            }
          })
          .catch(error => {
            this.$message({
              type: "warning",
              message: error + "：取消操作",
              offset: 250
            });
            return false;
          });
        // if (valid) {
        //   this.$message({
        //     message: '提交成功',
        //     offset: 100,
        //     type: 'success'
        //   })
        // } else {
        //   this.$message({
        //     message: '验证失败，操作取消',
        //     offset: 100,
        //     type: 'error'
        //   })
        // }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    otherCheck: function() {
      this.ruleForm.type == 5
        ? (this.rules.other[0].required = true)
        : (this.rules.other[0].required = false);
    },
    selectedApplicant(value, direction, movedKeys) {
      console.log(value, direction, movedKeys);
    },
    validateApplicant(value) {
      console.log(value);
    }
  },
  computed: {},
  watch: {
    "ruleForm.type": {
      handler: "otherCheck",
      immediate: false
    }
  },
  beforeMount() {
    this.initData();
  },
  mounted() {
    this.InputWidth = "80px";
  }
};
</script>

<style scoped src="@/assets/css/request.css"></style>