<template>
  <div>
    <!-- <el-row>
      <el-button type="success" plain :style="{float:'left',marginLeft:'10px'}">添加部门</el-button>
      <el-button type="danger" plain :style="{float:'left',marginLeft:'10px'}">删除部门</el-button>
      <el-button type="success" plain :style="{float:'left',marginLeft:'10px'}">添加项目组</el-button>
      <el-button type="danger" plain :style="{float:'left',marginLeft:'10px'}">删除项目组</el-button>
    </el-row>-->
    <el-divider></el-divider>
    <el-row type="flex" :gutter="20">
      <el-col
        :style="{marginLeft:'10px',fontSize:'25px'}"
        :xs="12"
        :sm="12"
        :md="12"
        :lg="12"
        :xl="12"
      >
        <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
        <el-tree
          :class="{treeNode:true}"
          :filter-node-method="filterNode"
          render-after-expand
          node-key="id"
          ref="treeData"
          :load="initTree"
          lazy
          :props="defaultProps"
          @node-click="handleNodeClick"
          show-checkbox
          highlight-current
          check-strictly
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
              <el-button type="text" size="mini" @click="() => append(data)">添加</el-button>
              <el-button type="text" size="mini" @click="() => remove(node, data)">删除</el-button>
            </span>
          </span>
        </el-tree>
      </el-col>
      <el-col v-if="isDep" :xs="24" :sm="24" :md="24" :lg="24" :xl="24" :style="{margin: '0 10px 0 0'}">
        <el-row :class="{topTitle:true}">
          <span :class="{symbol:true}">部门信息</span>
        </el-row>
        <el-col :xs="14" :sm="14" :md="14" :lg="14" :xl="14">
          <el-form :model="depForm" ref="depForm" label-width="80px">
            <el-form-item label="部门名称" prop="name">
              <el-input v-model="depForm.name"></el-input>
            </el-form-item>
            <el-form-item label="部长姓名" prop="minister">
              <el-input v-model="depForm.minister"></el-input>
            </el-form-item>
            <el-form-item style="float:left">
              <el-button type="primary" @click="submitForm('depForm')">新建部门</el-button>
              <el-button @click="resetForm('depForm')">取消</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-col>
      <el-col v-if="!isDep" :xs="24" :sm="24" :md="24" :lg="24" :xl="24" :style="{margin: '0 10px 0 0'}">
        <el-row :class="{topTitle:true}">
          <span :class="{symbol:true}">项目组信息</span>
        </el-row>
        <el-col :xs="14" :sm="14" :md="14" :lg="14" :xl="14">
          <el-form :model="proForm" ref="proForm" label-width="90px">
            <el-form-item label="项目组名称" prop="name">
              <el-input v-model="proForm.name"></el-input>
            </el-form-item>
            <el-form-item label="组长" prop="leader">
              <el-input v-model="proForm.leader"></el-input>
            </el-form-item>
            <el-form-item label="项目描述" prop="description">
              <el-input v-model="proForm.description"></el-input>
            </el-form-item>
            <el-form-item style="float:left">
              <el-button type="primary" @click="submitForm('proForm')">新建组</el-button>
              <el-button @click="resetForm('proForm')">取消</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "department",
  data() {
    let isDep = true;
    let depNodes = [
      {
        depId: 1,
        name: "第三海外事业部",
        minister: "刘源"
      },
      {
        depId: 2,
        name: "第五海外事业部",
        minister: "叶忠"
      },
      {
        depId: 3,
        name: "人事部",
        minister: "曹金操"
      }
    ];
    let depForm = {
      depId: Number,
      name: "",
      minister: ""
    };
    let proForm ={
      pId: Number,
      name: "",
      leader: "",
      description: ""
    };
    let projects = [
      {
        pId: 1,
        name: "斗鱼人气",
        description: "斗鱼人气监控项目",
        schedule: "当前进度60%",
        leader: "何清",
        depId: 1
      },
      {
        pId: 2,
        name: "斗鱼站邮件",
        description: "斗鱼站内邮件管理",
        schedule: "当前进度70%",
        leader: "紫怀安",
        depId: 2
      },
      {
        pId: 3,
        name: "爱奇艺播放",
        description: "爱奇艺播放加密解决方案",
        schedule: "当前进度20%",
        leader: "李怀义",
        depId: 3
      }
    ];
    let treeData = [
      {
        label: "一级 1",
        children: [
          {
            label: "二级 1-1",
            children: [
              {
                label: "三级 1-1-1"
              }
            ]
          }
        ]
      },
      {
        label: "一级 2",
        children: [
          {
            label: "二级 2-1",
            children: [
              {
                label: "三级 2-1-1"
              }
            ]
          },
          {
            label: "二级 2-2",
            children: [
              {
                label: "三级 2-2-1"
              }
            ]
          }
        ]
      },
      {
        label: "一级 3",
        children: [
          {
            label: "二级 3-1",
            children: [
              {
                label: "三级 3-1-1"
              }
            ]
          },
          {
            label: "二级 3-2",
            children: [
              {
                label: "三级 3-2-1"
              }
            ]
          }
        ]
      }
    ];
    let filterText = "";
    let defaultProps = {
      label: "name",
      children: "projects",
      isLeaf: "depId"
    };
    const timer = null;
    return {
      isDep,
      depForm,
      proForm,
      defaultProps,
      filterText,
      projects,
      treeData,
      depNodes
    };
  },
  methods: {
    submitForm(formName){
      this.$message.success({
        message: "新建成功！",
        offset: 130
      })
    },
    handleNodeClick(data) {
    },
    initTree(node, resolve) {
      if (node.level === 0) {
        return resolve(this.depNodes);
      }
      if (node.level > 1) {
        return resolve([]);
      }
      if (node.level === 1) {
        this.timer = setTimeout(() => {
          this.getChildrenNode(node, resolve);
        }, 1000);
      }
    },
    getChildrenNode(node, resolve) {
      let dep_id = node.data.depId;
      let child = this.projects;
      console.log(dep_id);
      // console.log(this.projects.filter(p => p.depId == dep_id));
      resolve(child.filter(p => p.depId == dep_id));
    },
    filterNode(value, data) {
      console.log(value + "----" + JSON.stringify(data));
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    append(data) {
      console.log("append: " + JSON.stringify(data));
      const newChild = {
        depId: data.id++,
        name: "testtest",
        minister: "testtest"
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
    }
  },
  watch: {
    filterText(val) {
      console.log(val);
      this.$refs.treeData.filter(val);
    }
  }
};
</script>
<style  src="@/assets/css/department.css"></style>