<template>
  <div class="dashboard-wrapper">
    <div class="graph-style-wrapper">
      <div class="graph-content-expand"><span class="iconfont" :class="{ 'icon-rightarrow8f': expand, 'icon-leftarrow8f': !expand }" @click=" expand = !expand "></span></div>
      <div class="graph-content-icons" v-if="expand">
        <div class="iconfont icon-line-chart"></div>
        <div class="iconfont icon-bar-chart"></div>
        <div class="iconfont icon-pie-chart"></div>
        <div class="iconfont icon-3D"></div>
        <div class="iconfont icon-map-chart"></div>
      </div>
    </div>
    <div class="graph-content-wrapper">
      <grid-layout
        :layout.sync="testLayout"
        :col-num="3"
        :row-height="210"
        :is-draggable="true"
        :is-resizable="true"
        :is-mirrored="false"
        :vertical-compact="true"
        :margin="[3, 3]"
        :use-css-transforms="true"
      >
        <grid-item v-for="item in testLayout"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          :key="item.i"
          dragAllowFrom=".grid-item-header">
          <div class="grid-item-header">{{ item.i }}</div>
          <div class="grid-item-content"><echarts-line :chartData="Option"></echarts-line></div>
        </grid-item>
      </grid-layout>
    </div>
  </div>
</template>

<script>
import VueGridLayout from 'vue-grid-layout'
import EchartsLine from '@/components/EchartsLine.vue'

export default {
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    EchartsLine
  },
  data () {
    return {
      expand: true,
      testLayout: [
        {"x":0,"y":0,"w":1,"h":1,"i":"0"},
        {"x":1,"y":0,"w":1,"h":1,"i":"1"},
        {"x":2,"y":0,"w":1,"h":1,"i":"2"},
        {"x":0,"y":1,"w":1,"h":1,"i":"3"},
        {"x":1,"y":1,"w":1,"h":1,"i":"4"},
        {"x":2,"y":1,"w":1,"h":1,"i":"5"},
        {"x":0,"y":2,"w":1,"h":1,"i":"6"},
        {"x":1,"y":2,"w":1,"h":1,"i":"7"},
        {"x":2,"y":2,"w":1,"h":1,"i":"8"}
      ],
      Option: {}
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      this.Option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      }
    }
  },
  watch: {
    expand: {
      handler(newval, oldval){
        this.$nextTick(() => {
          var elem = document.querySelector('.graph-content-wrapper')
          if(newval){
            elem.style.right  = '60px'
          }else{
            elem.style.right  = '21px'
          }
        })
      },
      immediate: true
    }
  }
}
</script>

<style>
  .graph-content-wrapper{
    top: 10px;
    left: 10px;
    position: absolute;
    right: 60px;
  }
  .graph-style-wrapper{
    top: 70px;
    right: 0;
    bottom: 20px;
    position: fixed;
    border: 1px #DFE2EE solid;
    border-radius: 5px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.22);
    display: flex;
  }
  .graph-content-expand{
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .grid-item-header{
    height: 10%;
    background: #EBEEF5;
  }
  .grid-item-content{
    height: 90%;
    border: 1px #EBEEF5 solid;
  }
  .icon-rightarrow8f:hover, .icon-leftarrow8f:hover{
    color: #409eff;
  }
  .icon-line-chart, .icon-bar-chart, .icon-pie-chart, .icon-3D, .icon-map-chart{
    padding: 10px 10px 10px 5px;
    font-size: 24px;
  }
  .icon-line-chart:hover, .icon-bar-chart:hover, 
  .icon-pie-chart:hover, .icon-3D:hover, .icon-map-chart:hover{
    background-color:#F5F7FA;
    color: #409eff;
  }
</style>