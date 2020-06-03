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
                  :active-value="1"
                  :inactive-value="0"
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
          <!-- <el-table-column prop="limitTime" label="有效时间(分钟)" show-overflow-tooltip></el-table-column> -->
          <el-table-column align="left" label="操作">
            <!-- <template slot="header">
              <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
            </template>-->
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
                  :page-size="3"
                  layout="total, prev, pager, next, jumper"
                  :total="tableData.length"
                  :hide-on-single-page="false"
                ></el-pagination>
              </el-col>
            </el-row>
          </div>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog title="角色编辑" :visible.sync="dialogTableVisible" width="500px" append-to-body>
      <el-row type="flex">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <el-form :model="roleForm" label-position="left" :label-width="formLabelWidth">
            <el-form-item label="角色名称">
              <el-input v-model="roleForm.roleName" size="medium" :style="{width: '50%'}"></el-input>
              <!-- <el-radio-button label="USER">用户</el-radio-button>
                <el-radio-button label="CUSTOM">自定义</el-radio-button>
              <el-radio-button label="ADMIN">管理员</el-radio-button>-->
            </el-form-item>
            <el-form-item label="角色状态">
              <el-tooltip :content="roleForm.state == 0?'已禁用':'已启用'" placement="top">
                <el-switch
                  v-model="roleForm.state"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0"
                ></el-switch>
              </el-tooltip>
            </el-form-item>
            <!-- <el-form-item label="有效时限">
              <el-input v-model="roleForm.limitTime"></el-input>
            </el-form-item>-->
            <el-form-item label="权限分配" >
              <!-- <el-checkbox-group v-model="checkedAuthority" @change="handleCheckedAuthChange">
                <el-checkbox v-for="auth in authList" :label="auth" :key="auth">{{auth}}</el-checkbox>
              </el-checkbox-group>-->
              <el-cascader-panel :options="options" :style="{height: 'fix-content'}" :props="{multiple:true}"></el-cascader-panel>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button type="success" plain @click="submit()">提交修改</el-button>
        <el-button type="primary" plain @click="dialogTableVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "account",
  inject: ["reload"],
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
    let permissions = [
      {
        label: "查询",
        value: "[QUERY]"
      },
      {
        label: "编辑",
        value: "[EDIT]"
      },
      {
        label: "添加",
        value: "[ADD]"
      },
      {
        label: "删除",
        value: "[DELETE]"
      },{
        label: "上传",
        value: "[UPLOAD]"
      },
      {
        label: "下载",
        value: "[DOWNLOAD]"
      }
    ];
    let options = [
      {
        label: "职工管理",
        value: "1",
        children: [
          {
            label: "查询",
            value: "[QUERY]"
          },
          {
            label: "编辑",
            value: "[EDIT]"
          },
          {
            label: "添加",
            value: "[ADD]"
          },
          {
            label: "删除",
            value: "[DELETE]"
          }
        ]
      },
      {
        label: "职能管理",
        value: "2",
        children: [
          {
            label: "查询",
            value: "[QUERY]"
          },
          {
            label: "编辑",
            value: "[EDIT]"
          },
          {
            label: "添加",
            value: "[ADD]"
          },
          {
            label: "删除",
            value: "[DELETE]"
          }
        ]
      },
      {
        label: "申请管理",
        value: "4",
        children: [
          {
            label: "查询",
            value: "[QUERY]"
          },
          {
            label: "编辑",
            value: "[EDIT]"
          },
          {
            label: "添加",
            value: "[ADD]"
          },
          {
            label: "删除",
            value: "[DELETE]"
          }
        ]
      },
      {
        label: "薪资管理",
        value: "5",
        children: [
          {
            label: "查询",
            value: "[QUERY]"
          },
          {
            label: "编辑",
            value: "[EDIT]"
          },
          {
            label: "添加",
            value: "[ADD]"
          },
          {
            label: "删除",
            value: "[DELETE]"
          }
        ]
      },
      {
        label: "角色管理",
        value: "6",
        children: [
          {
            label: "查询",
            value: "[QUERY]"
          },
          {
            label: "编辑",
            value: "[EDIT]"
          },
          {
            label: "添加",
            value: "[ADD]"
          },
          {
            label: "删除",
            value: "[DELETE]"
          }
        ]
      },
      {
        label: "通知管理",
        value: "7",
        children: [
          {
            label: "查询",
            value: "[QUERY]"
          },
          {
            label: "编辑",
            value: "[EDIT]"
          },
          {
            label: "添加",
            value: "[ADD]"
          },
          {
            label: "删除",
            value: "[DELETE]"
          }
        ]
      }
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
    let tableData = [];
    let currentPage1 = 5;
    let currentPage2 = 5;
    let currentPage3 = 5;
    let currentPage4 = 1;
    let drawLoading = true;
    let dialogTableVisible = false;
    let search = "";
    let selectRows = [];
    return {
      options,
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
    ...mapGetters({
      Get_Roles: "system/Get_Roles"
    }),
    ...mapMutations({
      SET_Roles: "system/SET_Roles"
    }),
    ...mapActions({
      INIT_ROLES: "system/INIT_ROLES",
      ADD_ROLE: "system/ADD_ROLE",
      MODIFY_ROLE: "system/MODIFY_ROLE",
      DELETE_ROLES: "system/DELETE_ROLES"
    }),
    submit() {
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
    deleteRow(index, rows) {
      console.log(index, rows);
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        confirmButtonClass: "color:#67C23A",
        cancelButtonClass: "color:#F56C6C",
        type: "warning"
      }).then(() => {
        let ids = [];
        ids.push(rows.id);
        console.log(ids);
        // this.DELETE_TableData(ids)
        //   .then(res => {
        this.$message.success({
          message: "删除成功！",
          offset: 150
        });
        //   })
        //   .catch(err => {
        //     this.$message.error({
        //       message: err.data.msg,
        //       offset: 150
        //     });
        //   });
        this.tableData.splice(index, 1);
      });
    },
    deleteRows() {
      let ids = this.selectRows.map(item => item.id);
      console.log(ids);
      if (ids.length < 1) {
        this.$message.error({
          message: "请选择至少一项进行操作！",
          offset: 150
        });
      } else {
        this.$confirm("确定要删除吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          confirmButtonClass: "color:#67C23A",
          cancelButtonClass: "color:#F56C6C",
          type: "warning"
        }).then(() => {
          let tag = this.tableData.filter(t => ids.indexOf(t.id) != -1);
          this.tableData.splice(tag, tag.length);
          console.log(tag.map(t => t.id));
          // this.DELETE_TableData(tag.map(t => t.id))
          //   .then(res => {
          this.$message.success({
            message: "删除成功！",
            offset: 150
          });
          // })
          // .catch(err => {
          //   this.$message.error({
          //     message: err.data.msg,
          //     offset: 150
          //   });
          // });
        });
      }
    },
    handleCheckedAuthChange(value) {
      console.log(value);
    },
    initData() {
      this.INIT_ROLES()
        .then(res => {
          this.tableData = this.getTableData;
          this.drawLoading = false;
        })
        .catch(err => {
          this.$message.error({
            message: "初始化角色数据异常！",
            offset: 200,
            duration: 2000
          });
        });
    }
  },
  computed: {
    getTableData() {
      return this.Get_Roles();
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
      if (this.Get_Roles().length == 0) {
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