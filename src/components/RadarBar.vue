<!-- 雷达图 -->
<template>
  <div>
    <div>【云端报警风险】</div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>
<script setup>
  import { ref, onMounted, watch } from 'vue'
  import * as echarts from 'echarts'

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
    mChart = echarts.init(target.value)
    renderChart()
  })

  // 2. 构建 option 配置对象 
  const renderChart = () => {
    const options = {
      // 雷达图的坐标系配置
      radar: {
        name: {
          textStyle: {
            color: '#05d5ff',
            fontSize: 14
          }
        },
        shape: 'polygon',
        center: ['50%', '50%'],
        radius: '80%',
        startAngle: 120,
        axisLine: {
          lineStyle: {
            color: 'rgba(211, 253, 250, 0.8)'
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            width: 1,
            color: 'rgba(5,213,255,.8)'
          }
        },
        indicator: props.data.risks.map(item => ({
          name: item.name,
          max: 100
        })),
        splitArea: {
          show: false
        }
      },
      // 极坐标系配置
      polar: {
        center: ['50%', '50%'],
        radius: '0%'
      },
      // 角度轴
      angleAxis: {
        min: 0,
        interval: 5,
        clockwise: false
      },
      // 半径轴
      radiusAxis: {
        min: 0,
        interval: 20,
        splitLine: {
          show: false
        }
      },
      // 核心配置 
      series: {
        type: 'radar',
        symbol: 'circle',
        symbolSize: 10,
        itemStyle: {
          normal: {
            color: '#05d5ff',
            opacity: 0.5
          }
        },
        areaStyle: {
          normal: {
            color: '#05d5ff',
            opacity: 0.5
          }
        },
        lineStyle: {
          width: 2,
          color: '#05d5ff',
        },
        label: {
          normal: {
            show: true,
            color: '#fff',
          }
        },
        data: [props.data.risks.map(item => item.value)]
      }
    }
    // 3. 通过 实例.setOptions(option)
    mChart.setOption(options);
  }

  watch(() => props.data, renderChart)
</script>
<style lang="scss" scoped>

</style>