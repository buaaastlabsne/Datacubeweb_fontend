<template>
  <div class="dc-manage-wrapper">
    <show-card :title="'大气数据立方文件'" :expand="true">
      <div slot="card-content" style="width: 1200px;">
        <div class="datacube-file" v-for="(item, index) in dataCubeFiles" :key="index" @mouseover="item.menuVisible = true" @mouseleave=" item.menuVisible = false">
          <svg class="icon" aria-hidden="true" font-size="60px">
            <use xlink:href="#icon-file"></use>
          </svg>
          <div style="text-align: center;">{{ item.name }}</div>
          <div class="file-opr-menu" v-if="item.menuVisible">
            <span class="iconfont icon-Roll" @click="scanFile(index)"></span>
            <span class="iconfont icon-delete" @click="deleteFile(index)"></span>
          </div>
        </div>
      </div>     
    </show-card>
    <div class="show-style">
      <show-card :title="'xml查看方式'" :expand="false">
        <div slot="card-content">
          <div class="scan-style">
            <textarea name="xmlstyle" id="" cols="30" rows="10" class="xml-style-textarea" v-model="curXML"></textarea>
          </div>
        </div>
      </show-card>
      <show-card :title="'树形查看方式'" :expand="false" class="show-style-card">
        <div slot="card-content">
          <div class="scan-style">
            <el-tree :data="curTreeData" :props="defaultProps" expand="true"></el-tree>
          </div>
        </div>
      </show-card>
    </div>
  </div>
</template>

<script>
import ShowCard from '@/components/ShowCard.vue'
import vkbeautify from 'vkbeautify'
import { mapState } from 'vuex'
import { confirmTip } from '@/utils/common'

export default {
  data () {
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      curXML: '',
      curTreeData: []
    }
  }, 
  components: {
    ShowCard
  },
  mounted () {
    
  },
  methods: {
    scanFile (witch) {
      this.curXML = this.dataCubeFiles[witch].xmlContents
      this.curTreeData = this.dataCubeFiles[witch].treeData
    },
    deleteFile (witch) {
      confirmTip(this, {
        boxType: 'confirm',
        body:  this.dataCubeFiles[witch].name + '?',
        head: '确定删除数据立方文件：',
        callback: () => {},
        success: () => {
          this.dataCubeFiles.splice(witch, 1)
          this.curXML = ''
          this.curTreeData = []
        },
        cancel: () => {
          this.dbConnections[witch].status = !this.dbConnections[witch].status
        },
        successMessage: '删除成功',
        cancelMessage: '已取消操作'
      })
    }
  },
  computed: {
    ...mapState({
      dataCubeFiles: state => state.configs.dataCubeFiles
    })
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
  .file-opr-menu {
    position: absolute;
    width: 70px;
    height: 40px;
    z-index: 100;
    transform: translateY(-75px) translateX(20px);
    display: flex;
    justify-content: space-between;
    /* background: #faf8f8;
    opacity: 0.8; */
  }
  .file-opr-menu .icon-delete, .file-opr-menu .icon-Roll{
    font-size: 30px;
  }
  .file-opr-menu .icon-delete:hover, .file-opr-menu .icon-Roll:hover {
    background: #3f8ce8;
  }
</style>