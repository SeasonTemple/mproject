<template>
  <div>
    <!-- <el-row type="flex">
      <el-col :span="24">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item prop="search">
            <el-input v-model="formInline.search" placeholder="模糊查询"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button plain type="info" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>-->
    <el-table
      :data="tableData.filter(data => !search || data.name == search)"
      style="width:100%;"
      fit
      max-height="700"
      size="medium"
      v-loading="drawLoading"
      empty-text="暂无数据"
      ref="tableData"
      @selection-change="selectedRows"
    >
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column prop="requestor" label="申请人" show-overflow-tooltip></el-table-column>
      <el-table-column prop="reqTime" label="申请日期" show-overflow-tooltip></el-table-column>
      <el-table-column prop="restTime" label="请假日期" show-overflow-tooltip></el-table-column>
      <el-table-column prop="reason" label="申请理由" show-overflow-tooltip effect="light"></el-table-column>
      <el-table-column prop="state" label="申请状态" show-overflow-tooltip>
        <el-tooltip :content="tableData.state == 0?'申请驳回':'审核通过'" placement="top">
          <el-switch
            v-model="tableData.state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="1"
            inactive-value="0"
          ></el-switch>
        </el-tooltip>
      </el-table-column>

      <el-table-column align="right" width="200">
        <template slot="header">
          <el-input v-model="search" size="medium" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-tooltip content="同意申请" placement="top" effect="dark">
            <el-button
              type="success"
              @click="toggleSelection(scope.row)"
              icon="el-icon-check"
              circle
              plain
            ></el-button>
          </el-tooltip>
          <el-tooltip content="查看详情" placement="top" effect="dark">
            <el-button
              type="primary"
              icon="el-icon-view"
              @click="editUser(scope.$index, scope.row)"
              circle
              plain
            ></el-button>
          </el-tooltip>
          <el-tooltip content="驳回申请" placement="top" effect="dark">
            <el-button
              type="danger"
              icon="el-icon-close"
              @click="deleteRow(scope.$index, scope.row)"
              circle
              plain
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
      <div slot="append" class="footer">
        <el-button style="margin-left:15px" size="small" @click="toggleSelection(selectRows)">反选</el-button>
        <el-button style size="small" @click="deleteRows()" type="danger">批量删除</el-button>
        <el-pagination
          class="pager"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-size="20"
          layout="total, prev, pager, next, jumper"
          :total="1"
          :hide-on-single-page="false"
        ></el-pagination>
      </div>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "requestMsg",
  data() {
    let search = "";
    let tableData = [
      {
        requestor: "李华",
        reqTime: "2019-12-31",
        restTime: "2020-01-01--2020-01-07",
        reason: "接项目组安排集体出差一周",
        state: 0
      }
    ];
    let currentPage1 = 5;
    let currentPage2 = 5;
    let currentPage3 = 5;
    let currentPage4 = 1;
    let drawLoading = false;
    return {
      search,
      currentPage1,
      currentPage2,
      currentPage3,
      currentPage4,
      tableData,
      drawLoading
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
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
      // console.log(rows)
      this.selectRows = rows;
    },
    deleteRows() {
      let ids = this.selectRows.map(item => item.eid);
      console.log(ids);
    }
  }
};
</script>
<style scoped src="@/assets/css/staff.css"></style>