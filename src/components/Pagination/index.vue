
<!-- 分页 公共组件 -->
<template>
  <div :class="{ hidden: hidden }" class="pagination-container">
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :page-sizes="pageSizes"
      :layout="layout"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    total: {
      required: true,
      type: Number,
    },
    page: {
      type: Number,
      default: 1,
    },
    size: {
      type: Number,
      default: 20,
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 50, 100];
      }
    },
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper",
    },
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    currentPage: {
      get() {
        return this.page;
      },
      set(val) {
        this.$emit("update:page", val);
      },
    },
    pageSize: {
      get() {
        return this.size;
      },
      set(val) {
        this.$emit("update:size", val);
      },
    },
  },
  methods: {
    /* 改变每页条数 */
    handleSizeChange(val) {
      this.$emit("pagination", { page: this.currentPage, size: val });
    },
    /* 点击页码 */
    handleCurrentChange(val) {
      this.$emit("pagination", { page: val, size: this.pageSize });
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination-container {
  background: #fff;
  padding: 15px 0px 0px;
  text-align: left;
}
.pagination-container.hidden {
  display: none;
}
</style>
