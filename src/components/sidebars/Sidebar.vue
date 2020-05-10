<template>
  <el-row class="side">
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <el-menu
        default-active="/index"
        class="el-menu-vertical-demo"
        :collapse="collapse"
        background-color="  #090a39"
        text-color="#fff"
        unique-opened
        active-text-color="#ffd04b"
        @select="activeTab"
      >
        <el-menu-item @click="changeCollapse" style="text-align:auto;" index="switch">
          <i class="el-icon-s-unfold" :class="{'el-icon-s-fold':!collapse}"></i>
          <span slot="title">{{ swiBar }}</span>
        </el-menu-item>
        <el-divider></el-divider>

        <el-menu-item index="home">
          <i class="el-icon-monitor"></i>
          <span slot="title">控制台</span>
        </el-menu-item>
        <el-divider></el-divider>
        <template v-for="(router, index) in routers">
          <el-submenu :index="router.path" :key="index">
            <template slot="title">
              <i :class="router.meta.icon"></i>
              <span slot="title">{{ router.meta.title }}</span>
            </template>
            <template v-for="child in router.children">
              <el-menu-item-group :key="child.name">
                <el-menu-item :index="child.path">{{ child.meta.title }}</el-menu-item>
              </el-menu-item-group>
            </template>
          </el-submenu>
          <el-divider :key="'d'+{index}"></el-divider>
        </template>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "sideBar",
  data() {
    const isCollapse = this.collapse;
    const switchBar = this.swiBar;
    const routers = [];
    return {
      isCollapse,
      switchBar,
      routers
    };
  },
  methods: {
    ...mapMutations({
      SET_COLLAPSE: "sideBar/SET_COLLAPSE",
      ADD_TAB: "main/addTab",
      CHANGE_PROFILE: "profile/CHANGE_TAB"
    }),
    changeCollapse() {
      // this.NProgress.inc(0.2)
      // this.$store.commit('sideBar/SET_COLLAPSE');
      // setTimeout(() => {
      this.SET_COLLAPSE();
      // this.NProgress.done()
      // }, 3000);
    },
    activeTab(index, indexPath) {
      // console.log(`${index}||${indexPath}`);
      if( index == "switch" ){
        return;
      }
      let centers = ["detail", "information", "report", "request", "process","analyze"];
      if (index != null) {
        if (centers.indexOf(index) != -1) {
          this.ADD_TAB("profile");
          this.CHANGE_PROFILE(index)
        } else {
        this.ADD_TAB(index);
        }
      }
    }
  },
  computed: {
    ...mapState({
      store_isCollapse: state => state.sideBar.isCollapse,
      store_switchBar: state => state.sideBar.switchBar
    }),
    collapse: function() {
      return this.store_isCollapse;
    },
    swiBar: function() {
      return this.store_switchBar;
    },
    Routers: function() {
      return this.$router.options.routes
        .filter(r => r.path != "/index")
        .filter(r => r.name != "Base")
        .filter(r => r.name != "Login");
    }
  },
  watch: {
    isCollapse: () => {
      this.isCollapse = this.collapse;
    }
  },
  mounted() {
    this.isCollapse = this.collapse;
    this.routers = this.Routers;
    // console.log(this.Routers);

    // this.routers.forEach(e => e.children.forEach(e=>console.log(e.meta.title)));
  }
};
</script>
<style src="@/assets/css/sidebar-global.css"></style>