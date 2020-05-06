<template>
  <div class="data-config-wrapper clearfix">
    <div class="data-result">
      <el-button type="primary" style="float: left; margin: 0 5px;">数据输入配置</el-button>
      <el-button type="primary" style="float: left; margin: 0 5px;">算法参数配置</el-button>
      <el-button type="primary" style="float: right; margin: 0 5px;">启动算法</el-button>
    </div>
    <el-card class="data-result">
      <div slot="header" class="data-input-header clearfix">
        <span>算法过程与结果</span>
      </div>
      <div class="data-input-content">

      </div>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions } from 'vuex'

export default {
  data(){
    return{
      loading: true,
      dataSource: '',
      params: ''
    }
  },
  methods: {

  },
  computed: {
   
  },
  mounted () {
    console.log(this.$route.params.algorithmId)
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
</style>