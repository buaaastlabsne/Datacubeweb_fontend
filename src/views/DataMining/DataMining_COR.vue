<template>
  <div class="data-config-wrapper clearfix">
    <div class="data-result">
      <el-button type="primary" style="float: left; margin: 0 5px;" @click="configInput">数据输入配置</el-button>
      <el-button type="primary" style="float: right; margin: 0 5px;" @click="configParam">输出参数</el-button>
      <el-button type="primary" style="float: right; margin: 0 5px;" @click="startAlgorithm">启动算法</el-button>
    </div>
    <el-card class="data-result">
      <div slot="header" class="data-input-header clearfix">
        <span>算法过程与结果</span>
      </div>
      <div class="data-input-content">
        <grid-layout
          :layout.sync="resultLayout"
          :col-num="3"
          :row-height="270"
          :vertical-compact="true"
          :is-draggable="false"
          :is-resizable="false"
          :is-mirrored="false"
          :margin="[3, 3]"
          :use-css-transforms="true"
        >
          <grid-item :x="resultLayout[0].x" :y="resultLayout[0].y" :w="resultLayout[0].w" :h="resultLayout[0].h" :i="resultLayout[0].i">
            <div class="grid-item-header">
              散点图
              <span class="iconfont icon-download item-icons"></span>
            </div>
            <div class="grid-item-content">
              <div id="COR" :style="{width: '670px', height: '800px'}"></div>
            </div> 
          </grid-item>
        </grid-layout>
      </div>
    </el-card>
    <el-dialog title="数据输入配置" :visible.sync="dialogVisible1" width="30%">
      <ul class="agrithm-config-ul">
        <li>
          <div class="agrithm-config-title">数据源选择：</div>
          <el-select name="select2" id="select2" v-model="curInput.dataSource">
             <el-option v-for="(item, key) in curInput.inputOptions" :key="key" :value="item">{{ item }}</el-option>
          </el-select>
        </li>
      </ul>
    </el-dialog>
        <el-dialog title="输出参数" :visible.sync="dialogVisible2" width="30%">
      <ul class="agrithm-config-ul">
        <li>
          <div class="agrithm-config-title">Pearson：</div>
          <el-input v-model="curParams.Pearson" clearable></el-input>
        </li>
        <li>
          <div class="agrithm-config-title">Kendall：</div>
          <el-input v-model="curParams.Kendall" clearable></el-input>
        </li>
        <li>
          <div class="agrithm-config-title">Spearman：</div>
          <el-input v-model="curParams.Spearman" clearable></el-input>
        </li>
      </ul>
    </el-dialog>
  </div>
</template>


<script>
import axios from 'axios'
import { mapState, mapActions } from 'vuex'
import VueGridLayout from 'vue-grid-layout'
import EchartsScatter from '@/components/EchartsScatter.vue'
import restapi from '@/api/restapi'

export default {
  components: {
    EchartsScatter
  },
  data(){
    return{
      loading: true,
      curInput: {
        dataSource: '',
        inputOptions: []
      },
      curParams: {
        Pearson:'',
        Kendall:'',
        Spearman:''
      },
      params: '',
      dialogVisible1: false,
      dialogVisible2: false,
      resultLayout: [
        {"x":0,"y":0,"w":1.5,"h":2,"i":"0"},
        {"x":1.5,"y":0,"w":1.5,"h":2,"i":"1"}
	  ],
	  data_COR:[]
    }
  },
  methods: {
    configInput () {
      let postData2 = new FormData()
      postData2.set('address','G://立方库数据//')//this.curInput.dataSource
      restapi.request({
        method: 'post',
        url: `/api/names`,
        data: postData2,
        success: (data) => {
          this.curInput.inputOptions = data
        }
      })
      this.dialogVisible1 = true
    },
    configParam () {
      this.dialogVisible2 = true
    },
    startAlgorithm () {
      let postData1 = new FormData()
      postData1.set('address','G://立方库数据//'+this.curInput.dataSource)
      restapi.request({
        method: 'post',
        url: `api/coefff`,
        data: postData1,
        success: (data) => {
			this.curParams.Pearson=data['pearson']
			this.curParams.Kendall=data['kendall']
			this.curParams.Spearman=data['spearman']
			this.data_COR=data['data']
      		this.COR()
        }
      })
    },
    COR(){
      var echarts = require('echarts/lib/echarts')
      var myChart = echarts.init(document.getElementById('COR'))
      var option = {
			grid: {
				left: '3%',
				right: '7%',
				bottom: '3%',
				containLabel: true
			},
			tooltip: {
				showDelay: 0,
				formatter: function (params) {
					if (params.value.length > 1) {
						return params.value[0] + ' '
							+ params.value[1] + ' ';
					}
					else {
						return params.name + ' '
							+ params.value + ' ';
					}
				},
				axisPointer: {
					show: true,
					type: 'cross',
					lineStyle: {
						type: 'dashed',
						width: 1
					}
				}
			},
			toolbox: {
				feature: {
					dataZoom: {},
					brush: {
						type: ['rect', 'polygon', 'clear']
					}
				}
			},
			brush: {
			},
			xAxis: [
				{
					type: 'value',
					scale: true,
					axisLabel: {
						formatter: '{value}'
					},
					splitLine: {
						show: false
					}
				}
			],
			yAxis: [
				{
					type: 'value',
					scale: true,
					axisLabel: {
						formatter: '{value}'
					},
					splitLine: {
						show: false
					}
				}
			],
			series: [
				{
					type: 'scatter',
					data: this.data_COR,
					markArea: {
						silent: true,
						itemStyle: {
							normal: {
								color: 'transparent',
								borderWidth: 1,
								borderType: 'dashed'
							}
						},
						data: [[{
							name: '分布区间',
							xAxis: 'min',
							yAxis: 'min'
						}, {
							xAxis: 'max',
							yAxis: 'max'
						}]]
					},
					markPoint: {
						data: [
							{ type: 'max', name: '最大值' },
							{ type: 'min', name: '最小值' }
						]
					},
				}
			]
		}
      myChart.setOption(option)
    }
  },
  computed: {
   
  },
  mounted () {
    // console.log(this.$route.params.algorithmId)
    let parentDiv = document.querySelector('#grid-item-3')
    let chartsDiv = parentDiv.childNodes[0]
    chartsDiv.style.width = 2 * 440
  }
}
</script>

<style scoped>
  .data-result {
    width: 98%;
    margin: 8px;
    padding: 0 5px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .data-config-wrapper{
    display: flex;
    flex-direction: column;
  }
  .agrithm-config-ul {
    list-style: none;
  }
  .agrithm-config-ul li {
    margin: 10px 0;
    display: flex;
    align-items: center;
  }
  .agrithm-config-title {
    width: 30%;
  }
  .agrithm-config-ul .el-select, .agrithm-config-ul .el-input, .agrithm-config-ul .el-slider {
    margin-left: 10px;
    float: right;
    width: 70%;
  }
  .grid-item-header{
    height: 24px;
    line-height: 24px;
    padding-left: 10px;
    background: #EBEEF5;
  }
  .grid-item-content{
    height: 90%;
    width: 100%; 
    margin-bottom: 0px;
    padding: 10px 10px 10px 10px;
    border: 1px #EBEEF5 solid;
    display: flex;
    flex-direction: column;
  }
  .item-icons {
    line-height: 20px;
    cursor: pointer;
    float: right;
    margin: 2px 10px;
  }
  .data-input-content {
    height: 650px;
  }
  .child-charts {
    height: 25%;
  }
</style>