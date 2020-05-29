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
          accordion
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
              <el-button type="text" size="mini" @click="() => append(data)">添加</el-button>
              <!-- <el-button type="text" size="mini">编辑</el-button> -->
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
            <el-form :model="department" ref="department" label-width="80px">
              <el-form-item label="部门名称" prop="name">
                <el-input v-model="department.depName" clearable></el-input>
              </el-form-item>
              <el-form-item label="部长姓名" prop="leader">
                <el-input v-model="department.leader" clearable></el-input>
              </el-form-item>
              <el-form-item style="float:left;">
                <el-button type="primary" @click="submitForm('department')">提交修改</el-button>
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
            <span :class="{symbol:true}">项目组信息</span>
          </el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form :model="group" ref="group" label-width="80px">
              <el-form-item label="组名称" prop="name">
                <el-input v-model="group.groupName" clearable></el-input>
              </el-form-item>
              <el-form-item label="组长" prop="leader">
                <el-input v-model="group.leader" clearable></el-input>
              </el-form-item>
              <el-form-item label="所属部门" prop="description">
                <el-input v-model="group.depName" clearable></el-input>
              </el-form-item>
              <el-form-item style="float:left">
                <el-button type="primary" @click="submitForm('group')">提交修改</el-button>
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
            <el-form :model="project" ref="project" label-width="90px">
              <el-form-item label="项目名称" prop="projectName">
                <el-input v-model="project.projectName" clearable></el-input>
              </el-form-item>
              <el-form-item label="项目描述" prop="description">
                <el-input v-model="project.description" clearable></el-input>
              </el-form-item>
              <el-form-item label="项目进度" prop="schedule">
                <el-progress
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
                <el-input v-model="project.leader" clearable></el-input>
              </el-form-item>
              <el-form-item label="所属组名" prop="groupName">
                <el-input v-model="project.groupName" clearable></el-input>
              </el-form-item>
              <el-form-item style="float:left">
                <el-button type="primary" @click="submitForm('project')">提交修改</el-button>
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
  data() {
    let isDep = false;
    let isGroup = false;
    let isProject = false;
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
    return {
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
    ...mapMutations({}),
    ...mapActions({
      INIT_DUTY: "hr/INIT_DUTY"
    }),
    submitForm(formName) {
      this.$message.success({
        message: "新建成功！",
        offset: 130
      });
    },
    handleNodeClick(data) {
      switch (data.level) {
        case 0:
          this.department = data.data;
          this.isDep = true;
          break;
        case 1:
          this.group = data.data;
          this.isGroup = true;
          break;
        case 2:
          this.project = data.data;
          this.isProject = true;
          break;
      }
      console.log(data);
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
    append(data) {
      console.log("append: " + JSON.stringify(data));
      const newChild = {
        id: ++data.id,
        name: "test1test",
        leader: "test1test"
      };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },

    remove(node, data) {
      console.log("remove: " + node, JSON.stringify(data));
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
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
          name: a.depName + "部",
          data: a,
          leader: a.leader
        })
      );
      this.departments = arr;
      console.log(arr);
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
    }
  },
  computed: {
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