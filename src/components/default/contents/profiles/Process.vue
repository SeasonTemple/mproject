<template>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" :class="{ cardBody:true }">
      <el-card class="box-card" shadow="shadow" :class="{ baseBody: true }">
        <div class="clearfix" slot="header" :class="{ baseHeader:true }">
          <el-button-group :class="{ headerBtn:true }">
            <el-button type="info" plain @click="showProjects(0)">未开始</el-button>
            <el-button type="warning" plain @click="showProjects(1)">进行中</el-button>
            <el-button type="success" plain @click="showProjects(5)">已完成</el-button>
            <el-button type="primary" plain @click="showProjects(-1)">查看全部</el-button>
          </el-button-group>
        </div>
        <div v-if="showData.length==0" style="color:#909399">暂无数据</div>
        <template v-for="(project,index) in showData">
          <transition
            appear
            appear-active-class="fadeInUp"
            enter-active-class="fadeInUp"
            leave-active-class="fadeOutDown"
            :key="index"
          >
            <el-col
              class="animated"
              :style="{animationDelay: index == 1? index + 's':index-0.5 + 's'}"
              :xs="autoSpan"
              :sm="autoSpan"
              :md="autoSpan"
              :lg="autoSpan"
              :xl="autoSpan"
            >
              <div :class="{ contentField:true }">
                <el-collapse accordion :style="{paddingTop: '0px'}">
                  <el-collapse-item>
                    <template slot="title">
                      <span style="text-indent:10px;font-size:1rem;">{{ project.projectName }}</span>
                    </template>
                    <el-divider></el-divider>
                    <div>
                      <el-steps
                        :active="project.schedule"
                        finish-status="success"
                        space
                        align-center
                      >
                        <el-step title="未开始" description="0%"></el-step>
                        <el-step title="进行中" description="20%"></el-step>
                        <el-step title="进行中" description="50%"></el-step>
                        <el-step title="进行中" description="80%"></el-step>
                        <el-step title="已完成" description="100%"></el-step>
                      </el-steps>
                      <el-divider></el-divider>
                      <el-form
                        :model="project"
                        status-icon
                        ref="ruleForm"
                        label-width="80px"
                        :class="{ ruleForm:true }"
                        size="small"
                        label-position="left"
                      >
                        <el-form-item label="项目名" prop="projectName">
                          <el-input
                            type="text"
                            v-model="project.projectName"
                            autocomplete="off"
                            placeholder="项目名"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="负责人" prop="realName">
                          <el-input
                            type="text"
                            v-model="project.leader.realName"
                            autocomplete="off"
                            placeholder="负责人"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="项目描述" prop="description">
                          <el-input
                            type="textarea"
                            v-model.number="project.description"
                            placeholder="项目描述"
                          ></el-input>
                        </el-form-item>
                        <el-row :class="{ dispatchContent:true }">
                          <span style="text-align:left;float:left;font-size:14px;">项目成员</span>
                          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <template v-for="tag in project.members">
                              <el-popover :key="tag.realName" placement="top" trigger="hover">
                                <el-card
                                  shadow="hover"
                                  :class="{popClass: true}"
                                  :body-style="{padding:'10px'}"
                                >负责职位：{{ tag.position }}</el-card>
                                <el-tag
                                  slot="reference"
                                  :key="tag.realName"
                                  style="margin:0 2px 5px 2px;float:right;"
                                  closable
                                  :type="tag.type"
                                  @close="tagClose(tag,project)"
                                >{{tag.realName}}</el-tag>
                              </el-popover>
                            </template>
                          </el-col>
                        </el-row>
                        <el-form-item :style="{marginTop:'10px',float: 'left'}">
                          <el-button
                            size="mini"
                            plain
                            type="primary"
                            @click="submitForm('ruleForm')"
                          >提交修改</el-button>
                          <el-button size="mini" plain @click="next(project)">进度调整</el-button>
                        </el-form-item>
                      </el-form>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </el-col>
          </transition>
        </template>
      </el-card>
    </el-col>
    <el-dialog
      title="任务分配"
      center
      :append-to-body="true"
      :visible.sync="dispatchVisible"
      top="15%"
      width="30%"
      :before-close="handleClose"
    >
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dispatchVisible = false">确 定</el-button>
        <el-button @click="dispatchVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>
