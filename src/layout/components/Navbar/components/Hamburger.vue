<template>
    <div @click="changeIcon" class="hamburger-container">
        <i class="icon-class" :class="formatIcon"></i>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'Hamburger',
    computed: {
        ...mapGetters(['sidebar']),
        /* el-icon-s-fold   el-icon-s-unfold */
        formatIcon() {
            if( this.sidebar.collapse) {
                return 'el-icon-s-unfold'
            }
            return 'el-icon-s-fold'
        }

    },
    methods: {
        changeIcon() {
            this.$store.dispatch("changeCollapse")
        }
    },
};
</script>

<style lang="scss" scoped>
.hamburger-container {
    line-height: 50px;
    font-size: 20px;
    &:hover{
        background-color: rgba(0, 0, 0, 0.040);
    }
    .icon-class {
        padding: 0 15px;
    }
}
</style>