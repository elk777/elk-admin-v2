<template>
    <div class="layout-container download-container">
        <el-card shadow="hover" header="文件下载实例">
            <div class="download-item">
                <el-alert type="success" title="根据后端接口文件流下载" :closable="false"></el-alert>
                <el-button style="width: 150px;margin-top: 15px;" type="primary" plain>文件流下载</el-button>
            </div>
            <div class="download-item">
                <el-alert type="success" title="根据文件地址流下载" :closable="false"></el-alert>
                <el-button style="width: 150px;margin-top: 15px;" type="primary" plain>文件地址下载</el-button>
            </div>
            <div class="download-item">
                <el-alert type="success" title="根据base64流下载" :closable="false"></el-alert>
                <el-button style="width: 150px;margin-top: 15px;" type="primary" plain>bese64流下载</el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'Download',

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="scss" scoped>
.download-container {
    .download-item {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
    }
    ::v-deep .el-alert__title {
        font-size: 14px;
        line-height: 25px;
    }
}
</style>