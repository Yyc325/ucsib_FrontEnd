<template>

	<div class="forget">
		<div class="forget-container">
			<div class="forget-container-back" @click="backLogin">
				{{ t('register.title') }}
			</div>
			<div class="forget-container-main">
				<el-form class="forget-form" ref="forgetFormRef" :model="accountInfo" :rules="formRules">
					<el-form-item prop="account">
						<el-input :placeholder="t('tip.phone')" v-model="accountInfo.account"
							@input="accountInput"></el-input>
					</el-form-item>
					<el-form-item prop="code">
						<el-input class="auth-code-inp" :placeholder="t('tip.authCode')" v-model="accountInfo.code">
							<template #append>
								<div @click="handleGainAuthCode">
									{{ authCodeState.authCodeBtnCon }}
								</div>
							</template>
						</el-input>
					</el-form-item>
					<el-form-item prop="newPassword">
						<el-input type="newPassword" show-password :placeholder="t('tip.newPassword')"
							v-model="accountInfo.newPassword"></el-input>
					</el-form-item>
					<el-form-item prop="confirmPassword">
						<el-input type="password" show-password :placeholder="t('tip.confirmNewPassword')"
							v-model="accountInfo.confirmPassword"></el-input>
					</el-form-item>
					<el-button type="primary" @click="forget" :loading="isBtnLoading">{{ t('buttonText.resetPassword')
						}}</el-button>
				</el-form>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { debounce } from 'lodash'
import { reactive, toRefs, defineEmits, ref } from 'vue'
import { gainAuthCodeStep } from '@/views/backstage/account/account'

import { useI18n } from 'vue-i18n'
const { authCodeState, accountInput, handleGainAuthCode } = gainAuthCodeStep()
const forgetFormRef = ref()
const emit = defineEmits(['update:activeComponent'])
const { t } = useI18n()
const state = reactive({
	isAgree: false,
	accountInfo: {
		account: '',
		code: '',
		msgId: '',
		newPassword: '',
		confirmPassword: ''
	} as any,
	formRules: {
		account: [
			{ required: true, message: t('tip.phone'), trigger: 'blur' },
			{
				trigger: 'blur',
				validator: (rule: any, value: string, callback: any) => {
					const accountReg =
						/^1(3\d|4[57]|5[^4\D]|66|7[^249\D]|8\d|9[89])\d{8}$/
					if (!accountReg.test(value)) {
						callback(new Error(t('tip.correctPhone')))
					} else {
						callback()
					}
				}
			}
		],
		code: [{ required: true, message: t('tip.authCode'), trigger: 'blur' }],
		password: [
			{ required: true, message: t('tip.newPassword'), trigger: 'blur' },
			{
				pattern: /^[\s\S]{6,16}$/,
				message: t('tip.passwordNotEnough'),
				trigger: 'blur'
			}
		],
		confirmPassword: [
			{
				trigger: 'blur',
				validator: (rule: any, value: string, callback: Function) => {
					let pwdReg = /^[\s\S]{6,16}$/
					if (!value) {
						callback(new Error(t('tip.confirmNewPassword')))
					} else if (pwdReg.test(state.accountInfo.newPassword)) {
						if (value === state.accountInfo.newPassword) {
							callback()
						} else {
							callback(new Error(t('tip.passwordNotSame')))
						}
					} else {
						callback(new Error(t('tip.throughAuthCode')))
					}
				}
			}
		]
	},
	isBtnLoading: false
})

const { accountInfo, isAgree, formRules, isBtnLoading } = toRefs(state)
const forget = debounce(
	() => {
		forgetFormRef.value.validate(async (valid: boolean) => {
			if (!valid) return false
			state.isBtnLoading = true
			const req = {} as any
				; ({ msgId: req.msgId, account: req.phone } = authCodeState)
				; ({ code: req.code, newPassword: req.newPassword, confirmPassword: req.confirmPassword } =
					state.accountInfo)
			// let changePassRes = await appChangePass(req)
			// if (changePassRes.success) {
			// 	forgetFormRef.value.resetFields()
			// 	router.push({ name: 'Login' })
			// }
			// state.isBtnLoading = false
		})
	},
	800,
	{
		leading: true,
		trailing: false
	}
)
const backLogin = () => {
	// router.push({ name: 'Login' })
	emit('update:activeComponent', 'loginForm')
}
</script>
<style lang="scss" scoped>
@forward './forgetForm.scss';
</style>