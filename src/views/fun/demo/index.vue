<template>
	<div class="layout-container demo-container">
		<el-card shadow="hover" header="demo" style="height: 1000px">
			<div style="margin-bottom: 20px">模拟下拉框多数据加载过慢问题</div>
			<virtua-list-scroll :dataList="dataList" :defaultValue="value"></virtua-list-scroll>
			<!-- <div style="margin-top: 20px">
				<h3>直播视频流播放</h3>
				<div>
					<video ref="videoRef" autoplay controls preload="auto" width="100%" height="100%">
						<source type="video/mp4" />
					</video>
				</div>
				<button @click="playVideo">播放视频</button>
			</div> -->
		</el-card>
	</div>
</template>

<script>
import VirtualListScroll from "@/components/VirtualListScroll/index.vue";
// import cx from '../../../../public/cs.flv'
import mpegts from "mpegts.js";
import flvjs from "flv.js";
import { Mixins } from "./demo";
export default {
	name: "Demo",
	mixins: [Mixins],
	components: {
		"virtua-list-scroll": VirtualListScroll,
	},
	data() {
		return {
			dataList: [],
			value: "", // 回显值

			// flvSrc: "https://sample-videos.com/video123/flv/720/big_buck_bunny_720p_1mb.flv",
			// flvSrc:'http://localhost:5001/cs.flv',
			flvSrc: "http://192.168.1.232:88/flv_live?port=1935&app=live&stream=stream_key",
			flvPlayer: {},
		};
	},

	mounted() {

		/* set */

		this.getList();
		console.log("开始");
		if (flvjs.isSupported()) {
			//检查当前浏览器是否支持 flv.js
			// var videoElement = document.getElementById(this.d.id);
			const videoElement = this.$refs.videoRef;
			console.log("进入了", videoElement);

			//创建一个 flv.js 播放器实例
			this.flvPlayer = flvjs.createPlayer({
				type: "flv", //指定视频类型
				isLive: true, //标记视频流是否为直播流
				// hasAudio: false, //标记视频流是否包含音频轨道
				cors: true,
				url: this.flvSrc, //视频流的 URL 地址
			});
			//使用 `attachMediaElement()` 方法将视频元素与 flv.js 播放器关联起来
			this.flvPlayer.attachMediaElement(videoElement);

			console.log("最后的", this.flvPlayer);
			//加载视频流
			// this.flvPlayer.load();
			//开始播放视频
			// this.flvPlayer.play();
		}
	},
	beforeDestroy() {
		if (this.flvPlayer) {
			this.flvPlayer.pause();
			this.flvPlayer.unload();
			this.flvPlayer.detachMediaElement();
			this.flvPlayer.destroy();
			this.flvPlayer = null;
		}
	},

	methods: {
		playVideo() {
			this.flvPlayer.load();
			this.flvPlayer.play();
		},
		getList() {
			let arr = [];
			for (let i = 1; i <= 5000; i++) {
				arr.push({
					id: i,
					value: i,
					label: `${i}:名字`,
				});
			}
			this.dataList = arr;
		},
	},
};
</script>

<style lang="scss" scoped>
.demo-container {
}
</style>
