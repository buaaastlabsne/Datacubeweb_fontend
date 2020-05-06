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
            <span class="iconfont icon-DataAnalysisAI-M-OLAP item-icons" @click="olapPrompt"></span>
          </div>
          <div class="grid-item-content" :id="'grid-item-' + testLayout[0].i"><echarts-line :chartData="option0" :chartIndex="testLayout[0].i"></echarts-line></div>  
        </grid-item>
        <grid-item :x="testLayout[1].x" :y="testLayout[1].y" :w="testLayout[1].w" :h="testLayout[1].h" :i="testLayout[1].i" dragAllowFrom=".grid-item-header" @resized="itemResize">
          <div class="grid-item-header">
            {{ testLayout[1].i + ' ' }}
            <span class="iconfont icon-download item-icons" @click="downloadPrompt"></span>
            <span class="iconfont icon-DataAnalysisAI-M-OLAP item-icons" @click="olapPrompt"></span>
          </div>
          <div class="grid-item-content" :id="'grid-item-' + testLayout[1].i"><echarts-bar :chartData="option1" :chartIndex="testLayout[1].i"></echarts-bar></div>  
        </grid-item>
        <grid-item :x="testLayout[2].x" :y="testLayout[2].y" :w="testLayout[2].w" :h="testLayout[2].h" :i="testLayout[2].i" dragAllowFrom=".grid-item-header" @resized="itemResize">
          <div class="grid-item-header">
            {{ testLayout[2].i + ' ' }}
            <span class="iconfont icon-download item-icons" @click="downloadPrompt"></span>
            <span class="iconfont icon-DataAnalysisAI-M-OLAP item-icons" @click="olapPrompt"></span>
          </div>
          <div class="grid-item-content" :id="'grid-item-' + testLayout[2].i"><echarts-scatter :chartData="option2" :chartIndex="testLayout[2].i" :loading="loading0"></echarts-scatter></div>  
        </grid-item>
        <grid-item v-if="clickCount >= 1" :x="testLayout[3].x" :y="testLayout[3].y" :w="testLayout[3].w" :h="testLayout[3].h" :i="testLayout[3].i" dragAllowFrom=".grid-item-header" @resized="itemResize">
          <div class="grid-item-header">
            {{ testLayout[3].i + ' ' }}
            <span class="iconfont icon-download item-icons" @click="downloadPrompt"></span>
            <span class="iconfont icon-DataAnalysisAI-M-OLAP item-icons" @click="olapPrompt"></span>
          </div>
          <div class="grid-item-content" :id="'grid-item-' + testLayout[3].i"><echarts-scatter :chartData="option3" :chartIndex="testLayout[3].i"></echarts-scatter></div>  
        </grid-item>
        <grid-item v-if="clickCount >= 2" :x="testLayout[4].x" :y="testLayout[4].y" :w="testLayout[4].w" :h="testLayout[4].h" :i="testLayout[4].i" dragAllowFrom=".grid-item-header" @resized="itemResize">
          <div class="grid-item-header">
            {{ testLayout[4].i + ' ' }}
            <span class="iconfont icon-download item-icons" @click="downloadPrompt"></span>
            <span class="iconfont icon-DataAnalysisAI-M-OLAP item-icons" @click="olapPrompt"></span>
          </div>
          <div class="grid-item-content" :id="'grid-item-' + testLayout[4].i"><echarts-scatter :chartData="option4" :chartIndex="testLayout[4].i"></echarts-scatter></div>  
        </grid-item>
        <grid-item v-if="clickCount >= 3" :x="testLayout[5].x" :y="testLayout[5].y" :w="testLayout[5].w" :h="testLayout[5].h" :i="testLayout[5].i" dragAllowFrom=".grid-item-header" @resized="itemResize">
          <div class="grid-item-header">
            {{ testLayout[5].i + ' ' }}
            <span class="iconfont icon-download item-icons" @click="downloadPrompt"></span>
            <span class="iconfont icon-DataAnalysisAI-M-OLAP item-icons" @click="olapPrompt"></span>
          </div>
          <div class="grid-item-content" :id="'grid-item-' + testLayout[5].i"><echarts-scatter :chartData="option5" :chartIndex="testLayout[5].i"></echarts-scatter></div>  
        </grid-item>
      </grid-layout>
    </div>
    <el-dialog
      title="下载多维分析结果"
      :visible.sync="dialogVisible"
      width="30%">
      <span>选择保存：TPV温压风数据场-高度5000米切片？</span>
      <div style="margin: 20px 0;">输出格式选择：</div>
      <div style="padding-left: 20px;"> 
        <el-radio v-model="radio" label="1">txt</el-radio>
        <el-radio v-model="radio" label="2">csv</el-radio>
        <el-radio v-model="radio" label="3">xls</el-radio>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="❉ 多维分析操作"
      :visible.sync="dialogVisible1"
      width="55%">
      <div class="olap-style">
        <el-card class="olap-item slice-dice">
          <div slot="header" class="clearfix">
            <span class="iconfont icon-slice45"> 切片、切块</span>
            <el-button style="float: right; padding: 3px 0" type="primary" @click="genMDX">生成MDX语句</el-button>
          </div>
          <div>
            <ul>
              <li class="li-title">时间范围</li>
              <li><input class="input-left" type="text" v-model="tsscope.timeStart" /><span class="zhi">至</span><input type="text" class="input-right" v-model="tsscope.timeEnd" /></li>
              <li class="li-title">经度范围</li>
              <li><input class="input-left" type="text" v-model="tsscope.longitudeStart" /><span class="zhi">至</span><input type="text" class="input-right" v-model="tsscope.longitudeEnd" /></li>
              <li class="li-title">纬度范围</li>
              <li><input class="input-left" type="text" v-model="tsscope.latitudeStart" /><span class="zhi">至</span><input type="text" class="input-right"  v-model="tsscope.latitudeEnd" /></li>
              <li class="li-title">高度范围</li>
              <li><input class="input-left" type="text" v-model="tsscope.heightStart" /><span class="zhi">至</span><input type="text" class="input-right" v-model="tsscope.heightEnd" /></li>
              <li class="li-title">深度范围</li>
              <li><input class="input-left" type="text"><span class="zhi">至</span><input type="text" class="input-right" ></li>
            </ul>
          </div>
        </el-card>
        <el-card class="olap-item roll-drill">
          <div slot="header" class="clearfix">
            <span class="iconfont icon-Roll"> 上卷、下钻</span>
            <el-button style="float: right; padding: 3px 0" type="primary">生成MDX语句</el-button>
          </div>
          <div>
            <ul>
              <li class="li-title">按时间钻卷</li>
              <li>
                <span class="zhi1">卷至</span>
                <select name="roll" id="roll1"><option value="">无</option><option v-for="(e, i) in timeDic" :key="i" :value="timeDic">{{ e }}</option></select>
                <span class="zhi2">钻至</span>
                <select name="roll" id="roll1"><option value="">无</option><option v-for="(e, i) in timeDic" :key="i" :value="timeDic">{{ e }}</option></select>
              </li>
              <li class="li-title">按经度钻卷</li>
              <li>
                <span class="zhi1">卷至</span>
                <select name="roll" id="roll1"><option value="">无</option><option v-for="(e, i) in longitudeDic" :key="i" :value="timeDic">{{ e }}</option></select>
                <span class="zhi2">钻至</span>
                <select name="roll" id="roll1"><option value="">无</option><option v-for="(e, i) in longitudeDic" :key="i" :value="timeDic">{{ e }}</option></select>
              </li>
              <li class="li-title">按纬度钻卷</li>
              <li>
                <span class="zhi1">卷至</span>
                <select name="roll" id="roll1"><option value="">无</option><option v-for="(e, i) in latitudeDic" :key="i" :value="timeDic">{{ e }}</option></select>
                <span class="zhi2">钻至</span>
                <select name="roll" id="roll1"><option value="">无</option><option v-for="(e, i) in latitudeDic" :key="i" :value="timeDic">{{ e }}</option></select>
              </li>
              <li class="li-title">按高度钻卷</li>
              <li>
                <span class="zhi1">卷至</span>
                <select name="roll" id="roll1"><option value="">无</option><option v-for="(e, i) in heightDic" :key="i" :value="timeDic">{{ e }}</option></select>
                <span class="zhi2">钻至</span>
                <select name="roll" id="roll1"><option value="">无</option><option v-for="(e, i) in heightDic" :key="i" :value="timeDic">{{ e }}</option></select>
              </li>
              <li class="li-title">按深度钻卷</li>
              <li>
                <span class="zhi1">卷至</span>
                <select name="roll" id="roll1"><option value="">无</option><option v-for="(e, i) in depthDic" :key="i" :value="timeDic">{{ e }}</option></select>
                <span class="zhi2">钻至</span>
                <select name="roll" id="roll1"><option value="">无</option><option v-for="(e, i) in depthDic" :key="i" :value="timeDic">{{ e }}</option></select>
              </li>
            </ul>
          </div>
        </el-card>
        <el-card class="olap-item rotate">
          <div slot="header" class="clearfix">
            <span class="iconfont icon-rotaterightvariant"> 旋转</span>
            <el-button style="float: right; padding: 3px 0" type="primary">生成MDX语句</el-button>
          </div>
          <div class="rotate-dims">
            <div class="rotate-dim">维度1
              <select name="roll" id="roll1" class="dim-select"><option value="">无</option></select>
            </div>
            <span class="iconfont icon-rotaterightvariant"></span>
            <div class="rotate-dim">维度2
              <select name="roll" id="roll1" class="dim-select"><option value="">无</option></select>
            </div>
          </div>
        </el-card>    
      </div>
      <el-card class="measures-cal">
        <div class="dim-title">度量值集合选项</div>
        <div>
          <el-radio v-model="radio1" label="1">AVG</el-radio>
          <el-radio v-model="radio1" label="2">COUNT</el-radio>
          <el-radio v-model="radio1" label="3">MAX</el-radio>
          <el-radio v-model="radio1" label="4">MIN</el-radio>
          <el-radio v-model="radio1" label="5">SUM</el-radio>
        </div>
      </el-card> 
      <el-card class="mdx-generator">
        <div class="dim-title">生成的MDX语句</div>
        <div>
          <textarea name="mdx-query" id="1" cols="30" rows="3" class="mdx-query" v-model="mdx"></textarea>
        </div>
      </el-card> 
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible1 = false, clickCount += 1">执行操作</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import VueGridLayout from 'vue-grid-layout'
import EchartsLine from '@/components/EchartsLine.vue'
import EchartsMap from '@/components/EchartsMap.vue'
import EchartsScatter from '@/components/EchartsScatter.vue'
import EchartsBar from '@/components/EchartsBar.vue'
import dtc2 from '@/assets/dataset/dtc2.js'
import { mapState } from 'vuex'
import 'echarts-gl'
import axios from 'axios'
import { successTip } from '@/utils/common.js'

