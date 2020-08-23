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
              小波分解重构结果
              <span class="iconfont icon-download item-icons"></span>
            </div>
            <div class="grid-item-content" :id="'grid-item-' + resultLayout[0].i">
              <div class="child-charts"><echarts-line :chartData="option3" :loading="loading3"></echarts-line></div>
              <div class="child-charts"><echarts-line :chartData="option4" :loading="loading3"></echarts-line></div>
              <div class="child-charts"><echarts-line :chartData="option5" :loading="loading3"></echarts-line></div>
              <div class="child-charts"><echarts-line :chartData="option6" :loading="loading3"></echarts-line></div>
            </div>  
          </grid-item>
          <grid-item :x="resultLayout[1].x" :y="resultLayout[1].y" :w="resultLayout[1].w" :h="resultLayout[1].h" :i="resultLayout[1].i">
            <div class="grid-item-header">
              预测性能随参数epsilon的变化情况
              <span class="iconfont icon-download item-icons"></span>
            </div>
            <div class="grid-item-content" :id="'grid-item-' + resultLayout[1].i">
              <echarts-line :chartData="option0" :chartIndex="resultLayout[1].i" :loading="loading0"></echarts-line>
            </div>  
          </grid-item>
          <grid-item :x="resultLayout[2].x" :y="resultLayout[2].y" :w="resultLayout[2].w" :h="resultLayout[2].h" :i="resultLayout[2].i">
            <div class="grid-item-header">
              预测性能随参数C的变化情况
              <span class="iconfont icon-download item-icons"></span>
            </div>
            <div class="grid-item-content" :id="'grid-item-' + resultLayout[2].i">
              <echarts-line :chartData="option1" :chartIndex="resultLayout[2].i" :loading="loading1"></echarts-line>
            </div>  
          </grid-item>
          <grid-item :x="resultLayout[3].x" :y="resultLayout[3].y" :w="resultLayout[3].w" :h="resultLayout[3].h" :i="resultLayout[3].i">
            <div class="grid-item-header">
              模型在预测集上的预测效果
              <span class="iconfont icon-download item-icons"></span>
            </div>
            <div class="grid-item-content" :id="'grid-item-' + resultLayout[3].i">
              <echarts-line :chartData="option2" :chartIndex="resultLayout[3].i" :loading="loading2"></echarts-line>
            </div>  
          </grid-item>
        </grid-layout>
      </div>
    </el-card>
    <el-dialog title="数据输入配置" :visible.sync="dialogVisible1" width="30%">
      <ul class="agrithm-config-ul">
        <li>
          <div class="agrithm-config-title">数据源选择：</div>
          <el-select name="select1" id="select1" v-model="curInput.dataSource">
            <el-option v-for="(item, key) in curInput.inputOptions" :key="key" :value="item">{{ item }}</el-option>
          </el-select>
        </li>
      </ul>
    </el-dialog>
    <el-dialog title="算法参数配置" :visible.sync="dialogVisible2" width="30%">
      <ul class="agrithm-config-ul">
        <li>
          <div class="agrithm-config-title">小波函数选择：</div>
          <el-select name="select2" id="select2" v-model="curParams.pywtFunc">
            <el-option value="db8">db8</el-option>
          </el-select>
        </li>
        <li>
          <div class="agrithm-config-title">小波分解层数：</div>
          <el-select name="select3" id="select3" v-model="curParams.pywtLevels">
            <el-option value="3">3</el-option>
            <el-option value="4">4</el-option>
            <el-option value="5">5</el-option>
          </el-select>
        </li>
        <li>
          <div class="agrithm-config-title">损失函数选择：</div>
          <el-select name="select4" id="select4" v-model="curParams.loss">
            <el-option value="均方误差损失">均方误差损失</el-option>
            <el-option value="均方根误差损失">均方根误差损失</el-option>
          </el-select>
        </li>
        <li>
          <div class="agrithm-config-title">松弛因子epsilon：</div>
          <el-slider v-model="curParams.ep" show-input :min="-10" :max="10"></el-slider>
        </li>
        <li>
          <div class="agrithm-config-title">惩罚参数C：</div>
          <el-slider v-model="curParams.C" show-input :min="-10" :max="10"></el-slider>
        </li>
        <li>
          <div class="agrithm-config-title">最大迭代次数：</div>
          <el-slider v-model="curParams.maxIter" show-input :min="1000" :max="100000"></el-slider>
        </li>
        <li>
          <div class="agrithm-config-title">误差容忍值：</div>
          <el-slider v-model="curParams.tolerant" show-input :min="0.001" :max="1"></el-slider>
        </li>
      </ul>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions } from 'vuex'
import VueGridLayout from 'vue-grid-layout'
import EchartsLine from '@/components/EchartsLine.vue'
import restapi from '@/api/restapi'

