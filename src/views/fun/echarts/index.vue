<template>
	<div class="echarts-container">
		<p>p1元素</p>
		<div class="bfc">
			<p>p2元素</p>
		</div>

		<!-- 折线图 -->
		<div style="width: 800px; height: 300px" ref="lineChart" id="lineChart"></div>
		<!-- 饼状图 -->
		<div style="width: 800px; height: 300px" ref="pieChart" id="pieChart"></div>
		<!-- 柱状图 -->
		<div style="width: 800px; height: 300px" ref="barChart" id="barChart"></div>
	</div>
</template>

<script>
// 引入基本模板
let Echarts = require("echarts/lib/echarts");
// 按需引入需要的组件模块 - 折线图
require("echarts/lib/component/grid");
require("echarts/lib/chart/line");
// 饼状图
require("echarts/lib/component/title");
// require('echarts/lib/component/tooltip');
require("echarts/lib/component/legend");
require("echarts/lib/chart/pie");
// 柱状图
require("echarts/lib/component/tooltip");
// require("echarts/lib/component/grid");
require("echarts/lib/chart/bar");
export default {
	name: "Echarts",

	data() {
		return {
			lineOptions: {}, // 折线图配置
			pieOptions: {}, // 饼状图配置
			barOptions: {}, // 柱状图配置
		};
	},

	mounted() {
		this.initLineChart();
        this.initPieChart();
		this.initBarChart();
	},

	methods: {
		/* 初始化折现图 */
		initLineChart() {
			const lineChart = this.$refs.lineChart;
			let lineEcharts = Echarts.init(lineChart);
			if (lineChart) {
				this.lineOptions = {
					xAxis: {
						type: "category",
						data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
					},
					yAxis: {
						type: "value",
					},
					series: [
						{
							data: [820, 932, 901, 934, 1290, 1330, 1320],
							type: "line",
							smooth: true,
						},
					],
				};
			}
			lineEcharts.setOption(this.lineOptions);
		},
		// 饼状图
		initPieChart() {
			const pieChart = this.$refs.pieChart;
			let pieEcharts = Echarts.init(pieChart);
			if (pieChart) {
				this.pieOptions = {
					title: {
						text: "Referer of a Website",
						subtext: "Fake Data",
						left: "center",
					},
					tooltip: {
						trigger: "item",
					},
					legend: {
						orient: "vertical",
						left: "left",
					},
					series: [
						{
							name: "Access From",
							type: "pie",
							radius: "50%",
							data: [
								{ value: 1048, name: "Search Engine" },
								{ value: 735, name: "Direct" },
								{ value: 580, name: "Email" },
								{ value: 484, name: "Union Ads" },
								{ value: 300, name: "Video Ads" },
							],
							emphasis: {
								itemStyle: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: "rgba(0, 0, 0, 0.5)",
								},
							},
						},
					],
				};
			}
			pieEcharts.setOption(this.pieOptions);
		},
		// 柱状图
		initBarChart() {
			const barChart = this.$refs.barChart;
			// console.log("barChart", barChart);
			let barEcharts = Echarts.init(barChart);
			if (barChart) {
				this.barOptions = {
					tooltip: {
						trigger: "axis",
						axisPointer: {
							type: "shadow",
						},
					},
					grid: {
						left: "3%",
						right: "4%",
						bottom: "3%",
						containLabel: true,
					},
					xAxis: [
						{
							type: "category",
							data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
							axisTick: {
								alignWithLabel: true,
							},
						},
					],
					yAxis: [
						{
							type: "value",
						},
					],
					series: [
						{
							name: "Direct",
							type: "bar",
							barWidth: "60%",
							data: [10, 52, 200, 334, 390, 330, 220],
						},
					],
				};
			}
			barEcharts.setOption(this.barOptions);
		},
	},
};
</script>

<style lang="scss" scoped>
.echarts-container {
	height: 100%;
	overflow-y: auto;
	.bfc {
		overflow: hidden;
	}
	p {
		color: #f55;
        background: #fcc;
        width: 200px;
        line-height: 100px;
        text-align:center;
        margin: 100px;
	}
}
</style>
