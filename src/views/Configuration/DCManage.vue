<template>
  <div class="dc-manage-wrapper">
    <show-card :title="'大气数据立方文件'" :expand="true">
      <div slot="card-content">
        <svg class="icon" aria-hidden="true" font-size="60px">
          <use xlink:href="#icon-file"></use>
        </svg>
        <svg class="icon" aria-hidden="true" font-size="60px">
          <use xlink:href="#icon-file"></use>
        </svg>
        <svg class="icon" aria-hidden="true" font-size="60px">
          <use xlink:href="#icon-file"></use>
        </svg>
        <svg class="icon" aria-hidden="true" font-size="60px">
          <use xlink:href="#icon-file"></use>
        </svg>
        <svg class="icon" aria-hidden="true" font-size="60px">
          <use xlink:href="#icon-file"></use>
        </svg>
      </div>
    </show-card>
    <div class="show-style">
      <show-card :title="'xml查看方式'" :expand="false">
        <div slot="card-content">
          fafafaafaga
        </div>
      </show-card>
      <show-card :title="'树形查看方式'" :expand="false">
        <el-tree :data="treeData" :props="defaultProps"></el-tree>
      </show-card>
    </div>
  </div>
</template>

<script>
import ShowCard from '@/components/ShowCard.vue'

export default {
  data () {
    return {
      treeData: [
        {
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  }, 
  components: {
    ShowCard
  }
}
</script>

<style>
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    margin: 10px;
  }
  .dc-manage-wrapper{
    display: flex;
    padding: 5px;
    flex-direction: column;
  }
  .icon-arrowdown, .icon-arrow-right{
    float: right;
  }
  .data-input-header{
    padding: 0;
  }
  .data-result{
    margin: 0 10px;
  }
  .show-style{
    display: flex;
    flex-direction: row;
  }
</style>