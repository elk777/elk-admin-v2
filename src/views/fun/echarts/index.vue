<template>
	<div class="echarts-container">
		<!-- 折线图 -->
		<chart-view :option="lineOptions"></chart-view>
		<!-- 饼状图 -->
		<chart-view :option="pieOptions"></chart-view>
		<!-- 柱状图 -->
		<chart-view :option="barOptions"></chart-view>
	</div>
</template>

<script>
export default {
	name: "Echarts",
	data() {
		return {
			lineOptions: {
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
			}, // 折线图配置
			pieOptions: {
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
			}, // 饼状图配置
			barOptions: {
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
			}, // 柱状图配置
		};
	},

	mounted() {

	},

	methods: {
	},
};
</script>

<style lang="scss" scoped>
.echarts-container {
	height: 100%;
	overflow-y: auto;
}
</style>
