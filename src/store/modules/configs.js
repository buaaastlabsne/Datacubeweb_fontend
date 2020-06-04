import restapi from '@/api/restapi'

const configs = {
  state: {
    atmosphereTheme: [
      {
        name: 'TPV',
        desc: '大气数据，描述了经度范围108°E~130°E、纬度范围15°N~25°N（0.1°方区）、高度范围500m~25000m（间隔500m）的温度、压强、三向风速数据'
      }, {
        name: 'NORTHSTANDARD',
        desc: '北半球标准大气数据，模型拟合计算得出，描述了高度-2000m~80000m（间隔50m）的大气压强、密度、温度数据'
      }, {
        name: 'WINDFIELD',
        desc: '大气风场数据，模型拟合计算得出，描述了纬度范围10°~70°、高度范围0m~25000m（间隔1000m）的大气风速U、风速V、实测风速、风速标准差、最大风速数据'
      }, {
        name: 'AT_WINDFIELD',
        desc: '实验大气数据，时间范围2000-1-1 18：00~2000-1-4 1：00（间隔1小时）高度、纬度、经度非等间距的风速U、风速V、气温、光照强度、气压涡度、' 
        + '湍动能、云水混合比、冰雪混合比、降水绝对变率数据'
      }
    ],
    oceanTheme: ['CURRENT'],
    fact2Dims: {
      'TPV': ['TIME', 'LONGITUDE', 'LATITUDE', 'HEIGHT'],
      'NORTHSTANDARD': ['TIME', 'LONGITUDE', 'LATITUDE', 'HEIGHT'],
      'WINDFIELD': ['TIME', 'LONGITUDE', 'LATITUDE', 'HEIGHT'],
      'AT_WINDFIELD': ['TIME', 'LONGITUDE', 'LATITUDE', 'HEIGHT'],
      'CURRENT': ['TIME', 'LONGITUDE', 'LATITUDE', 'DEPTH']
    },
    fact2Elems: {
      'TPV': ['TEMPERATURE', 'PRESSURE', 'WIND_U', 'WIND_V', 'WIND_W'],
      'NORTHSTANDARD': ['PRESSURE', 'DENSITY', 'TEMPERATURE'],
      'WINDFIELD': ['WIND_U', 'WIND_V', 'WIND_CLIMATOLOGY', 'WIND_CLIMATOLOGY_STD', 'WIND_MAX'],
      'AT_WINDFIELD': ['WIND_SPEED', 'WIND_DIRECTION', 'WIND_AVERAGE', 'WIND_CLIMATOLOGY_STD'],
      'CURRENT': ['SPEED_U', 'SPEED_V']
    },
    dimsLevels: {
      'TIME': ['YEAR', 'QUARTER', 'MONTH', 'XUN', 'DAY', 'HOUR'],
      'LONGITUDE': ['LON_10', 'LON_2', 'LON_1', 'LON_0_2'],
      'LATITUDE': ['LAT_10', 'LAT_2', 'LAT_1', 'LAT_0_2'],
      'HEIGHT': ['HT_10000', 'HT_5000', 'HT_1000', 'HT_500', 'HT_100'],
      'DEPTH': ['DEP_2000', 'DEP_1000', 'DEP_500', 'DEP_100', 'DEP_50']
    },
    // dataCubeFiles: [
    //   {
    //     name: 'TPV10',
    //     xmlContents: '<Schema></Schema>',
    //     treeData: [
    //       {
    //         label: 'Cube-TPV',
    //         children: [
    //           {
    //             label: 'Dimension-TimeDim',
    //             children: [
    //               {
    //                 label: 'Level-year'
    //               },
    //               {
    //                 label: 'Level-quarter'
    //               },
    //               {
    //                 label: 'Level-month'
    //               }
    //             ]
    //           },
    //           {
    //             label: 'Dimension-LongitudeDim',
    //             children: [
    //               {
    //                 label: 'Level-lon_10'
    //               },
    //               {
    //                 label: 'Level-lon_2'
    //               }
    //             ]
    //           }, {
    //             label: 'Measure-Temperature(avg)'
    //           }, {
    //             label: 'Measure-Pressure(avg)'
    //           },
    //         ]
    //       }
    //     ],
    //     menuVisible: false
    //   },
    //   {
    //     name: 'TPV20',
    //     xmlContents: '',
    //     treeData: [],
    //     menuVisible: false
    //   }
    // ],
    dataCubeFiles: []
  },
  mutations: {
    GET_PATH_NAMES: (state, data) => state.dataCubeFiles = data
  },
  actions: {
    getNames: ({ commit }, theme) => {
      return new Promise((resolve, reject) => {
        let postBody = new FormData()
        postBody.set('theme', theme)
        restapi.request({
          method: 'post',
          url: `/api/names`,
          data: postBody,
          success: sdata => {
            commit('GET_PATH_NAMES', sdata)
            resolve(sdata)
          },
          error: reject
        })
      })
    },
    deleteXMLFile: ({ commit }, address) => {
      return new Promise((resolve, reject) => {
        let postBody = new FormData()
        postBody.set('address', address)
        restapi.request({
          method: 'post',
          url: `/api/delete`,
          data: postBody,
          success: sdata => {
            commit('GET_PATH_NAMES', sdata)
            resolve(sdata)
          },
          error: reject
        })
      })
    }
  }
}

export default configs