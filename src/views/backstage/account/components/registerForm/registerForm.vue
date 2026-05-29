<template>

  <div class="register">
    <div class="register-container">
      <div class="register-container-back">
				<span @click="backLogin">
					{{ t('register.title') }}
				</span>
      </div>
      <div class="register-container-main">
        <el-form class="register-form" ref="registerRef" :model="accountInfo" :rules="formRules">
          <el-form-item prop="userName">
            <el-input :placeholder="t('tip.userName')" v-model="accountInfo.userName"></el-input>
          </el-form-item>
          <el-form-item prop="realName">
            <el-input :placeholder="t('tip.name')" v-model="accountInfo.realName"></el-input>
          </el-form-item>
          <el-form-item prop="phone">
            <el-input :placeholder="t('tip.phone')" v-model="accountInfo.phone"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" show-password :placeholder="t('tip.password')"
                      v-model="accountInfo.password"></el-input>
          </el-form-item>
          <el-form-item prop="confirmPassword">
            <el-input type="password" show-password :placeholder="t('tip.confirmPassword')"
                      v-model="accountInfo.confirmPassword"></el-input>
          </el-form-item>
          <el-button type="primary" @click="register" :loading="isBtnLoading">{{
              t('buttonText.signUp')
            }}
          </el-button>
          <div class="register-form-func">
						<span class="sign"><el-checkbox v-model="isAgree">{{ t('tip.agreement') }}</el-checkbox>
						</span>
            <span class="sign-txt" @click="backLogin">{{ t('tip.signInNow') }}</span>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {ElMessage, FormInstance} from 'element-plus'
import _ from 'lodash'
import {reactive, toRefs, defineEmits, ref} from 'vue'
import {useI18n} from 'vue-i18n'
import {admin_add} from '@/apis/backstage/account'

const registerRef = ref<FormInstance>()
const emit = defineEmits(['update:activeComponent'])
const {t} = useI18n()
const state = reactive({
  isAgree: false,
  accountInfo: {
    realName: '',
    userName: '',
    phone: '',
    password: '',
    confirmPassword: '',
  } as any,
  formRules: {
    userName: [
      {required: true, message: t('tip.userName'), trigger: 'blur'}
    ],
    realName: [{required: true, message: t('tip.name'), trigger: 'blur'}],
    phone: [
      {required: true, message: t('tip.phone'), trigger: 'blur'},
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
    password: [
      {required: true, message: t('tip.password'), trigger: 'blur'},
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
            return callback(new Error(t('tip.confirmPassword')))
          } else if (pwdReg.test(state.accountInfo.password)) {
            if (value !== state.accountInfo.password) {
              return callback(new Error(t('tip.passwordNotSame')))
            } else {
              return callback()
            }
          }
          return callback()

        }
      }
    ]
  },
  isBtnLoading: false
})

const {accountInfo, isAgree, formRules, isBtnLoading} = toRefs(state)
const register = _.debounce(
  () => {
    registerRef.value && registerRef.value.validate((valid: boolean, field: any) => {
      if (valid) {
        state.isBtnLoading = true
        const data = {
          "user_name": accountInfo.value.userName,
          "real_name": accountInfo.value.realName,
          "phone": accountInfo.value.phone,
          "password": accountInfo.value.password
        }
        admin_add(data).then((res) => {
          if (res.status === 'success') {
            ElMessage.success(t('tip.registerSuccess'))
            backLogin()
          } else {
            ElMessage.warning(res.message)
          }
          state.isBtnLoading = false
        }).catch((err: any) => {
          state.isBtnLoading = false
        })
      }

    })
  }, 300)
const backLogin = () => {
  emit('update:activeComponent', 'loginForm')
}
</script>
<style lang="scss" scoped>
@forward './registerForm.scss';
@forward './registerForm_mb.scss';
</style>