<template>
  <div class="dc-manage-wrapper">
    <show-card :title="'大气数据立方文件'" :expand="true">
      <div slot="card-content" style="width: 1200px;">
        <div class="datacube-file">
          <svg class="icon" aria-hidden="true" font-size="60px">
            <use xlink:href="#icon-file"></use>
          </svg>
          <div style="text-align: center;">北半球标准大气</div>
        </div>
        <div class="datacube-file">
          <svg class="icon" aria-hidden="true" font-size="60px">
            <use xlink:href="#icon-file"></use>
          </svg>
          <div style="text-align: center;">大气风场</div>
        </div>
        <div class="datacube-file">
          <svg class="icon" aria-hidden="true" font-size="60px">
            <use xlink:href="#icon-file"></use>
          </svg>
          <div style="text-align: center;">G365.2标准风场</div>
        </div>
        <div class="datacube-file">
          <svg class="icon" aria-hidden="true" font-size="60px">
            <use xlink:href="#icon-file"></use>
          </svg>
          <div style="text-align: center;">TPV温压风数据场</div>
        </div>
      </div>     
    </show-card>
    <div class="show-style">
      <show-card :title="'xml查看方式'" :expand="false">
        <div slot="card-content">
          <div class="scan-style">
            <textarea name="xmlstyle" id="" cols="30" rows="10" class="xml-style-textarea"></textarea>
          </div>
        </div>
      </show-card>
      <show-card :title="'树形查看方式'" :expand="false" class="show-style-card">
        <div slot="card-content">
          <div class="scan-style">
            <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick" expand="true"></el-tree>
          </div>
        </div>
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
          label: 'Cube-TPV',
          children: [
            {
              label: 'Dimension-TimeDim',
              children: [
                  {
                    label: 'Level-year'
                  },
                  {
                    label: 'Level-quarter'
                  },
                  {
                    label: 'Level-month'
                  }
              ]
            },
            {
              label: 'Dimension-LongitudeDim',
              children: [
                {
                  label: 'Level-lon_10'
                },
                {
                  label: 'Level-lon_2'
                }
              ]
            },{
              label: 'Measure-Temperature(avg)'
            },{
              label: 'Measure-Pressure(avg)'
            },
          ]
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
    margin: 10px 25px;
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
    width: 1260px;
    margin-top: 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .datacube-file {
    display: inline-block;
    font-size: 12px;
  }
  .datacube-file:hover {
    background: #faf8f8;
  }
  .scan-style {
    width: 560px;
    height: 360px;
  }
  .show-style-card {
    margin-right: 20px;
  }
  .xml-style-textarea {
    border:2px solid #faf8f8;
    width: 100%;
    height: 100%;
  }
</style>