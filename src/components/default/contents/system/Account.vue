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
        >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column prop="id" label="角色ID" show-overflow-tooltip></el-table-column>
          <el-table-column prop="roleName" label="角色名" show-overflow-tooltip></el-table-column>
          <el-table-column prop="state" label="状态" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-tooltip :content="scope.row.state == 0?'已禁用':'已启用'" placement="top">
                <el-switch
                  v-model="scope.row.state"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-value="1"
                  inactive-value="0"
                ></el-switch>
              </el-tooltip>
            </template>
            <!-- <template slot-scope="scope">
              <transition
                enter-active-class="bounceIn"
                leave-active-class="bounceOut"
                mode="out-in"
              >
                <el-tag
                  class="animated"
                  type="success"
                  size="medium"
                  v-if="scope.row.state==1"
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
            </template>-->
          </el-table-column>
          <el-table-column prop="limitTime" label="有效时间(分钟)" show-overflow-tooltip></el-table-column>
          <el-table-column align="right">
            <template slot="header">
              <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
            </template>
            <template slot-scope="scope">
              <el-tooltip content="编辑" placement="top" effect="dark">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  @click="clickRow(scope.$index, scope.row)"
                  circle
                  plain
                ></el-button>
              </el-tooltip>
              <el-tooltip content="删除" placement="top" effect="dark">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deleteRow(scope.$index, scope.row)"
                  circle
                  plain
                ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
          <div slot="append" class="footer">
            <el-row type="flex">
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-button
                  :style="{float:'left'}"
                  size="small"
                  @click="toggleSelection(selectRows)"
                >反选</el-button>
                <el-button
                  :style="{float:'left'}"
                  size="small"
                  @click="deleteRows()"
                  type="danger"
                >批量删除</el-button>
                <el-button
                  :style="{float:'left'}"
                  size="small"
                  @click="deleteRows()"
                  type="success"
                >添加角色</el-button>
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
      </el-col>
    </el-row>
    <el-dialog title="角色编辑" :visible.sync="dialogTableVisible" append-to-body>
      <el-row type="flex">
        <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
          <el-form :model="roleForm" label-position="left" :label-width="formLabelWidth">
            <el-form-item label="角色名称">
              <el-radio-group v-model="roleForm.roleName" size="medium">
                <el-radio-button label="USER">用户</el-radio-button>
                <el-radio-button label="CUSTOM">自定义</el-radio-button>
                <el-radio-button label="ADMIN">管理员</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="角色状态">
              <el-tooltip :content="roleForm.state == 0?'已禁用':'已启用'" placement="top">
                <el-switch
                  v-model="roleForm.state"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-value="1"
                  inactive-value="0"
                ></el-switch>
              </el-tooltip>
            </el-form-item>
            <el-form-item label="有效时限">
              <el-input v-model="roleForm.limitTime"></el-input>
            </el-form-item>
            <el-form-item label="权限分配">
              <el-checkbox-group v-model="checkedAuthority" @change="handleCheckedAuthChange">
                <el-checkbox v-for="auth in authList" :label="auth" :key="auth">{{auth}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item>
              <el-button type="success" plain @click="submit()">提交修改</el-button>
              <el-button type="primary" plain>取消</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-dialog>
  </el-card>
</template>
<script>
export default {
  name: "account",
  data() {
    let formLabelWidth = "80px";
    let checkedAuthority = [];
    let authList = [
      "职工管理",
      "职能管理",
      "申请管理",
      "薪资管理",
      "角色管理",
      "消息管理"
    ];
    let roleForm = {
      id: 1,
      roleName: "USER",
      state: 1,
      limitTime: "0"
    };
    let formInline = {
      keyword: ""
    };
    let tableData = [
      {
        id: "1",
        roleName: "USER",
        state: 1,
        limitTime: "0"
      },
      {
        id: "2",
        roleName: "ADMIN",
        state: 1,
        limitTime: "0"
      },
      {
        id: "3",
        roleName: "CUSTOM",
        state: 1,
        limitTime: "30"
      }
    ];
    let currentPage1 = 5;
    let currentPage2 = 5;
    let currentPage3 = 5;
    let currentPage4 = 4;
    let drawLoading = false;
    let dialogTableVisible = false;
    let search = "";
    let selectRows = [];
    return {
      authList,
      checkedAuthority,
      selectRows,
      formLabelWidth,
      roleForm,
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
    submit() {
      this.$message.success({
        message: "修改成功",
        offset: 130
      })
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
      console.log(rows);
      this.selectRows = rows;
    },
    clickRow(index, row) {
      //   console.log(row);
      console.log(this.roleForm);
      let { id, name, position } = row;
      Object.assign(this.roleForm, row);
      console.log(this.roleForm);
      this.dialogTableVisible = true;
    },
    deleteRows() {
      let ids = this.selectRows.map(item => item.eid);
      console.log(ids);
    },
    handleCheckedAuthChange(value) {
      console.log(value);
    }
  }
};
</script>