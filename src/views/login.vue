<template>
    <div class="login">
        <div>
            登录界面:
            <button @click="login">登录</button>
        </div>

    </div>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            redirect: undefined
        }
    },
    watch: {
        $route: {
            handler: function (route) {
                this.redirect = route.query && route.query.redirect;
            },
            immediate: true
        }
    },
    methods: {
        login() {
            this.$store.dispatch('Login', { username: 'admin', password: '123456' }).then((res) => {
                this.$router.push({ path: this.redirect || '/' }).catch(() => {})
            }).catch((err) => {
                console.log("err", err);
            })
        },
    }
}
</script>

<style lang="scss" scoped></style>