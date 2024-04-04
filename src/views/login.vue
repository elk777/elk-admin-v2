<template>
	<div class="login-container">
		<el-card>
			<div class="login-box">
				<img class="login-logo" src="@/assets/images/login-bg.webp" alt="">
				<el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
					<h3 class="title">Vue-Elk-Admin</h3>
					<el-form-item prop="username">
						<el-input v-model="loginForm.username" auto-complete="off" placeholder="账号">
							<svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
						</el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input v-model="loginForm.password" type="password" auto-complete="off" placeholder="密码">
							<svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
						</el-input>
					</el-form-item>
					<el-form-item style="width: 100%">
						<el-button
							:loading="loading"
							size="medium"
							type="primary"
							style="width: 100%"
							@click.native.prevent="handleLogin"
						>
							<span v-if="!loading">登 录</span>
							<span v-else>登 录 中...</span>
						</el-button>
					</el-form-item>
				</el-form>
			</div>
		</el-card>

		<footer-view  />
	</div>
</template>

<script>
export default {
	name: "login",
	data() {
		return {
			redirect: undefined,
			loading: false,
			loginForm: {
				username: "admin",
				password: "123456",
				rememberMe: false,
			},
			loginRules: {
				username: [{ required: true, targger: "blur", message: "账号不能为空" }],
				password: [{ required: true, targger: "blur", message: "密码不能为空" }],
			},
		};
	},
	watch: {
		$route: {
			handler: function (route) {
				this.redirect = route.query && route.query.redirect;
			},
			immediate: true,
		},
	},
	methods: {
		handleLogin() {
			this.$refs.loginForm.validate((valid) => {
				if (valid) {
					this.loading = true;
					this.$store
						.dispatch("Login", { ...this.loginForm })
						.then((res) => {
							this.$router.push({ path: this.redirect || "/" }).catch(() => {});
						})
                        .catch( err => {
                            this.loading = false;
                        })
				}
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.login-container {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	& ::v-deep .el-card__body{
		padding: 0px;
	}
	.login-box {
		position: relative;
		max-width: 800px;
		min-height: 345px;
		display: flex;
		justify-content: center;
		align-items: center;
		.login-logo{
			width: 100%;
			height: 100%;
		}
	}
	.title {
		margin: 0px auto 30px auto;
		text-align: center;
		color: #707070;
	}
	.login-form {
		position: absolute;
		right: 0;
		border-radius: 6px;
		background: #ffffff;
		width: 350px;
		padding: 25px 25px 5px 25px;
		.el-input {
			height: 38px;
			input {
				height: 38px;
			}
		}
		.input-icon {
			height: 39px;
			width: 14px;
			margin-left: 2px;
		}
	}
}
</style>
