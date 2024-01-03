<template>
	<div class="layout-container">
		<el-card shadow="hover" header="wangEditor富文本编辑器">
			<WangEditor ref="wangeditor" />
			<div class="button-style">
				<el-button type="primary" @click="getHtml">获取富文本内容</el-button>
				<div class="content">{{ content }}</div>
				<el-button type="success" @click="setHtml">模拟回显富文本内容</el-button>
			</div>
		</el-card>
	</div>
</template>

<script>
import WangEditor from "@/components/Editor";

export default {
	name: "Editor",
	components: {
		WangEditor,
	},
	data() {
		return {
			content: null,
		};
	},

	mounted() {},

	methods: {
		/* 获取富文本内容 */
		getHtml() {
			let wangeditor = this.$refs.wangeditor;
			this.content = wangeditor.html;
		},
		/* 设置富文本内容 */
		setHtml() {
			let wangeditor = this.$refs.wangeditor;
			wangeditor.html = `<p><span style="color: rgb(51, 51, 51); background-color: rgb(255, 255, 255); font-size: 14px;">胡歌，1982年9月20日出生于上海市徐汇区，中国内地影视男演员、流行乐歌手，</span><a href="https://baike.baidu.com/item/%E6%B0%91%E7%9B%9F/1971441?fromModule=lemma_inlink" target="_blank" style="text-indent: 28px; text-align: start;">民盟</a><span style="color: rgb(51, 51, 51); background-color: rgb(255, 255, 255); font-size: 14px;">盟员</span><span style="color: rgb(51, 102, 204); background-color: rgb(255, 255, 255); font-size: 12px;"><sup> [1]</sup></span><a href="" target="" style="text-indent: 28px; text-align: start;"> </a><span style="color: rgb(51, 51, 51); background-color: rgb(255, 255, 255); font-size: 14px;"> ，毕业于</span><a href="https://baike.baidu.com/item/%E4%B8%8A%E6%B5%B7%E6%88%8F%E5%89%A7%E5%AD%A6%E9%99%A2/1736818?fromModule=lemma_inlink" target="_blank" style="text-indent: 28px; text-align: start;">上海戏剧学院</a><span style="color: rgb(51, 51, 51); background-color: rgb(255, 255, 255); font-size: 14px;">表演系。</span></p>`;
		},
	},
};
</script>

<style lang="scss" scoped>
.button-style {
	margin-top: 10px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.content {
		margin-left: 15px;
	}
}
</style>
