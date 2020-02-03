<template>
  <div class="dcconfig-wrapper">
    <swiper :options="swiperOption" ref="diymySwiper" @someSwiperEvent="callback">
      <!-- slides -->
      <swiper-slide>
        <div class="step-header">第一步：选择数据立方主题</div>
        <div class="select-theme">
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
      </swiper-slide>
      <swiper-slide>
        <div class="step-header">第二步：选择事实维度表</div>
        <div class="step-body">
          <el-card>
            事实表：
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in factsOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-card>
          <el-card>
            维度表：<el-transfer 
              ref="dimTransfer" 
              v-model="dimValue" 
              :titles="['备选维度', '已选维度']"
              :data="dimsOptions">
            </el-transfer>
          </el-card>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="step-header">第三步：选择环境要素与维度层级</div>
        <div class="step-body">
          <el-card style="width:53%;">
            环境要素：<el-transfer 
              ref="elemTransfer" 
              v-model="elemValue" 
              :titles="['备选要素', '已选要素']"
              :data="elemsOptions">
            </el-transfer>
          </el-card>
          <el-card style="width:40%;">
            维度层级：<el-card><el-checkbox-group v-model="dimLevel1">
                <el-checkbox label="YEAR"></el-checkbox>
                <el-checkbox label="QUARTER"></el-checkbox>
                <el-checkbox label="MONTH"></el-checkbox>
                <el-checkbox label="XUN"></el-checkbox>
                <el-checkbox label="DAY"></el-checkbox>
                <el-checkbox label="HOUR"></el-checkbox>
              </el-checkbox-group>
            </el-card>
            <el-card><el-checkbox-group v-model="dimLevel1">
              <el-checkbox label="复选框 A"></el-checkbox>
              <el-checkbox label="复选框 B"></el-checkbox>
              <el-checkbox label="复选框 C"></el-checkbox>
              </el-checkbox-group>
            </el-card>
            <el-card><el-checkbox-group v-model="dimLevel1">
              <el-checkbox label="复选框 A"></el-checkbox>
              <el-checkbox label="复选框 B"></el-checkbox>
              <el-checkbox label="复选框 C"></el-checkbox>
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
      factsOptions: [
        {
          value: 'TPV',
          label: 'TPV'
        }, {
          value: 'NORTHSTANDARD',
          label: 'NORTHSTANDARD'
        }, {
          value: 'WINDFIELD',
          label: 'WINDFIELD'
        }, {
          value: 'AT_WINDFIELD',
          label: 'AT_WINDFIELD'
        }
      ],
      value: '',
      dimsOptions: [
        {
          key: 'TIME',
          label: 'TIME'
        }, {
          key: 'LONGITUDE',
          label: 'LONGITUDE'
        }, {
          key: 'LATITUDE',
          label: 'LATITUDE'
        }, {
          key: 'HEIGHT',
          label: 'HEIGHT'
        }
      ],
      dimValue: [],
      elemsOptions: [
        {
          key: 'TEMPERATURE',
          label: 'TEMPERATURE'
        }, {
          key: 'PRESSURE',
          label: 'PRESSURE'
        }, {
          key: 'WIND_U',
          label: 'WIND_U'
        }, {
          key: 'WIND_V',
          label: 'WIND_V'
        }, {
          key: 'WIND_W',
          label: 'WIND_W'
        }
      ],
      elemValue: [],
      dimLevel1: []
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  components: {
    swiper,
    swiperSlide
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
    left: 50px;
    top: 100px;
    position: absolute;
    display: flex;
  }
  .el-card{
    margin: 10px;
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