<script>
export default {
  name: "process",
  data() {
    let dispatchVisible = false;
    let projects = [
      {
        id: 1,
        projectName: "斗鱼人气处理",
        description: "通过...为斗鱼平台实现一种操作相对简单的人气监控工具",
        leader: {
          realName: "赵浩辉",
          id: "user-sd1kdj2a3s23d23a4dsa"
        },
        schedule: 2,
        depId: "",
        members: [
          { realName: "刘辉", type: this.getTagType(), position: "前端开发" },
          { realName: "堇菜", type: this.getTagType(), position: "产品经理" },
          { realName: "何发辉", type: this.getTagType(), position: "前端测试" },
          { realName: "张佳琪", type: this.getTagType(), position: "后端开发" },
          { realName: "叶丹", type: this.getTagType(), position: "系统架构" },
          { realName: "白金", type: this.getTagType(), position: "UI设计" }
        ]
      },
      {
        id: 2,
        projectName: "车载智能调节",
        description: "通过...为斗鱼平台实现一种操作相对简单的人气监控工具",
        leader: {
          realName: "赵浩辉",
          id: "user-sd1kdj2a3s23d23a4dsa"
        },
        schedule: 0,
        depId: "",
        members: [
          { realName: "刘辉", type: this.getTagType(), position: "前端开发" },
          { realName: "堇菜", type: this.getTagType(), position: "产品经理" },
          { realName: "何发辉", type: this.getTagType(), position: "前端测试" },
          { realName: "张佳琪", type: this.getTagType(), position: "后端开发" },
          { realName: "叶丹", type: this.getTagType(), position: "系统架构" },
          { realName: "白金", type: this.getTagType(), position: "UI设计" }
        ]
      },
      {
        id: 3,
        projectName: "微博好评工具",
        description: "通过...为斗鱼平台实现一种操作相对简单的人气监控工具",
        leader: {
          realName: "赵浩辉",
          id: "user-sd1kdj2a3s23d23a4dsa"
        },
        schedule: 5,
        depId: "",
        members: [
          { realName: "刘辉", type: this.getTagType(), position: "前端开发" },
          { realName: "堇菜", type: this.getTagType(), position: "产品经理" },
          { realName: "何发辉", type: this.getTagType(), position: "前端测试" },
          { realName: "张佳琪", type: this.getTagType(), position: "后端开发" },
          { realName: "叶丹", type: this.getTagType(), position: "系统架构" },
          { realName: "白金", type: this.getTagType(), position: "UI设计" }
        ]
      }
    ];
    let showData = [];
    return {
      showData,
      projects,
      dispatchVisible
    };
  },
  methods: {
    next(project) {
      let flag = project.schedule;
      if (flag++ > 4) {
        this.showData.find(p => p.id == project.id).schedule = 0;
      } else {
        this.showData.find(p => p.id == project.id).schedule++;
      }
    },
    initProjects() {
      this.showData = this.projects;
    },
    getTagType() {
      const type = ["primary", "info", "warning", "danger", "success"];
      return type[(Math.random() * type.length + 0) | 0];
    },
    openDispatcher: function() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    tagClose(tag, project) {
      const tags = this.projects.find(p => p.id == project.id).members;
      tags.splice(tags.indexOf(tag), 1);
    },
    submitForm(formName) {
      this.$message.success({
        message: "修改成功",
        offset: 130
      });
    },
    showProjects(flag) {
      console.log(flag);
      if (0 < flag && flag < 5) {
        this.showData = this.projects
          .filter(p => p.schedule != 0)
          .filter(p => p.schedule != 5);
      } else if (flag < 0) {
        this.showData = this.projects;
      } else {
        this.showData = this.projects.filter(p => p.schedule == flag);
      }
      console.log(this.projects);
    }
  },
  computed: {
    autoSpan() {
      return this.showData.length == 1 ? 24 : 12;
    }
  },
  mounted() {
    this.initProjects();
  }
};
</script>
<style scoped src="@/assets/css/process.css"></style>
