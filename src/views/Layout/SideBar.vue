<template>
  <div class="page-sidebar">
    <ul class="page-sidebar-menu">
      <template v-if="route == 'configuration'">
        <router-link tag="li" class="menu-item no-sub-menu" to="/configuration/datacubeconfig">
          <a class="menu-link">
            <span class="iconfont icon-configuration"></span>
            <span class="menu-name">数据立方配置</span>
          </a>
        </router-link>
        <router-link tag="li" class="menu-item has-sub-menu" to="/configuration/datacubemanage">
          <a class="menu-link">
            <span class="iconfont icon-management2"></span>
            <span class="menu-name">数据立方管理</span>
            <span class="iconfont icon-arrowdown" v-if="expand" @click="expand = !expand"></span>
            <span class="iconfont icon-arrow-right" v-else @click="expand = !expand"></span>
          </a>
        </router-link>
        <ul v-if="expand">
          <router-link tag="li" class="menu-item no-sub-menu sub-item" to="/configuration/datacubemanage/atmosphere">
            <a class="menu-link">
              <span class="iconfont icon-icons-atmospheric"></span>
              <span class="menu-name">大气环境</span>
            </a>
          </router-link>
          <router-link tag="li" class="menu-item no-sub-menu sub-item" to="/configuration/datacubemanage/ocean">
            <a class="menu-link">
              <span class="iconfont icon-digital-ocean"></span>
              <span class="menu-name">海洋环境</span>
            </a>
          </router-link>
          <router-link tag="li" class="menu-item no-sub-menu sub-item" to="/configuration/datacubemanage/land">
            <a class="menu-link">
              <span class="iconfont icon-tudi"></span>
              <span class="menu-name">陆地环境</span>
            </a>
          </router-link>
          <router-link tag="li" class="menu-item no-sub-menu sub-item" to="/configuration/datacubemanage/space">
            <a class="menu-link">
              <span class="iconfont icon-spaceshuttle"></span>
              <span class="menu-name">空间环境</span>
            </a>
          </router-link>
        </ul>
      </template>
      <template v-if="route == 'analysis'">
        <router-link tag="li" class="menu-item" to="/analysis/OLAP">
          <a class="menu-link">
            <span class="iconfont icon-dataanalysis"></span>
            <span class="menu-name">数据多维分析</span>
          </a>
        </router-link>
        <ul>
          <router-link tag="li" class="menu-item no-sub-menu sub-item" :to="`/analysis/OLAP/${dashboard.dashboardId}`"
           v-for="dashboard in dashboards" :key="dashboard.dashboardId">
            <a class="menu-link">
              <span class="iconfont icon-dashboard"></span>
              <span class="menu-name">{{ dashboard.dashboardName }}</span>
            </a>
          </router-link>
        </ul>
      </template>
      <template v-if="route == 'datamining'">
        <router-link tag="li" class="menu-item" to="/datamining">
          <a class="menu-link">
            <span class="iconfont icon-shujuwajue"></span>
            <span class="menu-name">数据挖掘</span>
          </a>
        </router-link>
      </template>    
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data(){
    return {
      expand: true
    }
  },
  computed:{
    route: function () {
      this.query = ''
      return this.$route.path.split('/')[1]
    },
    ...mapState({
      dashboards: state => state.analysis.dashboards
    })
  }
}
</script>

<style lang="stylus" scoped>
  .page-sidebar
    width 100%
    text-align left
    .page-sidebar-menu
      font-size 14px
      .no-sub-menu
      .menu-item
        &.router-link-active
          background-color: #E6F1FC;
          border-right: 2px solid #1989FA;
        display inline-flex
        width 100%
        min-height 54px
        padding 17px 16px
        color #333b49
        &:hover
          background-color #F5F7FA
        .menu-link
          text-decoration none
          width 100%
          display inline-flex
          .menu-icon
            color #333B49
          .iconfont
            color #333B49
          .menu-name
            display inline-block
            color #333B49
            margin-left 8px
            white-space nowrap
            overflow hidden
            text-overflow ellipsis
            flex 1    
      // .sub-item       
      //   padding-left 30px
      //   >a
      //     .menu-name
      //       margin-left 30px
</style>