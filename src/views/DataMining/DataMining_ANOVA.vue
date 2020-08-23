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
              箱线图
              <span class="iconfont icon-download item-icons"></span>
            </div>
            <div class="grid-item-content">
              <div id="ANOVA" :style="{width: '670px', height: '800px'}"></div>
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
          <div class="agrithm-config-title">组内自由度：</div>
          <el-input v-model="curParams.inDegree" clearable></el-input>
        </li>
        <li>
          <div class="agrithm-config-title">组间自由度：</div>
          <el-input v-model="curParams.outDegree" clearable></el-input>
        </li>
        <li>
          <div class="agrithm-config-title">样本总数N：</div>
          <el-input v-model="curParams.N" clearable></el-input>
        </li>
        <li>
          <div class="agrithm-config-title">组内离差平方和SSE：</div>
          <el-input v-model="curParams.SSE" clearable></el-input>
        </li>
        <li>
          <div class="agrithm-config-title">组间平方和SSA：</div>
          <el-input v-model="curParams.SSA" clearable></el-input>
        </li>
        <li>
          <div class="agrithm-config-title">方差分析结果F：</div>
          <el-input v-model="curParams.F" clearable></el-input>
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
        N:'',
        F:'',
        SSA:'',
        SSE:'',
        inDegree:'',
        outDegree:''
      },
      params: '',
      dialogVisible1: false,
      dialogVisible2: false,
      resultLayout: [
        {"x":0,"y":0,"w":1.5,"h":2,"i":"0"},
        {"x":1.5,"y":0,"w":1.5,"h":2,"i":"1"}
      ],
      data_ANOVA:[]
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
        url: `api/anova`,
        data: postData1,
        success: (data) => {
          this.curParams.N=data['N']
          this.curParams.F=data['F']
          this.curParams.SSA=data['SSA']
          this.curParams.SSE=data['SSE']
          this.curParams.inDegree=data['inDegree']
          this.curParams.outDegree=data['outDegree']
          this.data_ANOVA=data['data']
          this.ANOVA()
        }
      })
    },
    ANOVA(){
      var echarts = require('echarts/lib/echarts')
      echarts.dataTool = require('echarts/extension/dataTool')
      var myChart = echarts.init(document.getElementById('ANOVA'))
      var data = echarts.dataTool.prepareBoxplotData(this.data_ANOVA)
      var option = {
			  title: [
				  {
					 // text: 'upper: Q3 + 1.5 * IRQ \nlower: Q1 - 1.5 * IRQ',
					  borderColor: '#999',
					  borderWidth: 1,
					  textStyle: {
						  fontSize: 14
					  },
					  left: '10%',
					  top: '90%'
				  }
			  ],
			  tooltip: {
				  trigger: 'item',
				  axisPointer: {
					  type: 'shadow'
				  }
			  },
			  grid: {
				  left: '10%',
				  right: '10%',
				  bottom: '15%'
		  	},
			  xAxis: {
				  type: 'category',
				  data: data.axisData,
				  boundaryGap: true,
				  nameGap: 30,
				  splitArea: {
					  show: false
				  },
				  axisLabel: {
					  formatter: 'expr {value}'
				  },
				  splitLine: {
					  show: false
				  }
			  },
			  yAxis: {
          type: 'value',
          min : 870,
				  splitArea: {
					  show: true
				  }
			  },
			  series: [
				  {
					  name: 'boxplot',
					  type: 'boxplot',
					  data: data.boxData,
					  tooltip: {
						  formatter: function (param) {
							  return [
								  'Experiment ' + param.name + ': ',
								  'upper: ' + param.data[5],
								  'Q3: ' + param.data[4],
								  'median: ' + param.data[3],
							  	'Q1: ' + param.data[2],
							  	'lower: ' + param.data[1]
						  	].join('<br/>')
						  }
					  }
				  },
				  {
					  name: 'outlier',
					  type: 'scatter',
					  data: data.outliers
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