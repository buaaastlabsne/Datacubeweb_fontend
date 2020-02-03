<template>
  <div class="el-card">
    <tip-card :info="'多维分析仪表板'" :buttonText="'创建'" @click="createDashboardPrompt"></tip-card>
  </div>
</template>

<script>
import TipCard from '@/components/TipCard.vue' 
import { confirmTip } from '@/utils/common'

export default {
  components: {
    TipCard
  },
  methods: {
    createDashboardPrompt () {
      confirmTip(this, {
        boxType: 'prompt',
        body: `请输入名称`,
        head: '新建仪表盘',
        callback: () => {},
        success: () => { this.$router.push(`/analysis/OLAP/dashboard1`) },
        successMessage: '创建成功',
        cancelMessage: '已取消新建'
      })
    }
  }
}
</script>

<style>

</style>