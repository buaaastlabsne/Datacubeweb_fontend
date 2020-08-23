import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/Layout/Layout.vue'
import DCConfig from '../views/Configuration/DCConfig.vue'
import DCManage from '../views/Configuration/DCManage.vue'
import DBConfig from '../views/Configuration/DBConfig.vue'
import OLAPCreate from '../views/Analysis/OLAPCreate.vue'
import OLAPDashboard from '../views/Analysis/OLAPDashboard.vue'
import DataMining from '../views/DataMining/DataMining.vue'
import DataMining_SVR from '../views/DataMining/DataMining_SVR.vue'
import DataMining_FCM from '../views/DataMining/DataMining_FCM.vue'
import DataMining_COR from '../views/DataMining/DataMining_COR.vue'
import DataMining_ANOVA from '../views/DataMining/DataMining_ANOVA.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/configuration'
    },
    {
      path: '/configuration',
      component: Layout,
      redirect:'/configuration/datacubeconfig',
      children:[
        {
          path:'/configuration/databaseconfig',
          component:DBConfig,
        },
        {
          path:'/configuration/datacubeconfig',
          component:DCConfig,
        },
        {
          path:'/configuration/datacubemanage',
          component:DCManage,
          redirect: '/configuration/datacubemanage/atmosphere'
        },
        {
          path:'/configuration/datacubemanage/:category',
          component:DCManage
        }
      ]
    },
    {
      path: '/analysis',
      component: Layout,
      redirect:'/analysis/OLAP',
      children:[
        {
          path:'/analysis/OLAP',
          component:OLAPCreate
        },
        {
          path: '/analysis/OLAP/:dashboardId',
          component: OLAPDashboard
        }
      ]
    },
    {
      path: '/datamining',
      component: Layout,
      children:[
        {
          path:'/datamining',
          component:DataMining
        },
        {
          path: '/datamining/SVR',
          component: DataMining_SVR
        },
        {
          path: '/datamining/FCM',
          component: DataMining_FCM
        },
        {
          path: '/datamining/COR',
          component: DataMining_COR
        },
        {
          path: '/datamining/ANOVA',
          component: DataMining_ANOVA
        }
      ]
    }
  ]
})
