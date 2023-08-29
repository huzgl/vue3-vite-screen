<!-- 竖向柱状图 -->
<template>
  <div>
    <div>【服务资源占用比】</div>
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
      // x轴展示数据
      xAxis: {
        // 类别
        type: 'category',
        data: props.data.servers.map((item) => item.name),
        // 文字
        axisLabel: {
          color: '#9eb1c8'
        }
      },
      // y轴展示数据
      yAxis: {
        show: false,
        type: 'value',
        max: function (value) { // 最大值 ，value 是X轴的数据
          return parseInt(value.max * 1.2)
        }
      },
      // 图表绘制的位置，对应 上下左右
      grid: {
        top: 16,
        right: 1,
        bottom: 46,
        left: 1,
        //containLabel: true
      },
      // 核心配置 
      series: [
        {
          // 柱
          type: 'bar',
          data: props.data.servers.map((item) => ({
            name: item.name,
            value: item.value
          })),
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
            position: 'top',
            textStyle: {
              color: '#fff'
            },
            formatter: '{c}%'
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