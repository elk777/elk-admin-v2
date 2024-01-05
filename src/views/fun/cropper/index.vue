<template>
    <div class="layout-container">
        <el-card shadow="hover" header="vue-cropper图片裁剪">
           <VueCropper />
        </el-card>
    </div>
</template>

<script>
import VueCropper from '@/components/Cropper';

export default {
    name: 'Cropper',
    components: {
        VueCropper
    },
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

</style>