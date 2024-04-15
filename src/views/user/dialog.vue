<template>
  <el-dialog :title="title" :visible.sync="open" width="500" append-to-body>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-row v-if="type">
        <el-col :span="24">
            <el-form-item label="原密码">
                <el-input v-model="form.oldPassword" type="password" placeholder="请输入原密码" />
            </el-form-item>
        </el-col>
        <el-col :span="24">
            <el-form-item label="新密码">
                <el-input v-model="form.newPassword" placeholder="请输入新密码"></el-input>
            </el-form-item>
        </el-col>
      </el-row>
      <el-row v-else>
        <el-col :span="24">
            <el-form-item label="昵称">
                <el-input v-model="form.nickName" placeholder="请输入昵称"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="24">
            <el-form-item label="手机号">
                <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="24">
            <el-form-item label="邮箱">
                <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="24">
            <el-form-item label="性别">
                <el-radio-group v-model="form.sex">
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="0">女</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'Dialog',
  data() {
    return {
        title: '',
        type: false,
        form: {},
        open: false,
        rules: {}
    };
  },

  mounted() {
    
  },

  methods: {
    /* 重置form表单 */
    reset() {
        this.form = {
            oldPassword: null,
            newPassword: null,
            nickName: null,
            phone: null,
            email: null,
            sex: null
        }
        this.$resetForm(this, 'form');
    }
  },
};
</script>