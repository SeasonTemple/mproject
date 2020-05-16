<template>
  <div class="home">
    <el-card shadow="never" :style="{background: '#fafafa', marginBottom: '30px' }">
      <el-row class="top-card-body" type="flex" justify="start" :gutter="10">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <template v-for="(card, index) in cards">
            <el-col :key="index" class="topUnifyStyle" :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
              <el-card shadow="hover" v-loading="drawLoading">
                <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10" class="icon">
                  <i :class="card.icon" :style="{color:card.iconColor}"></i>
                </el-col>
                <el-col :xs="14" :sm="14" :md="14" :lg="14" :xl="14" class="msg" :push="2">
                  <el-link
                    :class="{link: true}"
                    v-if="index == '0'"
                    :underline="false"
                  >{{card.content}}</el-link>
                  <el-link :class="{link: true}" v-else :underline="false">
                    <countTo :startVal="0" :endVal="card.content" :duration="4000"></countTo>
                  </el-link>
                  <span class="title">{{card.title}}</span>
                </el-col>
              </el-card>
            </el-col>
          </template>
          <el-col class="topUnifyStyle" :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
            <el-card class="top-right-card" shadow="hover" v-loading="drawLoading">
              <el-row>
                <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="icon" :pull="2">
                  <i class="el-icon-time"></i>
                </el-col>
                <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" :pull="1">
                  <div class="autoClock" v-html="time"></div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-col>
      </el-row>
    </el-card>
    <el-row :gutter="20">
      <template v-for="(item, index) in charts">
        <el-col
          :xs="item.span"
          :sm="item.span"
          :md="item.span"
          :lg="item.span"
          :xl="item.span"
          :style="{ height: '400px' ,marginBottom: '30px'}"
          :key="index"
          v-loading="drawLoading"
        >
          <el-card :id="index" :style="{ height: '100%', width: '100%' }" shadow="hover"></el-card>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "home",
  props: {
    userDetail: Object
  },
  data() {
    let drawLoading = true;
    let cards = [];
    let time = dayjs().format("YYYY/MM/DD</br>HH:mm:ss");
    let loading = true;
    let charts = [
      {
        title: {
          text: "周工程情况报表"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            areaStyle: {},
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ],
        span: 24
      },
      {
        title: {
          text: "年龄结构",
          left: "center"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        legend: {
          data: ["value"],
          left: "center",
          top: 30
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: "category",
          data: ["20岁", "30岁", "40岁", "50岁", "60岁"]
        },
        series: [
          {
            name: "20岁",
            type: "bar",
            label: "20岁",
            data: [40, 30, 17, 21, 6]
          }
        ],
        span: 12
      },
      {
        title: {
          text: "月签到情况",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          left: "center",
          top: "bottom",
          data: ["缺席", "缺勤一次", "缺勤两次", "缺勤两次以上", "请假"]
        },
        toolbox: {
          show: true,
          feature: {
            mark: {
              show: true
            },
            dataView: {
              show: true,
              readOnly: false
            },
            magicType: {
              show: true,
              type: ["pie", "funnel"]
            },
            restore: {
              show: true
            },
            saveAsImage: {
              show: true
            }
          }
        },
        series: [
          {
            name: "面积模式",
            type: "pie",
            radius: [30, 110],
            center: ["50%", "50%"],
            roseType: "area",
            data: [
              {
                value: 10,
                name: "缺席"
              },
              {
                value: 5,
                name: "缺勤一次"
              },
              {
                value: 15,
                name: "缺勤两次"
              },
              {
                value: 25,
                name: "缺勤两次以上"
              },
              {
                value: 20,
                name: "请假出差"
              }
            ]
          }
        ],
        span: 12
      }
    ];
    return {
      drawLoading,
      cards,
      time,
      charts,
      loading
    };
  },
  methods: {
    initTopCards: function() {
      let data = [
        {
          title: "欢迎使用",
          content: "",
          icon: "el-icon-user-solid",
          iconColor: "rgb(86, 172, 201)"
        },
        {
          title: "系统消息",
          content: 11,
          icon: "el-icon-bell",
          iconColor: "rgb(178, 92, 212)"
        },
        {
          title: "工作报表",
          content: 213,
          icon: "el-icon-files",
          iconColor: "rgb(101, 228, 63)"
        },
        {
          title: "月签到数",
          content: 721,
          icon: "el-icon-date",
          iconColor: "rgb(255, 57, 22)"
        }
      ];
      if (this.userDetail != null || this.userDetail != "") {
        console.log(data[0] + "..." +  typeof this.userDetail.realName);
      }
      this.cards = data;
    },
    drawCharts: function() {
      this.charts.forEach((c, idx) => {
        let myChart = this.echarts.init(document.getElementById(idx), {
          render: "svg"
        });
        myChart.setOption(c);
        window.addEventListener("resize", () => {
          myChart.resize();
        });
        this.timer = setTimeout(() => {
          this.drawLoading = false;
        }, 2000);
      });
    }
  },
  computed: {
    initDetail: function() {
      this.initTopCards();
    }
  },
  watch: {
    initDetail: function() {
      if (this.cards == [] && this.userDetail != null) {
        this.initTopCards();
      }
    }
  },
  mounted() {
    //创建定时器更新最新的时间
    var _this = this;
    this.timer = setInterval(() => {
      _this.time = dayjs().format("YYYY/MM/DD</br>HH:mm:ss");
    }, 1000);
    this.drawCharts();
  },
  activated() {
    if (this.cards == [] && this.userDetail != null) {
      this.initTopCards();
    }
  },
  beforeDestroy() {
    //实例销毁前清除定时器
    if (this.timer) {
      clearTimeout(this.timer);
      clearInterval(this.timer);
    }
  }
};
</script>
<style src="@/assets/css/home-style.css"></style>