export default {
  components: {
    EchartsLine
  },
  data(){
    return{
      loading: true,
      curInput: {
        dataSource: '',
        inputOptions: []
      },
      curParams: {
        pywtFunc: '',
        pywtLevels: null,
        loss: '均方根误差损失',
        ep: 4,
        C: 3,
        maxIter: 1000,
        tolerant: 0.05
      },
      params: '',
      dialogVisible1: false,
      dialogVisible2: false,
      resultLayout: [
        {"x":0,"y":0,"w":1,"h":2,"i":"0"},
        {"x":1,"y":0,"w":1,"h":1,"i":"1"},
        {"x":2,"y":0,"w":1,"h":1,"i":"2"},
        {"x":1,"y":1,"w":2,"h":1,"i":"3"}
      ],
      option0: {
        tooltip: {},
        legend: {
          data:['训练集', '预测集']
        },
        xAxis: {
          data: []
        },
        yAxis: {},
        series: [
          {
            name: '训练集',
            type: 'line',
            data: []
          }, {
            name: '预测集',
            type: 'line',
            data: []
          }
        ]
      },
      option1: {
        tooltip: {},
        legend: {
          data:['训练集', '预测集']
        },
        xAxis: {
          data: []
        },
        yAxis: {},
        series: [
          {
            name: '训练集',
            type: 'line',
            data: []
          }, {
            name: '预测集',
            type: 'line',
            data: []
          }
        ]
      },
      option2: {
        tooltip: {},
        legend: {
          data:['真实数据', '预测数据']
        },
        xAxis: {
          data: []
        },
        yAxis: {},
        series: [
          {
            name: '真实数据',
            type: 'line',
            data: []
          }, {
            name: '预测数据',
            type: 'line',
            data: []
          }
        ]
      },
      option3: {
        tooltip: {},
        xAxis: {
          data: []
        },
        yAxis: {},
        series: [
          {
            name: '近似系数',
            type: 'line',
            data: []
          }
        ]
      },
      option4: {
        tooltip: {},
        xAxis: {
          data: []
        },
        yAxis: {},
        series: [
          {
            name: '细节系数',
            type: 'line',
            data: []
          }
        ]
      },
      option5: {
        tooltip: {},
        xAxis: {
          data: []
        },
        yAxis: {},
        series: [
          {
            name: '细节系数',
            type: 'line',
            data: []
          }
        ]
      },
      option6: {
        tooltip: {},
        legend: {
          data:['原始数据', '小波重构结果']
        },
        xAxis: {
          data: []
        },
        yAxis: {},
        series: [
          {
            name: '原始数据',
            type: 'line',
            data: []
          }, {
            name: '小波重构结果',
            type: 'line',
            data: []
          }
        ]
      },
      loading0: false,
      loading1: false,
      loading2: false,
      loading3: false
    }
  },
  methods: {
    configInput () {
      restapi.request({
        method: 'get',
        url: `/inputlist`,
        success: (data) => {
          this.curInput.inputOptions = data.data
        }
      })
      this.dialogVisible1 = true
    },
    configParam () {
      this.dialogVisible2 = true
    },
    startAlgorithm () {
      // 搜集请求参数信息
      let postData1 = new FormData()
      postData1.set('address', "D:/综合自然环境数据立方库/数据产品/T2017T-S7515S_rec.xlsx")
      // 算法执行中的动画
      this.loading0 = true
      this.loading1 = true
      this.loading2 = true
      // 调用执行算法api
      // http请求：/ep
      restapi.request({
        method: 'post',
        url: `/ep`,
        data: postData1,
        success: (data) => {
          this.loading0 = false
          this.option0.xAxis.data = data['epsilons']
          this.option0.series[0].data = data['train_scores']
          this.option0.series[1].data = data['test_scores']
        }
      })
      restapi.request({
        method: 'post',
        url: `/c`,
        data: postData1,
        success: (data) => {
          this.loading1 = false
          this.option1.xAxis.data = data['Cs']
          this.option1.series[0].data = data['train_scores']
          this.option1.series[1].data = data['test_scores']
        }
      })
      let postData2 = new FormData()
      postData2.set('address', 'D:/综合自然环境数据立方库/数据产品/wind_speed_rec.xlsx')
      postData2.set('ep', this.curParams.ep)
      postData2.set('c', this.curParams.C)
      restapi.request({
        method: 'post',
        url: `/predict`,
        data: postData2,
        success: (data) => {
          this.loading2 = false
          this.option2.xAxis.data = data['x_label']
          this.option2.series[0].data = data['y_test']
          this.option2.series[1].data = data['y_predict']
        }
      })
      let postData3 = new FormData()
      postData3.set('address1', 'D:/综合自然环境数据立方库/数据产品/T2017T-S7515S_new.csv')
      postData3.set('address2', 'D:/综合自然环境数据立方库/数据产品/wind_speed_rec.xlsx')
      restapi.request({
        method: 'post',
        url: `/pywt`,
        data: postData3,
        success: (data) => {
          this.loading3 = false
          this.option3.xAxis.data = data['level10'].keys()
          this.option3.series[0].data = data['level10']
          this.option4.xAxis.data = data['level11'].keys()
          this.option4.series[0].data = data['level11']
          this.option5.xAxis.data = data['level12'].keys()
          this.option5.series[0].data = data['level12']
          this.option6.xAxis.data = data['original-data'].keys()
          this.option6.series[0].data = data['original-data']
          this.option6.series[1].data = data['recoeffs']
        }
      })
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
    /* width: 100%; */
    margin-bottom: 0;
    padding: 10 10px 0 0;
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
    height: 550px;
  }
  #grid-item-3 .echarts {
    width: 800px;
  }
  #grid-item-0 .echarts {
    height: 180px;
  }
  #grid-item-0 {
    height: 515px;
    padding: 0;
  }
  .child-charts {
    height: 25%;
  }
</style>