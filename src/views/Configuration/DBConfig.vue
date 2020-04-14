<template>
  <div>
    <div class="db-configurated">
      <span class="configurated-title">已配置数据源列表</span>
      <ul class="ul-class">
        <li>Oracle海洋水文数据源</li>
        <li>MySQL综合气象大面分集数据源</li>
        <li>Access高程栅格数据集数据源</li>
        <li>添加+</li>
      </ul>
    </div>
    <div class="db-info">
      <span class="configurated-title">数据源配置信息</span>
      <ul class="ul-class">
        <li>数据连接名称<input type="text" /></li>
        <li>数据库类型<select name="db" id="1"><option value="Oracle">Oracle</option></select></li>
        <li>URL<input type="text" /></li>
        <li>JDBC Driver<input type="text"></li>
        <li>Username<input type="text"></li>
        <li>Password<input type="password"></li>
        <li>Security<select name="db" id="1"><option value="none">none</option></select></li>
      </ul>
    </div>
    <div class="db-test">
      <el-button style="left: 20px; top: 20px; position: absolute;" type="primary">测试连接</el-button>
      <el-progress style="left:20px;top:100px;width:200px;position:absolute;" :text-inside="true" :stroke-width="24" :percentage="100" status="success"></el-progress>
      <div style="top: 100px;left: 250px;position:absolute;color: blue;">连接成功！</div>
    </div>
  </div>
</template>

<script>
// import ShowCard from '@/components/ShowCard.vue'

export default {

}
</script>

<style scoped>
  .db-configurated {
    left: 100px;
    top: 50px;
    position: absolute;
    width: 500px;
    border-radius: 4px;
    border: 2px solid gray;
    height: 600px;
  }
  .ul-class {
    left: 20px;
    top: 80px;
    position: absolute;
    list-style: none;
    line-height: 20px;
  }
  li {
    margin: 20px 0;
    background: #fff9f9;
    width: 440px;
  }
  .db-info li {
    /* width: 180px; */
  }
  .db-info input, .db-info select {
    display: inline;
    right: 20px;
    position: absolute;
    width: 250px;
  }
  .db-configurated li:hover {
    background: #3f8ce8;
  }
  .configurated-title {
    left: 20px;
    top: 20px;
    position: absolute;
    font-size: 24px;
  }
  .db-info {
    left: 700px;
    top: 50px;
    position: absolute;
    width: 500px;
    border-radius: 4px;
    border: 2px solid gray;
    height: 400px;
  }
  .db-test {
    left: 700px;
    top: 480px;
    position: absolute;
    width: 500px;
    border-radius: 4px;
    border: 2px solid gray;
    height: 170px;
  }
</style>>

