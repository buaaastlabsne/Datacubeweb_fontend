<template>
  <div class="data-config-wrapper clearfix">
    <div class="data-result">
      <el-button type="primary" style="float: left; margin: 0 5px;" @click="configInput">数据输入配置</el-button>
      <el-button type="primary" style="float: left; margin: 0 5px;" @click="configParam">算法参数配置</el-button>
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
              聚类结果
              <span class="iconfont icon-download item-icons"></span>
            </div>
            <div class="grid-item-content">
              <div id="FCM" :style="{width: '670px', height: '800px'}"></div>
            </div> 
          </grid-item>
          <grid-item :x="resultLayout[1].x" :y="resultLayout[1].y" :w="resultLayout[1].w" :h="resultLayout[1].h" :i="resultLayout[1].i">
            <div class="grid-item-header">
              聚类中心
              <span class="iconfont icon-download item-icons"></span>
            </div>
            <div class="grid-item-content">
              <div id="center" :style="{width: '670px', height: '800px'}"></div>
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
    <el-dialog title="算法参数配置" :visible.sync="dialogVisible2" width="30%">
      <ul class="agrithm-config-ul">
        <li>
          <div class="agrithm-config-title">聚类分类数量：</div>
          <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="curParams.Classifications" clearable></el-input>
        </li>
        <li>
          <div class="agrithm-config-title">模糊加权数：</div>
          <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="curParams.Weighted_number" clearable></el-input>
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
        Classifications:'',
        Weighted_number:''
      },
      params: '',
      dialogVisible1: false,
      dialogVisible2: false,
      resultLayout: [
        {"x":0,"y":0,"w":1.5,"h":2,"i":"0"},
        {"x":1.5,"y":0,"w":1.5,"h":2,"i":"1"}
      ],
      data_FCM:{
        data1:[],
        data2:[],
        data3:[],
        data4:[],
        data5:[],
        data6:[],
        data7:[],
        data8:[],
        data9:[],
        data10:[],
      },
      data_center:{
        data1:[],
        data2:[],
        data3:[],
        data4:[],
        data5:[],
        data6:[],
        data7:[],
        data8:[],
        data9:[],
        data10:[],
      },
      series:[
					{ datasetIndex:0,type: 'scatter3D',color:'Red',symbolSize:10,
						encode: {x: 'x',y: 'y',z: 'z',tooltip: [0, 1, 2, 3, 4]}												
					},
					{ datasetIndex:1,type: 'scatter3D',color:'Yellow',symbolSize:10,
						encode: {x: 'x',y: 'y',z: 'z',tooltip: [0, 1, 2, 3, 4]}
					},
					{ datasetIndex:2,type: 'scatter3D',color:'Blue',symbolSize:10,
						encode: {x: 'x',y: 'y',z: 'z',tooltip: [0, 1, 2, 3, 4]}
          },
          { datasetIndex:3,type: 'scatter3D',color:'Green',symbolSize:10,
						encode: {x: 'x',y: 'y',z: 'z',tooltip: [0, 1, 2, 3, 4]}
          },
          { datasetIndex:4,type: 'scatter3D',color:'Purple',symbolSize:10,
						encode: {x: 'x',y: 'y',z: 'z',tooltip: [0, 1, 2, 3, 4]}
          },
          { datasetIndex:5,type: 'scatter3D',color:'Orange',symbolSize:10,
						encode: {x: 'x',y: 'y',z: 'z',tooltip: [0, 1, 2, 3, 4]}
          },
          { datasetIndex:6,type: 'scatter3D',color:'Pink',symbolSize:10,
						encode: {x: 'x',y: 'y',z: 'z',tooltip: [0, 1, 2, 3, 4]}
          },
          { datasetIndex:7,type: 'scatter3D',color:'DarkSlateBlue ',symbolSize: 10,
						encode: {x: 'x',y: 'y',z: 'z',tooltip: [0, 1, 2, 3, 4]}
          },
          { datasetIndex:8,type: 'scatter3D',color:'DarkViolet ',symbolSize:10,
						encode: {x: 'x',y: 'y',z: 'z',tooltip: [0, 1, 2, 3, 4]}
          },
          { datasetIndex:9,type: 'scatter3D',color:'Black',symbolSize:10,
						encode: {x: 'x',y: 'y',z: 'z',tooltip: [0, 1, 2, 3, 4]}
					}
      ],
      loading0: false,
      loading1: false
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
      postData1.set('address','G://立方库数据//'+this.curInput.dataSource)//this.curInput.dataSource
      postData1.set('c', this.curParams.Classifications)
      postData1.set('m', this.curParams.Weighted_number)
      restapi.request({
        method: 'post',
        url: `api/FCM`,
        data: postData1,
        success: (data) => {
          if (this.curParams.Classifications >=1)
          {
            this.data_FCM.data1= data[0]
            this.data_center.data1=[data[0][0],data[0][1]]
          }
          if (this.curParams.Classifications >=2)
          {
            this.data_FCM.data2= data[1]
            this.data_center.data2=[data[1][0],data[1][1]]
          }
          if (this.curParams.Classifications >=3)
          {
            this.data_FCM.data3= data[2]
            this.data_center.data3=[data[2][0],data[2][1]]
          }
          if (this.curParams.Classifications >=4)
          {
            this.data_FCM.data4= data[3]
            this.data_center.data4=[data[3][0],data[3][1]]
          }
          if (this.curParams.Classifications >=5)
          {
            this.data_FCM.data5= data[4]
            this.data_center.data5=[data[4][0],data[4][1]]
          }
          if (this.curParams.Classifications >=6)
          {
            this.data_FCM.data6= data[5]
            this.data_center.data6=[data[5][0],data[5][1]]
          }
          if (this.curParams.Classifications >=7)
          {
            this.data_FCM.data7= data[6]
            this.data_center.data7=[data[6][0],data[6][1]]
          }
          if (this.curParams.Classifications >=8)
          {
            this.data_FCM.data8= data[7]
            this.data_center.data8=[data[7][0],data[7][1]]
          }
          if (this.curParams.Classifications >=9)
          {
            this.data_FCM.data9= data[8]
            this.data_center.data9=[data[8][0],data[8][1]]
          }
          if (this.curParams.Classifications >=10)
          {
            this.data_FCM.data10= data[9]
            this.data_center.data10=[data[9][0],data[9][1]]
          }
          this.FCM(),
          this.center(),
          this.data_FCM.data1=[],this.data_FCM.data2=[],this.data_FCM.data3=[],this.data_FCM.data4=[],this.data_FCM.data5=[],
          this.data_FCM.data6=[],this.data_FCM.data7=[],this.data_FCM.data8=[],this.data_FCM.data9=[],this.data_FCM.data10=[]
          this.data_center.data1=[],this.data_center.data2=[],this.data_center.data3=[],this.data_center.data4=[],this.data_center.data5=[],
          this.data_center.data6=[],this.data_center.data7=[],this.data_center.data8=[],this.data_center.data9=[],this.data_center.data10=[]
        }
      })
    },
    FCM(){
      let myChart = this.$echarts.init(document.getElementById('FCM'))
      myChart.setOption({
        grid3D: {},
				xAxis3D: {},
				yAxis3D: {},
				zAxis3D: {},
				dataset: [
          {dimensions: ['x','y','z',],source: this.data_FCM.data1},
				  {dimensions: ['x','y','z',],source: this.data_FCM.data2},
				  {dimensions: ['x','y','z',],source: this.data_FCM.data3},
          {dimensions: ['x','y','z',],source: this.data_FCM.data4},
          {dimensions: ['x','y','z',],source: this.data_FCM.data5},
          {dimensions: ['x','y','z',],source: this.data_FCM.data6},
          {dimensions: ['x','y','z',],source: this.data_FCM.data7},
          {dimensions: ['x','y','z',],source: this.data_FCM.data8},
          {dimensions: ['x','y','z',],source: this.data_FCM.data9},
          {dimensions: ['x','y','z',],source: this.data_FCM.data10}
				],
				series: this.series
      });
    },
    center(){
      let myChart = this.$echarts.init(document.getElementById('center'))
      myChart.setOption({
        grid3D: {},
				xAxis3D: {},
				yAxis3D: {},
				zAxis3D: {},
				dataset: [
          {dimensions: ['x','y','z',],source: this.data_center.data1},
				  {dimensions: ['x','y','z',],source: this.data_center.data2},
				  {dimensions: ['x','y','z',],source: this.data_center.data3},
          {dimensions: ['x','y','z',],source: this.data_center.data4},
          {dimensions: ['x','y','z',],source: this.data_center.data5},
          {dimensions: ['x','y','z',],source: this.data_center.data6},
          {dimensions: ['x','y','z',],source: this.data_center.data7},
          {dimensions: ['x','y','z',],source: this.data_center.data8},
          {dimensions: ['x','y','z',],source: this.data_center.data9},
          {dimensions: ['x','y','z',],source: this.data_center.data10}
				],
				series: this.series
      });
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