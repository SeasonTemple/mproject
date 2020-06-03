<template>
  <div>
    <!-- <el-row>
      <el-button type="success" plain :style="{float:'left',marginLeft:'10px'}">添加部门</el-button>
      <el-button type="danger" plain :style="{float:'left',marginLeft:'10px'}">删除部门</el-button>
      <el-button type="success" plain :style="{float:'left',marginLeft:'10px'}">添加项目组</el-button>
      <el-button type="danger" plain :style="{float:'left',marginLeft:'10px'}">删除项目组</el-button>
    </el-row>-->
    <!-- <el-divider></!-->
    <el-row type="flex" :gutter="20">
      <el-col
        :style="{marginLeft:'10px',fontSize:'25px',transition: '2s ease-in-out'}"
        :xs="flexWidth"
        :sm="flexWidth"
        :md="flexWidth"
        :lg="flexWidth"
        :xl="flexWidth"
      >
        <el-input placeholder="输入关键字进行过滤" v-model="filterText" clearable></el-input>
        <el-tree
          :filter-node-method="filterNode"
          :render-after-expand="false"
          :props="config"
          :class="{treeNode:true}"
          :data="treeData"
          node-key="id"
          ref="treeData"
          :load="initTree"
          lazy
          @check="selectNode"
          highlight-current
          @node-click="handleNodeClick"
          :check-strictly="true"
          :expand-on-click-node="true"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
              <el-button
                type="text"
                size="mini"
                v-if="node.key == 1"
                @click="() => append(node,data)"
              >添加同级</el-button>
              <el-button
                v-if="node.childNodes.length == 0 && node.level < 3"
                type="text"
                size="mini"
                @click="() => append(node,data, 1)"
              >添加下一级</el-button>
              <el-button type="text" size="mini" @click="() => edit(node,data)">编辑</el-button>
              <el-button type="text" size="mini" @click="() => remove(node, data)">删除</el-button>
            </span>
          </span>
        </el-tree>
      </el-col>
      <transition
        appear
        appear-active-class="slideInRight"
        enter-active-class="slideInRight"
        leave-active-class="fadeOutRight"
        mode="out-in"
      >
        <el-col
          v-if="isDep"
          class="animated"
          :xs="10"
          :sm="10"
          :md="10"
          :lg="10"
          :xl="10"
          :style="{zIndex:'0',margin: '0 10px 0 0',transition: '1s linear'}"
        >
          <el-row :class="{topTitle:true}">
            <span :class="{symbol:true}">部门信息</span>
          </el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form
              :model="isAddDep? addDep:department"
              :ref="isAddDep? addDep:department"
              label-width="80px"
            >
              <el-form-item label="部门名称" prop="depName">
                <el-input v-if="isAddDep" v-model="addDep.depName" clearable placeholder="请输入部门名称"></el-input>
                <el-input v-else v-model="department.depName" clearable placeholder="请输入部门名称"></el-input>
              </el-form-item>
              <el-form-item label="部长姓名" prop="leader">
                <el-input v-if="isAddDep" v-model="addDep.leader" clearable placeholder="请输入部长名称"></el-input>
                <el-input v-else v-model="department.depName" clearable placeholder="请输入部长名称"></el-input>
              </el-form-item>
              <el-form-item style="float:left;">
                <transition
                  appear
                  appear-active-class="fadeInRight"
                  enter-active-class="fadeInLeft"
                  leave-active-class="fadeOutLeft"
                  mode="out-in"
                >
                  <el-button
                    key="add"
                    class="animated"
                    type="success"
                    v-if="isAddDep"
                    @click="addDuty('department')"
                  >添加部门</el-button>
                  <el-button
                    key="modify"
                    class="animated"
                    type="primary"
                    plain
                    v-else
                    @click="submitForm('department')"
                  >提交修改</el-button>
                </transition>
                <el-button plain type="danger" @click="isDep = false">取消</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-col>
      </transition>
      <transition
        appear
        appear-active-class="slideInRight"
        enter-active-class="slideInRight"
        leave-active-class="fadeOut"
        mode="out-in"
      >
        <el-col
          v-if="isGroup"
          class="animated"
          :xs="12"
          :sm="12"
          :md="12"
          :lg="12"
          :xl="12"
          :style="{zIndex:'999',margin: '0 10px 0 0',transition: '1s linear'}"
        >
          <el-row :class="{topTitle:true}">
            <span :class="{symbol:true}">组信息</span>
          </el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form
              :model="isAddGroup? addGroup:group"
              :ref="isAddGroup? addGroup:group"
              label-width="80px"
            >
              <el-form-item label="组名称" prop="groupName">
                <el-input
                  v-if="isAddGroup"
                  v-model="addGroup.groupName"
                  clearable
                  placeholder="请输入组名称"
                ></el-input>
                <el-input v-else v-model="group.groupName" clearable placeholder="请输入组名称"></el-input>
              </el-form-item>
              <el-form-item label="组长" prop="leader">
                <el-input
                  v-if="isAddGroup"
                  v-model="addGroup.leader"
                  clearable
                  placeholder="请输入组长姓名"
                ></el-input>
                <el-input v-else v-model="group.leader" clearable placeholder="请输入组长姓名"></el-input>
              </el-form-item>
              <el-form-item label="所属部门" prop="depName">
                <el-input
                  v-if="isAddGroup"
                  v-model="addGroup.depName"
                  clearable
                  placeholder="请输入所属部门"
                ></el-input>
                <el-input v-else v-model="group.depName" clearable placeholder="请输入所属部门"></el-input>
              </el-form-item>
              <el-form-item style="float:left">
                <transition
                  appear
                  appear-active-class="fadeInRight"
                  enter-active-class="fadeInLeft"
                  leave-active-class="fadeOutLeft"
                  mode="out-in"
                >
                  <el-button
                    key="modify"
                    type="success"
                    class="animated"
                    v-if="isAddGroup"
                    @click="addDuty('group')"
                  >添加组</el-button>
                  <el-button
                    key="add"
                    class="animated"
                    plain
                    type="primary"
                    v-else
                    @click="submitForm('group')"
                  >提交修改</el-button>
                </transition>
                <el-button plain type="danger" @click="isGroup = false">取消</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-col>
      </transition>
      <transition
        appear
        appear-active-class="slideInRight"
        enter-active-class="slideInRight"
        leave-active-class="slideOutRight"
        mode="out-in"
      >
        <el-col
          v-if="isProject"
          class="animated"
          :xs="12"
          :sm="12"
          :md="12"
          :lg="12"
          :xl="12"
          :style="{zIndex:'9999',margin: '0 20px 0 0',transition: 'linear'}"
        >
          <el-row :class="{topTitle:true}">
            <span :class="{symbol:true}">项目信息</span>
          </el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form
              :model="isAddPro? addPro: project"
              ref="isAddPro? addPro: project"
              label-width="90px"
            >
              <el-form-item label="项目名称" prop="projectName">
                <el-input
                  v-if="isAddPro"
                  v-model="addPro.projectName"
                  clearable
                  placeholder="请输入项目名称"
                ></el-input>
                <el-input v-else v-model="project.projectName" clearable placeholder="请输入项目名称"></el-input>
              </el-form-item>
              <el-form-item label="项目描述" prop="description">
                <el-input
                  v-if="isAddPro"
                  v-model="addPro.description"
                  clearable
                  placeholder="请输入项目描述"
                ></el-input>
                <el-input v-else v-model="project.description" clearable placeholder="请输入项目描述"></el-input>
              </el-form-item>
              <el-form-item label="项目进度" prop="schedule">
                <el-progress
                  v-if="isAddPro"
                  :percentage="addPro.schedule * 20"
                  :text-inside="true"
                  :stroke-width="26"
                  :color="customColors"
                ></el-progress>
                <el-progress
                  v-else
                  :percentage="project.schedule * 20"
                  :text-inside="true"
                  :stroke-width="26"
                  :color="customColors"
                ></el-progress>
                <el-button-group>
                  <el-button size="mini" icon="el-icon-minus" @click="decrease"></el-button>
                  <el-button size="mini" icon="el-icon-plus" @click="increase"></el-button>
                </el-button-group>
              </el-form-item>
              <el-form-item label="项目负责人" prop="leader">
                <el-input v-if="isAddPro" v-model="addPro.leader" clearable placeholder="请输入项目负责人"></el-input>
                <el-input v-else v-model="project.leader" clearable placeholder="请输入项目负责人"></el-input>
              </el-form-item>
              <el-form-item label="所属组" prop="groupName">
                <el-input v-if="isAddPro" v-model="addPro.groupName" clearable placeholder="请输入所属组"></el-input>
                <el-input v-else v-model="project.groupName" clearable placeholder="请输入所属组"></el-input>
              </el-form-item>
              <el-form-item style="float:left">
                <transition
                  appear
                  appear-active-class="fadeInRight"
                  enter-active-class="fadeInLeft"
                  leave-active-class="fadeOutLeft"
                  mode="out-in"
                >
                  <el-button
                    key="modify"
                    type="success"
                    v-if="isAddPro"
                    class="animated"
                    @click="addDuty('project')"
                  >添加项目</el-button>
                  <el-button
                    plain
                    key="add"
                    type="primary"
                    class="animated"
                    v-else
                    @click="submitForm('project')"
                  >提交修改</el-button>
                </transition>
                <el-button plain type="danger" @click="isProject = false">取消</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-col>
      </transition>
    </el-row>
  </div>
