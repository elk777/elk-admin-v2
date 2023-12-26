<template>
    <el-color-picker v-model="theme" size="small"
        :predefine="['#409EFF', '#1890ff', '#304156', '#212121', '#11a983', '#13c2c2', '#6959CD', '#f5222d']"></el-color-picker>
</template>

<script>
import { getThemeCluster, getCSSString, updateStyle } from '@/libs/utils/theme';
const version = require('element-ui/package.json').version;
const ORIGINAL_THEME = '#409EFF' // 默认 color
export default {
    data() {
        return {
            theme: ORIGINAL_THEME
        };
    },
    computed: {
        defaultTheme() {
            return this.$store.getters.themeConfig.themeColor
        }
    },
    watch: {
        defaultTheme: {
            handler(val, oldVal) {
                this.theme = val;
            },
            immediate: true
        },
        async theme(val) {
            const oldVal = this.chalk ? this.theme : ORIGINAL_THEME;
            if (typeof val !== "string") return;

            const themeCluster = getThemeCluster(val.replace('#', ''));
            const originalCluster = getThemeCluster(oldVal.replace('#', ''));

            const $message = this.$message({
                message: '  替换主题色中，请稍等',
                customClass: 'theme-message',
                type: 'success',
                duration: 0,
                iconClass: 'el-icon-loading'
            })

            const getHandler = (variable, id) => {
                return () => {
                    const originalCluster = getThemeCluster(ORIGINAL_THEME.replace('#', ''));
                    const newStyle = updateStyle(this[variable], originalCluster, themeCluster);

                    let styleTag = document.getElementById(id);
                    if (!styleTag) {
                        styleTag = document.createElement('style');
                        styleTag.id = id;
                        document.head.appendChild(styleTag);
                    }
                    styleTag.innerHTML = newStyle;
                }
            }
            if (!this.chalk) {
                /* 在线方式 */
                const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`
                this.chalk = await getCSSString(url, 'chalk');
                /* 离线方式 */
            }

            const chalkHandler = getHandler('chalk', 'chalk-style');

            chalkHandler();

            const styles = [].slice.call(document.querySelectorAll('style'))
                .filter(style => {
                    const text = style.innerText;
                    return new RegExp(oldVal, 'i').test(text) && !/Chalk Variables/.test(text)
                })
            styles.forEach(style => {
                const { innerText } = style
                if (typeof innerText !== 'string') return
                style.innerText = updateStyle(innerText, originalCluster, themeCluster)
            })

            this.$emit("change", val, 'themeColor');
            $message.close();
        }
    }
}
</script>

<style lang="scss" scoped></style>