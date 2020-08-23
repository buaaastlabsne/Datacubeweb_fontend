<template>
  <div class="no-data-tip">
    <div class="el-card">
      <div class="el-info" :class="{ 'only-info': typeof buttonText !== 'string'}">{{ info }}</div>
      <el-button type="primary" @click="$emit('click')" v-if="typeof buttonText === 'string'">{{ buttonText }}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['info', 'buttonText']
}
</script>

<style scoped>
.no-data-tip {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -66px;
  margin-left: -180px;
}
.el-card {
  width: 360px;
  height: 132px;
  padding: 20px;
  text-align: center;
  border-radius: 5px;
  border-color: #DFE2EE;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.22);
}
.el-card .el-info {
  font-size: 14px;
  line-height: 24px;
  color: #606266;
  margin-top: 10px;
  margin-bottom: 15px;
}
.el-card .el-info.only-info {
  font-size: 16px;
  margin-top: 34px;
  margin-bottom: 34px;
}
.el-card .el-button {
  height: 34px;
  padding-top: 7px;
  padding-bottom: 7px;
  margin-bottom: 10px;
  font-weight: normal;
  background-color: #1989FA;
}
.el-card .el-button:focus,
.el-card .el-button:hover {
  background-color: #1989FA;
}
</style>
