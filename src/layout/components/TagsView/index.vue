<template>
    <div class="tags-container">
        <el-scrollbar style="width: 100%;">
            <el-tabs v-model="tabsValue" type="card" @tab-remove="removeTab" @tab-click="clickTab"
                @contextmenu.prevent.native="openDropdown($event)">
                <el-tab-pane v-for="(tag, index) of visitedViews" :key="tag.name"
                    :closable="tag.name !== 'Index' && !tag.meta.affix" :label="formatI18n('menus',tag.name)" :name="tag.path">
                </el-tab-pane>
            </el-tabs>
        </el-scrollbar>
        <!-- 鼠标右击出现4个选项 -->
        <ul v-show="hideDropdown" :style="`top: ${top}px; left: ${left}px`" class="contextDropdown">
            <li @click="refreshCurrentTag(selectedTag)">
                <i class="el-icon-refresh-right" />
                    <span>{{ formatI18n('tagsViews', 'refresh') }}</span>
                </li>
            <li v-if="!isAffix(selectedTag)" @click="closeCurrentTag(selectedTag)">
                <i class="el-icon-close" />
                    <span>{{ formatI18n('tagsViews', 'close') }}</span>
                </li>
            <li @click="closeOtherTag(selectedTag)">
                <i class="el-icon-minus" />
                    <span>{{ formatI18n('tagsViews', 'closeOther') }}</span>
                </li>
            <li @click="closeAllTag(selectedTag)">
                <i class="el-icon-folder-delete" />
                    <span>{{ formatI18n('tagsViews', 'closeAll') }}</span>
                </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'TagsView',
    computed: {
        ...mapGetters(['visitedViews', 'routers','cacheViews']),
        formatI18n() {
            return (type,key) => {
                return this.$formatI18n(this, type, key)
            }
        }
    },
    data() {
        return {
            tabsValue: '/index',   // tags标签选中值
            hideDropdown: false,   // tags下拉选项隐藏值
            selectedTag: {},       // 右击选中的tag
            left: 0,
            top: 0
        }
    },
    watch: {
        /* 监听route：tabs标签选中值切换、改变标签栏列表数据 */
        $route(route) {
            const { path } = route
            this.tabsValue = path;
            this.addTags();
        },
        /* 监听下拉选择隐藏值：动态绑定、移除closeDropdown事件 */
        hideDropdown(show) {
            if (show) {
                document.body.addEventListener("click", this.closeDropdown);
            } else {
                document.body.removeEventListener("click", this.closeDropdown);
            }
        }
    },
    mounted() {
        this.initTags();
        this.addTags();
    },
    methods: {
        /* 添加tagsview和cacheview */
        addTags() {
            const { name } = this.$route;
            if (name) {
                this.$store.dispatch('addView', this.$route);
            }
            return false
        },
        /* 初始化同步tabs标签标题 */
        initTags() {
            const { name, path } = this.$route;
            const indexTags = this.routers[0].children[0];
            if (name !== '/index') {
                this.$store.dispatch("addVisitedView", indexTags);
                this.tabsValue = path;
            }
        },
        /* 是否含有关闭当前按钮 */
        isAffix(tag) {
            return tag.meta && tag.meta.affix
        },
        /* tags标签点击按钮 */
        clickTab(instance) {
            const { name: path } = instance;
            if (path !== this.$route.path) {
                this.$router.push({ path });
            }
        },
        /* tags标签删除按钮 */
        removeTab(path) {
            const filterTags = this.visitedViews.filter(item => item.path === path)[0];
            this.removeTag(filterTags);
        },
        /* 删除tag */
        removeTag(tag) {
            this.$store.dispatch('delView', tag).then(() => {
                this.toLastView(tag);
            });
        },
        /* 关闭标签进行跳转 */
        toLastView(tag) {
            /* 获取最后一个tag并跳转 */
            const endTag = this.visitedViews.slice(-1)[0];
            if (endTag) {
                endTag.path !== this.$route.path && this.$router.push({ path: endTag.path });
            } else {
                this.$router.push("/")
            }
        },
        /* 右击打开dropdown菜单 */
        openDropdown(event) {
            const { target: { id, innerText } } = event;
            // 最大宽度
            const dropdownMinWidth = 105;
            // 获取当前元素距离浏览器左边的距离
            const offsetLeft = this.$el.getBoundingClientRect().left;
            // 当前容器的宽度
            const offsetWidth = this.$el.offsetWidth;
            // 设置菜单出现的边界
            const maxLeft = offsetWidth - dropdownMinWidth;
            const left = event.clientX - offsetLeft;
            // 距离左侧位置的偏移量
            if (left > maxLeft) {
                this.left = maxLeft;
            } else {
                this.left = left;
            }
            // 距离顶部位置的偏移量
            this.top = event.clientY + 20;
            // 获取当前点击的tag
            this.filterCurrentTag(id, innerText);
            // 打开 菜单栏
            this.hideDropdown = true;
        },
        /* 获取当前右键的tags */
        filterCurrentTag(path, title) {
            let nPath = path.replace('tab-', '');
            this.selectedTag = this.visitedViews.filter(item => item.path === nPath)[0];
        },
        /* 关闭dropdown下拉菜单 */
        closeDropdown() {
            this.hideDropdown = false;
        },
        /* 刷新当前标签 */
        refreshCurrentTag(tag) {
            this.$store.dispatch("delCacheView", tag).then(() => {
                this.$nextTick(() => {
                    this.$router.replace({
                        path: '/redirect' + tag.path
                    })
                })
            })
        },
        /* 关闭当前标签 */
        closeCurrentTag(tag) {
            this.removeTag(tag);
        },
        /* 关闭其他标签 */
        closeOtherTag(tag) {
            this.$store.dispatch("closeOtherView", tag).then(() => {
                this.toLastView(tag);
            });
        },
        /* 关闭全部标签 */
        closeAllTag(tag) {
            this.$store.dispatch("closeAllView").then(() => {
                this.toLastView(tag);
            });
        }
    },
};
</script>

<style lang="scss" scoped>
.tags-container {
    width: 100%;
    height: 35px;
    padding-left: 10px;
    padding-top: 3px;
    background-color: #fff;
    transition: background-color .3s;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, .12), 0px 0px 3px 0px rgba(0, 0, 0, .04);

    .tags-wappar {
        display: flex;
        align-items: center;
    }

    /* el-tabs 内部样式修改 */
    & ::v-deep .el-tabs__item {
        height: 30px !important;
        line-height: 30px !important;
        font-weight: 400;
    }

    & ::v-deep .el-tabs--card>.el-tabs__header {
        border-bottom: none;
    }

    .contextDropdown {
        margin: 0;
        background-color: #fff;
        z-index: 3000;
        position: absolute;
        list-style-type: none;
        padding: 5px 0;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 400;
        color: #333;
        box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
        text-align: left;
        span {
            margin-left: 5px;
        }
        li {
            margin: 0;
            padding: 7px 16px;
            cursor: pointer;

            &:hover {
                background: #eee;
            }
        }
    }
}
</style>