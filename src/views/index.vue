<template>
    <div class="father-container">
        <div>当前主题色{{ $store.getters.themeConfig.themeColor }}</div>
        <div>这是首页</div>
        <div>这是首页</div>
        <div>这是首页</div>
    </div>
</template>
<script>
export default {
    name: 'Index',
    data () {
        return {

        }
    },
    mounted() {

    },
    methods: {
    
    }
}
</script>
<style lang="scss" scoped>
.father-container {
    div{
        height: 500px;
    }
}
</style>