export default {
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    EchartsLine,
    EchartsMap,
    EchartsScatter,
    EchartsBar
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
      option0: {},
      option1: {},
      option2: {},
      option3: {},
      option4: {},
      option5: {},
      dialogVisible: false,
      dialogVisible1: false,
      radio: 1,
      radio1: 1,
      timeDic: ['年', '季', '月', '旬', '日', '时'],
      longitudeDic: ['10度分区','2度分区', '1度分区', '0.2度分区'],
      latitudeDic: ['10度分区','2度分区', '1度分区', '0.2度分区'],
      heightDic: ['10000米分区', '5000米分区', '1000米分区', '500米分区', '100米分区'],
      depthDic: ['2000米分区', '1000米分区', '500米分区', '100米分区', '50米分区'],
      mdx: '',
      clickCount: 0,
      loading0: false,
      tsscope: {
        timeStart: '2011-4-28-12',
        timeEnd: '2011-4-28-14',
        longitudeStart: '108°E',
        longitudeEnd: '116°E',
        latitudeStart: '15°N',
        latitudeEnd: '23°N',
        heightStart: '5000m',
        heightEnd: '20000m'
      }
    }
  },
  mounted () {
    this.option0 = this.getLineOption()
    this.option1 = this.getBarOption()
    axios.get('http://127.0.0.1:8000/api/windtp')
      .then(response => {
        debugger
        let windtp = response.data.data
        this.option2 = this.getScatterOption(windtp, [108, 116, 15, 23, 0, 20000])
        this.option3 = this.getScatterOption(windtp, [108, 116, 15, 23, 1000, 1000])
        this.option4 = this.getScatterOption(windtp, [108, 116, 15, 23, 5000, 5000])
        this.option5 = this.getScatterOption(windtp, [108, 116, 15, 23, 5000, 10000])
      })
      .catch(error => {

      })
  },
  methods: {
    getLineOption () {
      let names = []
      let nums = []
      dtc2.list.forEach((e, i) => {
        names.push(e.latitude)
        nums.push(e.temperature)
      })
      return {
        title: {
          text: '纬度温度关系曲线'
        },
        // toolbox: { 
        //   show: true,
        //   feature: {
        //     saveAsImage: {
        //       show: true,
        //       excludeComponents: ['toolbox'],
        //       pixelRatio: 2
        //     }
        //   }
        // },        
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
          data: names,         
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
          data: nums
        }]
      }
    },
    genMDX () {
      this.mdx = 'AVG([Measures].[Temperature] SELECT {[Measures].[Temperature]} ON COLUMNS, {[TimeDim].[AllTime], [Longitude].[AllLongitude]' 
      + '[Latitude].[AllLatitude]} ON ROWS FROM [TPV] WHERE ([HeightDim].[5000])'
    },
    // getOption1 () {
    //   let data = []
		// 	let p = 0
		// 	let maxMag = 0
    //   let minMag = Infinity

		// 	for (let j = 15; j <25; j=j+1/5) {
		// 		for (let i = 108; i <= 130; i=i+1/5) {
    //       let p = (i-108)*5+(j-15)*5*110
    //       p=parseInt(p)
    //       let vx = this.wind0Data[p][0]
    //       let vy = this.wind0Data[p][1]
    //       let mag = Math.sqrt(vx * vx + vy * vy)
    //       // 数据是一个一维数组
    //       // [ [经度, 维度，向量经度方向的值，向量维度方向的值] ]
    //       data.push([i,j,vx,vy,mag])
    //       maxMag = Math.max(mag, maxMag)
    //       minMag = Math.min(mag, minMag)
    //     }				
    //   }
    //   console.log(data)
    //   this.option1 = {
		// 		visualMap: {
		// 			left: 'right',
		// 			min: minMag,
		// 			max: maxMag,
		// 			dimension: 4,
		// 			inRange: {
		// 				color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
		// 			},
		// 			realtime: false,
		// 			calculable: true,
		// 			textStyle: {
		// 				color: '#fff'
		// 			}
		// 		},
		// 		bmap: {
		// 			center: [120, 20],
		// 			zoom: 7,
		// 			roam: true,
		// 			mapStyle: {
		// 			'styleJson': [
		// 				{
		// 				'featureType': 'water',
		// 				'elementType': 'all',
		// 				'stylers': {
		// 					'color': '#031628'
		// 				}
		// 				},
		// 				{
		// 				'featureType': 'land',
		// 				'elementType': 'geometry',
		// 				'stylers': {
		// 					'color': '#000102'
		// 				}
		// 				},
		// 				{
		// 				'featureType': 'highway',
		// 				'elementType': 'all',
		// 				'stylers': {
		// 					'visibility': 'off'
		// 				}
		// 				},
		// 				{
		// 				'featureType': 'arterial',
		// 				'elementType': 'geometry.fill',
		// 				'stylers': {
		// 					'color': '#000000'
		// 				}
		// 				},
		// 				{
		// 				'featureType': 'arterial',
		// 				'elementType': 'geometry.stroke',
		// 				'stylers': {
		// 					'color': '#0b3d51'
		// 				}
		// 				},
		// 				{
		// 				'featureType': 'local',
		// 				'elementType': 'geometry',
		// 				'stylers': {
		// 					'color': '#000000'
		// 				}
		// 				},
		// 				{
		// 				'featureType': 'railway',
		// 				'elementType': 'geometry.fill',
		// 				'stylers': {
		// 					'color': '#000000'
		// 				}
		// 				},
		// 				{
		// 				'featureType': 'railway',
		// 				'elementType': 'geometry.stroke',
		// 				'stylers': {
		// 					'color': '#08304b'
		// 				}
		// 				},
		// 				{
		// 				'featureType': 'subway',
		// 				'elementType': 'geometry',
		// 				'stylers': {
		// 					'lightness': -70
		// 				}
		// 				},
		// 				{
		// 				'featureType': 'building',
		// 				'elementType': 'geometry.fill',
		// 				'stylers': {
		// 					'color': '#000000'
		// 				}
		// 				},
		// 				{
		// 				'featureType': 'all',
		// 				'elementType': 'labels.text.fill',
		// 				'stylers': {
		// 					'color': '#857f7f'
		// 				}
		// 				},
		// 				{
		// 				'featureType': 'all',
		// 				'elementType': 'labels.text.stroke',
		// 				'stylers': {
		// 					'color': '#000000'
		// 				}
		// 				},
		// 				{
		// 				'featureType': 'building',
		// 				'elementType': 'geometry',
		// 				'stylers': {
		// 					'color': '#022338'
		// 				}
		// 				},
		// 				{
		// 				'featureType': 'green',
		// 				'elementType': 'geometry',
		// 				'stylers': {
		// 					'color': '#062032'
		// 				}
		// 				},
		// 				{
		// 				'featureType': 'boundary',
		// 				'elementType': 'all',
		// 				'stylers': {
		// 					'color': '#465b6c'
		// 				}
		// 				},
		// 				{
		// 				'featureType': 'manmade',
		// 				'elementType': 'all',
		// 				'stylers': {
		// 					'color': '#022338'
		// 				}
		// 				},
		// 				{
		// 				'featureType': 'label',
		// 				'elementType': 'all',
		// 				'stylers': {
		// 					'visibility': 'off'
		// 				}
		// 				}
		// 			]
		// 			}
		// 		},
		// 		series: [{
    //       name: '风速',
		// 			type: 'flowGL',
		// 			coordinateSystem: 'bmap',
		// 			data: data,
		// 			supersampling: 4,
		// 			particleType: 'line',
		// 			particleDensity: 128,
		// 			particleSpeed: 1,
		// 			// gridWidth: windData.nx,
		// 			// gridHeight: windData.ny,
		// 			itemStyle: {
		// 				opacity: 0.7
		// 			}
		// 		}]
		// 	}
    // },
    getBarOption (){
      var xAxisData = []
		  var data1 = []
      var data1 = [21.63137,19.02525,16.21101,13.94024,14.87747,11.87609,8.6714,5.48986,2.38716,0.56674,-3.47387,-6.43451,-9.41699,
        -12.35499,-14.97863,-17.62286,-20.70047,-23.97555,-27.5856,-31.30864,-35.32278,-39.5526,-43.97107,-48.23724,-52.46902,-56.49288,
        -60.4683,-64.03094,-67.34441,-69.30341,-70.68211,-71.07304,-71.17171,-70.82565,-70.56601,-70.02414,-69.17787,-68.17591,-67.09977,
        -65.84174,-64.39035,-62.73769,-61.23609,-59.84902,-58.70695,-57.68639,-56.91983,-56.37591,-55.59023,-54.40225]	
      var xAxisData=['500','1000','1500','2000','2500','3000','3500','4000','4500','5000','5500','6000','6500','7000','7500','8000','8500',
      '9000','9500','10000','10500','11000','11500','12000','12500','13000','13500','14000','14500','15000','15500','16000','16500','17000',
      '17500','18000','18500','19000','19500','20000','20500','21000','21500','22000','22500','23000','23500','24000','24500','25000']	
		  return {
        legend: {
          data:['温度'],
          align: 'left'
        },
			  // toolbox: {
				//   feature: {
				// 	  magicType: {
        //       show:false,
        //       type: ['bar','tiled','stack']						
				// 	  },
        //     dataView: {},
        //     saveAsImage: {
				// 		  pixelRatio: 2   //保存图片的分辨率比例
				// 	  }
				//   }
			  // },
			  tooltip: {},
			  xAxis: {
          name:'高度(m)',
				  data: xAxisData,
				  silent: false,
				  splitLine: {
					  show: false
				  }
			  },
			  yAxis: {
          name: '温度(°C)'			
			  },
			  series: [{
          name: '温度',
          type: 'bar',
          data: data1,
          animationDelay: function (idx) {
            return idx * 10;
          }
			  }],
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
          return idx * 5;
        }
		  }
    },
    getScatterOption (windData, spacescope) {
      let lonMin = spacescope[0]
      let lonMax = spacescope[1]
      let latMin = spacescope[2]
      let latMax = spacescope[3]
      let heightMin = spacescope[4]
      let heightMax = spacescope[5]
      let data = []
      let p = 0
      let valMin = Infinity
      let valMax = -Infinity		    
      for (let k = 0; k <= 40; k++) {
				for (let j = 0; j <= 40; j++) {                 
					for (let i = 0; i <= 40; i++) {																				
						let p = i + j * 110 + k * 5661
						p = parseInt(p)					
						let temp = windData[p][0]		
						if (temp != 10) {		
							valMax = Math.max(valMax, temp)
							valMin = Math.min(valMin, temp)
						}	
            if((k >= heightMin / 500) && (k <= (heightMax / 500))) {
              if(j >= ((lonMin - 108) / 0.2) && j <= ((lonMax - 108) / 0.2)) {
                if(i >= ((latMin - 15) / 0.2) && i <= ((latMax - 15) / 0.2)) { 
                  if(temp == 10) { temp = 23 } 
                  data.push([i, j, k, temp])
                    //将处理的数据放入字符串
                    // if(k == heightMax / 500 && j == (lonMax - 108) / 0.2 && i == (latMax - 15) / 0.2) {
                    //   var dataStr = "["+(108+j*0.2)+","+(15+i*0.2)+","+(k*500)+","+temp+"]"
                    //   jsStr+=dataStr;									
		    						// }
		    						// else{
		    						// 	var dataStr = "["+(108+j*0.2)+","+(15+i*0.2)+","+(k*500)+","+temp+"],"
		    						// 	jsStr+=dataStr;																	
		    						// }	
                }
              }
            } else {
              data.push([i, j, k, -100]);
            }																											
          }
        }   
      }

      return {
        title:{
          text:'TPV温度三维可视化展示',
          textStyle:{ 
            Color:'green',
            fontStyle:'',
            align:'center'
          }
				},			
				visualMap: {
					show: false,			
					min:valMin,       
					max:valMax,
					inRange: {
						symbol:'circle',         //'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
						label:{textStyle:{borderColor:'#000000'}},
						symbolSize: [0.5, 15],
						color: ['#000000','#191970','#000080','#0000CD','#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026'],								
						colorAlpha: [0.8, 1]  //[0.2,1]
					}
				},
        xAxis3D: {
          name:'北纬（°C）',  				
          type: 'value',
          axisPointer:{label:{show:true,formatter:function(value,index){return (15+value*0.2);}}},					
          axisLabel:{  
            show:true,
            formatter: function (value, index) {   
              return (15+value*0.2); 
            }   
          }
				},  									
				yAxis3D: {				
					type: 'value',
					name:'东经（°C）',
					axisPointer:{label:{show:true,formatter:function(value,index){return (108+value*0.2);}}},				
					axisTick: {//决定是否显示坐标刻度  				    	
            alignWithLabel: true,
            show:false   
          },
          axisLabel:{  //决定是否显示数据  
            show:true,
            formatter: function (value, index) {    //value当前值，index当前索引
              return (108+value*0.2);
            }   
          }
				}, 
				zAxis3D: {
					minInterval:1,  //maxInterval  interval
					type: 'value',
					name:'高度(m)',
					axisPointer:{label:{show:true,formatter:function(value,index){return value*500;}}},
          axisLabel:{  //决定是否显示数据  
            show:true,
            formatter: function (value, index) {    //value当前值，index当前索引
              return (value*500); 
            }   
          } 				
				},
				grid3D: {
					axisLine: {
						lineStyle: { color: '#000' }
					},
					axisPointer: {
						lineStyle: { color: '#000', width:1}
					},
					viewControl: {
						projection: 'orthographic'
					}
				},
				series: [{
					type: 'scatter3D',
					data: data
				}]
			}
    },
    downloadPrompt () {
      this.dialogVisible = true
      successTip(this, '保存成功！')
    },
    olapPrompt () {
      this.dialogVisible1 = true
    },
    itemResize (i, newH, newW, newHPx, newWPx) {
      let parentDiv = document.querySelector('#grid-item-' + i)
      let chartsDiv = parentDiv.childNodes[0]
      chartsDiv.style.height = newH * 250 * 0.9
      chartsDiv.style.width = newW * 440
    }
  },
  computed: {
    ...mapState({
      wind0Data: state => state.analysis.wind0
    })
  },
  watch: {
    expand: {
      handler(newval, oldval){
        this.$nextTick(() => {
          var elem = document.querySelector('.graph-content-wrapper')
          if(newval){
            elem.style.right  = '70px'
          }else{
            elem.style.right  = '20px'
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
    right: 75px;
  }
  .graph-style-wrapper{
    top: 70px;
    right: 15px;
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
  .olap-style {
    width: 100%;
    height: 100%;
    height: 400px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .olap-item {
    width: 32%;
  }
  .olap-item ul {
    list-style: none;
  }
  .olap-item li {
    line-height: 30px;
    vertical-align: middle;
  }
  .mdx-generator {
    width: 100%;
    height: 130px;
  }
  /* .el-input {
    height: 15px;
  } */
  .input-left {
    width: 100px;
    float: left;
  }
  .input-right {
    width: 100px;
    float: right;
  }
  .slice-dice {
    width: 34%;
  }
  .roll-drill {
    width: 40%;
  }
  .rotate {
    width: 25%;
  }
  .zhi {
    margin-left: 10px;
    position: relative;
    top: -5px;
  }
  .zhi1 {
    position: relative;
    top: -5px;
  }
  .zhi2 {
    margin-left: 6px;
    position: relative;
    top: -5px;
  }
  .li-title {
    font-weight: 800;
  }
  .roll-drill select {
    width: 100px;
    position: relative;
    top: -5px;
  }
  .roll-drill option {
    width: 90px;
    float: left;
  }
  .rotate-dims {
    padding: 30px 20px;
    display: flex;
    flex-direction: column; 
    /* align-content: space-between;
  }
  .icon-rotate-d {
    font-size: 20px;
    /* height: 20px;
    width: 20px; */
  }
  .rotate-dim {
    width: 100%;
    height: 100px;
    border: 2px solid gray;
    border-radius: 3px;
  }
  .rotate-dims .icon-rotaterightvariant {
    font-size: 30px;
    margin-left: 40px;
  }
  .dim-select {
    width: 80px;
    position: relative;
    left: 20px;
    top: 20px;
  }
  .dashboard-wrapper .el-dialog {
    top: -13vh;
  }
  .dim-title {
    margin-bottom: 10px;
  }
  .measures-cal {
    margin-bottom: 10px;
  }
  .mdx-query {
    width: 100%;
    border: 1px solid gray;
    border-radius: 2px;
  }
</style>