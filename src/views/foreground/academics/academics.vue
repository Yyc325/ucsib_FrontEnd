<template>
  <div class="academics">
    <div class="academics-container">
      <div class="academics-header">
        <div class="academics-header-title">
          {{ t('primaryNav.academics') }}
        </div>
      </div>
      <div class="academics-body">
        <section class="academics-section swapper">
          <div class="swapper-inner">
            <img src="https://www.ulink.cn/wp-content/uploads/2024/12/ib-profile-scaled.jpg" alt="">
          </div>
        </section>
        <section class="academics-section theme-tabs">
          <div class="theme-tabs__inner">
            <div class="theme-tab" v-for="tab in themeTabs" :key="tab.name">
              <div class="theme-tab__label">{{tab.label}}</div>
            </div>
          </div>
        </section>
        <section class="academics-section pre-ib">
          <div class="academics-section__title">{{t('foreground.academics.course.preIb')}}</div>
          <div class="academics-section__body">
            <div class="section-card">
              <div class="section-card__content">
                <article class="section-card__inner">
                  <div class="section-card__title">{{t('academics.preIbCourses.subtitle1')}}</div>
                  <div class="section-card__desc">{{t('academics.preIbCourses.description1')}}</div>
                  <div class="section-card__title">{{t('academics.preIbCourses.subtitle2')}}</div>
                  <div class="section-card__desc">{{t('academics.preIbCourses.description2')}}</div>
                  <div class="section-card__link" @click="jumpToMoreCourses('ExplorePreIB')">
                    <span>{{t('academics.preIbCourses.Explore')}}</span>
                  </div>
                </article>
              </div>
              <div class="section-card__preview1">
                <img src="https://website.xycloud.net.cn/images/preib.png" alt="">
              </div>
            </div>
          </div>
        </section>
        <section class="academics-section ibdp">
          <div class="academics-section__title">{{t('foreground.academics.course.ibdp')}}</div>
          <div class="academics-section__body">
            <div class="section-card">
              <div class="section-card__content">
                <article class="section-card__inner">
                  <div class="section-card__title">{{t('academics.IBDPcourses.subtitle1')}}</div>
                  <div class="section-card__desc">{{t('academics.IBDPcourses.description1')}}</div>
                  <div class="section-card__title">{{t('academics.IBDPcourses.subtitle2')}}</div>
                  <div class="section-card__desc">{{t('academics.IBDPcourses.description2')}}</div>
                  <div class="section-card__link">
                    <li class=button @click="$router.push('/ibdp-explore')">{{ t('academics.IBDPcourses.Explore')}}</li>
                  </div>
                </article>
              </div>
              <div class="section-card__preview">
                <img src="https://img1.baidu.com/it/u=1739952125,2841880388&fm=253&fmt=auto&app=138&f=JPEG?w=751&h=500" alt="">
              </div>
            </div>
          </div>
        </section>
        <section class="academics-section ibdp-core">
          <div class="academics-section__title">{{t('foreground.academics.course.ibdpCore')}}</div>
          <div class="academics-section__body ibdp-core-cards">
            <div class="ibdp-core-card">
              <div class="ibdp-core-icon">CAS</div>
              <div class="ibdp-core-title">CAS</div>
              <div class="ibdp-core-text">{{ t('academics.IBDPcoreTopics.CASdescription') }}</div>
            </div>
            <div class="ibdp-core-card">
              <div class="ibdp-core-icon">TOK</div>
              <div class="ibdp-core-title">TOK</div>
              <div class="ibdp-core-text">{{ t('academics.IBDPcoreTopics.TOKdescription') }}</div>
            </div>
            <div class="ibdp-core-card">
              <div class="ibdp-core-icon">EE</div>
              <div class="ibdp-core-title">EE</div>
              <div class="ibdp-core-text">{{ t('academics.IBDPcoreTopics.EEdescription') }}</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import { useI18n } from "vue-i18n";
import {router} from "@/router";

export default defineComponent({
  name:'Academics',
  setup(){
    const { t } = useI18n();
    const themeTabs = computed(() => [
      { label: t('academics.themeTabs.facultyMembers'), name: "1" },
      { label: t('academics.themeTabs.facultyRatio'), name: "2" },
      { label: t('academics.themeTabs.courses'), name: "3" }
    ]);

    const jumpToMoreCourses = (courseName:string)=>{
      router.push({
        name:'Courses',
        query:{
          courseName:courseName
        }
      })
    }
    return {
      t,
      themeTabs,
      jumpToMoreCourses
    }
  }
})
</script>
<style scoped lang="scss">
@use "academics";
@use "academics_media";
</style>