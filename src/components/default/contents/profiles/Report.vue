<template>
  <div class="infinite-list-wrapper">
    <el-card shadow="never" :class="{topBtn:true}">
      <div class="clearfix animated">
        <transition appear appear-active-class="bounceInLeft" enter-active-class="bounceInLeft">
          <el-tooltip effect="light" content="添加日志" placement="top">
            <el-button
              type="success"
              class="animated"
              icon="el-icon-plus"
              plain
              circle
              @click="dialog = true"
            ></el-button>
          </el-tooltip>
        </transition>
        <transition appear appear-active-class="bounceInLeft" enter-active-class="bounceInLeft">
          <el-tooltip effect="light" content="反序" placement="top">
            <el-button type="primary" class="animated delay-1s" circle icon="el-icon-sort" plain></el-button>
          </el-tooltip>
        </transition>
        <transition appear appear-active-class="bounceInLeft" enter-active-class="bounceInLeft">
          <el-tooltip effect="light" content="导入工作日志" placement="top">
            <el-button
              type="warning"
              class="animated delay-2s"
              icon="el-icon-upload2"
              circle
              plain
            ></el-button>
          </el-tooltip>
        </transition>
        <transition appear appear-active-class="bounceInLeft" enter-active-class="bounceInLeft">
          <el-tooltip effect="light" content="导出工作日志" placement="top">
            <el-button
              class="animated delay-3s"
              icon="el-icon-download"
              circle
              plain
            ></el-button>
          </el-tooltip>
        </transition>
      </div>
    </el-card>
    <el-timeline
      v-infinite-scroll="load"
      infinite-scroll-disabled="disabled"
      :class="{timeLine: true}"
    >
      <el-timeline-item
        :timestamp="rep.timestamp"
        placement="top"
        v-for="(rep,i) in reports"
        :key="i"
      >
        <el-card :key="'timeline' + i" shadow="hover">
          <h4>{{ rep.title }}</h4>
          <p>{{ rep.content }}</p>
        </el-card>
      </el-timeline-item>
      <el-card shadow="never" :class="{loadingCard:true}">
        <span v-if="loading" v-loading="loading"></span>
        <span
          v-if="noMore"
          :style="{marginLeft:'28px',fontWeight:'bold',color:'rgba(0,0,0,.6)'}"
        >没有更多了</span>
      </el-card>
    </el-timeline>
    <el-drawer
      :before-close="handleClose"
      :visible.sync="dialog"
      direction="btt"
      :append-to-body="true"
      :close-on-press-escape="true"
      ref="drawer"
      size="70%"
      :destroy-on-close="true"
      :wrapperClosable="true"
    >
      <span slot="title" style="text-align:center;font-size:30px">
        <b>工作日志</b>
      </span>
      <div class="demo-drawer__content">
        <el-form :model="reportForm" label-position="right">
          <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
            <el-input v-model="reportForm.title" autocomplete="off" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="发布日期" :label-width="formLabelWidth" prop="timestamp">
            <el-date-picker
              v-model="reportForm.timestamp"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              :picker-options="pickerOptions"
              :style="formLabelWidth"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="内容" :label-width="formLabelWidth" prop="content">
            <quillEditor
              v-model="reportForm.content"
              ref="myQuillEditor"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @change="onEditorChange($event)"
            />
          </el-form-item>
        </el-form>
        <div :class="{drawerFooter:true}">
          <el-button
            round
            plain
            type="success"
            @click="$refs.drawer.closeDrawer()"
            :loading="loading"
            :class="{drawerBtn1:true}"
          >{{ loading ? '提交中 ...' : '确 定' }}</el-button>
          <el-button @click="cancelForm" type="warning" round plain>取 消</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import dayjs from "dayjs";
