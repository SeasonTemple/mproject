<template>
  <div class="home">
    <el-card shadow="hover" id="top-card">
      <el-row class="top-card-body" type="flex" justify="start" :gutter="10">
        <el-col :span="5">
          <el-card class="top-left-card" shadow="hover">
            <div>欢迎信息模块</div>
          </el-card>
        </el-col>
        <el-col :span="5">
          <el-card class="top-centerLeft-card" shadow="hover">
            <div>系统消息简报</div>
          </el-card>
        </el-col>
        <el-col :span="5">
          <el-card class="top-center-card" shadow="hover">
            <div>工作报告数量</div>
          </el-card>
        </el-col>
        <el-col :span="5">
          <el-card class="top-centerRight-card" shadow="hover">
            <div>签到模块</div>
          </el-card>
        </el-col>
        <el-col :span="5">
          <el-card class="top-right-card" shadow="hover">
            <div id="autoClock" v-html="time"></div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    <el-row type="flex" justify="start" :gutter="20" class="administrators">
      <template v-for="(information,index) in informations">
        <el-col :span="6" :key="index" v-show="information">
          <el-card class="administrators-card" shadow="hover">
            <div slot="header" class="clearfix" style="text-align:left;">
              <el-avatar :size="40" :src="url" fit="contain" shape="square"></el-avatar>
              <span>{{ information.title }}</span>
            </div>
            <div class="administrators-body">
              <template v-for="(list,index2) in information.body">
                <p :key="index2">{{ list }}</p>
              </template>
            </div>
          </el-card>
        </el-col>
      </template>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <template v-for="(item,index) in charts">
        <el-col :span="12" :key="index" :style="{'height':'400px'}" v-loading="drawLoading">
          <div :id='index' :style="{'height':'100%','width':'100%'}"></div>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script>
  import dayjs from "dayjs";
  export default {
    name: 'home',
    data() {
      return {
        url: '#',
        drawLoading: true,
        informations: [{
            title: '在线用户',
            body: ['112', '113', '114', '115'],
          },
          {
            title: '管理员',
            body: ['112', '113', '114', '115'],
          }
        ],
        time: dayjs().format('YYYY年MM月DD日<br>HH:mm:ss'),
        charts: [{
            title: {
              text: '权限对应XX可视化图表1'
            },
            tooltip: {},
            legend: {
              right: 0,
              top: 20,
              data: ['销量']
            },
            xAxis: {
              data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [{
              name: '销量',
              type: 'bar',
              height: "100%",
              width: "100%",
              data: [5, 20, 36, 10, 10, 20]
            }],
            textStyle: {
              color: 'rgba(0, 0, 0, 0.8)'
            },
          },
          {
            title: {
              text: '权限对应XX可视化图表2'
            },
            tooltip: {},
            legend: {
              right: 'center',
              top: '10%',
              data: ['销量']
            },
            xAxis: {
              data: ["人事", "开发", "运营", "实施", "编外", "海外"]
            },
            yAxis: {},
            series: [{
              name: '销量',
              type: 'bar',
              data: [5, 23, 16, 8, 3, 3]
            }],
            textStyle: {
              color: 'rgba(0, 0, 0, 0.8)'
            }
          }
        ]
      }
    },
    methods: {
      getUsers: function () {
        // http://localhost:8085/users
        // api/users
        this.axios.get('/api/users')
          .then((res) => {
            console.log(res.data)
          }).catch((err) => {
            console.log('警告: 由api获取users数据失败！错误信息为: ' + err.message)
          })
      },
      drawCharts: function () {
        this.charts.forEach((c, idx) => {
          let myChart = this.echarts.init(document.getElementById(idx), {
            render: 'svg'
          })
          myChart.setOption(c);
          window.addEventListener("resize", () => {
            myChart.resize();
          });
          setTimeout(() => {
            this.drawLoading = false
          }, 2000);

        })
      }
    },
    computed: {

    },
    mounted() {
      //创建定时器更新最新的时间
      var _this = this;
      this.timer = setInterval(() => {
        _this.time = dayjs().format('YYYY年MM月DD日<br>HH:mm:ss');
      }, 1000);
      this.drawCharts()
    },
    beforeDestroy() {
      //实例销毁前清除定时器
      if (this.timer) {
        clearInterval(this.timer);
      }
    },
  }
</script>
<style scoped src="@/assets/css/home-style.css"></style>