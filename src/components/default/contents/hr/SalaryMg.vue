<template>
  <el-card>
    <el-row type="flex" :gutter="20">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-table
          :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          style="width:100%;"
          fit
          max-height="700"
          size="medium"
          v-loading="drawLoading"
          empty-text="暂无数据"
          ref="tableData"
          @selection-change="selectedRows"
          @row-click="clickRow"
        >
          <el-table-column prop="name" label="姓名" show-overflow-tooltip></el-table-column>
          <el-table-column prop="position" label="职位" show-overflow-tooltip></el-table-column>
          <el-table-column align="right">
            <template slot="header">
              <el-input v-model="search" size="mini" placeholder="输入姓名关键字搜索" />
            </template>
          </el-table-column>
          <div slot="append" class="footer">
            <el-pagination
              class="pager"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-size="5"
              layout="total, prev, pager, next, jumper"
              :total="40"
              :hide-on-single-page="true"
            ></el-pagination>
          </div>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog title="薪资情况" :visible.sync="dialogTableVisible" append-to-body>
      <el-form :model="salaryForm" :class="{alerts:true}" label-position="left">
        <el-alert
          v-if="dialogTableVisible"
          :title="salaryForm.name"
          type="info"
          description="本月出勤情况如下："
          show-icon
          close-text="知道了"
        ></el-alert>
        <el-alert
          v-if="dialogTableVisible"
          title="本月共计："
          type="warning"
          description="出勤28天，缺勤2天，漏签5次"
          show-icon
          close-text="知道了"
        ></el-alert>
        <el-alert
          v-if="dialogTableVisible"
          title="本月薪资共计："
          type="success"
          description="6534.00￥"
          show-icon
          close-text="知道了"
        ></el-alert>
        <el-form-item prop="plus" label="加减薪水" :style="{marginTop: '20px'}">
          <el-input-number
            v-model="salaryForm.change"
            :precision="2"
            :step="0.1"
            :min="-10000"
            :max="10000"
          ></el-input-number>
        </el-form-item>
        <el-form-item prop="reason" label="理由">
          <el-input
            type="text"
            v-model="salaryForm.reason"
            placeholder="请输入调整薪水的内容"
            clearable
            maxlength="20"
            show-word-limit
            :style="{width:'50%'}"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" plain @click="submit('salaryForm')">提交修改</el-button>
          <el-button type="primary" plain>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  name: "SalaryMg",
  data() {
    let formLabelWidth = "80px";
    let salaryForm = {
      id: "",
      name: "",
      position: "",
      salary: 2500.0,
      timeLine: [],
      change: 150.0,
      reason: ""
    };
    let formInline = {
      keyword: ""
    };
    let tableData = [
      {
        id: "1",
        name: "李华",
        position: "开发部长"
      },
      {
        id: "2",
        name: "张强",
        position: "销售部长"
      },
      {
        id: "3",
        name: "张志强",
        position: "斗鱼开发组长"
      }
    ];
    let currentPage1 = 5;
    let currentPage2 = 5;
    let currentPage3 = 5;
    let currentPage4 = 4;
    let drawLoading = false;
    let dialogTableVisible = false;
    let search = "";
    return {
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
    submit(formName) {
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
      //   this.selectRows = rows;
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
    }
  }
};
</script>
<style scoped src="@/assets/css/salaryMg.css"></style>