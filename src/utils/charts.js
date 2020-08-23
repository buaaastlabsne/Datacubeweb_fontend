export function debounce (func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

// 将折线数据转换成绘图option的函数
export function getLineOption (data) {
  let names = []
  let nums = []
  data.list.forEach((e, i) => {
    names.push(e.latitude)
    nums.push(e.temperature)
  })
  return {
    title: {
      text: '纬度温度关系曲线'
    },    
    tooltip: { 
      trigger: 'axis',       
        axisPointer: {               
        //  label:{show:true},
        type: 'cross'
      } 
    },
    legend: {
      show:false,
      data: ['温度']
    },
    xAxis: {
      data: names,         
      name:'纬度(°)',
        axisLabel: {
      }       
    },
    yAxis: {
      splitLine: { show: false },//去除网格线
      name: '度(°C)',        
      axisPointer: {
        snap: true  
      }        
    }, 
    dataZoom: [
      {   // 这个dataZoom组件，默认控制x轴。
        type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
        start: 10,      // 左边在 10% 的位置。
        end: 60         // 右边在 60% 的位置。
      },
      {   // 这个dataZoom组件，也控制x轴。
        type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
        start: 10,      // 左边在 10% 的位置。
        end: 20         // 右边在 60% 的位置。
      },       
      {
        type: 'slider',
        show:false,
        yAxisIndex: 0,
        start: 95,
        end: 100
      },
      {
        type: 'inside',
        yAxisIndex: 0,
        start: 10,
        end: 60
      }
    ],     
    series: [{
      barWidth: "30px",
      name: '温度',
      type: 'line',
      itemStyle: {
        normal: {
          label: {
            // show: true,    //用于点数据显示，数据多的时候效果差
            position: 'top',
            textStyle: {
              color: '#333'
            }
          }
        }
      },
      data: nums
    }]
  }
}

// 将柱状数据转换成绘图option的函数
export function getBarOption (data) {		
  return {
    legend: {
      data:['温度'],
      align: 'left'
    },
    tooltip: {},
    xAxis: {
      name:'高度(m)',
      data: data.xAxisData,
      silent: false,
      splitLine: {
        show: false
      }
    },
    yAxis: {
      name: '温度(°C)'			
    },
    series: [{
      name: '温度',
      type: 'bar',
      data: data.yAxisData,
      animationDelay: function (idx) {
        return idx * 10;
      }
    }],
    animationEasing: 'elasticOut',
    animationDelayUpdate: function (idx) {
      return idx * 5;
    }
  }
}

// 将三维散点数据转换成绘图option的函数
export function getScatterOption (windData, spacescope) {
  let lonMin = spacescope[0]
  let lonMax = spacescope[1]
  let latMin = spacescope[2]
  let latMax = spacescope[3]
  let heightMin = spacescope[4]
  let heightMax = spacescope[5]
  let data = []
  let p = 0
  let valMin = Infinity
  let valMax = -Infinity		    
  for (let k = 0; k <= 40; k++) {
    for (let j = 0; j <= 40; j++) {                 
      for (let i = 0; i <= 40; i++) {																				
        let p = i + j * 110 + k * 5661
        p = parseInt(p)					
        let temp = windData[p][0]		
        if (temp != 10) {		
          valMax = Math.max(valMax, temp)
          valMin = Math.min(valMin, temp)
        }	
        if((k >= heightMin / 500) && (k <= (heightMax / 500))) {
          if(j >= ((lonMin - 108) / 0.2) && j <= ((lonMax - 108) / 0.2)) {
            if(i >= ((latMin - 15) / 0.2) && i <= ((latMax - 15) / 0.2)) { 
              if(temp == 10) { temp = 23 } 
              data.push([i, j, k, temp])	
            }
          }
        } else {
          data.push([i, j, k, -100]);
        }																											
      }
    }   
  }

  return {
    title:{
      text:'TPV温度三维可视化展示',
      textStyle:{ 
        Color:'green',
        fontStyle:'',
        align:'center'
      }
    },			
    visualMap: {
      show: false,			
      min:valMin,       
      max:valMax,
      inRange: {
        symbol:'circle',         //'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
        label:{textStyle:{borderColor:'#000000'}},
        symbolSize: [0.5, 15],
        color: ['#000000','#191970','#000080','#0000CD','#313695', '#4575b4', '#74add1', '#abd9e9', 
        '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026'],								
        colorAlpha: [0.8, 1]  //[0.2,1]
      }
    },
    xAxis3D: {
      name:'北纬（°C）',  				
      type: 'value',
      axisPointer:{label:{show:true,formatter:function(value,index){return (15+value*0.2);}}},					
      axisLabel:{  
        show:true,
        formatter: function (value, index) {   
          return (15+value*0.2); 
        }   
      }
    },  									
    yAxis3D: {				
      type: 'value',
      name:'东经（°C）',
      axisPointer:{label:{show:true,formatter:function(value,index){return (108+value*0.2);}}},				
      axisTick: {//决定是否显示坐标刻度  				    	
        alignWithLabel: true,
        show:false   
      },
      axisLabel:{  //决定是否显示数据  
        show:true,
        formatter: function (value, index) {    //value当前值，index当前索引
          return (108+value*0.2);
        }   
      }
    }, 
    zAxis3D: {
      minInterval:1,  //maxInterval  interval
      type: 'value',
      name:'高度(m)',
      axisPointer:{label:{show:true,formatter:function(value,index){return value*500;}}},
      axisLabel:{  //决定是否显示数据  
        show:true,
        formatter: function (value, index) {    //value当前值，index当前索引
          return (value*500); 
        }   
      } 				
    },
    grid3D: {
      axisLine: {
        lineStyle: { color: '#000' }
      },
      axisPointer: {
        lineStyle: { color: '#000', width:1}
      },
      viewControl: {
        projection: 'orthographic'
      }
    },
    series: [{
      type: 'scatter3D',
      data: data
    }]
  }
}