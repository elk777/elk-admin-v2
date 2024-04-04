<template>
    <div class="theme-config-container">
        <el-drawer destroy-on-close :title="formatI18n('title')" :visible="isThemeConfig" :size="300" direction="rtl" :show-close="true"
            @close="closeDrawer">
            <!-- 主题风格 -->
            <div class="theme-style">
                <span class="theme-item-title">{{ formatI18n('themeStyle') }}</span>
                <div @click="handelSvg($event, 'themeStyle')" class="theme-svg">
                    <svg-icon icon-class="theme-light"></svg-icon>
                    <svg-icon icon-class="theme-dead"></svg-icon>
                    <!-- <svg-icon icon-class="theme-dark"></svg-icon> -->
                    <span :style="formatStyle('style')" class="svg-active">✔️</span>
                </div>
            </div>
            <!-- 主题颜色 -->
            <div class="theme-item">
                <span class="theme-item-title">{{ formatI18n('themeColor') }}</span>
                <theme-picker @change="handelTheme" />
            </div>
            <!-- 界面展示 -->
            <div class="theme-list">
                <div class="theme-item">
                    <span class="theme-item-title">{{ formatI18n('isBreadcrumb') }}</span>
                    <el-switch v-model="themeConfig.isBreadcrumb" @change="handelTheme($event, 'isBreadcrumb')"></el-switch>
                </div>
                <div style="margin: 20px 0;" class="theme-item">
                    <span class="theme-item-title">{{ formatI18n('isTagsviews') }}</span>
                    <el-switch :disabled="themeConfig.layoutStyle === 'horizontal'" v-model="themeConfig.isTagsviews" @change="handelTheme($event, 'isTagsviews')"></el-switch>
                </div>
                <div class="theme-item">
                    <span class="theme-item-title">{{ formatI18n('isHeader') }}</span>
                    <el-switch v-model="themeConfig.isHeader" @change="handelTheme($event, 'isHeader')"></el-switch>
                </div>
            </div>
            <!-- 布局样式 -->
            <div class="theme-style">
                <span class="theme-item-title">{{ formatI18n('layoutStyle') }}</span>
                <div @click="handelSvg($event, 'layoutStyle')" class="theme-svg">
                    <svg-icon icon-class="vertical"></svg-icon>
                    <svg-icon icon-class="horizontal"></svg-icon>
                    <span :style="formatStyle('layout')" class="svg-active">✔️</span>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import ThemePicker from '@/components/ThemePicker';
import { mapGetters } from "vuex";
export default {
    name: 'ThemeConfig',
    components: {
        ThemePicker
    },
    computed: {
        ...mapGetters(['themeConfig', 'isThemeConfig']),
        /* 主题样式选中切换 */
        formatStyle() {
            return (type) => {
                const { themeStyle, layoutStyle } = this.themeConfig;
                if (type === 'style') {
                    switch (themeStyle) {
                        case 'theme-light':
                            return 'left: 30px';
                        case 'theme-dead':
                            return 'left: 85px';
                        case 'theme-dark':
                            this.changeDark(themeStyle, 'themeStyle');
                            return 'left: 140px';
                        default:
                            return 'left: 30px';
                    }
                } else {
                    switch (layoutStyle) {
                        case 'vertical':
                            return 'left: 30px';
                        case 'horizontal':
                            return 'left: 80px';
                        default:
                            return 'left: 30px';
                    }
                }
            }
        },
        /* i18n格式化 */
        formatI18n() {
            return (key) => {
                return this.$formatI18n(this, 'themeConfig', key);
            }
        }
    },
    methods: {
        /* 关闭drawer */
        closeDrawer() {
            this.$store.dispatch("setToolsMenu", {
                key: 'isThemeConfig',
                value: false
            })
        },
        /* 主题切换事件 */
        handelTheme(value, key) {
            if( value === 'horizontal' && this.$store.getters.sidebar.collapse) {
                this.$store.dispatch('changeCollapse')
            }
            this.$store.dispatch('setThemeConfig', {
                key,
                value
            });
        },
        /* svg点击事件 */
        handelSvg(e, type) {
            const { target } = e;
            const name = target.getAttribute('xlink:href');
            if (name) {
                const newName = name.replace('#icon-', '');
                this.handelTheme(newName, type);
                this.changeDark(newName, type);
            }
        },
        /* 暗黑主题切换 */
        changeDark(val, type) {
            let html = document.documentElement;
            if (type === 'themeStyle' && val === 'theme-dark') {
                html.classList.add("dark");
            } else {
                html.classList.remove("dark");
            }
        }
    },
};
</script>

<style lang="scss" scoped>
.theme-config-container {
    .theme-style {
        text-align: left;
        .theme-svg {
            margin-top: 15px;
            position: relative;
            .svg-icon {
                padding: 0 10px;
            }
            * {
                cursor: pointer;
            }

            .svg-active {
                position: absolute;
                top: 15px;
            }
        }
    }

    .theme-list {
        margin: 20px 0;
    }

    .theme-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .theme-item-title {
        font-weight: 500;
    }

    & ::v-deep .el-drawer__body {
        padding: 0 15px;
    }

    .svg-icon {
        width: 3.5rem !important;
        height: 2.5rem !important;
    }
}
</style>