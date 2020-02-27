<template>
  <div class="home">
    <el-card shadow="hover" style="background: #fafafa">
      <el-row class="top-card-body" type="flex" justify="start" :gutter="10">
        <el-col :span="24">
          <template v-for="(card, index) in cards">
            <el-col :key="index" class="topUnifyStyle" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
              <el-card shadow="hover" v-loading='drawLoading'>
                <el-col :span="10" class="icon">
                  <i :class="card.icon" :style="{color:card.iconColor}"></i>
                </el-col>
                <el-col :span="14" class="msg" :push="2">
                  <el-link class="link" :underline="false">{{card.content}}</el-link>
                  <span class="title">{{card.title}}</span>
                </el-col>
              </el-card>
            </el-col>
          </template>
          <el-card class="top-right-card" shadow="hover" v-loading='drawLoading'>
            <div id="autoClock" v-html="time"></div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    <!-- <el-row type="flex" justify="start" :gutter="20" class="administrators">
      <template v-for="(information, index) in informations">
        <el-col :span="6" :key="index" v-show="information">
          <el-card class="administrators-card" shadow="hover">
            <div slot="header" class="clearfix" style="text-align:left;">
              <el-avatar :size="40" :src="url" fit="contain" shape="square"></el-avatar>
              <span>{{ information.title }}</span>
            </div>
            <div class="administrators-body">
              <template v-for="(list, index2) in information.body">
                <p :key="index2">{{ list }}</p>
              </template>
            </div>
          </el-card>
        </el-col>
      </template>
    </el-row> -->
    <el-divider></el-divider>
    <el-row>
      <template v-for="(item, index) in charts">
        <el-col :span="12" :key="index" :style="{ height: '400px' }" v-loading="drawLoading">
          <div :id="index" :style="{ height: '100%', width: '100%' }"></div>
        </el-col>
      </template>
    </el-row>
    <button @click="getUsers">axios</button>
  </div>
</template>

<script>
  import dayjs from "dayjs";
  export default {
    name: "home",
    data() {
      let url = "#";
      let drawLoading = true;
      let cards = [{
        title: '欢迎使用',
        content: '廖文岵',
        icon: 'el-icon-user-solid',
        iconColor: 'rgb(86, 172, 201)'
      }, {
        title: '系统消息',
        content: '11',
        icon: 'el-icon-message',
        iconColor: 'rgb(178, 92, 212)'
      }, {
        title: '工作报告',
        content: '213',
        icon: 'el-icon-files',
        iconColor: 'rgb(101, 228, 63)'
      }];
      let time = dayjs().format("YYYY年MM月DD日<br>HH:mm:ss");
      let loading = true;
      let charts = [{
          title: {
            text: '折线图堆叠'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
              name: '邮件营销',
              type: 'line',
              stack: '总量',
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '联盟广告',
              type: 'line',
              stack: '总量',
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: '视频广告',
              type: 'line',
              stack: '总量',
              data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
              name: '直接访问',
              type: 'line',
              stack: '总量',
              data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
              name: '搜索引擎',
              type: 'line',
              stack: '总量',
              data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
          ]
        },
        {
          title: {
            text: '权限变化一览',
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['权限变化']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: 'category',
            data: ["普通", "项目负责人", "项目经理", "部门主管", "管理员", "总经理"]
          },
          series: [{
            name: '2011年',
            type: 'bar',
            data: [1820, 189, 190, 80, 14, 0]
          }]
        }
      ];
      return {
        url,
        drawLoading,
        cards,
        time,
        charts,
        loading
      };
    },
    methods: {
      getUsers: function () {
        owl.send({
            url: "http://localhost:8085/userInfo",
            method: "post",
            data: {
              username: "5252342"
            }
          },
          data => {
            console.log(data);
          }
        );
      },
      drawCharts: function () {
        this.charts.forEach((c, idx) => {
          let myChart = this.echarts.init(document.getElementById(idx), {
            render: "svg"
          });
          myChart.setOption(c);
          window.addEventListener("resize", () => {
            myChart.resize();
          });
          setTimeout(() => {
            this.drawLoading = false;
          }, 2000);
        });
      }
    },
    computed: {},
    mounted() {
      //创建定时器更新最新的时间
      var _this = this;
      this.timer = setInterval(() => {
        _this.time = dayjs().format("YYYY年MM月DD日<br>HH:mm:ss");
      }, 1000);
      this.drawCharts();
    },
    beforeDestroy() {
      //实例销毁前清除定时器
      if (this.timer) {
        clearInterval(this.timer);
      }
    }
  };
</script>
<style src="@/assets/css/home-style.css"></style>