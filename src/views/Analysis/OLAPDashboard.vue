<template>
  <div class="dashboard-wrapper">
    <div class="graph-style-wrapper">
      <div class="graph-content-expand"><span class="iconfont" :class="{ 'icon-rightarrow8f': expand, 'icon-leftarrow8f': !expand }" @click=" expand = !expand "></span></div>
      <div class="graph-content-icons" v-if="expand">
        <div class="iconfont icon-line-chart" @click="setData('line')"></div>
        <div class="iconfont icon-bar-chart" @click="setData('bar')"></div>
        <div class="iconfont icon-pie-chart" @click="setData('pie')"></div>
        <div class="iconfont icon-3D" @click="setData('scatter')"></div>
        <div class="iconfont icon-map-chart" @click="setData('map')"></div>
      </div>
    </div>
    <div class="graph-content-wrapper">
      <grid-layout
        :layout.sync="graphItems"
        :col-num="3"
        :row-height="250"
        :is-draggable="true"
        :is-resizable="true"
        :is-mirrored="false"
        :vertical-compact="true"
        :margin="[3, 3]"
        :use-css-transforms="true"
      >
        <grid-item v-for="item in graphItems"
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
            <span class="iconfont icon-DataAnalysisAI-M-OLAP item-icons" @click="olapPrompt"></span>
          </div>
          <div class="grid-item-content">
            <echarts-line v-if="item.s === 'line'" :chartData="data2Option(item.i, item.s)" :chartIndex="item.i"></echarts-line>
            <echarts-bar v-if="item.s === 'bar'" :chartData="data2Option(item.i, item.s)" :chartIndex="item.i"></echarts-bar>
            <!-- <echarts-scatter v-if="item.s === 'scatter'" :chartData="option2" :chartIndex="item.i"></echarts-scatter> -->
          </div>
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
      width="58%">
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
    <el-dialog title="数据源配置" :visible.sync="dialogVisible2" width="40%">
      <ul class="agrithm-config-ul">
        <li>
          <div class="agrithm-config-title">数据源选择：</div>
          <el-select name="select2" id="select2" v-model="dataSource"></el-select>
        </li>
        <!--<li><div class="agrithm-config-title">时间范围：</div>
            <el-input class="input-left" v-model="tsscope.settimeStart"/><span class="zhi">至</span>
            <el-input class="input-right" v-model="tsscope.settimeEnd" /></li>-->
        <li>
          <div class="agrithm-config-title">经度范围：</div>
          <el-input class="input-left" v-model="dataScope.lonMin" /><span class="zhi">至</span>
          <el-input class="input-right" v-model="dataScope.lonMax" />
        </li>
        <li>
          <div class="agrithm-config-title">纬度范围：</div>
          <el-input class="input-left" v-model="dataScope.latMin" /><span class="zhi">至</span>
          <el-input  class="input-right"  v-model="dataScope.latMax" />
        </li>
        <li>
          <div class="agrithm-config-title">高度范围：</div>
          <el-input class="input-left" v-model="dataScope.heightMin"/><span class="zhi">至</span>
          <el-input class="input-right" v-model="dataScope.heightMax"/>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmSetData">确 定</el-button>
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
import { mapState, mapActions } from 'vuex'
import 'echarts-gl'
import { successTip } from '@/utils/common.js'
import { getLineOption, getBarOption, getScatterOption } from '@/utils/charts.js'

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
      graphItems: [
        // s=showStyle
        { "x": 0, "y": 0, "w": 1, "h": 1, "i": "0", "s": 'line' },
        { "x": 1, "y": 0, "w": 1, "h": 1, "i": "1", "s": 'bar' },
        // { "x": 2, "y": 0, "w": 1, "h": 1, "i": "2", "s": 'scatter' },
        // { "x": 0, "y": 1, "w": 1, "h": 1, "i": "3" },
        // { "x": 1, "y": 1, "w": 1, "h": 1, "i": "4" },
        // { "x": 2, "y": 1, "w": 1, "h": 1, "i": "5" },
        // { "x": 0, "y": 2, "w": 1, "h": 1, "i": "6" },
        // { "x": 1, "y": 2, "w": 1, "h": 1, "i": "7" },
        // { "x": 2, "y": 2, "w": 1, "h": 1, "i": "8" }
      ],
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      radio: 1,
      radio1: 1,
      timeDic: ['年', '季', '月', '旬', '日', '时'],
      longitudeDic: ['10度分区','2度分区', '1度分区', '0.2度分区'],
      latitudeDic: ['10度分区','2度分区', '1度分区', '0.2度分区'],
      heightDic: ['10000米分区', '5000米分区', '1000米分区', '500米分区', '100米分区'],
      depthDic: ['2000米分区', '1000米分区', '500米分区', '100米分区', '50米分区'],
      mdx: '',
      clickCount: 0,
      tsscope: {
        timeStart: '2011-4-28-12',
        timeEnd: '2011-4-28-14',
        longitudeStart: '108°E',
        longitudeEnd: '116°E',
        latitudeStart: '15°N',
        latitudeEnd: '23°N',
        heightStart: '5000m',
        heightEnd: '20000m'
      },
      dataSource: '',
      dataScope: {
        lonMin: '108',
        lonMax: '108',
        latMin: '15',
        latMax: '23',
        heightMin: '5000',
        heightMax: '5000'
      },
      // 当前图例的显示方式
      showStyle: ''
    }
  },
  methods: {
    ...mapActions(['addEnvData']),
    genMDX () {
      this.mdx = 'AVG([Measures].[Temperature] SELECT {[Measures].[Temperature]} ON COLUMNS, {[TimeDim].[AllTime],' 
      + '[Longitude].[AllLongitude]' 
      + '[Latitude].[AllLatitude]} ON ROWS FROM [TPV] WHERE ([HeightDim].[5000])'
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
      chartsDiv.style.height = newH * 220 * 0.9
      chartsDiv.style.width = newW * 400
    },
    // 将数据转换成绘图option
    data2Option (index, showStyle) {
      switch (showStyle) {
        case 'line':
          return getLineOption(this.dataList[index])
          break
        case 'bar':
          return getBarOption(this.dataList[index])
          break
        case 'scatter':
          return getScatterOption(this.dataList[index])
          break
      }
    },
    setData (showStyle) {
      this.dialogVisible2 = true
      this.showStyle = showStyle
    },
    // 从后台获取数据，更新vuex中的dataList，并添加item至graphItems
    confirmSetData () {
      // todo：更新vuex内容
      let dataInfo = { "dataSource": "TPV", "scope": this.dataScope, "measure": "temperature" }
      this.addEnvData(dataInfo).then(() => {
        // 推入新的item到graphInfo
        let lastItem = this.graphItems[this.graphItems.length - 1]
        let newItem = {
          "x": parseInt(lastItem.x) === 2 ? 0 : lastItem.x + 1,
          "y": this.graphItems.length % 3 == 0 ? parseInt(lastItem.y) + 1 : lastItem.y,
          "w": 1,
          "h": 1,
          "i": parseInt(lastItem.i) + 1 + '',
          "s": this.showStyle
        }
        this.graphItems.push(newItem)
      })
      this.dialogVisible2 = false
    }
  },
  computed: {
    ...mapState({
      dataList: state => state.analysis.dataList
    })
  },
  watch: {
    // 右侧工具栏的展开收起处理
    expand: {
      handler(newval, oldval){
        this.$nextTick(() => {
          var elem = document.querySelector('.graph-content-wrapper')
          if (newval) {
            elem.style.right  = '70px'
          } else {
            elem.style.right  = '30px'
          }
        })
      },
      immediate: true
    }
  }
}
</script>
<style>
  .agrithm-config-title {
    width: 30%;
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
  </style>