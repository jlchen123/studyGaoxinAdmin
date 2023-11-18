<template>
	<div>
		<div >
			<div style="text-align: center;margin-top: 20px;">高新技术学习平台后台管理系统</div>
			<el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
				<el-form-item prop="username">
					<el-input v-model="param.username" placeholder="姓名或手机号">
						<template #prepend>
							<el-button :icon="User"></el-button>
						</template>
					</el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input type="password" placeholder="密码" v-model="param.password"
						@keyup.enter="submitForm(login)">
						<template #prepend>
							<el-button :icon="Lock"></el-button>
						</template>
					</el-input>
				</el-form-item>
				<div class="login-btn">
					<el-button type="primary" @click="submitForm(login)">登录</el-button>
				</div>
				<p class="login-tips">Tips : 用户名为姓名或手机号，如出现同名，使用手机号登录</p>
				<p class="login-tips">技术支持：陈积乐18260846130</p>
			</el-form>
		</div>
	</div>
	
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { loginApi } from "../request/api";

import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { Lock, User } from '@element-plus/icons-vue';


interface LoginInfo {
	username: string;
	password: string;
}

const router = useRouter();
const param = reactive<LoginInfo>({
	username: '陈积乐',
	password: 'tjy123'
});

const rules: FormRules = {
	username: [
		{
			required: true,
			message: '请输入姓名或手机号',
			trigger: 'blur'
		}
	],
	password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
};

const login = ref<FormInstance>();
const submitForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate(async (valid: boolean) => {
		
		var resJson =await loginApi('username=' + param.username + '&password=' +param.password)
			if (resJson.message == "认证成功") {
				ElMessage.success('登录成功');
				router.push('/');
				
			}else if(resJson.message=="密码错误"){
				ElMessage.error("密码错误");
			}else if(resJson.message=="用户不存在"){
				ElMessage.error("用户不存在");
			}else if(resJson.message=="存在同名用户，请使用手机号登录"){
				ElMessage.error("存在同名用户，请使用手机号登录");
			}else
			{
				ElMessage.error("服务器回答错误，请联系开发人员");
				
			}
	});
};


</script>

<style scoped>
.login-wrap {
	position: relative;
	width: 100%;
	height: 100%;
	background-image: url(../assets/images/login-bg.png);
	background-size: 100%;
}

.ms-title {
	width: 100%;
	line-height: 50px;
	text-align: center;
	font-size: 20px;
	color: #fff;
	border-bottom: 1px solid #ddd;
}

.ms-login {
	position: absolute;
	left: 50%;
	top: 50%;
	width: 350px;
	margin: -190px 0 0 -175px;
	border-radius: 5px;
	background: rgba(255, 255, 255, 0.3);
	overflow: hidden;
}

.ms-content {
	padding: 30px 30px;
}

.login-btn {
	text-align: center;
}

.login-btn button {
	width: 100%;
	height: 36px;
	margin-bottom: 10px;
}

.login-tips {
	font-size: 12px;
	line-height: 30px;
	color: #fff;
}
</style>
