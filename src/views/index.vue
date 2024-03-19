
<template>
    <div class="father-container">
        <div>当前主题色{{ $store.getters.themeConfig.themeColor }}</div>
        <div v-if="isHide">v-if</div>
        <div v-show="isHide">v-show</div>
        <!-- 祖孙通信 -->
        <div class="ance">
            爷爷组件
            <children1 class="children1" :isShow="isHide" :isHide="isHide" @setHide="setHide"></children1>
        </div>
    </div>
</template>
<script>
import children1 from './childrens/children1.vue';
export default {
    name: 'Index',
    components: {
        children1
    },
    data () {
        return {
            isHide: true
        }
    },
    provide(){
        return {
            public: "公共值"
        }
    },
    mounted() {

    },
    methods: {
        setHide() {
            this.isHide = false;
        }
    }
}
</script>
<style lang="scss" scoped>
.father-container {
  
}
</style>