import { quillEditor } from "vue-quill-editor"; // 调用富文本编辑器
import "quill/dist/quill.snow.css"; // 富文本编辑器外部引用样式  三种样式三选一引入即可
import * as Quill from "quill"; // 富文本基于quill
export default {
  name: "report",
  components: {
    quillEditor
  },
  data() {
    let count = 4;
    let reports = [];
    const origin = [];
    let loading = false;
    // let editor = null;
    let reportForm = {
      id: "",
      title: "",
      content: "",
      timestamp: dayjs().format("YYYY-MM-DD HH:mm:ss")
    };
    let dialog = false;
    const formLabelWidth = "80px";
    let timer = null;
    const editorOption = {
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"], //加粗，斜体，下划线，删除线
          ["blockquote", "code-block"], //引用，代码块
          [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
          [{ list: "ordered" }, { list: "bullet" }], //列表
          [{ script: "sub" }, { script: "super" }], // 上下标
          [{ indent: "-1" }, { indent: "+1" }], // 缩进
          [{ direction: "rtl" }], // 文本方向
          [{ size: ["small", false, "large", "huge"] }], // 字体大小
          [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题
          [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
          [{ font: [] }], //字体
          [{ align: [] }], //对齐方式
          ["clean"] //清除字体样式
          // ['image','video'] //上传图片、上传视频
        ]
      },
      placeholder: "请输入内容"
    };
    const pickerOptions = {
      disabledDate(time) {
        return time.getTime() > Date.now();
      },
      shortcuts: [
        {
          text: "今天",
          onClick(picker) {
            picker.$emit("pick", new Date());
          }
        },
        {
          text: "昨天",
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit("pick", date);
          }
        },
        {
          text: "一周前",
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit("pick", date);
          }
        }
      ]
    };
    return {
      pickerOptions,
      // editor,
      editorOption,
      reportForm,
      formLabelWidth,
      timer,
      count,
      reports,
      loading,
      origin,
      dialog
    };
  },
  methods: {
    load() {
      if (this.count > 4) {
        this.loading = true;
        setTimeout(() => {
          this.count += 1;
          this.loading = false;
        }, 2000);
      } else {
        this.count += 1;
      }
    },
    initOrigin() {
      // console.log("initOrigin " + this.origin);
      if (this.origin.length == 0) {
        const init = () => [
          {
            id: 1,
            title: "工作总结",
            content: "更新GitHub模板",
            timestamp: dayjs().format("YYYY-MM-DD HH:mm:ss")
          },
          {
            id: 2,
            title: "工作总结",
            content: "完成销售信息展示",
            timestamp: dayjs().format("YYYY-MM-DD HH:mm:ss")
          },
          {
            id: 3,
            title: "工作总结",
            content: "吃的很饱",
            timestamp: dayjs().format("YYYY-MM-DD HH:mm:ss")
          },
          {
            id: 4,
            title: "工作总结",
            content: "下饭下饭",
            timestamp: dayjs().format("YYYY-MM-DD HH:mm:ss")
          },
          {
            id: 5,
            title: "工作总结",
            content: "我擦",
            timestamp: dayjs().format("YYYY-MM-DD HH:mm:ss")
          },
          {
            id: 6,
            title: "工作总结",
            content: "绝了",
            timestamp: dayjs().format("YYYY-MM-DD HH:mm:ss")
          },
          {
            id: 7,
            title: "工作总结",
            content: "是的",
            timestamp: dayjs().format("YYYY-MM-DD HH:mm:ss")
          },
          {
            id: 8,
            title: "工作总结",
            content: "淦",
            timestamp: dayjs().format("YYYY-MM-DD HH:mm:ss")
          }
        ];
        this.origin = init();
      } else {
        return this.origin;
      }
    },
    SyncCount() {
      let count = this.count;
      let repLength = this.reports.length | 0;
      // console.log(
      //   "SyncCount: " +
      //     count +
      //     "||" +
      //     repLength +
      //     "||" +
      //     this.origin.slice(repLength, count++)
      // );
      this.origin.slice(repLength, count).forEach(_ => {
        this.reports.push(_);
      });
    },
    onEditorReady(editor) {}, // 准备编辑器
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {}, // 内容改变事件
    saveHtml: function(event) {
      alert(this.content);
    },
    handleClose(done) {
      // if (this.loading) {
      //   return;
      // }
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
      // this.$confirm("确定要提交表单吗？")
      //   .then(_ => {
      //     this.loading = true;
      //     this.timer = setTimeout(() => {
      //       done();
      //       // 动画关闭需要一定的时间
      //       setTimeout(() => {
      //         this.loading = false;
      //       }, 400);
      //     }, 2000);
      //   })
      //   .catch(_ => {});
    },
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    }
  },
  computed: {
    noMore() {
      // console.log(`noMore: ${this.origin.length} , ${this.count}`);
      return this.origin.length === this.count;
    },
    disabled() {
      // console.log(`noMore: ${this.loading} , ${this.noMore}`);
      return this.loading || this.noMore;
    },
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  watch: {
    count: {
      handler: "SyncCount",
      immediate: false
    },
    origin: {
      handler: "initOrigin",
      immediate: true
    }
  },
  mounted() {}
};
</script>

<style scoped src="@/assets/css/report.css"></style>
<style>
.edit_container {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.ql-editor {
  height: 150px;
  width: 50%;
}
.drawerBtn1 {
  margin-left: 80px !important;
}
</style>