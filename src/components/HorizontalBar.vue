<!-- 横向柱状图 -->
<template>
  <div>
    <div>【大区数据信息】</div>
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
      // X轴展示数据
      xAxis: {
        show: false,
        type: 'value',
        max: function (value) { // 最大值 ，value 是X轴的数据
          return parseInt(value.max * 1.2)
        }
      },
      // y轴展示数据
      yAxis: {
        // 类别
        type: 'category',
        data: props.data.regions.map((item) => item.name),
        inverse: true,
        // 轴线
        axisLine: {
          show: false
        },
        // 刻度
        axisTick: {
          show: false
        },
        // 文字
        axisLabel: {
          color: '#9eb1c8'
        }
      },
      // 图表绘制的位置，对应 上下左右
      grid: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        containLabel: true
      },
      // 核心配置 
      series: [
        {
          // 柱
          type: 'bar',
          data: props.data.regions.map((item) => ({
            name: item.name,
            value: item.value
          })),
          showBackground: true,
          // 背景色
          backgroundStyle: {
            color: 'rgba(58,138,143,0.2)'
          },
          // 每个柱的样式
          itemStyle: {
            color: '#479ad3', // 柱颜色
            barBorderRadius: 5, // 圆角
            shadowColor: 'rgba(0,0,0,0.3)', // 阴影
            shadowBluer: 5 // 阴影模糊
          },
          // 柱宽
          barWidth: 12,
          // 轴上文字
          label: {
            show: true,
            position: 'right',
            textStyle: {
              color: '#fff'
            }
          },
        }
      ]
    }
    // 3. 通过 实例.setOptions(option)
    mChart.setOption(options);
  }

  watch(() => props.data, renderChart)

</script>
<style lang="scss" scoped>

</style>