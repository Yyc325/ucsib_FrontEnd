<!-- 
@description: 前台页面(通用模板) 
-->
<template>
  <div class="i-layout" :class="{
        'is-header-image-visible':router.currentRoute.value.name=='Home',
        'is-header-hidden':router.currentRoute.value.meta.hiddenNav
  }">
    <div class="i-layout-wrap" ref="containerRef">
      <div class="i-layout-header" :style="{
				minHeight:router.currentRoute.value.name=='Home'?'100vh':router.currentRoute.value.meta.hasCover?'3.125rem':'10.625rem',
			}">
        <div class="brand-bar" :class="{ 'is-chinese': locale === 'zh' }">
          <div class="brand-bar__wrapper">
            <div class="info">
							<span class="logo" @click="jumpTo('Home')" style="display: flex; align-items: center">
								<!-- <img src="@/assets/images/layout/logo.png" alt="Logo" style="margin-right: 10px" /> -->
                <!-- logo 暂时隐藏-->

								<img src="https://www.ulink.cn/wp-content/uploads/2024/11/cropped-Corporate-logo-集团标识a-150x150.png"
                     alt="Logo"
                     style="margin-right: 10px"/>
								<span>UCS IB</span>
							</span>
            </div>
            <nav class="menu-gateway-nav">
              <div class="menu-gateway-nav-container">
                <!-- <div class="gateway-nav&#45;&#45;label">Information for:</div> -->
                <ul class="menu">
                  <!--                  暂时将空白页隐藏 @click="jumpTo(item.name)"-->
                  <li class="menu-item" v-for="item in barMenu" :key="item.name" @click="jumpTo(item.name)">
                    {{ item.label }}
                  </li>
                </ul>
                <div class="search-toggle" @click="searchTrigger">
                  <el-icon color="#fff">
                    <Search/>
                  </el-icon>
                  <span class="search-toggle-inner">
										{{ $t("header.search") }}
									</span>
                </div>
                <el-popover trigger="click" v-model:visible="languageVisible"
                            popper-style="z-index:99999!important">
                  <template #reference>
                    <div class="switch-logo">
                      <svg data-v-f414ea64="" viewBox="0 0 24 24" width="1.2em" height="1.2em">
                        <path fill="currentColor"
                              d="m18.5 10l4.4 11h-2.155l-1.201-3h-4.09l-1.199 3h-2.154L16.5 10h2zM10 2v2h6v2h-1.968a18.222 18.222 0 0 1-3.62 6.301a14.864 14.864 0 0 0 2.336 1.707l-.751 1.878A17.015 17.015 0 0 1 9 13.725a16.676 16.676 0 0 1-6.201 3.548l-.536-1.929a14.7 14.7 0 0 0 5.327-3.042A18.078 18.078 0 0 1 4.767 8h2.24A16.032 16.032 0 0 0 9 10.877a16.165 16.165 0 0 0 2.91-4.876L2 6V4h6V2h2zm7.5 10.885L16.253 16h2.492L17.5 12.885z">
                        </path>
                      </svg>
                    </div>
                  </template>
                  <div class="language-list">
                    <div class="language-item" v-for="lang in languages" :key="lang.value"
                         @click="switchLanguage(lang)">
                      {{ lang.label }}
                    </div>
                  </div>
                </el-popover>
                <template v-if="getUserInfo&&getUserInfo.user_name">
                  <el-popover trigger="click" popper-style="z-index:99999!important">
                    <template #reference>
                      <div class="user-info">
                        <div class="user-info-avatar">
                          {{ getUserInfo.user_name.split('')[0] }}
                        </div>
                        <div class="user-info-name">
                          {{ getUserInfo.user_name }}
                        </div>
                      </div>
                    </template>
                    <div class="entrance">
                      <div class="entrance-item" v-for="entrance in entrances"
                           :key="entrance.value" @click="entranceHandler(entrance)">
                        {{ entrance.label }}
                      </div>
                    </div>
                  </el-popover>
                </template>
                <template v-else>
                  <div class="login" @click="jumpTo('Login')">
                    <span>{{ $t("header.login") }}</span>
                  </div>
                </template>
                <div class="collapse-menu">
                  <div class="collapse-menu__trigger" @click.stop="openMenu">
                    <i class="iconfont icon-caidan"></i>
                  </div>
                  <div class="collapse-menu__content" :class="{'is-active':collapseVisible}">
                    <ul class="collapse-menu-list">
                      <!--                      暂时将空白页隐藏  @click="jumpTo(item.name)"-->
                      <li class="menu-item" v-for="item in barMenu" :key="item.name" @click="jumpTo(item.name)">
                        {{ item.label }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
        <div class="menu-primary-nav-container" v-if="!router.currentRoute.value.meta.hiddenNav"
             :class="{ 'is-top': isTop || router.currentRoute.value.name!='Home' }">
          <div class="page-meta-info">
            <div class="page-title">A Global Gateway</div>
            <div class="line"></div>
            <div class="page-name">{{ router.currentRoute.value.meta.title }}</div>
          </div>
          <ul class="menu">
            <li class="menu-item" v-for="item in primaryNavs" :key="item.label" @click="jumpTo(item.name)">
              {{ item.label }}
            </li>
          </ul>
        </div>
        <div class="panel-collection" v-if="router.currentRoute.value.name=='Home'">
          <img id="backgroundImage" src="@/assets/images/layout/home-background.png" alt=""/>
        </div>
      </div>
      <div class="i-layout-body">
        <div class="i-layout-body-content">
          <div class="i-layout-body-content__wrap">
            <router-view></router-view>
          </div>
        </div>
      </div>
      <div class="i-layout-footer">
        <page-footer @openSearch="searchTrigger"></page-footer>
      </div>
    </div>
    <ISearchPopover ref="ISearchPopoverRef" :disabled="false"></ISearchPopover>
  </div>
</template>

<script setup lang="ts">
import {reactive, computed, toRefs, onMounted, ref, onBeforeUnmount, watch} from "vue";
import {useUser} from "@/hooks/useUser";
import {useI18n} from "vue-i18n";

import {Search} from "@element-plus/icons-vue";
import {router} from "@/router";
import en from "@/language/en";
import {exitAfter} from "../backstage/account/account";
import PageFooter from "@/views/foreground/aaComponents/PageFooter/PageFooter.vue";
import ISearchPopover from "@/views/foreground/aaComponents/ISearchPopover/ISearchPopover.vue";

const {locale, t} = useI18n();

const containerRef = ref<HTMLDivElement>();
const ISearchPopoverRef = ref<any>()
const {getUserInfo} = useUser();
const state = reactive({
  isTop: false, // 是否在顶部导航栏显示
  languageVisible: false,
  collapseVisible: false,
});
const {languageVisible, isTop, collapseVisible} = toRefs(state);

// 切换语言
const switchLanguage = (lang: any) => {
  locale.value = lang.value;
  languageVisible.value = false;
};
const languages = computed(() => {
  return [
    {
      label: "简体中文",
      value: "zh",
    },
    {
      label: "English",
      value: "en",
    },
  ]
})
const entrances = computed(() => {
  return [
    {
      label: t("header.backstage"),
      value: 'backstage',
      permission: ['admin', 'teacher']
    },
    {
      label: t("header.logout"),
      value: 'logout',
      permission: ['admin', 'student', 'parent', 'teacher', "", null]
    },
  ].filter(item => item.permission.includes(getUserInfo.value.identity))
})
const barMenu = computed(() => {
  return [
    {
      label: t("header.student"),
      name: "Students",
    },
    // {
    //   label: t("header.facultyStaff"),
    //   name: "FacultyStaff",
    // },
    {
      label: t("header.alumni"),
      name: "Alumni",
    }
  ]
})
const primaryNavs = computed(() => {
  return [
    {
      label: t("primaryNav.news"),
      name: "News",
    },
    {
      label: t("primaryNav.academics"),
      name: "Academics",
    },
    {
      label: t("primaryNav.campusLife"),
      name: "Campus",
    },
    {
      label: t("primaryNav.community"),
      name: "Community",
    },
    {
      label: t("primaryNav.admission"),
      name: "Admission",
    },
    {
      label: t("primaryNav.about"),
      name: "about",
    },
  ];
})

// 监听路由变化 重置isTop
watch(
  () => router.currentRoute.value.name,
  () => {
    state.isTop = false;
    // 重置内容区视口滚动高度
    containerRef.value && containerRef.value.scrollTo({top: 0});
  }
);

// 页面跳转
const jumpTo = (name: string) => {
  console.log(name)
  router.push({
    name: name,
  });
  closeMenu()
};

const entranceHandler = (entrance: any) => {
  switch (entrance.value) {
    case "backstage":
      // const url = router.resolve({path:'/backstage/user'}).href as any;
      // window.open(url,"_blank");
      router.push({
        name: "User"
      })
      break;
    case "logout":
      exitAfter();
      location.reload();
      break;
    default:
      break;
  }
}

// 打开折叠菜单项
const openMenu = () => {
  state.collapseVisible = true
}
// 关闭折叠菜单弹窗
const closeMenu = () => {
  state.collapseVisible = false
}
// 监听视口滚动事件
const handleScroll = (e: any) => {
  const scrollTop = e.target.scrollTop;
  if (scrollTop > 100) {
    state.isTop = true;
  } else {
    state.isTop = false;
  }
};

// 搜索触发
const searchTrigger = () => {
  router.push({
    name: 'Search',
  })
}
// header高度
// 定义响应式变量来存储视口高度
// const viewportHeight = ref(window.innerHeight);
//
// // 定义一个函数用于更新视口高度
// function updateViewportHeight() {
// 	viewportHeight.value = window.innerHeight;
// }
// 组件挂载时立即调用一次以获取初始值
onMounted(() => {
  // updateViewportHeight();
  window.addEventListener("click", closeMenu);
  containerRef.value && containerRef.value.addEventListener("scroll", handleScroll);
});

// 组件卸载时移除事件监听器
onBeforeUnmount(() => {
  window.removeEventListener("click", closeMenu);
  containerRef.value && containerRef.value.removeEventListener("scroll", handleScroll);
});
</script>
<style lang="scss" scoped>
@forward "./foreground.scss";
@forward "./foreground_mb.scss";
</style>