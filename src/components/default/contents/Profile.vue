<template>
  <div class="pbx el-container">
    <el-col class="leftCard" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
      <el-card shadow="always">
        <div slot="header" class="clearfix top">
          <span>个人信息</span>
        </div>
        <div class="leftContent">
          <div class="userProfile">
            <div class="wel">
              <span>
                廖文岵
              </span>
            </div>
            <el-avatar :size="110" class="avatar"
              src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif" fit="contain"></el-avatar>
            <el-tag type="success" class="authTag" effect="dark">当前权限<el-divider direction="vertical"></el-divider>管理员
            </el-tag>
          </div>
          <section class="tagWall">
            <el-divider></el-divider>
            <span class="header">信息标签墙</span>
            <div class="tags">
              <el-tag v-for="tag in tags" :key="tag.name" closable :type="tag.type" effect="light"
                @close="handleClose(tag)">
                {{tag.name}}<el-divider direction="vertical"></el-divider>{{tag.description}}
              </el-tag>
              <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
                @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </div>
          </section>
        </div>
      </el-card>
    </el-col>
    <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18" class="rightCard">
      <el-card shadow="always" class="rightContent">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="信息修改" name="first">信息修改</el-tab-pane>
          <el-tab-pane label="任务进度" name="second">工作进展</el-tab-pane>
          <el-tab-pane label="角色管理" name="third">出勤情况</el-tab-pane>
          <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
        </el-tabs>
      </el-card>
    </el-col>
  </div>
</template>

<script>
  export default {
    name: 'profile',
    data() {
      let activeName = 'second';
      let tags = [{
          name: '姓名',
          type: '',
          description: '廖文岵'
        },
        {
          name: '职位',
          type: 'success',
          description: 'Python开发'
        },
        {
          name: '年龄',
          type: 'info',
          description: '21'
        },
        {
          name: '性别',
          type: 'warning',
          description: '男'
        },
        {
          name: '出勤',
          type: '',
          description: '连续613天'
        },
        {
          name: '入职时间',
          type: 'info',
          description: '2019-9-12'
        },
        {
          name: '所属部门',
          type: 'success',
          description: '开发'
        },
        {
          name: '等级',
          type: 'danger',
          description: 'Lv2'
        }
      ];
      let inputVisible = false;
      let inputValue = '';
      return {
        activeName,
        tags,
        inputVisible,
        inputValue
      }
    },
    methods: {
      handleClick() {},
      handleClose(tag) {
        this.tags.splice(this.tags.indexOf(tag), 1);
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        const randomType = _ => _[Math.random() * _.length | 0];
        const opts = ['', 'info', 'danger', 'warning', 'success'];
        if (inputValue) {
          let arry = inputValue.split('/');
          let [name, ...description] = arry;
          this.tags.push({
            name,
            type: randomType(opts),
            // description: description.reduce((_, __) => _ + __)
            description: description.reduce((prev, cur) => prev + cur)
          });
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
    },
    computed: {

    },
    watch: {

    }

  }
</script>

<style scoped src="@/assets/css/profile.css"></style>