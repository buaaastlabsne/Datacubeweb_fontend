<template>
  <div class="dcconfig-wrapper">
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide>
        <div class="step-header">第一步：选择数据立方主题</div>
        <div class="select-theme">
          <div @click="handleTheme($event)" :class="['theme-card', { 'theme-select': isActive == 1 }]" id="1">
            <el-card :body-style="{ padding: '0px' }">
              <img src="../../assets/img/cloud.gif" alt="">
              <div style="padding: 14px;">
                <div class="theme-title">大气环境</div>
                <div class="data-volumn">129Mb</div>
                <div title="主要描述了北半球区域内的大气环境再分析及模型解算数据，数据内容包括北半球标准大气
                （无时间经纬度，高度2000~80000米）、大气风场（时间1月、7月，纬度10°N~70°N，无经度）、TPV（时
                间2011/4/28 12:00~14:00，经度108°E~130°E，纬度15°N~25°N）等，数据精度经纬度分别划分从10°到
                0.2°四个等级，时间维按年-季-月-旬-日-时划分为6个等级，高度维从10000米到100米，划分5个等级。环
                境要素包括气压、温度、风速等。" class="data-description">
                  主要描述了北半球区域内的大气环境再分析及模型解算数据，数据
                  内容包括北半球标准大气（无时间经纬度，高度2000~80000米）、大气风场（时间1月、7月，纬度...
                </div>
              </div>
            </el-card>
          </div>
          <div @click="handleTheme($event)" :class="['theme-card', { 'theme-select': isActive == 2 }]" id="2">
            <el-card :body-style="{ padding: '0px' }">
              <img src="../../assets/img/ocean.gif" alt="">
              <div style="padding: 14px;">
                <div class="theme-title">海洋环境</div>
                <div class="data-volumn">2.34Gb</div>
                <div title="主要描述了南海区域的海洋流速再分析数据，海域范围为：108°E~120°E，15°N~25°N，时间范
                围为2004/7/1 0:00~2004/8/1 0:00，深度范围为0~600米。数据精度经纬度分别划分从10°到0.2°四个等级，
                时间维按年-季-月-旬-日-时划分为6个等级，深度维从2000米到50米，划分5个等级。环境要素包括海流U速度、
                海流V速度等。" class="data-description">
                  主要描述了南海区域的海洋流速再分析数据，海域范围为：108°E~120°E，15°N~25°N，时间范围为2004/7/10:00~
                  2004/8/1 0:00，深度范围为...
                </div>
              </div>
            </el-card>
          </div>
          <div @click="handleTheme($event)" :class="['theme-card', { 'theme-select': isActive == 3 }]" id="3">
            <el-card :body-style="{ padding: '0px' }">
              <img src="../../assets/img/land.gif" alt="">
              <div style="padding: 14px;">
                <div class="theme-title">陆地环境</div>
                <div class="data-volumn">0</div>
                <div title="主要描述了地形环境再分析数据。" class="data-description">
                  主要描述了地形环境再分析数据...
                </div>
              </div>
            </el-card>
          </div>
          <div @click="handleTheme($event)" :class="['theme-card', { 'theme-select': isActive == 4 }]" id="4">
            <el-card :body-style="{ padding: '0px' }">
              <img src="../../assets/img/space.gif" alt="">
              <div style="padding: 14px;">
                <div class="theme-title">空间环境</div>
                <div class="data-volumn">0</div>
                <div title="主要描述了空间环境再分析数据。" class="data-description">
                  主要描述了空间环境再分析数据...
                </div>
              </div>
            </el-card>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="step-header">第二步：选择事实维度表</div>
        <div class="step-body">
          <el-card style="display: flex; align-items: center;">
            事实表：
            <el-select v-model="factSelected" placeholder="请选择">
              <el-option v-for="item in factOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-card style="width: 300px;"><em>备注：</em>{{ factDesc }}</el-card>
          </el-card>
          <el-card>
            维度表：<el-transfer ref="dimTransfer" v-model="dimsSelected" :titles="['备选维度', '已选维度']" :data="dimsOptions"></el-transfer>
          </el-card>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="step-header">第三步：选择环境要素与维度层级</div>
        <div class="gen-xml-schema"><el-button type="primary" @click="createSchemaPrompt">生成数据立方文件</el-button></div>
        <div class="step-body">
          <el-card style="width:55%;">
            环境要素：<el-transfer ref="elemTransfer" v-model="elemsSelected" :titles="['备选要素', '已选要素']" :data="elemsOptions">
            </el-transfer>
          </el-card>
          <el-card style="width:40%;">
            维度层级：<el-card v-for="(dimsLevels, index) in dimsLevelsOptions" :key="index">
              <el-checkbox-group v-model="dimsLevelsSelected[index]">
                <el-checkbox v-for="(dimsLevel, key) in dimsLevels" :key="key" :label="dimsLevel.label"></el-checkbox>
              </el-checkbox-group>
            </el-card>
          </el-card>
        </div>
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination"  slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { mapState } from 'vuex'
import { successTip, errorTip } from '@/utils/common'
import restapi from '@/api/restapi'

