<template>
  <el-card>
    <el-row type="flex" :gutter="20">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-table
          :data="tableData"
          style="width:100%;"
          fit
          max-height="700"
          size="medium"
          v-loading="drawLoading"
          empty-text="暂无数据"
          ref="tableData"
          :filter-method="filterHandler"
          @selection-change="selectedRows"
          @row-click="clickRow"
        >
          <el-table-column prop="userId" label="ID" show-overflow-tooltip></el-table-column>
          <el-table-column prop="realName" label="真实姓名" show-overflow-tooltip></el-table-column>
          <el-table-column prop="position" label="职位" show-overflow-tooltip></el-table-column>
          <el-table-column prop="normal" label="正常次数" show-overflow-tooltip></el-table-column>
          <el-table-column prop="lose" label="缺勤次数" show-overflow-tooltip></el-table-column>
          <el-table-column prop="late" label="迟到次数" show-overflow-tooltip></el-table-column>
          <el-table-column prop="total" label="当月共计打卡" show-overflow-tooltip>
            <template slot-scope="scope">
              <div slot="reference">{{scope.row.total?scope.row.total:0}}</div>
            </template>
          </el-table-column>
          <el-table-column align="right">
            <template slot="header">
              <el-input v-model="search" size="small" placeholder="输入姓名或职位搜索" />
            </template>
          </el-table-column>
          <div slot="append" class="footer">
            <el-pagination
              class="pager"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-size="5"
              layout="total, prev, pager, next, jumper"
              :total="tableData.length"
              :hide-on-single-page="false"
            ></el-pagination>
          </div>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog title="薪资情况" :visible.sync="dialogTableVisible" append-to-body>
      <el-form :model="salaryForm" :class="{alerts:true}" label-position="left" label-width="80px">
        <el-alert
          v-if="dialogTableVisible"
          :title="salaryForm.realName"
          type="info"
          description="本月出勤情况如下："
          show-icon
          close-text="知道了"
        ></el-alert>
        <el-alert
          v-if="dialogTableVisible"
          title="截止目前："
          type="warning"
          :description="generateDescription(salaryForm.total)"
          show-icon
          close-text="知道了"
        ></el-alert>
        <el-alert
          v-if="dialogTableVisible"
          title="本月薪资共计："
          type="success"
          :description="showSalary"
          show-icon
          close-text="知道了"
        ></el-alert>
        <el-form-item prop="plus" label="加减薪水" :style="{marginTop: '20px'}">
          <el-input-number
            v-model="salaryForm.salary"
            :precision="2"
            :step="100"
            size="small"
            @change="changeSalary"
          ></el-input-number>
        </el-form-item>
        <el-form-item prop="reason" label="理由">
          <el-input
            type="text"
            v-model="salaryForm.reason"
            placeholder="请输入调整薪水的理由"
            clearable
            maxlength="20"
            show-word-limit
            :style="{width:'50%'}"
          ></el-input>
        </el-form-item>
        <el-form-item :style="{marginLeft: formLabelWidth}">
          <el-button type="success" plain @click="submit('salaryForm')">提交修改</el-button>
          <el-button type="primary" plain @click="dialogTableVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-card>
</template>

<script>
import dayjs from "dayjs";
var isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
dayjs.extend(isSameOrBefore);
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "SalaryMg",
  inject: ["reload"],
  data() {
    let formLabelWidth = "40px";
    let selectRows = [];
    let salaryForm = {
      userId: "",
      realName: "",
      position: "",
      salary: 2500.0,
      timeLine: [],
      change: 0.00,
      reason: ""
    };
    let formInline = {
      keyword: ""
    };
    let tableData = [];
    let currentPage1 = 5;
    let currentPage2 = 5;
    let currentPage3 = 5;
    let currentPage4 = 1;
    let drawLoading = true;
    let dialogTableVisible = false;
    let search = "";
    return {
      selectRows,
      formLabelWidth,
      salaryForm,
      dialogTableVisible,
      formInline,
      currentPage1,
      currentPage2,
      currentPage3,
      currentPage4,
      tableData,
      drawLoading,
      search
    };
  },
  methods: {
    ...mapGetters({
      Get_SalaryList: "hr/Get_SalaryList"
    }),
    ...mapMutations({
      SET_SalaryList: "hr/SET_SalaryList"
    }),
    ...mapActions({
      INIT_SALARY: "hr/INIT_SALARY"
    }),
    submit(formName) {
      this.dialogTableVisible = false;
      this.$message.success({
        message: "提交成功！",
        offset: 130
      });
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    toggleSelection(rows) {
      if (rows) {
        this.tableData.forEach(row => {
          if (rows.indexOf(row) == -1) {
            this.$refs.tableData.toggleRowSelection(row);
          } else {
            this.$refs.tableData.toggleRowSelection(row, false);
          }
        });
      } else {
        this.$refs.tableData.clearSelection();
      }
    },
    selectedRows(rows) {
      console.log(rows);
      // this.selectRows = rows;
    },
    clickRow(row) {
      //   console.log(row);
      console.log(this.salaryForm);
      let { id, name, position } = row;
      Object.assign(this.salaryForm, row);
      console.log(this.salaryForm);
      this.dialogTableVisible = true;
    },
    deleteRows() {
      let ids = this.selectRows.map(item => item.eid);
      console.log(ids);
    },
    filterHandler(value, row, column) {
      console.log(value, row, column);
      const property = column["property"];
      return row[property] === value;
    },
    initSalaryList() {
      this.INIT_SALARY()
        .then(res => {})
        .catch(err => {
          this.$message.error({
            message: "初始化薪资数据异常！",
            offset: 230,
            duration: 2000
          });
        });
    },
    generateDescription(total) {
      let utilToDay = dayjs().get("date") * 2;
      // utilToDay - total > 0
      //   ? (this.salaryForm.change = (utilToDay - total) * 100.0)
      //   : null;
      return `总计打卡：${total}次，缺打: ${utilToDay - total} 次。`;
    },
    changeSalary(curV, oldV) {
      console.log(curV, oldV);
      this.salaryForm.salary = this.salaryForm.salary + curV - oldV;
    }
  },
  watch: {
    tableData(cur) {
      console.log(cur);
    }
  },
  computed: {
    getTableData() {
      return this.Get_SalaryList();
    },
    showSalary() {
      return this.salaryForm.salary + "￥";
    }
  },
  updated() {
    this.reload();
  },
  mounted() {
    setTimeout(() => {
      if (this.Get_SalaryList().length == 0) {
        this.initSalaryList();
        this.tableData = this.getTableData;
        this.drawLoading = false;
      } else {
        this.tableData = this.getTableData;
        this.drawLoading = false;
      }
    }, 2000);
  }
};
</script>
<style scoped src="@/assets/css/salaryMg.css"></style>