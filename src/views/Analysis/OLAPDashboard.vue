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
        :row-height="250"
        :is-draggable="true"
        :is-resizable="true"
        :is-mirrored="false"
        :vertical-compact="true"
        :margin="[3, 3]"
        :use-css-transforms="true"
      >
        <!-- <grid-item v-for="item in testLayout"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          :key="item.i"
          dragAllowFrom=".grid-item-header">
          <div class="grid-item-header">
            {{ item.i + ' ' }}
            <span class="iconfont icon-download item-icons" @click="downloadPrompt"></span>
            <span class="iconfont icon-DataAnalysisAI-M-OLAP item-icons"></span>
          </div>
          <div class="grid-item-content"><echarts-line :chartData="Option"></echarts-line></div>
        </grid-item> -->
        <grid-item :x="testLayout[0].x" :y="testLayout[0].y" :w="testLayout[0].w" :h="testLayout[0].h" :i="testLayout[0].i" dragAllowFrom=".grid-item-header" @resized="itemResize">
          <div class="grid-item-header">
            {{ testLayout[0].i + ' ' }}
            <span class="iconfont icon-download item-icons" @click="downloadPrompt"></span>
            <span class="iconfont icon-DataAnalysisAI-M-OLAP item-icons"></span>
          </div>
          <div class="grid-item-content" :id="'grid-item-' + testLayout[0].i"><echarts-line :chartData="Option" :chartIndex="testLayout[0].i"></echarts-line></div>  
        </grid-item>
        <grid-item :x="testLayout[1].x" :y="testLayout[1].y" :w="testLayout[1].w" :h="testLayout[1].h" :i="testLayout[1].i" dragAllowFrom=".grid-item-header" @resized="itemResize">
          <div class="grid-item-header">
            {{ testLayout[1].i + ' ' }}
            <span class="iconfont icon-download item-icons" @click="downloadPrompt"></span>
            <span class="iconfont icon-DataAnalysisAI-M-OLAP item-icons"></span>
          </div>
          <div class="grid-item-content" :id="'grid-item-' + testLayout[1].i"><echarts-line :chartData="Option" :chartIndex="testLayout[1].i"></echarts-line></div>  
        </grid-item>
      </grid-layout>
    </div>
    <el-dialog
      title="下载多维分析结果"
      :visible.sync="dialogVisible"
      width="30%">
      <span>选择保存：TPV温压风数据场-高度500米切片？</span>
      <div style="margin: 20px 0;">输出格式选择：</div>
      <div style="padding-left: 20px;"> 
        <el-radio v-model="radio" label="1">txt</el-radio>
        <el-radio v-model="radio" label="2">csv</el-radio>
        <el-radio v-model="radio" label="3">excel</el-radio>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
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
      Option: {},
      dialogVisible: false,
      radio: 1
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      this.Option = {
        title: {
          text: '纬度温度关系曲线'
        },
        toolbox: { 
          show: true,
          feature: {
            saveAsImage: {
              show: true,
              excludeComponents: ['toolbox'],
              pixelRatio: 2
            }
          }
        },        
        tooltip: { 
          trigger: 'axis',       
            axisPointer: {               
            //  label:{show:true},
            type: 'cross'
          } 
        },
        legend: {
          show:false,
          data: ['温度']
        },
        xAxis: {
          data: [],         
          name:'纬度(°)',
            axisLabel: {
          }       
        },
        yAxis: {
          splitLine: { show: false },//去除网格线
          name: '度(°C)',        
          axisPointer: {
            snap: true  
          }        
        }, 
        dataZoom: [
          {   // 这个dataZoom组件，默认控制x轴。
            type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            start: 10,      // 左边在 10% 的位置。
            end: 60         // 右边在 60% 的位置。
          },
          {   // 这个dataZoom组件，也控制x轴。
            type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
            start: 10,      // 左边在 10% 的位置。
            end: 20         // 右边在 60% 的位置。
          },       
          {
            type: 'slider',
            show:false,
            yAxisIndex: 0,
            start: 95,
            end: 100
          },
          {
            type: 'inside',
            yAxisIndex: 0,
            start: 10,
            end: 60
          }
        ],     
        series: [{
          barWidth: "30px",
          name: '温度',
          type: 'line',
          itemStyle: {
            normal: {
              label: {
                // show: true,    //用于点数据显示，数据多的时候效果差
                position: 'top',
                textStyle: {
                  color: '#333'
                }
              }
            }
          },
          data: []
        }]
	    }
    },
    downloadPrompt () {
      this.dialogVisible = true
    },
    itemResize (i, newH, newW, newHPx, newWPx) {
      let parentDiv = document.querySelector('#grid-item-' + i)
      let chartsDiv = parentDiv.childNodes[0]
      chartsDiv.style.height = newH * 250 * 0.9
      chartsDiv.style.width = newW * 530
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
    line-height: 24px;
    padding-left: 10px;
    background: #EBEEF5;
  }
  .grid-item-content{
    height: 90%;
    /* width: 100%; */
    margin-bottom: 0;
    padding: 0 10px;
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
  .item-icons {
    line-height: 20px;
    cursor: pointer;
    float: right;
    margin: 2px 10px;
  }
  .item-icons:hover {
    border: 1px solid #409eff;
  }
</style>