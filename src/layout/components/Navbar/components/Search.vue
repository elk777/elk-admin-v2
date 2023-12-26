<template>
    <div class="search-container">
        <el-dialog :visible="isSearch" destroy-on-close :show-close="false" @close="close">
            <el-autocomplete class="inline-input" v-model="state" :autofocus="true" prefix-icon="el-icon-search"
                :fetch-suggestions="querySearch" :placeholder="$t('toolsMenus.search')" @select="handleSelect">
                <template #default="{item}">
                    <div>
                        {{ $t(`menus.${item.value}`) }}
                    </div>
                </template>
            </el-autocomplete>
        </el-dialog>
    </div>
</template>
<script>
import { regexMatch } from '@/libs/utils/tools';
export default {
    name: 'Search',
    data() {
        return {
            searchList: [],  // 搜索下拉列表
            state: ''        // 搜索框内容
        };
    },
    computed: {
        formatRouters() {
            return this.$store.getters.sidebarRouters.filter(item => !item.hidden);
        },
        isSearch() {
            return this.$store.getters.isSearch;
        }
    },
    mounted() {
        this.formatList(this.formatRouters);
    },
    methods: {
        /* 格式化菜单内容 */
        formatList(sidebarRouters) {
            sidebarRouters.forEach(item => {
                let obj = {};
                if (item.redirect === 'index') {
                    obj.value = item.children[0].name;
                    obj.path = item.children[0].path;
                    this.searchList.push(obj);
                }
                if (item.meta) {
                    if (item.children) {
                        obj.value = item.name;
                        obj.path = item.children[0].path;
                        this.searchList.push(obj);
                        this.formatList(item.children);
                    } else {
                        obj.value = item.name;
                        obj.path = item.path;
                        this.searchList.push(obj);
                    }
                }
            })
        },
        /* 搜索事件 */
        querySearch(queryString, cb) {
            /* 
                拿到queryString,用户输入的内容
                循环正则匹配formatRouters中的每一项的name跟queryString是否匹配，检索出来
            */
            let query = queryString.trim();
            let searchList = this.searchList;
            let searchs = query ? this.searchListFilter(query, searchList) : searchList;
            cb(searchs);
        },
        searchListFilter(query, searchs) {
            return searchs.filter(item => regexMatch(query, item.value))
        },
        /* 选中内容事件 */
        handleSelect(item) {
            this.state = '';
            this.close(false);
            if (item.path === this.$route.path) return
            this.$router.push({ path: item.path });
        },
        /* 关闭搜索框事件 */
        close(show) {
            this.$store.dispatch('setToolsMenu', {
                key: 'isSearch',
                value: show !== null ? show : null
            })
        }
    },
};
</script>

<style lang="scss" scoped>
.search-container {
    ::v-deep .el-dialog {
        border-radius: 10px;
    }

    ::v-deep .el-dialog__header {
        display: none;
    }

    ::v-deep .el-dialog__body {
        padding: 0px !important;
    }

    ::v-deep .el-autocomplete {
        width: 100% !important;
    }
}
</style>