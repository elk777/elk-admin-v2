<template>
    <div class="tools-menu-container">
        <!-- 组件大小切换 -->
        <el-dropdown @command="touchCommand($event, 'componentSize')" trigger="click" class="menu-height hover-effect">
            <div>
                <svg-icon icon-class="size" />
            </div>
            <el-dropdown-menu>
                <el-dropdown-item command="default" :disabled="componentSize === 'default'">{{ $t('toolsMenus.default') }}</el-dropdown-item>
                <el-dropdown-item command="medium" :disabled="componentSize === 'medium'">{{ $t('toolsMenus.medium') }}</el-dropdown-item>
                <el-dropdown-item command="small" :disabled="componentSize === 'small'">{{ $t('toolsMenus.small') }}</el-dropdown-item>
                <el-dropdown-item command="mini" :disabled="componentSize === 'mini'">{{ $t('toolsMenus.mini') }}</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <!-- 搜索功能 -->
        <div @click="touchCommand(null,'isSearch')" class="menu-height hover-effect">
            <svg-icon icon-class="search" />
        </div>
        <!-- 中英文切换 -->
        <el-dropdown @command="touchCommand($event, 'languageType')" trigger="click" class="menu-height hover-effect">
            <div>
                <svg-icon :icon-class="languageType" />
            </div>
            <el-dropdown-menu>
                <el-dropdown-item command="zh-cn" :disabled="languageType === 'zh-cn'">中文</el-dropdown-item>
                <el-dropdown-item command="en" :disabled="languageType === 'en'">English</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <!-- 换肤 -->
        <div @click="touchCommand(null, 'isThemeConfig')" class="menu-height hover-effect">
            <svg-icon icon-class="clot" />
        </div>
        <!-- 全屏按钮 -->
        <ScreenFull class="menu-height hover-effect"/>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ScreenFull from './ScreenFull.vue';
export default {
    name: 'ToolsMenu',
    components: {
        ScreenFull
    },
    computed: {
        ...mapGetters(['languageType', 'componentSize', 'isThemeConfig'])
    },
    methods: {
        /* 触发command事件 */
        touchCommand(command, type) {
            if ( type === 'componentSize') {
                window.location.reload();
            }
            this.$store.dispatch("setToolsMenu", {
                key: type,
                value: command === null ? null : command
            }).then(() => {
                if (type === 'languageType') {
                    // 更新i18n中的语言
                    this.$i18n.locale = command;
                }
            })
        }
    },
};
</script>

<style lang="scss" scoped>
.tools-menu-container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .menu-height {
        line-height: 50px;
    }

    .hover-effect {
        transition: background .3s;

        &:hover {
            background-color: rgba(0, 0, 0, 0.040);
        }
    }
}</style>