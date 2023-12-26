<template>
    <div @click="touchFull">
        <svg-icon :icon-class="isFull ? 'exit-full' : 'full'" />
    </div>
</template>

<script>
import screenfull from "screenfull";
export default {
    name: 'ScreenFull',
    data() {
        return {
            isFull: false
        };
    },
    mounted() {
        this.init();
    },
    beforeDestroy() {
        this.destroy();
    },
    methods: {
        /* 全屏按钮 */
        touchFull() {
            // 判断是否支持
            if (!screenfull.isEnabled) {
                this.$message({
                message: "不支持全屏",  
                type: "warning"
                });
                return false;
            }
            /* toggle(): 开启全屏 */
            screenfull.toggle();
        },
        change() {
            /* isFullscreen: 布尔值，当前是否处于全屏 */
            this.isFull = screenfull.isFullscreen;
        },
        init(){
            if (screenfull.isEnabled) {
                screenfull.on('change', this.change);
            }
        },
        destroy(){
            if (screenfull.isEnabled) {
                screenfull.off('change', this.change);
            }
        }
    },
};
</script>

<style lang="scss" scoped>

</style>