<!-- 
@description: 后台管理页面(通用模板)
-->

<template>
	<div class="i-layout" :style="{ background }">
		<div class="i-layout-wrap">
			<div class="i-layout-header">
				<div class="i-layout-header-left" @click="router.push('/home')">
					<div class="logo">
						<img src="https://www.ulink.cn/wp-content/uploads/2024/11/cropped-Corporate-logo-集团标识a-150x150.png" alt="">
					</div>
					<div class="name">{{ $t("backstage.title") }}</div>
				</div>
				<div class="i-layout-header-center">
					<span></span>
				</div>
				<div class="i-layout-header-right">
					<div class="info-item username">
						{{ getUserInfo&&getUserInfo.user_name || "" }}
					</div>
					<div class="loginout" @click="loginOutHandle">退出</div>
				</div>
			</div>
			<div class="i-layout-body">
				<aside class="i-layout-body-aside">
					<el-menu default-active="2" class="el-menu-vertical-demo">
						<template v-for="menu in menuList">
							<el-sub-menu index="1" v-if="menu.children && menu.children.length">
								<template #title>
									<el-icon>
										<component :is="menu.meta.icon"></component>
									</el-icon>
									<span>{{ $t(`backstage.${menu.name}.title`) }}</span>
								</template>
								<el-menu-item v-for="menuItem in menu.children" @click="menuSelect(menuItem)"
									:class="{ 'is-active': menuItem.name === router.currentRoute.value.name }">{{
                    $t(`backstage.${menu.name}.title`)
									}}</el-menu-item>
							</el-sub-menu>
							<el-menu-item v-else @click="menuSelect(menu)"
								:class="{ 'is-active': menu.name === router.currentRoute.value.name }">
								<el-icon>
									<component :is="menu.meta.icon"></component>
								</el-icon>
								{{ $t(`backstage.${menu.name}.title`) }}</el-menu-item>
						</template>

					</el-menu>
				</aside>
				<section class="i-layout-body-content">
					<div class="i-layout-body-content__wrap">
						<router-view></router-view>
					</div>
				</section>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, computed, toRefs, onMounted } from "vue";
import { useUser } from "@/hooks/useUser";
import backstageRoutes from "@/router/routes/backstageRoutes";
import { AppRouteRecordRaw } from '@/router/type'
import { router } from "@/router";
import { createLocalStorage } from "@/utils/storage";
import { exitAfter } from "./account/account";
const { getUserInfo } = useUser();

const state = reactive({
	background:
		'url("https://img0.baidu.com/it/u=3643012476,4269658718&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500") no-repeat cover',
	shutdownTime: {
		hour: '',
		min: '',
		sec: ''
	}
});
const { background } = toRefs(state);

const menuList = computed(() => {
	return backstageRoutes[0].children
})
const menuSelect = (route: AppRouteRecordRaw) => {
	const { redirect, name } = route
	if (redirect) {
		router.push({ path: redirect })
	} else {
		router.push({ name })
	}
}
const ls = createLocalStorage()
const loginOutHandle = () => {
	exitAfter()
	router.push({ name: "Home" })
}
onMounted(() => {
	loginOutHandle
})
</script>
<style lang="scss" scoped>
@forward "./backstage";
</style>