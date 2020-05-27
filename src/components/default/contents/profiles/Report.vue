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
          <el-tooltip effect="light" :content="!reverseBtn?'反序显示':'正序显示'" placement="top">
            <el-button
              type="primary"
              class="animated delay-1s"
              circle
              icon="el-icon-sort"
              :plain="!reverseBtn"
              @click="reverse"
            ></el-button>
          </el-tooltip>
        </transition>
        <transition appear appear-active-class="bounceInLeft" enter-active-class="bounceInLeft">
          <el-tooltip effect="light" content="导入工作日志" placement="top">
            <el-button type="warning" class="animated delay-2s" icon="el-icon-upload2" circle plain></el-button>
          </el-tooltip>
        </transition>
        <transition appear appear-active-class="bounceInLeft" enter-active-class="bounceInLeft">
          <el-tooltip effect="light" content="导出工作日志" placement="top">
            <el-button
              class="animated delay-3s"
              icon="el-icon-download"
              circle
              @click="editFormVisible = true"
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
        :timestamp="rep.publish"
        placement="top"
        v-for="(rep,i) in reports"
        :key="i"
      >
        <el-card :key="'timeline' + i" shadow="hover">
          <h4>{{ rep.title }}</h4>
          <p v-html="rep.content"></p>
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
          <el-form-item label="发布日期" :label-width="formLabelWidth" prop="publish">
            <el-date-picker
              v-model="reportForm.publish"
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
            @click="reportSubmit"
            :loading="loading"
            :class="{drawerBtn1:true}"
          >{{ loading ? '提交中 ...' : '确 定' }}</el-button>
          <el-button @click="cancelForm" type="warning" round plain>取 消</el-button>
        </div>
      </div>
    </el-drawer>
    <el-dialog
      title="导出日志"
      :visible.sync="editFormVisible"
      :append-to-body="true"
      top="25vh"
      width="400px"
    >
      <el-card shadow="never">
        <el-radio-group v-model="radio" :style="{userSelect: 'false',outlineStyle: 'none'}">
          <el-radio-button :label="0">最近一周</el-radio-button>
          <el-radio-button :label="1">最近两周</el-radio-button>
          <el-radio-button :label="2">最近一个月</el-radio-button>
        </el-radio-group>
      </el-card>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="editFormVisible = false">取 消</el-button>
        <el-button type="success" @click="generateExcel">下 载</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
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
    let count = 8;
    let reports = [];
    const origin = [];
    let radio = 0;
    let reverseBtn = false;
    let loading = false;
    let editFormWidth = "90px";
    // let editor = null;
    let reportForm = {
      id: "",
      title: "",
      content: "",
      publish: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      owner: ""
    };
    let dialog = false;
    let editFormVisible = false;
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
      placeholder: "请输入内容（最多100字）"
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
      radio,
      editFormVisible,
      editFormWidth,
      pickerOptions,
      reverseBtn,
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
    ...mapActions({
      INIT_REPORTS: "profile/INIT_REPORTS",
      SUBMIT_REPORT: "profile/SUBMIT_REPORT"
    }),
    ...mapGetters({
      Get_UserDetail: "main/USERDETAIL",
      Get_REPORTS: "profile/reports"
    }),
    load() {
      if (this.count > 8) {
        this.loading = true;
        setTimeout(() => {
          this.count += 1;
          this.loading = false;
        }, 1200);
      } else {
        this.count += 1;
      }
    },
    initOrigin() {
      if (
        this.Get_REPORTS().length == 0 ||
        this.Get_REPORTS().length > this.origin.length
      ) {
        this.INIT_REPORTS(this.Get_UserDetail().userName)
          .then(res => {
            this.origin = res;
          })
          .catch(err => {
            console.log(res);
          });
      }
      this.SyncCount();
    },
    SyncCount() {
      // let origin = [];
      if (this.origin.length < 1) {
        return;
      }
      //   origin = this.origin;
      //   console.log(origin);
      // } else if (this.Get_REPORTS().length > 0) {
      //   origin = this.Get_REPORTS();
      //   console.log(origin);
      // } else {
      //   this.initOrigin();
      //   console.log(this.origin);
      // }
      console.log(this.origin);
      let count = this.count;
      let repLength = this.reports.length | 0;
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
    },
    reportSubmit() {
      let form = this.reportForm;
      form.owner = this.Get_UserDetail().userName;
      console.log(this.reportForm);
      this.SUBMIT_REPORT(this.reportForm)
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
      this.origin.push(this.reportForm);
      this.$refs.drawer.closeDrawer();
    },
    reverse() {
      this.reverseBtn = !this.reverseBtn;
      this.reports.reverse();
      // console.log(this.reports);
    },
    generateExcel() {
      let flag = this.radio;
      let origin = this.origin;
      let res = [];
      if (flag == 0) {
        res = origin.filter(o =>
          dayjs()
            .subtract(1, "week")
            .isBefore(o.publish, "date")
        );
        console.log(res);
      } else if (flag == 1) {
        res = origin.filter(o =>
          dayjs()
            .subtract(2, "week")
            .isBefore(o.publish, "date")
        );
        console.log(res);
      } else {
        res = origin.filter(o =>
          dayjs()
            .subtract(1, "month")
            .isBefore(o.publish, "date")
        );
        console.log(res);
        
      }
    }
  },
  computed: {
    ...mapState({}),
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
  beforeMount() {}
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