</template>

<script>
import dayjs from "dayjs";
var isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
dayjs.extend(isSameOrBefore);
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "department",
  inject: ["reload"],
  data() {
    let isDep = false;
    let isGroup = false;
    let isProject = false;
    let isAddDep = false;
    let isAddGroup = false;
    let isAddPro = false;
    let addDep = {
      depName: "",
      leader: ""
    };
    let addGroup = {
      id: Number,
      groupName: "",
      leader: "",
      depId: Number
    };
    let addPro = {
      id: Number,
      projectName: "",
      description: "",
      schedule: 0,
      leader: "",
      groupId: ""
    };
    let config = {
      label: "name",
      children: "children"
    };
    let department = {
      id: Number,
      depName: "",
      leader: ""
    };
    let group = {
      id: Number,
      groupName: "",
      leader: "",
      depId: Number
    };
    let project = {
      id: Number,
      projectName: "",
      description: "",
      schedule: 0,
      leader: "",
      groupId: ""
    };
    let departments = [];
    let groups = [];
    let projects = [];
    let treeData = [];
    let filterText = "";
    let customColors = [
      { color: "#f56c6c", percentage: 20 },
      { color: "#e6a23c", percentage: 40 },
      { color: "#5cb87a", percentage: 60 },
      { color: "#1989fa", percentage: 80 },
      { color: "#6f7ad3", percentage: 100 }
    ];
    const timer = null;
    let origin = {};
    return {
      addDep,
      addGroup,
      addPro,
      isAddDep,
      isAddGroup,
      isAddPro,
      origin,
      customColors,
      config,
      isDep,
      projects,
      isGroup,
      isProject,
      project,
      department,
      group,
      config,
      filterText,
      groups,
      treeData
    };
  },
  methods: {
    ...mapGetters({
      Get_Departments: "hr/Get_Departments",
      Get_Groups: "hr/Get_Groups",
      Get_Projects: "hr/Get_Projects"
    }),
    ...mapMutations({
      SET_Departments: "hr/SET_Departments"
    }),
    ...mapActions({
      INIT_DUTY: "hr/INIT_DUTY",
      MODIFY_DUTY: "hr/MODIFY_DUTY",
      ADD_DUTY: "hr/ADD_DUTY"
    }),
    submitForm(formName) {
      let change = this.$refs[formName].model;
      console.log(change);
      console.log(this.origin);
      if (Object.is(change, this.origin)) {
        this.$message.error({
          message: "无效提交，请至少修改一项！",
          offset: 150
        });
        return;
      } else {
        let flag = 0;
        switch (formName) {
          case "department":
            flag = 1;
            this.isDep = false;
            break;
          case "group":
            flag = 2;
            this.isGroup = false;
            break;
          case "project":
            flag = 3;
            this.isProject = false;
            break;
        }
        this.MODIFY_DUTY({ flag, change })
          .then(res => {
            this.$message.success({
              message: res,
              offset: 150
            });
          })
          .catch(err => {
            this.$message.error({
              message: err,
              offset: 150
            });
          });
      }
    },
    handleNodeClick(data, node) {
      // console.log(node);
      switch (data.level) {
        case 0:
          this.department = data.data;
          Object.assign(this.origin, data.data);
          break;
        case 1:
          this.group = data.data;
          this.group.depName = node.parent.data.name;
          this.group["parent"] = node.parent.data;
          Object.assign(this.origin, data.data);
          break;
        case 2:
          this.project = data.data;
          this.project.groupName = node.parent.data.name;
          this.project["parent"] = node.parent.data;
          Object.assign(this.origin, data.data);
          break;
      }
      // console.log(data);
    },
    selectNode(data, select) {
      console.log(data, select);
    },
    initTree(node, resolve) {
      this.INIT_DUTY()
        .then(() => {
          this.initAll(node, resolve);
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    getGroupNode(node, resolve) {
      // console.log(node.data);
      let dep_id = node.data.id;
      let child = this.groups;
      resolve(child.filter(g => g.data.depId == dep_id));
    },
    getProjectNode(node, resolve) {
      let group_id = node.data.id;
      let child = this.projects;
      // console.log(this.groups.filter(p => p.id == dep_id));
      resolve(child.filter(p => p.data.groupId == group_id));
    },
    filterNode(value, data) {
      console.log(value + "----" + JSON.stringify(data));
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    addDuty(form) {
      let flag = 0;
      let change = {};
      switch (form) {
        case "department":
          change = {
            depName: this.addDep.depName,
            leader: this.addDep.leader
          };
          if (change.depName !== "" && change.leader != "") {
            // this.$refs.treeData.append(change, []);
            flag = 1;
            this.ADD_DUTY({ flag, change })
              .then(res => {
                this.$message.success({
                  message: res,
                  offset: 150
                });
              })
              .catch(err => {
                this.$message.error({
                  message: err,
                  offset: 150
                });
              });
            this.reload();
          } else {
            this.$message.error({
              message: "请输入完整信息!",
              offset: 150
            });
          }
          break;
        case "group":
          change = {
            groupName: this.addGroup.groupName,
            leader: this.addGroup.leader,
            depId: this.addGroup.depId
          };
          console.log(change);
          if (change.groupName !== "" && change.leader != "") {
            // this.$refs.treeData.append(change, []);
            flag = 2;
            this.ADD_DUTY({ flag, change })
              .then(res => {
                this.$message.success({
                  message: res,
                  offset: 150
                });
              })
              .catch(err => {
                this.$message.error({
                  message: err,
                  offset: 150
                });
              });
            this.reload();
          } else {
            this.$message.error({
              message: "请输入完整信息!",
              offset: 150
            });
          }
          break;
        case "project":
          change = {
            projectName: this.addPro.projectName,
            description: this.addPro.description,
            schedule: this.addPro.schedule,
            leader: this.addPro.leader,
            groupId: this.addPro.groupId
          };
          console.log(change);
          if (change.projectName !== "" && change.description != "") {
            // this.$refs.treeData.append(change, []);
            flag = 3;
            this.ADD_DUTY({ flag, change })
              .then(res => {
                this.$message.success({
                  message: res,
                  offset: 150
                });
              })
              .catch(err => {
                this.$message.error({
                  message: err,
                  offset: 150
                });
              });
            this.reload();
          } else {
            this.$message.error({
              message: "请输入完整信息!",
              offset: 150
            });
          }
          break;
      }
    },
    append(node, data, isNext) {
      console.log(node);
      console.log(data);
      let level = data.level;
      if (isNext == 1 && level + isNext <= 3) {
        level += isNext;
      }
      switch (level) {
        case 0:
          this.isDep = true;
          this.isAddDep = true;
          this.addDep["level"] = level;
          break;
        case 1:
          this.isGroup = true;
          this.isAddGroup = true;
          this.addGroup.depId = data.data.depId;
          this.addGroup.depName = node.parent.data.name;
          console.log(data.data.parent);
          break;
        case 2:
          this.isProject = true;
          this.isAddPro = true;
          console.log(node.parent.data);
          this.addPro.groupName = node.parent.data.name;
          this.addPro.groupId = node.parent.data.id;
          break;
      }
      console.log(node + JSON.stringify(data));
      // let k = 7;
      // const newChild = {
      //   id: ++k,
      //   name: "测试部门",
      //   leader: "测试领导"
      // };
      // if (!data.children) {
      //   this.$set(data, "children", []);
      // }
      // data.children.push(newChild);
    },
    edit(node, data) {
      switch (data.level) {
        case 0:
          this.isDep = true;
          this.isAddDep = false;
          break;
        case 1:
          this.isGroup = true;
          this.isAddGroup = false;
          break;
        case 2:
          this.isProject = true;
          this.isAddPro = false;
          break;
      }
    },
    remove(node, data) {
      console.log(node, JSON.stringify(data));
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      console.log(children);
      children.splice(index, 1);
    },
    increase() {
      let flag = this.project.schedule;
      if (flag < 5) {
        ++this.project.schedule;
      }
    },
    decrease() {
      let flag = this.project.schedule;
      if (0 < flag) {
        --this.project.schedule;
      }
    },
    initAll(node, resolve) {
      let arr = [];
      let departments = this.Get_Departments();
      let groups = this.Get_Groups();
      let projects = this.Get_Projects();
      departments.forEach(a =>
        arr.push({
          id: a.id,
          level: 0,
          name: a.depName,
          data: a,
          leader: a.leader
        })
      );
      this.departments = arr;
      // console.log(arr);
      arr = [];
      groups.forEach(a =>
        arr.push({
          id: a.id,
          level: 1,
          name: a.groupName,
          data: a,
          leader: a.leader
        })
      );
      this.groups = arr;
      arr = [];
      projects.forEach(a =>
        arr.push({
          id: a.id,
          level: 2,
          name: a.projectName,
          data: a,
          leader: a.leader
        })
      );
      this.projects = arr;
      arr = [];
      if (node.level === 0) {
        return resolve(this.departments);
      }
      if (node.level > 2) {
        return resolve([]);
      }
      if (node.level === 1) {
        this.timer = setTimeout(() => {
          this.getGroupNode(node, resolve);
        }, 1000);
      }
      if (node.level == 2) {
        this.timer = setTimeout(() => {
          this.getProjectNode(node, resolve);
        }, 1000);
      }
    }
  },
  watch: {
    filterText(val) {
      console.log(val);
      this.$refs.treeData.filter(val);
    },
    Departments(curV, oldV) {
      console.log(oldV, curV);
      // this.departments = curV;
    }
  },
  computed: {
    ...mapState({
      Departments: state => state.hr.departments
    }),
    flexWidth() {
      let flag = 1;
      this.isDep ? ++flag : 0;
      this.isGroup ? ++flag : 0;
      this.isProject ? ++flag : 0;
      return 24 / flag;
    }
  },
  created() {},
  mounted() {}
};
</script>
<style  src="@/assets/css/department.css"></style>