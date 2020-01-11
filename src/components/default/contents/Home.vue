<template>
  <div class="home">
    <el-card shadow="hover" id="top-card">
      <el-row class="top-card-body" type="flex" justify="start" :gutter="10">
        <el-col :span="8">
          <el-card class="top-left-card" shadow="hover">
            <div style="height:80px">欢迎模块</div>
            <el-divider></el-divider>
            <div style="height:40px">签到模块</div>
          </el-card>
        </el-col>
        <el-col :span="16">
          <el-card class="top-right-card" shadow="hover">
            <el-row :gutter="20" type="flex" justify="space-between">
              <el-col :span="14">
                <div style="height:80px">实时时间</div>
                <el-divider></el-divider>
                <div style="height:40px">实时日期</div>
              </el-col>
              <el-col :span="8">
                <div style="height:169px;">实时定位</div>
              </el-col>
            </el-row>
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
      <el-col>
        {{ getDuang }}
        <el-button @click="getUsers">Axios</el-button>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        url: '#',
        informations: [{
            title: '在线用户',
            body: ['112', '113', '114', '115'],
          },
          {
            title: '管理员',
            body: ['112', '113', '114', '115'],
          },
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
      }
    },
    computed: {
      getDuang() {
        return this.$store.state.duang;
      }
    }
  }
</script>
<style scoped src="@/assets/css/home-style.css"></style>