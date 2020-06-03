<template>
  <div v-cloak>
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
    >
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column prop="id" label="申请ID" show-overflow-tooltip></el-table-column>
      <el-table-column prop="applicant" label="申请人" show-overflow-tooltip></el-table-column>
      <el-table-column prop="auditor" label="审核人ID" show-overflow-tooltip></el-table-column>
      <el-table-column prop="type" label="申请类型" show-overflow-tooltip>
        <template slot-scope="scope">
          <div slot="reference">
            <el-tag
              class="animated"
              size="medium"
              v-if="scope.row.type== 0"
              effect="dark"
              key="enable"
            >出差</el-tag>
            <el-tag
              class="animated"
              type="warning"
              size="medium"
              v-if="scope.row.type== 1"
              effect="dark"
              key="disabled"
            >结婚</el-tag>
            <el-tag
              class="animated"
              type="danger"
              size="medium"
              v-if="scope.row.type== 2"
              effect="dark"
              key="disabled"
            >生病</el-tag>
            <el-tag
              class="animated"
              type="success"
              size="medium"
              v-if="scope.row.type== 3"
              effect="dark"
              key="disabled"
            >产假</el-tag>
            <el-tag
              class="animated"
              type="info"
              size="medium"
              v-if="scope.row.type== 4"
              effect="dark"
              key="disabled"
            >丧事</el-tag>
            <el-tag
              class="animated"
              type="info"
              size="medium"
              v-if="scope.row.type== 5"
              effect="light"
              key="disabled"
            >其他</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="requestTime" label="申请日期" show-overflow-tooltip></el-table-column>
      <!-- <el-table-column prop="startTime" label="开始日期" show-overflow-tooltip></el-table-column>
      <el-table-column prop="endTime" label="结束日期" show-overflow-tooltip></el-table-column>-->
      <el-table-column prop="reason" label="申请理由" show-overflow-tooltip effect="light"></el-table-column>
      <el-table-column prop="status" label="申请状态" show-overflow-tooltip>
        <template slot-scope="scope">
          <div slot="reference">
            <transition enter-active-class="bounceIn" leave-active-class="bounceOut" mode="out-in">
              <el-tag
                class="animated"
                type="info"
                size="medium"
                v-if="scope.row.status== 0"
                effect="light"
                key="none"
              >未审核</el-tag>
              <el-tag
                class="animated"
                type="danger"
                size="medium"
                v-if="scope.row.status== 1"
                effect="dark"
                key="disabled"
              >已驳回</el-tag>
              <el-tag
                class="animated"
                type="success"
                size="medium"
                v-if="scope.row.status== 2"
                effect="dark"
                key="ok"
              >已通过</el-tag>
            </transition>
          </div>
        </template>
      </el-table-column>

      <el-table-column align="right" width="200">
        <template slot="header">
          <el-input v-model="search" size="medium" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-tooltip :content="scope.row.status!=0?'已审核':'驳回申请'" placement="top" effect="dark">
            <el-button
              type="danger"
              icon="el-icon-close"
              circle
              plain
              :disabled="scope.row.status!=0"
              @click="checkSingle(scope.row,1)"
            ></el-button>
          </el-tooltip>

          <el-tooltip content="查看详情" placement="top" effect="dark">
            <el-button
              type="primary"
              icon="el-icon-view"
              @click="checkRequest(scope.$index, scope.row)"
              circle
              plain
            ></el-button>
          </el-tooltip>
          <el-tooltip :content="scope.row.status!=0?'已审核':'同意申请'" placement="top" effect="dark">
            <el-button
              type="success"
              icon="el-icon-check"
              circle
              plain
              :disabled="scope.row.status!=0"
              @click="checkSingle(scope.row,2)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
      <div slot="append" class="footer">
        <el-button style="margin-left:15px" size="small" @click="toggleSelection(selectRows)">反选</el-button>
        <el-button plain size="small" @click="checkInRows(1)" type="danger">批量驳回</el-button>
        <el-button plain size="small" @click="checkInRows(2)" type="success">批量通过</el-button>
        <el-pagination
          class="pager"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-size="20"
          layout="total, prev, pager, next, jumper"
          :total="tableData.length"
          :hide-on-single-page="false"
        ></el-pagination>
      </div>
    </el-table>
    <el-dialog
      title="申请详情"
      :visible.sync="addFormVisible"
      :append-to-body="true"
      top="5vh"
      width="600px"
      style="padding: 0px"
    >
      <el-form ref="detail" :disabled="detail.status!=0" :model="detail" size="medium" hide-required-asterisk>
        <el-form-item label="申请人" :label-width="addFormWidth" prop="applicant">
          <el-input
            placeholder="请输入申请人姓名"
            v-model="detail.applicant"
            :style="{width: formWidth}"
            minlength="8"
            maxlength="20"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="审核人ID" :label-width="addFormWidth" prop="auditor">
          <el-input
            placeholder="请输入审核人姓名"
            :style="{width: formWidth}"
            show-word-limit
            v-model="detail.auditor"
          ></el-input>
        </el-form-item>
        <el-form-item label="申请类型" :label-width="addFormWidth" prop="type">
          <el-select v-model="detail.type" placeholder="请选择" >
            <el-option label="出差" :value="0"></el-option>
            <el-option label="结婚" :value="1"></el-option>
            <el-option label="生病" :value="2"></el-option>
            <el-option label="产假" :value="3"></el-option>
            <el-option label="丧事" :value="4"></el-option>
            <el-option label="其他" :value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核状态" :label-width="addFormWidth" prop="status">
          <el-radio-group
            v-model="detail.status"
            text-color="#F2F6FC"
            fill="#67C23A"
          >
            <el-radio-button :label="0">未审核</el-radio-button>
            <el-radio-button :label="1">已驳回</el-radio-button>
            <el-radio-button :label="2">已通过</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="申请日期" required :label-width="addFormWidth" prop="requestTime">
          <el-form-item prop="requestTime">
            <el-date-picker
              v-model="detail.requestTime"
              type="datetime"
              placeholder="选择日期时间"
              default-time="8:00:00"
            ></el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="请假日期" required :label-width="addFormWidth">
          <el-form-item prop="restTime">
            <el-date-picker
              v-model="getRange"
              type="datetimerange"
              align="right"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['8:00:00', '18:00:00']"
            ></el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="申请理由" prop="reason" :label-width="addFormWidth">
          <el-input
            :style="{width: '85%'}"
            type="textarea"
            v-model="detail.reason"
            :autosize="true"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button plain type="danger" @click="addFormVisible = false">取 消</el-button>
        <el-button
          :type="detail.status!=0?'info':'success'"
          :disabled="detail.status!=0"
          @click="submitRequest"
        >{{ detail.status!=0?'已审核':'提交审核'}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import dayjs from "dayjs";
var isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
dayjs.extend(isSameOrBefore);
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "requestMsg",
  data() {
    let addFormWidth = "90px";
    let search = "";
    let tableData = [];
    let currentPage1 = 5;
    let currentPage2 = 5;
    let currentPage3 = 5;
    let currentPage4 = 1;
    let drawLoading = true;
    let addFormVisible = false;
    let detail = {
      id: Number,
      applicant: "",
      auditor: "",
      type: Number,
      requestTime: "",
      startTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      endTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      reason: "",
      status: Number
    };
    let selectRows = [];
    let formWidth = "80%";
    let disabled = true;
    return {
      disabled,
      formWidth,
      detail,
      addFormWidth,
      search,
      selectRows,
      addFormVisible,
      currentPage1,
      currentPage2,
      currentPage3,
      currentPage4,
      drawLoading,
      tableData
    };
  },
  methods: {
    ...mapGetters({
      Get_Requests: "hr/Get_Requests"
    }),
    ...mapMutations({
      SET_Requests: "hr/SET_Requests"
    }),
    ...mapActions({
      INIT_REQUEST: "hr/INIT_REQUEST",
      HANDLE_REQUEST: "hr/HANDLE_REQUEST"
    }),
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
      console.log(rows);
      this.selectRows = rows;
    },
    checkSingle(row, flag) {
      console.log(row);
      this.tableData.forEach(t => {
        if (row.id == t.id) {
          t.status = flag;
        }
      });
      this.upDateRows([row]);
    },
    checkInRows(flag) {
      let ids = this.selectRows.map(item => item.id);
      this.tableData.forEach(t => {
        if (ids.indexOf(t.id) != -1) {
          t.status = flag;
        }
      });
      console.log(this.selectRows);
      this.upDateRows(this.selectRows);
    },
    initRequestList() {
      this.INIT_REQUEST()
        .then(res => {
          console.log(this.Get_Requests());
          this.tableData = this.Get_Requests();
          this.drawLoading = false;
        })
        .catch(err => {
          this.$message.error({
            message: "初始化系统消息接口调用异常！",
            offset: 230,
            duration: 2000
          });
        });
      this.drawLoading = false;
    },
    checkRequest(index, row) {
      console.log(index, row);
      this.selectRows.push(row);
      this.addFormVisible = true;
      let _row = row;
      this.detail = Object.assign({}, _row);
    },
    filterHandler(value, row, column) {
      console.log(value, row, column);
      const property = column["property"];
      return row[property] === value;
    },
    submitRequest() {
      let data = this.detail;
      let k = this.tableData.findIndex(t => t.id == data.id);
      this.tableData.splice(k, 1, data);
      console.log(data);
      this.upDateRows([data]);
      // let rows = this.selectRows;
      this.addFormVisible = false;
    },
    upDateRows(rows) {
      this.HANDLE_REQUEST(rows)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  watch: {
    // Get_Requests(val) {
    //   if (val != null || val.length != 0) {
    //     console.log(val + "????");
    //     this.tableData = val;
    //   }
    // }
  },
  computed: {
    getRange() {
      return Array.of(this.detail.startTime, this.detail.endTime);
    }
  },
  mounted() {
    setTimeout(() => {
      this.initRequestList();
    }, 2000);
  }
};
</script>
<style scoped src="@/assets/css/staff.css"></style>