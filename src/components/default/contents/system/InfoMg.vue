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
      <el-table-column prop="id" width="100" label="消息ID" show-overflow-tooltip></el-table-column>
      <el-table-column prop="title" label="标题" show-overflow-tooltip></el-table-column>
      <el-table-column prop="content" label="内容" show-overflow-tooltip></el-table-column>
      <el-table-column prop="type" label="类型" show-overflow-tooltip>
        <template slot-scope="scope">
          <div slot="reference">
            <el-tag
              class="animated"
              :type="scope.row.type"
              size="medium"
              effect="dark"
              key="enable"
            >{{scope.row.type == 'info'?'通知':'警告'}}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="timeStamp" label="发布日期" show-overflow-tooltip></el-table-column>
      <el-table-column align="right">
        <template slot="header">
          <el-input v-model="search" size="small" placeholder="输入关键字搜索" />
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
          <el-tooltip content="删除通知" placement="top" effect="dark">
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
              @click="showDialog()"
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
              :total="tableData.length"
              :hide-on-single-page="false"
            ></el-pagination>
          </el-col>
        </el-row>
      </div>
    </el-table>
    <el-dialog title="消息发布" :visible.sync="dialogTableVisible" width="600px" append-to-body>
      <el-row type="flex">
        <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
          <el-form :model="infoForm" label-position="left" :label-width="formLabelWidth">
            <!-- <el-form-item label="消息ID">
              <el-input v-model="infoForm.id"></el-input>
            </el-form-item>-->
            <el-form-item label="标题">
              <el-input v-model="infoForm.title"></el-input>
            </el-form-item>
            <el-form-item label="内容">
              <el-input v-model="infoForm.content"></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="type">
              <el-radio-group v-model="infoForm.type" text-color="#F2F6FC" fill="#67C23A">
                <el-radio-button label="info">通知</el-radio-button>
                <el-radio-button label="warning">提醒</el-radio-button>
                <el-radio-button label="error">警告</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="发布日期">
              <el-date-picker
                :style="{width: formWidth}"
                v-model="infoForm.timeStamp"
                value-format="YYYY-MM-DD"
                type="date"
                placeholder="请选择发布日期"
              ></el-date-picker>
              <!-- <el-input v-model="infoForm.timeStamp"></el-input> -->
            </el-form-item>
            <el-form-item>
              <el-button type="success" plain @click="submit('infoForm')">发布</el-button>
              <el-button type="primary" plain @click="dialogTableVisible = false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import dayjs from "dayjs";
var isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
dayjs.extend(isSameOrBefore);
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "infoMg",
  inject: ["reload"],
  data() {
    let formLabelWidth = "80px";
    let formInline = {
      keyword: ""
    };
    let selectRows = [];
    let tableData = [];
    let search = "";
    let currentPage1 = 5;
    let currentPage2 = 5;
    let currentPage3 = 5;
    let currentPage4 = 4;
    let drawLoading = true;
    let dialogTableVisible = false;
    let infoForm = {
      id: "",
      title: "",
      content: "",
      type: "warning",
      timeStamp: dayjs().format("YYYY-MM-DD")
    };
    let formWidth = "100%";
    return {
      search,
      selectRows,
      formWidth,
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
    ...mapGetters({
      Get_InfoList: "system/Get_InfoList"
    }),
    ...mapMutations({
      SET_InfoList: "system/SET_InfoList"
    }),
    ...mapActions({
      INIT_INFO: "system/INIT_INFO",
      ADD_INFO: "system/ADD_INFO",
      MODIFY_INFO: "system/MODIFY_INFO",
      DELETE_INFO: "system/DELETE_INFO"
    }),
    submit(formName) {
      setTimeout(() => {
        this.dialogTableVisible = false;
        this.$message.success({
          message: "提交成功！",
          offset: 150
        });
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
    deleteRow(index, rows) {
      console.log(index, rows);
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        confirmButtonClass: "color:#67C23A",
        cancelButtonClass: "color:#F56C6C",
        type: "warning"
      })
        .then(() => {
          let ids = [];
          ids.push(rows.id);
          console.log(ids);
          this.$message.success({
            message: "删除成功！",
            offset: 150
          });
          this.tableData.splice(index, 1);
        })
        .catch(err => {});
    },
    deleteRows() {
      let ids = this.selectRows.map(item => item.id);
      console.log(ids);
    },
    showDialog(index, row) {
      if (index >= 0) {
        let { id, name, position } = row;
        Object.assign(this.infoForm, row);
        console.log(this.infoForm);
      }
      this.dialogTableVisible = true;
    },
    initData() {
      this.INIT_INFO()
        .then(res => {
          this.tableData = this.getTableData;
          this.drawLoading = false;
        })
        .catch(err => {
          this.$message.error({
            message: "初始化消息数据异常！",
            offset: 200,
            duration: 2000
          });
        });
    }
  },
  computed: {
    getTableData() {
      return this.Get_InfoList();
    }
  },
  watch: {
    tableData(cur) {
      console.log(cur);
    }
  },
  updated() {
    this.reload();
  },
  mounted() {
    setTimeout(() => {
      if (this.Get_InfoList().length == 0) {
        this.initData();
      } else {
        this.tableData = this.getTableData;
        this.drawLoading = false;
      }
      console.log(this.tableData);
    }, 2000);
  }
};
</script>