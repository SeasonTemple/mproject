<template>
  <div class="temp" v-cloak>
    <el-row type="flex">
      <el-col :span="24">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="所属部门">
            <el-input v-model="formInline.dep" placeholder="所属部门"></el-input>
          </el-form-item>
          <el-form-item label="所属项目组">
            <el-input v-model="formInline.group" placeholder="所属项目组"></el-input>
          </el-form-item>
          <el-form-item label="参与项目">
            <el-select v-model="formInline.project" placeholder="参与项目">
              <el-option label="项目一" value="shanghai"></el-option>
              <el-option label="项目二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="个人信息">
            <el-input v-model="formInline.group" placeholder="使用个人信息查询"></el-input>
          </el-form-item>
          <el-button plain type="primary" @click="onSubmit">查询</el-button>
          <el-button plain type="success" @click="onSubmit">添加</el-button>
        </el-form>
      </el-col>
    </el-row>
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
      <el-table-column type="expand">
        <template slot-scope="scope">
          <transition
            appear
            appear-active-class="zoomIn"
            enter-active-class="fadeIn"
            leave-class="fadeOut"
            :duration="{enter:1000}"
          >
            <el-form label-position="left" inline class="demo-table-expand animated">
              <el-form-item label="职工号">
                <span>{{ scope.row.eid }}</span>
              </el-form-item>
              <el-form-item label="用户名">
                <span>{{ scope.row.username }}</span>
              </el-form-item>
              <el-form-item label="密码">
                <span>{{ scope.row.password }}</span>
              </el-form-item>
              <el-form-item label="真实姓名">
                <span>{{ scope.row.name }}</span>
              </el-form-item>
              <el-form-item label="性别">
                <span>{{ scope.sex==0?'女':'男' }}</span>
              </el-form-item>
              <el-form-item label="角色">
                <el-tag size="medium" v-if="scope.row.role==0" effect="dark">用户</el-tag>
                <el-tag type="warning " size="medium" v-else effect="dark">管理员</el-tag>
              </el-form-item>
              <el-form-item label="账户状态">
                <transition
                  enter-active-class="bounceIn"
                  leave-active-class="bounceOut"
                  mode="out-in"
                >
                  <el-tag
                    class="animated"
                    type="success"
                    size="medium"
                    v-if="scope.row.roleStatus==1"
                    effect="dark"
                    key="enable"
                  >已启用</el-tag>
                  <el-tag
                    class="animated"
                    type="danger"
                    size="medium"
                    v-else
                    effect="dark"
                    key="disabled"
                  >已禁用</el-tag>
                </transition>
              </el-form-item>
              <el-form-item label="手机号">
                <span>{{ scope.row.phone }}</span>
              </el-form-item>
              <el-form-item label="邮箱">
                <span>{{ scope.row.email }}</span>
              </el-form-item>
              <el-form-item label="籍贯">
                <span>{{ scope.row.address }}</span>
              </el-form-item>
              <el-form-item label="身份证号">
                <span>{{ scope.row.idNum }}</span>
              </el-form-item>
              <el-form-item label="入职日期">
                <span>{{ scope.row.enterTime }}</span>
              </el-form-item>
            </el-form>
          </transition>
        </template>
      </el-table-column>
      <el-table-column prop="eid" label="职工号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="username" label="账号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="password" label="密码" show-overflow-tooltip></el-table-column>
      <!-- <el-table-column prop="name" label="真实姓名" show-overflow-tooltip>
      </el-table-column>-->
      <el-table-column label="角色" show-overflow-tooltip>
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium" v-if="scope.row.role==0" effect="dark">用户</el-tag>
            <el-tag type="warning " size="medium" v-else effect="dark">管理员</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="账户状态" show-overflow-tooltip>
        <template slot-scope="scope">
          <div slot="reference">
            <el-tooltip :content="scope.row.roleStatus == 0?'已禁用':'已启用'" placement="top">
              <el-switch
                v-model="scope.row.roleStatus"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-value="1"
                inactive-value="0"
              ></el-switch>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip content="详情" placement="top" effect="dark">
            <el-button @click="toogleExpand(scope.row)" icon="el-icon-thumb" circle></el-button>
          </el-tooltip>
          <el-tooltip content="编辑" placement="top" effect="dark">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="editUser(scope.$index, scope.row)"
              circle
            ></el-button>
          </el-tooltip>
          <el-tooltip content="删除" placement="top" effect="dark">
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="deleteRow(scope.$index, scope.row)"
              circle
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
      <div slot="append" class="footer">
        <el-button style size="small" @click="toggleSelection(selectRows)">反选</el-button>
        <el-button style size="small" @click="deleteRows" type="danger">批量删除</el-button>
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

    <el-dialog
      title="编辑用户"
      :visible.sync="editFormVisible"
      :append-to-body="true"
      top="5vh"
      width="700px"
    >
      <el-form :model="editForm">
        <el-form-item label="活动名称" :label-width="editFormWidth">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="活动名称" :label-width="editFormWidth">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="活动名称" :label-width="editFormWidth">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="活动名称" :label-width="editFormWidth">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="活动名称" :label-width="editFormWidth">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "staff",
  data() {
    let drawLoading = true;
    let editFormVisible = false;
    let editFormWidth = "90px";
    let selectRows = [];
    let editForm = {
      eid: "",
      username: "",
      password: "",
      name: "",
      sex: "",
      role: "",
      roleStatus: "",
      phone: "",
      email: "",
      address: "",
      idNum: "",
      enterTime: ""
    };
    let tableData = [
      // {
      //   eid: "5123123",
      //   username: "1231231231",
      //   password: "Zc42230",
      //   name: "王小虎",
      //   sex: "1",
      //   role: "1",
      //   roleStatus: "1",
      //   phone: "17369492851",
      //   email: "158133959@163.com",
      //   address: "上海市普陀区金沙江路1518号",
      //   idNum: "51025198110120212",
      //   enterTime: "2016-05-02"
      // },
      {
        eid: "4213232",
        username: "3213123123",
        password: "z89381",
        name: "李茂杉",
        sex: "1",
        role: "1",
        roleStatus: "1",
        phone: "17369492851",
        email: "158133959@163.com",
        address: "上海市普陀区金沙江路1518号",
        idNum: "51025198110120212",
        enterTime: "2016-05-02"
      }
    ];
    return {
      selectRows,
      editFormWidth,
      editForm,
      drawLoading,
      editFormVisible,
      formInline: {
        dep: "",
        group: "",
        project: ""
      },
      tableData,
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    // toogleExpand(row) {
    //   console.log(this.$refs.tableData);
    // },
    toogleExpand(row) {
      let $table = this.$refs.tableData;
      this.tableData.map(item => {
        if (row.id != item.id) {
          $table.toggleRowExpansion(item, false);
        }
      });
      $table.toggleRowExpansion(row);
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
          this.$message.success({
            message: "删除成功！",
            offset: 130
          });
          this.tableData.splice(index, 1);
        })
        .catch(e => {
          this.$message.info({
            message: "操作取消！",
            offset: 130
          });
        });
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    sexFormatter(row, column) {
      return row.sex == 0 ? "女" : "男";
    },
    editUser(index, row) {
      console.log(index, row);
      this.editFormVisible = true;
      let _row = row;
      this.editForm = Object.assign({}, _row);
    },
    toggleSelection(rows) {
      if (rows) {
        this.tableData.forEach(row => {
          if (rows.indexOf(row) == -1) {
            this.$refs.tableData.toggleRowSelection(row);
          } else {
            this.$refs.tableData.toggleRowSelection(row,false);
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
  },
  mounted: function() {
    setTimeout(() => {
      this.drawLoading = false;
    }, 2000);
  }
};
</script>
<style scoped src="@/assets/css/staff.css"></style>