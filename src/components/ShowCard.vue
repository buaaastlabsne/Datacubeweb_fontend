<template>
  <div class="card-wrapper">
    <el-card class="card-component">
      <div slot="header" class="card-header">
        <span>{{ title }}</span>
        <div class="expand-icon" v-if="expand">
          <span class="iconfont icon-arrowdown" v-if="expand1" @click="expand1 = !expand1"></span>
          <span class="iconfont icon-arrow-right" v-else @click="expand1 = !expand1"></span>
        </div>
      </div>
      <div class="card-body" v-if="expand1">
        <slot name="card-content"></slot>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      expand1: true
    }
  },
  props: ['title', 'expand']
}
</script>

<style>
  .card-wrapper{
    display: flex;
  }
  .expand-icon{
    display: inline-block;
    line-height: 20px;
    float: right;
  }
</style>