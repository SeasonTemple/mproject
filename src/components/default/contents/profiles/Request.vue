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
        hide-required-asterisk
      >
        <el-form-item label="申请人" prop="applicant">
          <el-input v-model="ruleForm.applicant" disabled></el-input>
        </el-form-item>
        <el-form-item label="审核人" prop="auditors">
          <el-transfer
            filterable
            :props="{
              key: 'id',
              label: 'userName'
            }"
            :titles="['可选审核人', '被选审核人']"
            :filter-method="filterMethod"
            filter-placeholder="请输入审核人姓名"
            @change="selectedApplicant"
            v-model="ruleForm.auditors"
            :data.sync="auditorsData"
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
          <!-- <el-col :span="12" v-if="ruleForm.type==5">
            <el-form-item prop="other">
              <el-input v-model="ruleForm.other"></el-input>
            </el-form-item>
          </el-col>-->
        </el-form-item>
        <el-form-item label="申请日期" required>
          <el-form-item prop="requestTime">
            <el-date-picker
              v-model="ruleForm.requestTime"
              type="datetime"
              placeholder="选择日期时间"
              default-time="8:00:00"
            ></el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="请假日期" required>
          <el-form-item prop="restTime">
            <el-date-picker
              v-model="ruleForm.restTime"
              type="datetimerange"
              align="right"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['8:00:00', '18:00:00']"
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
import dayjs from "dayjs";
var isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
dayjs.extend(isSameOrBefore);
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { InitAuditors } from "_a/profile";
export default {
  name: "request",
  data() {
    const getAuditors = () => {
      // if (this.auditorsData.length < 1) {
      const data = [];
      InitAuditors()
        .then(res => {
          let auditors = res.data.data.auditors;
          auditors.forEach(a =>
            data.push({
              id: a.id,
              userName: a.userName
            })
          );
        })
        .catch(err => {
          this.$message.error({
            message: err.data.msg,
            offset: 250
          });
        });
      return data;
    };
    const getApplicant= ()=>{
      return this.Get_UserDetail().realName;
    };
    let ruleForm = {
      applicant: getApplicant(),
      auditors: [],
      type: 0,
      requestTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      restTime: [],
      reason: ""
    };
    let InputWidth = "80px";
    let auditorsData = [];
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
      auditors: [
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
      requestTime: [
        {
          validator: this.validateRequestDate,
          trigger: "select"
        }
      ],
      restTime: [
        {
          validator: this.validateRestDate,
          trigger: "select"
        }
      ],
      reason: [
        {
          required: true,
          message: "请填写申请的理由",
          trigger: "blur"
        },
        {
          min: 2,
          max: 32,
          message: "长度在 2 到 32 个字符",
          trigger: "change"
        }
      ]
    };
    return {
      InputWidth,
      ruleForm,
      rules,
      auditorsData: getAuditors()
    };
  },
  methods: {
    ...mapGetters({
      Get_UserDetail: "main/USERDETAIL"
    }),
    ...mapActions({
      SUBMIT_REQUEST: "profile/SUBMIT_REQUEST"
    }),
    initData() {
      this.ruleForm.applicant = this.Get_UserDetail().realName;
      // Object.assign(this.auditorsData, data);
      // console.log(this.auditorsData);
    },
    filterMethod(query, item) {
      return item.userName.indexOf(query) > -1;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("提交申请?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
            lockScroll: "true",
            roundButton: true
          })
            .then(() => {
              let o = this.ruleForm;
              console.log(o);
              let request = {
                applicant: o.applicant,
                auditor: o.auditors[0],
                type: o.type,
                requestTime: o.requestTime,
                startTime: dayjs(o.restTime[0]).format("YYYY-MM-DD HH:mm:ss"),
                endTime: dayjs(o.restTime[1]).format("YYYY-MM-DD HH:mm:ss"),
                reason: o.reason
              };
              this.SUBMIT_REQUEST(request)
                .then(res => {
                  this.$message.success({
                    message: res,
                    offset: 150
                  });
                  this.resetForm(formName);
                })
                .catch(err => {
                  this.$message.success({
                    message: err,
                    offset: 150
                  });
                });
            })
            .catch(err => {
              this.$message.warning({
                message: err + "：取消操作",
                offset: 150
              });
              return false;
            });
        } else {
          this.$message.error({
            message: "你的输入有误，请根据提示填写!!",
            offset: 150
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // otherCheck: function() {
    //   this.ruleForm.type == 5
    //     ? (this.rules.other[0].required = true)
    //     : (this.rules.other[0].required = false);
    // },
    selectedApplicant(value, direction, movedKeys) {
      console.log(value, direction, movedKeys);
    },
    validateApplicant(rule, value, callback) {
      if (value.length < 1) {
        callback(new Error("请选择一名审核人"));
      } else if (value.length > 1) {
        callback(new Error("只能选择一名审核人"));
      } else {
        callback();
      }
    },
    validateRequestDate(rule, value, callback) {
      if (value == "") {
        callback(new Error("请选择申请日期时间"));
      } else if (dayjs().isSameOrBefore(value, "date")) {
        callback();
      } else {
        callback(new Error("请选择不早于当前的日期时间"));
      }
    },
    validateRestDate(rule, value, callback) {
      // console.log(value[0]);
      if (value.length < 2) {
        callback(new Error("请选择请假的时间范围"));
      } else if (dayjs().isSameOrBefore(value[0], "day")) {
        callback();
      } else {
        callback(new Error("请选择正确的时间范围"));
      }
    }
  },
  computed: {},
  watch: {},
  beforeMount() {},
  mounted() {
    
  }
};
</script>

<style scoped src="@/assets/css/request.css"></style>