<template>
  <div class="page-wrapper">
    <div class="page-navbar-wrapper">
      <div class="page-navbar-logo">
        <router-link to="/" class="logo-link">
          数据立方库
        </router-link>
      </div>
      <div class="page-navbar-menu">
        <router-link to="/configuration" class="route-item">数据配置</router-link>
        <router-link to="/analysis" class="route-item">数据分析</router-link>
        <router-link to="/datamining" class="route-item">数据挖掘</router-link>
      </div>
      <div class="page-navbar-perf">
        <span class="iconfont icon-admin1"></span>
        <span class="perf-info">admin</span>
        <span class="iconfont icon-arrowdown"></span>
      </div>
    </div>
    <div class="page-container-wrapper">
      <div class="page-sidebar-wrapper">
        <side-bar></side-bar>
      </div>
      <div class="page-content-wrapper">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from './SideBar.vue'
// import { mapActions } from 'vuex'

export default {
  components:{
    SideBar
  },
  methods: {
    // ...mapActions(['getWind0']),
  },
  mounted () {
    // this.getWind0()
  },
  computed:{
    routeFirst:function () {
      this.query = ''
      return this.$route.path.split('/')[1]
    }
  }
}
</script>

<style lang="stylus" scoped>
.page-wrapper
  height 100vh
  width 100vw
  .page-navbar-wrapper
    position fixed
    left 0
    top 0
    height 54px
    width 100%
    background #409EFF
    line-height 54px
    z-index 1000
    font-size 16px
    .page-navbar-logo
      height 54px
      width 200px
      display inline-block
      .logo-link
        padding 27px 32px
        color #ffffff
        text-decoration none
    .page-navbar-menu
      display inline-block
      .route-item
        text-decoration none
        color #ffffff
        padding 16px 32px
      .router-link-active
        border-bottom 2px solid #40EEFF
        background-color #4083ff
    .page-navbar-perf
      &:hover
        background-color #4083ff
      float right
      margin-right 40px
      padding 0px 20px
      height 54px
      .icon-admin1
        font-size 20px
        color white
      .perf-info
        color white
      .icon-arrowdown
        font-size 12px
        color white
  .page-container-wrapper
    padding-top 54px
    width 100%
    height 100%
    display flex
    .page-sidebar-wrapper
      width 200px
      border-right 1px solid #DFE2EE
      overflow-y auto
    .page-content-wrapper
      position relative
      height 100%
      overflow auto
      flex 1
</style>