<template>
    <div class="user-container">
        <el-card shadow="hover" :body-style="bodyStyle" >
                <el-image class="user-image" :src="avatar"></el-image>
                <div class="ml30">
                    <div class="flex">
                        <div class="size-text">用户名：{{ name }}</div>
                        <el-button class="ml30" icon="el-icon-edit" type="text" @click="handelPassword">修改密码</el-button>
                    </div>
                    <div class="flex mt15">
                        <el-button @click="handelAvatar">修改头像</el-button>
                        <span class="ml30">本地暂时无法修改头像</span>
                    </div>
                </div>
        </el-card>
        <el-card shadow="hover" class="mt15">
            <div slot="header"class="flex user-info-header">
                <div class="size-text">个人信息</div>
                <el-button icon="el-icon-edit" type="text" @click="handelUserInfo">修改个人信息</el-button>
            </div>
            <table class="user-table">
                <tr class="table-tr">
                    <th class="table-th pd15">昵称</th>
                    <td class="table-td">{{ userInfo.nickName }}</td>
                </tr>
                <tr class="table-tr">
                    <th class="table-th pd15">手机号</th>
                    <td class="table-td">{{ userInfo.phone }}</td>
                </tr>
                <tr class="table-tr">
                    <th class="table-th pd15">邮箱</th>
                    <td class="table-td">{{ userInfo.email }}</td>
                </tr>
                <tr class="table-tr">
                    <th class="table-th pd15">性别</th>
                    <td class="table-td">{{ userInfo.sex ? '男' : '女' }}</td>
                </tr>
            </table>
        </el-card>

        <dialog-view ref="dialog" />
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import DialogView from './dialog.vue';
export default {
    name: 'UserProfile',
    components: {
        DialogView
    },
    data() {
        return {
            bodyStyle: {
                display: 'flex',
                alignItems: 'center'
            },
            title: '',
            type: false,
            open: false,
            userInfo: {}
        };
    },
    computed: {
        ...mapGetters(['avatar','name'])
    },
    mounted() {
        /* 假装请求拿到详细信息 */
        this.getUserInfo();
    },

    methods: {
        /* 获取用户信息 */
        getUserInfo () {
            setTimeout( ()=> {
                this.userInfo = {
                    nickName: 'elk',
                    phone: '1234567890',
                    email: '1234@qq.com',
                    sex: '1'
                }
            },100)
        },
        /* 修改头像点击按钮 */
        handelAvatar() {
            this.$message({
                message: '头像暂时无法修改',
                type: 'info'
            });
        },
        /* 修改密码 */
        handelPassword() {
            let dialog = this.$refs.dialog;
            dialog.open = true;
            dialog.title = '修改密码';
            dialog.type = true;
            dialog.reset();
        },
        /* 修改资料信息 */
        handelUserInfo() {
            let dialog = this.$refs.dialog;
            dialog.open = true;
            dialog.title = '修改个人信息';
            dialog.type = false;
            dialog.reset();
        },
    },
};
</script>

<style lang="scss" scoped>
.flex {
    display: flex;
    align-items: center;
}
.mt15 {
    margin-top: 15px;
}
.pd15 {
    padding: 15px;
}
.ml30 {
    margin-left: 30px;
}
.size-text {
    font-size: 16px;
    font-weight: 600;
}
.user-container {
    padding: 10px;
    .user-image {
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }
    .user-info-header {
        justify-content: space-between;
    }
    .user-table {
        width: 100%;
        border: 1px solid #ebeef5;
        .table-tr {
            border-bottom: 1px solid #ebeef5;
            .table-th {
                width: 200px;
                border-right: 1px solid #ebeef5;
                background-color: rgba(250, 250, 252,1);
            }
        }
    }
}
</style>