export default {
  data() {
    return {
      swiperOption: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          clickable :true
        }
      },
      // 事实表选项和已选事实表
      factOptions: [],
      factSelected: '',
      // 维度表选项和已选维度表
      dimsOptions: [],
      dimsSelected: [],
      // 环境要素选项和已选环境要素
      elemsOptions: [],
      elemsSelected: [],
      // 维度层级选项和已选维度层级
      dimsLevelsOptions: [],
      dimsLevelsSelected: [[], [], [], []],
      theme: '',
      isActive: 0,
      factDesc: ''
    }
  },
  computed: {
    ...mapState({
      atmosphereTheme: state => state.configs.atmosphereTheme,
      oceanTheme: state => state.configs.oceanTheme,
      fact2Dims: state => state.configs.fact2Dims,
      fact2Elems: state => state.configs.fact2Elems,
      dimsLevels: state => state.configs.dimsLevels
    }),
    swiper() {
      return this.$refs.mySwiper
    }
  },
  methods: {
    handleTheme (e) {
      this.isActive = e.currentTarget.id
    },
    // 主题表里提取事实表信息
    theme2FactsOptions (theme) {
      return theme.map(e => {
        return { label: e.name, value: e.name, desc: e.desc }
      })
    },
    createSchemaPrompt () {
      this.$prompt(`请输入名称`, '新建数据立方文件', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /.+/,
        center: true,
      }).then(({ value }) => {
        return new Promise((resolve, reject) => {
          let dimsLevels = {}
          this.dimsSelected.forEach((e, index) => {
            dimsLevels[e] = this.dimsLevelsSelected[index]
          })
          let jsonObj = {
            theme: this.theme,
            xmlName: value + '.xml',
            factList: this.factSelected,
            dimList: this.dimsSelected,
            ...dimsLevels,
            measure: this.elemsSelected
          }
          let data = new FormData()
          let jsonStr = JSON.stringify(jsonObj)
          data.set('data', jsonStr)
          // data.append('data', '{"xmlPath": "tpv3.xml","factList": "TPV","dimList": ["TIME", "LONGITUDE"],"TIME":' 
          // + '["YEAR", "QUARTER", "MONTH", "XUN", "DAY", "HOUR"],"LONGITUDE": ["LON_10", "LON_2", "LON_1"],"measure":' 
          // + '["TEMPERATURE", "PRESSURE", "WIND_U", "WIND_V", "WIND_W"]}')
          restapi.request({
            method: 'post',
            url: `/xml`,
            data: data,
            success: resolve,
            error: reject
          })
        }).then((args) => {
          successTip(this, '创建成功！')
        }).catch((error) => {
          errorTip(this, '创建失败！')
        })
      })
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  watch: {
    isActive (newVal, oldVal) {
      switch (newVal) {
        case '1':
          this.theme = 'Atmosphere'
          this.factOptions = this.theme2FactsOptions(this.atmosphereTheme)
          break
        case '2':
          this.theme = 'Ocean'
          this.factOptions = this.theme2FactsOptions(this.oceanTheme)
          break
        case '3':
          this.theme = 'Land'
          break
        case '4':
          this.theme = 'Space'
          break
        default:
          this.theme = ''
      }
    },
    // 观察事实表选取情况，加载维度表和环境要素
    factSelected (newVal, oldVal) {
      this.dimsOptions = this.fact2Dims[newVal].map(e => {
        return { key: e, label: e }
      })
      this.elemsOptions = this.fact2Elems[newVal].map(e => {
        return { key: e, label: e }
      })
      this.factDesc = this.factOptions.filter(e => {
        if (e.value == newVal)
          return e
      })[0].desc
    },
    // 观察维度表选取情况，加载维度层级选项
    dimsSelected (newVal, oldVal) {
      console.log(newVal)
      this.dimsLevelsOptions = []
      this.dimsLevelsOptions = newVal.map(e => {
        return this.dimsLevels[e].map(item => {
          return { label: item }
        })
      })
    }
  }
}
</script>

<style>
  .swiper-container {
    height:600px;
  }
  .step-header{
    position: absolute;
    left: 50px;
    top:30px;
  }
  .gen-xml-schema{
    position: absolute;
    right: 50px;
    top:30px;
  }
  .select-theme{
    position: absolute;
    left: 50px;
    top: 100px;
    width: 90%;
    height: 75%;
    display: flex;
    justify-content: center;
  }
  .step-body{
    left: 100px;
    top: 100px;
    width: 1200px;
    position: absolute;
    display: flex;
  }
  .step-body .el-card{
    margin: 10px;
    height: 100%;
  }
  .el-card{
    height: 100%;
  }
  .theme-card{
    margin: 10px;
  }
  .theme-card:hover, .theme-select{
    border: 2px solid #3f8ce8;
  }
  .theme-title{
    font-weight: bold;
    color:#4083ff;
    margin-bottom: 14px;
  }
  .data-volumn{
    margin-bottom: 10px; 
  }
  .data-description{
    width: 210px;
    font-size: 14px;
  }
</style>