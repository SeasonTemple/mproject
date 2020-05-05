<template>
  <div>
    <el-table
      :data="tableData"
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
      <el-table-column prop="id" label="消息ID" show-overflow-tooltip></el-table-column>
      <el-table-column prop="title" label="标题" show-overflow-tooltip></el-table-column>
      <el-table-column prop="content" label="内容" show-overflow-tooltip></el-table-column>
      <el-table-column prop="type" label="类型" show-overflow-tooltip>
        <el-tag class="animated" type="success" size="medium" effect="dark" key="enable">已启用</el-tag>
      </el-table-column>
      <el-table-column prop="publish" label="发布日期" show-overflow-tooltip></el-table-column>
      <el-table-column align="right">
        <template slot="header">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-tooltip content="查看详情" placement="top" effect="dark">
            <el-button
              type="primary"
              icon="el-icon-view"
              @click="showDialog(scope.$index, scope.row)"
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
      <div slot="append">
        <el-row type="flex" :style="{marginTop:'15px',marginBottom:'15px'}">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-button
              :style="{float:'left',marginLeft:'15px'}"
              size="small"
              @click="toggleSelection(selectRows)"
            >反选</el-button>
            <el-button :style="{float:'left'}" size="small" @click="deleteRows()" type="danger">批量删除</el-button>
            <el-button
              :style="{float:'left'}"
              size="small"
              @click="showDialog(scope.$index, scope.row)"
              type="success"
            >新建消息</el-button>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-pagination
              class="pager"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-size="5"
              layout="total, prev, pager, next, jumper"
              :total="40"
              :hide-on-single-page="true"
            ></el-pagination>
          </el-col>
        </el-row>
      </div>
    </el-table>
    <el-dialog title="新建消息" :visible.sync="dialogTableVisible" append-to-body>
      <el-row type="flex">
        <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
          <el-form :model="infoForm" label-position="left" :label-width="formLabelWidth">
            <el-form-item label="消息ID">
              <el-input v-model="infoForm.id"></el-input>
            </el-form-item>
            <el-form-item label="标题">
              <el-input v-model="infoForm.title"></el-input>
            </el-form-item>
            <el-form-item label="内容">
              <el-input v-model="infoForm.content"></el-input>
            </el-form-item>
            <el-form-item label="类型">
              <el-tag :type="infoForm.type">{{infoForm.type}}</el-tag>
            </el-form-item>
            <el-form-item label="发布日期">
              <el-input v-model="infoForm.publish"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" plain @click="submit('infoForm')">提交修改</el-button>
              <el-button type="primary" plain @click="dialogTableVisible = false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "infoMg",
  data() {
    let formLabelWidth = "80px";
    let formInline = {
      keyword: ""
    };
    let tableData = [
      {
        id: "11",
        title: "测试",
        content: "·······",
        type: "info",
        publish: "2019-12-31"
      }
    ];
    let currentPage1 = 5;
    let currentPage2 = 5;
    let currentPage3 = 5;
    let currentPage4 = 4;
    let drawLoading = false;
    let dialogTableVisible = false;
    let infoForm = {
      id: "",
      title: "",
      content: "",
      type: "",
      publish: ""
    };
    return {
      formLabelWidth,
      dialogTableVisible,
      infoForm,
      formInline,
      currentPage1,
      currentPage2,
      currentPage3,
      currentPage4,
      tableData,
      drawLoading
    };
  },
  methods: {
    submit(formName) {
      this.$message.success({
        message: "修改成功",
        offset: 130
      });
      setTimeout(() => {
        this.dialogTableVisible = false;
      }, 1500);
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
    },
    showDialog(index, row) {
      let { id, name, position } = row;
      Object.assign(this.infoForm, row);
      console.log(this.infoForm);
      this.dialogTableVisible = true;
    }
  }
};
</script>