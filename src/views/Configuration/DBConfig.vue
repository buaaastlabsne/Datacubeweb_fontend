<template>
  <div>
    <div class="db-configurated">
      <span class="configurated-title">已配置数据源列表</span>
      <ul class="ul-class">
        <li v-for="(item, key) in dbConnections" :key="key" @click="scanDBinfo(item)">
          {{ item.name }}
          <div class="db-config-oprate">
            <span class="iconfont icon-delete" @click="deleteConnection(key)"></span>
            <el-switch v-model="item.status" active-color="#13ce66" @change="openConnection(key)"></el-switch>
          </div>
        </li>
        <li @click="addDBPrompt">添加+</li>
      </ul>
    </div>
    <div class="db-info">
      <span class="configurated-title">数据源配置信息</span>
      <ul class="ul-class">
        <li>数据连接名称：<input type="text" v-model="curDBinfo.name" /></li>
        <li>数据库类型：<input type="text" v-model="curDBinfo.database" /></li>
        <li>URL：<input type="text" v-model="curDBinfo.URL" /></li>
        <li>JDBC Driver：<input type="text" v-model="curDBinfo.JDBCdriver" /></li>
        <li>Username：<input type="text" v-model="curDBinfo.Username" /></li>
        <li>Password：<input type="password" v-model="curDBinfo.Password" /></li>
        <li>Security：<input type="text" v-model="curDBinfo.security" /></li>
      </ul>
    </div>
    <div class="db-test">
      <el-button style="left: 20px; top: 20px; position: absolute;" type="primary" @click="progressProcess">测试连接</el-button>
      <el-progress style="left:20px;top:100px;width:200px;position:absolute;" :text-inside="true" :stroke-width="24" :percentage="progressValue" status="success"></el-progress>
      <div v-if="progressValue == 100" style="top: 100px;left: 250px;position:absolute;color: blue;">连接成功！</div>
    </div>
    <el-dialog title="数据源配置信息" :visible.sync="dialogVisible" width="50%">
      <el-card>
        <ul class="db-config-ul">
          <li><div class="db-info-title">数据连接名称：</div><el-input v-model="newDBinfo.name"></el-input></li>
          <li><div class="db-info-title">数据库类型：</div>
            <el-select name="select1" id="select1" v-model="newDBinfo.database">
              <el-option value="Oracle">Oracle</el-option>
              <el-option value="SQL Server">SQL Server</el-option>
              <el-option value="MySQL">MySQL</el-option>
            </el-select>
          </li>
          <li><div class="db-info-title">URL：</div><el-input v-model="newDBinfo.URL"></el-input></li>
          <li><div class="db-info-title">JDBC Driver：</div><el-input v-model="newDBinfo.JDBCdriver"></el-input></li>
          <li><div class="db-info-title">Username：</div><el-input v-model="newDBinfo.Username"></el-input></li>
          <li><div class="db-info-title">Password：</div><el-input type="password" v-model="newDBinfo.Password"></el-input></li>
          <li><div class="db-info-title">数据库类型：</div>
            <el-select name="select2" id="select2" v-model="newDBinfo.security">
              <el-option value="Public">Public</el-option>
              <el-option value="Private">Private</el-option>
              <el-option value="None">None</el-option>
            </el-select>
          </li>
        </ul>
      </el-card> 
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDBConnection">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import ShowCard from '@/components/ShowCard.vue'
import { confirmTip } from '@/utils/common'

export default {
  data () {
    return {
      dialogVisible: false,
      newDBinfo: {
        name: '',
        database: '',
        URL: '',
        JDBCdriver: '',
        Username: '',
        Password: '',
        security: '',
        status: false
      },
      curDBinfo: {},
      dbConnections: [
        {
          name: 'Oracle大气风场数据源',
          database: 'Oracle',
          URL: 'jdbc oracle:thin@localhost:1521:orcl',
          JDBCdriver: 'oracle jdbc:jdbcDriver',
          Username: 'ATMOS',
          Password: 'happy2018',
          security: 'None',
          status: false
        }, {
          name: 'MySQL海洋水文数据源',
          database: 'MySQL',
          URL: 'jdbc:mysql://localhost:3306/database',
          JDBCdriver: 'com.mysql.jdbc.Driver',
          Username: 'ATMOS',
          Password: 'happy2018',
          security: 'None',
          status: false
        },
      ],
      timeId: null,
      progressValue: 0
    }
  },
  methods: {
    addDBPrompt () {
      this.dialogVisible = true
      //  confirmTip(this, {
      //   boxType: 'prompt',
      //   body: `请输入名称`,
      //   head: '新建数据立方文件',
      //   callback: () => {},
      //   success: () => {},
      //   successMessage: '创建成功',
      //   cancelMessage: '已取消新建'
      // })
    },
    scanDBinfo (who) {
      clearInterval(this.timeId)
      this.progressValue = 0
      this.curDBinfo = who
    },
    addDBConnection () {
      this.dbConnections.push(this.newDBinfo)
      this.dialogVisible = false
    },
    progressProcess () {
      debugger
      this.timeId = setInterval(() => {
        if (this.progressValue == 100) {
          clearInterval(this.timeId)
        } else {
          this.progressValue += 10
        }
      }, 300)
    },
    openConnection (witch) {
      let connectionName = this.dbConnections[witch].name
      let connectionStatus = this.dbConnections[witch].status
      confirmTip(this, {
        boxType: 'confirm',
        body: connectionName + '?',
        head: connectionStatus ? '确定启用数据连接：' : '确定关闭数据连接：',
        callback: () => {},
        success: () => {
          this.dbConnections.forEach((e, index) => {
            if (witch != index) {
              e.status = false
            }
          })
        },
        cancel: () => {
          this.dbConnections[witch].status = !this.dbConnections[witch].status
        },
        successMessage: connectionStatus ? '启用成功' : '关闭成功',
        cancelMessage: '已取消操作'
      })
    },
    deleteConnection (witch) {
      let connectionName = this.dbConnections[witch].name
      confirmTip(this, {
        boxType: 'confirm',
        body: connectionName + '?' ,
        head: '确定删除数据连接：',
        callback: () => {},
        success: () => {
          this.dbConnections.splice(witch, 1)
          this.curDBinfo = {}
        },
        successMessage: '删除成功',
        cancelMessage: '已取消操作'
      })
    }
  }
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
  .ul-class li {
    margin: 20px 0;
    background: #fff9f9;
    width: 440px;
    cursor: pointer;
  }
  .db-info input, .db-info select {
    right: 20px;
    width: 300px;
    position: absolute;
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
  .el-dialog .el-card {
    height: 400px;
  }
  .db-config-ul {
    list-style: none;
  }
  .db-config-ul li {
    margin: 10px 0;
    display: flex;
    align-items: center;
  }
  .db-config-ul .el-input {
    width: 80%;
    margin-right: 20px;
  }
  .db-config-ul .el-select {
    margin-right: 20px;
    width: 80%;
  }
  .db-info-title {
    width: 20%;
  }
  .db-config-oprate {
    float: right;
    display: flex;
    justify-content: right;
  }
  .db-config-oprate .el-switch {
    margin-left: 10px;
  }
</style>>

