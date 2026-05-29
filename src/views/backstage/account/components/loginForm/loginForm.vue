<template>
	<div class="form-container">
		<div class="form-header">
			<div class="form-header-tip">{{ t('login.label') }}</div>
		</div>
		<div class="form-main">
			<el-form class="account-form" ref="loginFormRef" :model="loginForm" :rules="loginFormRules"
				@keydown.enter="login">
				<el-form-item prop="account">
					<el-input v-model="loginForm.account" type="text" :placeholder="t('tip.account')"
						clearable></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input v-model="loginForm.password" type="password" :placeholder="t('tip.password')" clearable
						show-password></el-input>
				</el-form-item>
<!--				<el-form-item>-->
<!--					<el-radio-group v-model="identification">-->
<!--            <el-radio v-for="identity in selection" :key="identity.type" :label="identity.label" :value="identity.type"></el-radio>-->
<!--          </el-radio-group>-->
<!--				</el-form-item>-->
				<div class="account-form-sepline"></div>
				<div class="account-form-func">
					<!-- <span class="sign"> 记住密码 </span> -->
					<span class="sign"> </span>
					<!-- <span class="sign-txt" @click="forgetHandle">{{ t('tip.forgetPassword') }}</span> -->
				</div>
				<el-button type="primary" :loading="isBtnLoading" @click="login">{{ t('buttonText.signIn')
					}}</el-button>
				<div class="account-form-tip">
					<span class="sign">{{ t('register.firstLabel') }}</span>
					<span class="sign-txt" @click="toRegisterPage">{{ t('register.secondLabel') }}</span>
				</div>
			</el-form>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { admin_login } from '@/apis/backstage/account'
import { useUser } from '@/hooks/useUser'
import { router } from '@/router'
import { useUserStoreWithOut } from '@/store/modules/userStore'
import {reactive, toRefs, defineEmits, ref, computed} from 'vue'
import { useI18n } from 'vue-i18n'
import {ElMessage} from "element-plus";

const emit = defineEmits(['update:activeComponent'])
const { t } = useI18n()
const loginFormRef = ref()
const state = reactive({
	loginForm: {
		account: '',
		password: ''
	} as any,
	loginFormRules: {
		account: [
			{
				// required: true,
				// message: '请输入手机号',
				trigger: 'blur',
				validator: (rule: any, value: string, callback: any) => {
					const accountReg =
						/^1(3\d|4[57]|5[^4\D]|66|7[^249\D]|8\d|9[89])\d{8}$/
					if (value === '') {
						callback(new Error('请输入手机号'))
					} else if (!accountReg.test(value)) {
						callback(new Error('请输入正确的手机号'))
					} else {
						callback()
					}
				}
			}
		],
		password: [
			{
				required: true,
				message: '请输入密码',
				trigger: 'blur'
			}
		]
	},
	isBtnLoading: false,
  identification:"student"
})
const { loginForm, loginFormRules, isBtnLoading,identification } = toRefs(state)

const selection = computed(()=>{
  return [
    {
      label:t('idSelection.student'),
      type:'student'
    },
    {
      label:t('idSelection.teacher'),
      type:'teacher'
    },
    {
      label:t('idSelection.parent'),
      type:'parent'
    },
  ]
})
const login = () => {
	loginFormRef.value.validate(async (valid: boolean, filed: any) => {
		if (valid) {
			admin_login({
				phone: loginForm.value.account,
				password: loginForm.value.password
			}).then((res: any) => {
				if (res.status === "success") {
					const { setToken, setPhone } = useUser()
					setToken(res.token)
					setPhone(loginForm.value.account)
					router.push({
						name: "Home"
					})
				} else {
          ElMessage.warning(res.message)
        }
			}).catch((err: any) => {
				console.log(err)
			}).finally(() => {
				isBtnLoading.value = false
			})
			isBtnLoading.value = false
		}
	})
}
const toRegisterPage = () => {
	emit('update:activeComponent', 'registerForm')
}
const forgetHandle = () => {
	emit('update:activeComponent', 'forgetForm')
}
</script>

<style lang="scss" scoped>
@forward './loginForm.scss';
@forward "loginForm_mb";
</style>