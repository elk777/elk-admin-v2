<script>
export default {
    created() {
        const { params, query } = this.$route;
        this.$router.replace({
            path: '/' + params.path, query
        },)
    },
    render: function (h) {
        return h();
    }
}
</script>