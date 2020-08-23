<template>
  <div class="echarts" :id="'chart' + chartIndex"></div>
</template>

<script>
import echarts from 'echarts'
import { debounce } from '@/utils/charts.js'
import { EleResize } from '@/utils/common.js'

export default {
  props: {
    chartData: {
      type: Object
    },
    chartIndex: {
      type: String
    },
    loading: {
      type: Boolean
    }
  },
  data () {
    return {}
  },
  mounted () {
    this.initChart()
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
    },
    loading: {
      handler (val) {
        val ? this.$chart.showLoading() : this.$chart.hideLoading()
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
      this.$chart.resize()
    }
  }
}
</script>
