<template>
  <div class="chart-container">
    <div ref="chart" :style="{width, height}"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts/core';
import { TooltipComponent, LegendComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout
]);
export default {
  name: 'Chart',
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    autoResize: {
        type: Boolean,
        default: true
    },
    option: {
        type: Object,
        required: true
    }
  },
  data() {
    return {
        chart: null,
    };
  },
  mounted() {
    this.initChart();
    if(this.chart && this.autoResize) {
        window.addEventListener('resize', this.openResize)
    }
  },
  beforeDestroy() {
    if (this.chart && this.autoResize) {
        window.removeEventListener('resize', this.openResize)
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    // 初始化chart
    initChart() {
        let chartRef = this.$refs.chart;
        this.chart = echarts.init(chartRef);
        this.chart.setOption(this.option);
    },
    /* 开启图表自适应 */
    openResize() {
        this.chart.resize()
    }
  },
};
</script>