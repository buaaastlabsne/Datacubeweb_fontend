<template>
  <div class="data-config-wrapper clearfix">
    <div class="data-result">
      <el-button type="primary" style="float: left; margin: 0 5px;">数据输入配置</el-button>
      <el-button type="primary" style="float: left; margin: 0 5px;" >算法参数配置</el-button>
      <el-button type="primary" style="float: right; margin: 0 5px;" >启动算法</el-button>
    </div>
    <el-card class="data-result">
      <div slot="header" class="data-input-header clearfix">
        <span>算法过程与结果</span>
      </div>
    </el-card>
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
      params: '',
      dialogVisible1: false,
      dialogVisible2: false,
      loading0: false,
      loading1: false,
      loading2: false,
      loading3: false
    }
  },
  methods: {
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