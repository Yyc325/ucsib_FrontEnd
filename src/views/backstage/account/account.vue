<template>
    <div class="login">
        <div class="login-container">
            <div class="login-container-left">
                <div class="bg-img">
                    <!-- <img src="https://website.xycloud.net.cn/images/login-left.png" alt="" /> -->
                </div>
                <div class="login-container-left-content">
                    <div class="logo-container" @click="backHome">
                        <img src="https://www.ulink.cn/wp-content/uploads/2024/11/cropped-Corporate-logo-集团标识a-150x150.png" alt="" />
                    </div>
                    <div class="desc-container">
                        <h1>{{ t('login.title') }}</h1>
                    </div>
                </div>
            </div>
            <div class="login-container-right">
                <div class="login-container-right-content">
                    <component :is="activeComponent" ref="loginFormRef"
                        v-model:activeComponent="activeComponent" v-model:identification="identification"/>
                </div>
                <div class="login-container-right-footer">
                    <div class="language-switch">
                        <el-popover trigger="click" v-model:visible="languageVisible"
                            popper-style="z-index:99999!important">
                            <template #reference>
                                <span class="lauguage-name" :style="{ fontSize: '14px' }">
                                    {{ currentLanguage }}
                                    <el-icon>
                                        <CaretBottom />
                                    </el-icon>
                                </span>
                            </template>
                            <div class="language-list">
                                <div class="language-item" v-for="lang in languages" :key="lang.value"
                                    @click="switchLanguage(lang)">
                                    {{ lang.label }}
                                </div>
                            </div>
                        </el-popover>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent, reactive, toRefs, ref, computed } from 'vue'
import { useI18n } from "vue-i18n";
import { CaretBottom } from '@element-plus/icons-vue';
import { router } from '@/router';
import loginForm from './components/loginForm/loginForm.vue'
import registerForm from './components/registerForm/registerForm.vue'
import forgetForm from './components/forgetForm/forgetForm.vue';
import IDSelection from './components/IDSelection/IDSelection.vue';
export default defineComponent({
    name: 'Account',
    components: {
        loginForm,
        registerForm,
        forgetForm,
        CaretBottom,
      IDSelection
    },
    setup() {
        const { t, locale } = useI18n();
        const loginFormRef = ref()
        const state = reactive({
            activeComponent: 'loginForm',
            languageVisible: false,
            identification:""
        })
      const languages = computed(()=>{
        return [
          {
            label: t('language.chinese'),
            value: "zh",
          },
          {
            label: t('language.english'),
            value: "en",
          },
        ]
      })
        const currentLanguage = computed(() => {
            const { label } = languages.value.find((item) => item.value === locale.value) || {}
            return label
        })
        const login = () => {
            loginFormRef.value.login()
        }
        const switchLanguage = (lang: any) => {
            locale.value = lang.value;
            state.languageVisible = false;
        }
        const backHome = () => {
            router.push({
                name: 'Home'
            })
        }

        return {
            t,
            languages,
            ...toRefs(state),
            loginFormRef,
            currentLanguage,
            login,
            switchLanguage,
            backHome
        }
    }
})
</script>
<style lang="scss" scoped>
@forward './account';
@forward "account_mb";
</style>