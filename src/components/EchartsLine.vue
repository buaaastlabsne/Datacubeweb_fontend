<template>
  <div class="echarts" :id="'chart' + chartIndex"></div>
</template>

<script>
import echarts from 'echarts'
import { debounce } from '@/utils/charts.js'
import { EleResize } from '@/utils/common.js'
import dtc2 from '@/assets/dataset/dtc2.js'

export default {
  props: {
    chartData: {
      type: Object
    },
    chartIndex: {
      type: String
    }
  },
  data () {
    return {}
  },
  mounted () {
    let names = []
    let nums = []
    dtc2.list.forEach((e, i) => {
      names.push(e.latitude)
      nums.push(e.temperature)
    })
    console.log(names)
    this.initChart()
    this.$chart.setOption({
      xAxis: {
        data: names
      }, 
      series: [{
        name: '温度',
        data: nums
      }]
    })
    let id = 'chart' + this.chartIndex
    EleResize.on(document.querySelector('#' + id), () => {
      this.$chart.resize()
    })
  },
  beforeDestroy () {
    if (!this.$chart) {
      return
    }

    this.$chart.dispose()
    this.$chart = null
  },
  watch: {
    chartData: {
      deep: true,
      handler (val) {
        this.setOptions(val)
      }
    }
  },
  methods: {
    setOptions (val) {
      this.$chart.clear() // 清空画布
      this.$chart.setOption(val)
    },
    initChart () {
      this.$chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    }
  }
}
</script>

<style>
.echarts {
  /* width: 450px; */
  width: 530px;
  height: 250px;
  position: absolute;
}
</style>