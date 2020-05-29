<template>
  <div class="temp" v-cloak>
    <el-row type="flex">
      <el-col :span="24">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="所属部门">
            <el-select v-model="formInline.dep" placeholder="所属部门" :loading="loading" clearable>
              <el-option
                v-for="dep in options.departments"
                :label="dep.depName + '部'"
                :value="dep.id"
                :key="dep.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属项目组">
            <el-select v-model="formInline.group" :loading="loading" placeholder="所属项目组" clearable>
              <el-option
                v-for="group in options.groups"
                :label="group.groupName"
                :value="group.id"
                :key="group.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="参与项目">
            <el-select v-model="formInline.project" :loading="loading" placeholder="参与项目" clearable>
              <el-option
                v-for="project in options.projects"
                :label="project.projectName"
                :value="project.id"
                :key="project.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="个人信息">
            <el-input v-model="formInline.userDetail" placeholder="使用个人信息查询"></el-input>
          </el-form-item>
          <el-button plain type="primary" @click="onSubmit">查询</el-button>
          <el-button plain type="success" @click="toAddUser">添加</el-button>
        </el-form>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      style="width:100%;"
      fit
      :filter-method="filterHandler"
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
            leave-active-class="fadeOut"
            :duration="{enter:1000}"
          >
            <el-form label-position="left" inline class="demo-table-expand animated">
              <el-form-item label="职工号">
                <span>{{ scope.row.id }}</span>
              </el-form-item>
              <el-form-item label="用户名">
                <span>{{ scope.row.userName }}</span>
              </el-form-item>
              <el-form-item label="密码">
                <span>{{ scope.row.passWord }}</span>
              </el-form-item>
              <el-form-item label="真实姓名">
                <span>{{ scope.row.realName }}</span>
              </el-form-item>
              <el-form-item label="性别">
                <span>{{ scope.row.sex == 1?'男':'女' }}</span>
              </el-form-item>
              <el-form-item label="年龄">
                <span>{{ scope.row.age }}</span>
              </el-form-item>
              <el-form-item label="角色">
                <el-tag size="medium" v-if="scope.row.roleId==0" effect="dark">用户</el-tag>
                <el-tag type="warning" size="medium" v-else effect="dark">管理员</el-tag>
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
                    v-if="scope.row.status==1"
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
              <el-form-item label="职位">
                <span>{{ scope.row.position }}</span>
              </el-form-item>
              <el-form-item label="手机号">
                <span>{{ scope.row.phone }}</span>
              </el-form-item>
              <el-form-item label="邮箱">
                <span>{{ scope.row.email }}</span>
              </el-form-item>
              <el-form-item label="籍贯">
                <span>{{ scope.row.origin }}</span>
              </el-form-item>
              <el-form-item label="身份证号">
                <span>{{ scope.row.idNumber }}</span>
              </el-form-item>
              <el-form-item label="入职日期">
                <span>{{ formateTime(scope.row.createTime) }}</span>
              </el-form-item>
            </el-form>
          </transition>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="职工号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="userName" label="账号" show-overflow-tooltip></el-table-column>
      <!-- <el-table-column prop="passWord" label="密码" show-overflow-tooltip></!-->
      -->
      <!-- <el-table-column prop="realName" label="真实姓名" show-overflow-tooltip>
      </el-table-column>-->
      <el-table-column label="角色" show-overflow-tooltip>
        <template slot-scope="scope">
          <div slot="reference" class="realName-wrapper">
            <el-tag size="medium" v-if="scope.row.roleId==0" effect="dark">用户</el-tag>
            <el-tag type="warning " size="medium" v-else effect="dark">管理员</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="账户状态" show-overflow-tooltip>
        <template slot-scope="scope">
          <div slot="reference">
            <el-tag
              class="animated"
              type="success"
              size="medium"
              v-if="scope.row.status==1"
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
        <el-button
          plain
          :style="{marginLeft: '5px'}"
          size="small"
          @click="toggleSelection(selectRows)"
          type="primary"
        >反选</el-button>
        <el-button
          plain
          :style="{marginLeft: '5px'}"
          size="small"
          @click="deleteRows"
          type="danger"
        >批量删除</el-button>
        <el-pagination
          class="pager"
          @current-change="handleCurrentChange"
          :current-page="currentPage1"
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
      width="600px"
      style="padding: 0px"
    >
      <el-form :model="editForm" size="medium">
        <!-- <el-form-item label="职工号" :label-width="editFormWidth">
          <el-input v-model="editForm.id"></el-input>
        </el-form-item>-->
        <el-form-item label="用户名" :label-width="editFormWidth">
          <el-input
            placeholder="请输入用户名"
            v-model="editForm.userName"
            :style="{width: formWidth}"
            minlength="8"
            maxlength="20"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="editFormWidth">
          <el-input
            placeholder="请输入密码"
            :style="{width: formWidth}"
            minlength="8"
            maxlength="20"
            show-word-limit
            show-password
            v-model="editForm.passWord"
          ></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" :label-width="editFormWidth">
          <el-input
            placeholder="请输入真实姓名"
            v-model="editForm.realName"
            :style="{width: formWidth}"
            minlength="2"
            maxlength="10"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-row :sm="24" :md="24" :lg="24" :xs="24" :xl="24">
          <el-col :sm="10" :md="10" :lg="10" :xs="10" :xl="10">
            <el-form-item label="性别" :label-width="editFormWidth">
              <el-radio-group
                size="small"
                v-model.number="editForm.sex"
                text-color="#F2F6FC"
                fill="#67C23A"
              >
                <el-radio-button :label="1">男</el-radio-button>
                <el-radio-button :label="0">女</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :sm="14" :md="14" :lg="14" :xs="14" :xl="14">
            <el-form-item label="年龄">
              <el-input-number size="mini" v-model="editForm.age" placeholder="请输入年龄"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :sm="24" :md="24" :lg="24" :xs="24" :xl="24">
          <el-col :sm="10" :md="10" :lg="10" :xs="10" :xl="10">
            <el-form-item label="账户状态" :label-width="editFormWidth">
              <transition
                enter-active-class="bounceIn"
                leave-active-class="bounceOut"
                mode="out-in"
              >
                <el-tooltip
                  :content="editForm.status == 1 ?'已启用':'已禁用'"
                  effect="light"
                  placement="top"
                >
                  <el-switch
                    v-model="editForm.status"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    :active-value="1"
                    :inactive-value="0"
                  ></el-switch>
                </el-tooltip>
              </transition>
            </el-form-item>
          </el-col>
          <el-col :sm="14" :md="14" :lg="14" :xs="14" :xl="14">
            <el-form-item label="角色">
              <el-radio-group
                size="small"
                v-model.number="editForm.roleId"
                text-color="#F2F6FC"
                fill="#67C23A"
              >
                <el-radio-button :label="1">用户</el-radio-button>
                <el-radio-button :label="2">管理员</el-radio-button>
                <el-radio-button :label="3">自定义</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="职位" :label-width="editFormWidth">
          <el-input v-model="editForm.position" :style="{width: formWidth}" placeholder="请输入职位"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="editFormWidth">
          <el-input
            placeholder="请输入手机号"
            v-model="editForm.phone"
            :style="{width: formWidth}"
            minlength="11"
            maxlength="11"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="editFormWidth">
          <el-input v-model="editForm.email" :style="{width: formWidth}" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="籍贯" :label-width="editFormWidth">
          <el-input v-model="editForm.origin" :style="{width: formWidth}" placeholder="请输入籍贯"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" :label-width="editFormWidth">
          <el-input
            placeholder="请输入身份证号"
            v-model="editForm.idNumber"
            :style="{width: formWidth}"
            minlength="18"
            maxlength="18"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="入职日期" :label-width="editFormWidth">
          <el-date-picker
            v-model="editForm.createTime"
            value-format="yyyy-mm-dd"
            type="date"
            placeholder="请选择入职日期"
            :style="{width: formWidth}"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button plain type="danger" @click="editFormVisible = false">取 消</el-button>
        <el-button type="success" @click="submitEdit">提交修改</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="添加用户"
      :visible.sync="addFormVisible"
      :append-to-body="true"
      top="5vh"
      width="600px"
      style="padding: 0px"
    >
      <el-form ref="addForm" :model="addForm" size="medium">
        <el-form-item label="用户名" :label-width="editFormWidth" prop="userName">
          <el-input
            placeholder="请输入用户名"
            v-model="addForm.userName"
            :style="{width: formWidth}"
            minlength="8"
            maxlength="20"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="editFormWidth" prop="passWord">
          <el-input
            placeholder="请输入密码"
            :style="{width: formWidth}"
            minlength="8"
            maxlength="20"
            show-word-limit
            show-password
            v-model="addForm.passWord"
          ></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" :label-width="editFormWidth" prop="realName">
          <el-input
            placeholder="请输入真实姓名"
            v-model="addForm.realName"
            :style="{width: formWidth}"
            minlength="2"
            maxlength="10"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-row :sm="24" :md="24" :lg="24" :xs="24" :xl="24">
          <el-col :sm="10" :md="10" :lg="10" :xs="10" :xl="10">
            <el-form-item label="性别" :label-width="editFormWidth" prop="sex">
              <el-radio-group
                size="small"
                v-model.number="addForm.sex"
                text-color="#F2F6FC"
                fill="#67C23A"
              >
                <el-radio-button :label="1">男</el-radio-button>
                <el-radio-button :label="0">女</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :sm="14" :md="14" :lg="14" :xs="14" :xl="14" prop="age">
            <el-form-item label="年龄">
              <el-input-number size="mini" v-model="addForm.age"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :sm="24" :md="24" :lg="24" :xs="24" :xl="24">
          <el-col :sm="10" :md="10" :lg="10" :xs="10" :xl="10">
            <el-form-item label="账户状态" :label-width="editFormWidth" prop="status">
              <transition
                enter-active-class="bounceIn"
                leave-active-class="bounceOut"
                mode="out-in"
              >
                <el-tooltip
                  :content="editForm.status == 1 ?'已启用':'已禁用'"
                  effect="light"
                  placement="top"
                >
                  <el-switch
                    v-model="addForm.status"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    :active-value="1"
                    :inactive-value="0"
                  ></el-switch>
                </el-tooltip>
              </transition>
            </el-form-item>
          </el-col>
          <el-col :sm="14" :md="14" :lg="14" :xs="14" :xl="14" prop="roleId">
            <el-form-item label="角色">
              <el-radio-group
                size="small"
                v-model.number="addForm.roleId"
                text-color="#F2F6FC"
                placeholder="请选择角色"
                fill="#67C23A"
              >
                <el-radio-button :label="1">用户</el-radio-button>
                <el-radio-button :label="2">管理员</el-radio-button>
                <el-radio-button :label="3">自定义</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="职位" :label-width="editFormWidth" prop="position">
          <el-input v-model="addForm.position" :style="{width: formWidth}" placeholder="请输入职位"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="editFormWidth" prop="email">
          <el-input v-model="addForm.email" :style="{width: formWidth}" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="入职日期" :label-width="editFormWidth" prop="createTime">
          <el-date-picker
            v-model="addForm.createTime"
            value-format="yyyy-mm-dd"
            type="date"
            placeholder="请选择入职日期"
            :style="{width: formWidth}"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button plain type="danger" @click="addFormVisible = false">取 消</el-button>
        <el-button type="success" @click="addUser">添加用户</el-button>
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
  realName: "staff",
  data() {
    let drawLoading = true;
    let editFormVisible = false;
    let addFormVisible = false;
    let editFormWidth = "90px";
    let selectRows = [];
    let loading = true;
    let editForm = {
      id: "",
      userName: "",
      passWord: "",
      realName: "",
      sex: Number,
      age: Number,
      roleId: "",
      status: Number,
      position: "Python开发",
      phone: "",
      email: "",
      origin: "",
      idNumber: "",
      createTime: ""
    };
    let addForm = {
      id: "",
      userName: "",
      realName: "",
      passWord: "",
      roleId: 1,
      status: 1,
      email: "",
      position: "",
      sex: 1,
      age: 20,
      createTime: dayjs().format("YYYY-MM-DD")
    };
    let formInline = {
      dep: "",
      group: "",
      project: "",
      userDetail: ""
    };
    let tableData = [];
    let formWidth = "80%";
    let options = {
      departments: [],
      groups: [],
      projects: []
    };
    return {
      addForm,
      addFormVisible,
      loading,
      options,
      formWidth,
      selectRows,
      editFormWidth,
      editForm,
      drawLoading,
      editFormVisible,
      formInline,
      tableData,
      currentPage1: 1,
      currentPage2: 5,
      currentPage3: 5,
      currentPage1: 4
    };
  },
  methods: {
    ...mapGetters({
      Get_TableData: "hr/Get_TableData",
      Get_Departments: "hr/Get_Departments",
      Get_Groups: "hr/Get_Groups",
      Get_Projects: "hr/Get_Projects"
    }),
    ...mapMutations({}),
    ...mapActions({
      INIT_TableData: "hr/INIT_TableData",
      MODIFY_TableData: "hr/MODIFY_TableData",
      DELETE_TableData: "hr/DELETE_TableData"
    }),
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
      }).then(() => {
        let ids = [];
        ids.push(rows.id);
        console.log(ids);
        this.DELETE_TableData(ids)
          .then(res => {
            this.$message.success({
              message: "删除成功！",
              offset: 150
            });
          })
          .catch(err => {
            this.$message.error({
              message: err.data.msg,
              offset: 150
            });
          });
        this.tableData.splice(index, 1);
      });
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    sexFormatter(row, column) {
      return (row.sex = 1 ? "女" : "男");
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
          this.DELETE_TableData(tag.map(t => t.id))
            .then(res => {
              this.$message.success({
                message: "删除成功！",
                offset: 150
              });
            })
            .catch(err => {
              this.$message.error({
                message: err.data.msg,
                offset: 150
              });
            });
          // this.tableData.splice(index, 1);
        });
      }
    },
    addUser() {
      let newData = Object.assign({}, this.addForm);
      newData.id = "user-" + this.UUID(16, 24);
      this.tableData.push(newData);
      this.$refs["addForm"].resetFields();
      this.addFormVisible = false;
    },
    submitEdit() {
      // this.editFormVisible = true;
      console.log(this.editForm);
      // this.MODIFY_TableData(this.editForm)
      //   .then(res => {
      let flag = this.tableData.findIndex(t => t.id == this.editForm.id);
      console.log(flag);
      this.tableData.splice(flag, 1, this.editForm);
      console.log(this.tableData);
      // })
      // .catch(err => {
      //   console.log(err);
      // });
      this.editFormVisible = false;
    },
    initData() {
      this.INIT_TableData()
        .then(() => {
          console.log(this.Get_TableData());
          this.tableData = this.Get_TableData();
          // this.tableData = this.Get_TableData();
          this.options.departments = this.Get_Departments();
          this.options.groups = this.Get_Groups();
          this.options.projects = this.Get_Projects();
        })
        .catch(err => {
          console.log(err);
        });
      this.drawLoading = false;
      this.loading = false;
    },
    formateTime: function(value) {
      return dayjs(value).format("YYYY-MM-DD");
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    toAddUser() {
      this.addFormVisible = true;
      // console.log("user-" + this.UUID(24, 16).toLowerCase());
    },
    UUID(len, radix) {
      var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
        ""
      );
      var uuid = [],
        i;
      radix = radix || chars.length;

      if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
      } else {
        // rfc4122, version 4 form
        var r;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
        uuid[14] = "4";

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
          if (!uuid[i]) {
            r = 0 | (Math.random() * 16);
            uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
          }
        }
      }

      return uuid.join("");
    }
  },
  computed: {},
  mounted() {
    setTimeout(() => {
      this.initData();
    }, 2000);
  }
};
</script>
<style scoped src="@/assets/css/staff.css"></style>