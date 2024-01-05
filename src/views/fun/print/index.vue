<template>
	<div class="layout-container">
		<el-card shadow="hover" header="print-js打印演示">
			<div style="margin-bottom: 15px">
				<el-table id="print-table" :data="tableData" border>
					<el-table-column prop="date" label="日期" width="180" align="center"> </el-table-column>
					<el-table-column prop="name" label="姓名" width="180" align="center"> </el-table-column>
					<el-table-column prop="address" label="地址" align="center"> </el-table-column>
				</el-table>
				<div style="margin-top: 15px">
					<el-image style="width: 100px; height: 100px" v-for="url in urls" :key="url" :src="url"></el-image>
				</div>
			</div>
			<el-button type="primary" @click="handelPrint('print-table', 'html')">表格打印</el-button>
			<el-button type="success" @click="handelPrint(urls, 'image')">图片打印</el-button>
		</el-card>
	</div>
</template>

<script>
import printJS from "print-js";
export default {
	name: "Print",
	data() {
		return {
			tableData: [
				{
					date: "2016-05-02",
					name: "王小虎",
					address: "上海市普陀区金沙江路 1518 弄",
				},
				{
					date: "2016-05-04",
					name: "王小虎",
					address: "上海市普陀区金沙江路 1517 弄",
				},
				{
					date: "2016-05-01",
					name: "王小虎",
					address: "上海市普陀区金沙江路 1519 弄",
				},
				{
					date: "2016-05-03",
					name: "王小虎",
					address: "上海市普陀区金沙江路 1516 弄",
				},
			],
			urls: [
				"https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
				"https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
				"https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
				"https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
				"https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
				"https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
				"https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
			],
		};
	},

	mounted() {},

	methods: {
		/* 点击打印 */
		handelPrint(data, type) {
			printJS({
				printable: data,
				type: type,
				header: null,
				targetStyles: ["*"],
				style: "@page {margin:0 10mm}",
				imageStyle: "width:50%;margin-bottom:20px;",
			});
		},
	},
};
</script>

<style lang="scss" scoped></style>
