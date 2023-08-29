<!-- 地图可视化 -->
<template>
  <div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>
<script setup>
  import { ref, onMounted } from 'vue'
  import * as echarts from 'echarts'
  // 地图导入
  import mapJson from '@/assets/mapData/china.json'

  const props = defineProps({
    data: {
      typeof: Object,
      required: true,
    }
  })

  // 1. 初始化 echarts 实例
  let mChart = null
  const target = ref(null)

  onMounted(() => {
    // 地图注册
    echarts.registerMap('china', mapJson)
    mChart = echarts.init(target.value)
    renderChart()
  })

  // 2. 构建 option 配置对象 
  const renderChart = () => {
    const options = {
      // 时间轴
      timeline: {
        data: props.data.voltageLevel,
        axisType: 'category',
        autoPlay: true,
        playInterval: 3000,
        left: '10%',
        right: '10%',
        bottom: '0%',
        width: '80%',
        label: {
          normal: {
            textStyle: {
              color: '#ddd'
            }
          },
          emphasis: {
            textStyle: {
              color: '#fff'
            }
          }
        },
        symbolSize: 10,
        lineStyle: {
          color: '#555'
        },
        checkpointStyle: {
          borderColor: '#888',
          borderWidth: 2
        },
        controlStyle: {
          showNextBtn: true,
          showPrevBtn: true,
          normal: {
            color: '#666',
            borderColor: '#666'
          },
          emphasis: {
            color: '#aaa',
            borderColor: '#aaa'
          }
        }
      },
      // 基础配置
      baseOption: {
        grid: {
          top: '15%',
          right: '2%',
          bottom: '10%',
          width: '20%',
        },
        // 地图配置
        geo: {
          show: true,
          map: 'china',
          roam: true,
          zoom: 0.8,
          center: [113.83531246, 34.0267395887],
          itemStyle: {
            normal: {
              borderColor: 'rgba(147,235,248,1)',
              borderWidth: 1,
              areaColor: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [{
                  offset: 0,
                  color: 'rgba(147,235,248,0)',
                }, {
                  offset: 1,
                  color: 'rgba(147,235,248,.2)',
                }]
              }
            },
            emphasis: {
              areaColor: '#389bb7',
              borderWidth: 0,
            },
          },
        }
      },
      // 动态配置
      options: []
    }

    // 遍历年份
    props.data.voltageLevel.forEach((item, index) => {
      options.options.push({
        backgroudColor: '#142037',
        title: [
          {
            text: '2019-2023 年度数据统计',
            left: '0%',
            top: '0%',
            textStyle: {
              color: '#ccc',
              fontSize: 30
            }
          }, {
            id: 'statistic',
            text: item + '年度数据统计情况',
            right: '0%',
            top: '4%',
            textStyle: {
              color: '#ccc',
              fontSize: 20
            }
          }
        ],
        xAxis: {
          type: 'value',
          scale: true,
          position: 'top',
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            margin: 2,
            textStyle: {
              color: '#aaa'
            }
          }
        },
        yAxis: {
          type: 'category',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#ddd'
            }
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            interval: 0,
            textStyle: {
              color: '#ddd'
            }
          },
          data: props.data.categoryData[item].map(item => item.name)

        },
        series: [{
          type: 'bar',
          zlevel: 1.5,
          itemStyle: {
            normal: {
              color: props.data.colors[index]
            }
          },
          data: props.data.categoryData[item].map(item => item.value)
        },
        // 地图上的散点
        {
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: props.data.topData[item],
          symbolSize: function (val) {
            return val[2] / 4
          },
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke'
          },
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: true,
            }
          },
          itemStyle: {
            normal: {
              color: props.data.colors[index],
              shadowBlue: 5,
              shadowColor: props.data.colors[index]
            }
          }
        }]
      })
    })
    // 3. 通过 实例.setOptions(option)
    mChart.setOption(options);
  }
 
</script>
<style lang="scss" scoped>

</style>
