<template>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" :class="{ cardBody:true }">
      <el-card class="box-card" shadow="shadow" :class="{ baseBody: true }">
        <div class="clearfix" slot="header" :class="{ baseHeader:true }">
          <el-button-group :class="{ headerBtn:true }">
            <el-button type="info" plain>未开始</el-button>
            <el-button type="warning" plain>进行中</el-button>
            <el-button type="success" plain>已完成</el-button>
          </el-button-group>
        </div>
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
          <div :class="{ contentField:true }">
            <el-collapse accordion :style="{paddingTop: '0px'}">
              <el-collapse-item>
                <template slot="title">
                  <span style="text-indent:10px;font-size:1rem;">斗鱼人气处理</span>
                </template>
                <el-divider></el-divider>
                <div>
                  <el-steps :active="active" finish-status="success" space align-center>
                    <el-step title="未开始" description="0%"></el-step>
                    <el-step title="进行中" description="20%"></el-step>
                    <el-step title="进行中" description="50%"></el-step>
                    <el-step title="进行中" description="80%"></el-step>
                    <el-step title="已完成" description="100%"></el-step>
                  </el-steps>
                  <el-divider></el-divider>
                  <el-form
                    :model="ruleForm"
                    status-icon
                    ref="ruleForm"
                    label-width="80px"
                    :class="{ ruleForm:true }"
                    size="small"
                    label-position="left"
                  >
                    <el-form-item label="项目名" prop="name">
                      <el-input
                        type="text"
                        v-model="ruleForm.name"
                        autocomplete="off"
                        placeholder="项目名"
                      ></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="项目进度" prop="progress">
                      <el-input-number
                        style="float: left;"
                        v-model="ruleForm.progress"
                        placeholder="项目进度(%)"
                        :min="0"
                        :max="100"
                        size="small"
                      ></el-input-number>
                    </el-form-item>-->
                    <el-form-item label="负责人" prop="leader">
                      <el-input
                        type="text"
                        v-model="ruleForm.leader"
                        autocomplete="off"
                        placeholder="负责人"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="项目描述" prop="description">
                      <el-input
                        type="textarea"
                        v-model.number="ruleForm.description"
                        placeholder="项目描述"
                      ></el-input>
                    </el-form-item>
                    <el-row :class="{ dispatchContent:true }">
                      <span style="text-align:left;float:left;font-size:14px;">项目组成员</span>
                      <template v-for="tag in tags">
                        <el-col :key="tag.name" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                          <el-tag
                            style="margin:0 2px 0 2px"
                            closable
                            :type="tag.type"
                            @close="tagClose(tag)"
                          >
                            {{tag.name}} :
                            <el-select
                              v-model="ruleForm.value"
                              placeholder="请分配任务"
                              size="small"
                              style="width:70%"
                            >
                              <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                              ></el-option>
                            </el-select>
                          </el-tag>
                        </el-col>
                      </template>
                    </el-row>
                    <el-form-item style="float:left">
                      <el-button
                        size="mini"
                        plain
                        type="primary"
                        @click="submitForm('ruleForm')"
                      >提交修改</el-button>
                      <el-button size="mini" plain @click="next">进度调整</el-button>
                      <!-- <el-button
                        size="mini"
                        plain
                        type="warning"
                        @click="dispatchVisible = true"
                      >任务分配</el-button>-->
                    </el-form-item>
                  </el-form>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
          <div :class="{ contentField:true }" style="border-color:rgba(230, 162, 60, 0.5)">
            <el-collapse accordion :style="{paddingTop: '0px'}">
              <el-collapse-item>
                <template slot="title">
                  <span style="text-indent:10px;font-size:1rem;">白色外形扩展</span>
                </template>
                <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
          <div :class="{ contentField:true }" style="border-color:#90939980">
            <el-collapse accordion :style="{paddingTop: '0px'}">
              <el-collapse-item>
                <template slot="title">
                  <span style="text-indent:10px;font-size:1rem;">驾驶系统</span>
                </template>
                <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-col>
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
      <!-- <el-select shadow="never" :class="{ dispatchContent:true }">
        <template v-for="tag in tags">
          <el-col :key="tag.name" :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-tag style="margin:0 2px 0 2px" closable :type="tag.type" @close="tagClose(tag)">
              {{tag.name}} :
              <el-select v-model="value" placeholder="请选择" size="small" style="width:60%">
                <el-option-group v-for="group in options" :key="group.label" :label="group.label">
                  <el-option
                    v-for="item in group.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :style="{marginRight: '12px'}"
                  ></el-option>
                </el-option-group>
              </el-select>
            </el-tag>
          </el-col>
        </template>
      </el-select>-->
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
    let options = [
      {
        id: 1,
        label: "前端开发",
        value: "前端开发"
      },
      {
        id: 2,
        label: "系统测试",
        value: "系统测试"
      }
    ];
    let dispatchVisible = false;
    let ruleForm = {
      name: "斗鱼人气处理",
      leader: "赵浩辉",
      description: "通过...为斗鱼平台实现一种操作相对简单的人气监控工具",
      value: ""
    };
    let active = 2;
    let tags = [
      { name: "刘辉", type: "" },
      { name: "堇菜", type: "primary" },
      { name: "何发辉", type: "info" },
      { name: "张佳琪", type: "success" },
      { name: "叶丹", type: "danger" }
    ];
    return {
      options,
      dispatchVisible,
      active,
      ruleForm,
      tags
    };
  },
  methods: {
    next: function() {
      if (this.active++ > 4) this.active = 0;
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
    tagClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    },
    submitForm(formName) {
      this.$message.success({
        message: "修改成功",
        offset: 130
      });
    }
  },
  mounted() {}
};
</script>
<style scoped src="@/assets/css/process.css"></style>
