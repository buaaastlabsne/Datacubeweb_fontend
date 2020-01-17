<template>
  <div>
    <div class="data-config-wrapper clearfix">
      <el-card class="data-input">
        <div slot="header" class="data-input-header clearfix">
          <span>数据输入</span>
          <span class="iconfont icon-arrowdown" v-if="expand1" @click="expand1 = !expand1"></span>
          <span class="iconfont icon-arrow-right" v-else @click="expand1 = !expand1"></span>
        </div>
        <div class="data-input-content" v-if="expand1">
          shuju
        </div>
      </el-card>
      <el-card class="data-input">
        <div slot="header" class="data-input-header clearfix">
          <span>算法参数配置</span>
          <span class="iconfont icon-arrowdown" v-if="expand2" @click="expand2 = !expand2"></span>
          <span class="iconfont icon-arrow-right" v-else @click="expand2 = !expand2"></span>
        </div>
        <div class="data-input-content" v-if="expand2">
          canshu
        </div>
      </el-card>
    </div>
    <el-card class="data-result">
      <div slot="header" class="data-input-header clearfix">
        <span>数据挖掘结果</span>
      </div>
      <div class="data-input-content">
        <el-table
          :data="bookList"
          style="width: 100%" v-loading="loading">
          <el-table-column
            prop="pk"
            label="主键"
            width="180">
          </el-table-column>
          <el-table-column
            prop="model"
            label="模型"
            width="180">
          </el-table-column>
          <el-table-column
            prop="book_name"
            label="书名">
          </el-table-column>
          <el-table-column
            prop="add_time"
            label="添加时间">
          </el-table-column>
        </el-table>
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
      expand1: true,
      expand2: true,
      loading: true
      // bookList: [
      //   {
      //       'pk': 1,
      //       'model': 'myApp',
      //       'book_name': '金瓶梅',
      //       'add_time': '2020年1月17日'
      //   },
      //   {
      //       'pk': 2,
      //       'model': 'myApp',
      //       'book_name': '我的祖国',
      //       'add_time': '2020年1月17日'
      //   }
      // ]
    }
  },
  methods: {
    ...mapActions(['listBooks'])
  },
  computed: {
    ...mapState({
      bookList: state => state.datamining.bookList
    })
  },
  mounted () {
    this.listBooks().then(() => { this.loading = false })
  }
}
</script>

<style scoped>
  .data-input{
    width:650px;
    margin:10px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .icon-arrowdown, .icon-arrow-right{
    float: right;
  }
  .data-config-wrapper{
    display: flex;
  }
  .data-input-header{
    padding: 0;
  }
  .data-result{
    margin: 0 10px;
  }
</style>