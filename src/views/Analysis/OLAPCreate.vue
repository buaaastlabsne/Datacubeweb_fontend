<template>
  <div class="el-card">
    <tip-card :info="'多维分析仪表板'" :buttonText="'创建'" @click="createDashboardPrompt"></tip-card>
  </div>
</template>

<script>
import TipCard from '@/components/TipCard.vue' 
import { confirmTip, successTip } from '@/utils/common'
import { mapState } from 'vuex'

export default {
  components: {
    TipCard
  },
  methods: {
    createDashboardPrompt () {
      this.$prompt(`请输入名称`, '新建仪表盘', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /.+/,
        center: true,
      }).then(({ value }) => {
        let hashStr = (new Date()).toString
        this.dashboards.push({
          dashboardId: hashStr,
          dashboardName: value
        })
        this.$router.push(`/analysis/OLAP/` + hashStr)
        successTip(this, '创建成功！')
      })
    //   confirmTip(this, {
    //     boxType: 'prompt',
    //     body: `请输入名称`,
    //     head: '新建仪表盘',
    //     callback: () => {
    //       let {

    //       }
    //     },
    //     success: () => { this.$router.push(`/analysis/OLAP/dashboard1`) },
    //     successMessage: '创建成功',
    //     cancelMessage: '已取消新建'
    //   })
    }
  },
  computed: {
    ...mapState({
      dashboards: state => state.analysis.dashboards
    })
  }
}
</script>

<style>

</style>