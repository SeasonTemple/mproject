<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="auto" label-position="left"
    :class="{reqForm: true}">
    <el-form-item label="申请人" prop="applicant">
      <el-input v-model="ruleForm.applicant"></el-input>
    </el-form-item>
    <el-form-item label="审核人" prop="reviewers">
      <el-transfer filterable :filter-method="filterMethod" filter-placeholder="请输入城市拼音" v-model="ruleForm.reviewers"
        :data="data" :class="{transferCss:true}">
      </el-transfer>
    </el-form-item>
    <el-form-item label="申请类型" prop="type">
      <el-col :span="12">
        <el-radio-group v-model="ruleForm.type" text-color="#F2F6FC" fill="#67C23A" width="60%">
          <el-radio-button :label=0>出差</el-radio-button>
          <el-radio-button :label=1>结婚</el-radio-button>
          <el-radio-button :label=2>生病</el-radio-button>
          <el-radio-button :label=3>产假</el-radio-button>
          <el-radio-button :label=4>丧事</el-radio-button>
          <el-radio-button :label=5>其他</el-radio-button>
        </el-radio-group>
      </el-col>
      <el-col :span="12">
        <el-form-item prop="other">
          <el-input v-if="ruleForm.type===5" v-model="ruleForm.other">
          </el-input>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="申请日期" required>
      <el-form-item prop="date1">
        <el-date-picker v-model="ruleForm.date1" type="datetime" placeholder="选择日期时间" default-time="8:00:00">
        </el-date-picker>
      </el-form-item>
    </el-form-item>
    <el-form-item label="请假日期" required>
      <el-form-item prop="date2">
        <el-date-picker v-model="ruleForm.date2" type="datetimerange" align="right" start-placeholder="开始日期"
          end-placeholder="结束日期" :default-time="['8:00:00', '00:00:00']">
        </el-date-picker>
      </el-form-item>
    </el-form-item>
    <el-form-item label="申请理由" prop="reason">
      <el-input type="textarea" v-model="ruleForm.reason"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交申请</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  export default {
    name: 'request',
    data() {
      let ruleForm = {
        applicant: '',
        reviewers: [],
        type: 0,
        date1: '',
        date2: '',
        reason: '',
        other: '',
      };
      const generateData = _ => {
        const data = [];
        const cities = ['李茂杉', '小小人', '死风者', '憨批', '专家', '演员', '吊毛'];
        const pinyin = ['shaBi', 'smallMan', 'dieInWind', 'hanPi', 'professor', 'actor', 'diaoMao'];
        cities.forEach((city, index) => {
          data.push({
            label: city,
            key: index,
            pinyin: pinyin[index]
          });
        });
        return data;
      };
      const rules = {
        applicant: [{
            required: true,
            message: '请输入申请人姓名',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 5,
            message: '长度在 3 到 5 个字符',
            trigger: 'blur'
          }
        ],
        reviewers: [{
          required: true,
          message: '请选择审核人',
          trigger: 'select'
        }],
        type: [{
          required: true,
          message: '请选择申请类型',
          trigger: 'change'
        }],
        other: [{
          required: false,
          message: '请输入其他申请类型',
          trigger: 'blur'
        }, {
          min: 2,
          max: 5,
          message: '长度在 2 到 5 个字符',
          trigger: 'change'
        }],
        date1: [{
          type: 'date',
          required: true,
          message: '请选择提交申请的日期',
          trigger: 'blur'
        }],
        date2: [{
          type: 'date',
          required: true,
          message: '请选择请假时间段',
          trigger: 'blur'
        }],
        reason: [{
          required: true,
          message: '请填写申请的理由',
          trigger: 'blur'
        }]
      };
      return {
        ruleForm,
        rules,
        data: generateData(),
        filterMethod(query, item) {
          return item.pinyin.indexOf(query) > -1;
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          this.$confirm('你确定提交申请?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            lockScroll: 'true',
            roundButton: true
          }).then(() => {
            if (valid) {
              this.$message({
                type: 'success',
                message: '提交成功!',
                offset: 230
              });
            } else {
              this.$message({
                type: 'error',
                message: '验证失败，操作取消!!',
                offset: 230
              });
            }
          }).catch((error) => {
            this.$message({
              type: 'warning',
              message: error + '：取消操作',
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
      otherCheck: function () {
        this.ruleForm.type == 5 ? this.rules.other[0].required = true : this.rules.other[0].required = false;
      }
    },
    computed: {},
    watch: {
      'ruleForm.type': {
        handler: 'otherCheck',
      }
    },
    mounted() {}
  }
</script>

<style scoped src="@/assets/css/request.css"></style>