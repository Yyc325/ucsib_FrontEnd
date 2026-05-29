<template>
  <div class="about">
    <div class="about-container">
      <div class="about-header">
        <div class="about-header-title">
          {{ t('aboutpage.Title.title1') }}
        </div>
        <img class="about-header-line" src="https://website.xycloud.net.cn/images/home-background.png"/>
        <div class="about-header-paragraph">
          {{ t('aboutpage.Paragraph.description') }}
        </div>
      </div>
      <div class="about-body">
        <div class="about-team-member">
          <div class="about-section__title">{{ t('about.teamTitle') }}</div>
          <div class="about-section__content">
            <div class="member-cards">
              <div class="member-card" v-for="(member, i) in members" :key="i">
                <div class="member-card__avatar">
                  <img :src="member.avatar" alt="">
                </div>
                <div class="member-card__info">
                  <div class="member-card__name">{{ member.name }}</div>
                  <div class="member-card__title">{{ member.title }}</div>
                  <div class="member-card__desc">{{ member.desc }}</div>
                </div>
                </div>
              </div>
            </div>
          </div>
        <div class="about-card-list">
          <div class="about-card-item news">
            <p class="about-card-item__info">
              <span class="about-card-item__image">
                <span class="about-card-item__image-show">
                  <img src="https://website.xycloud.net.cn/images/about1.png"/>
                <span class="about-card-item__image-description" @click="$router.push('/news')">
                  {{ t('aboutpage.News.more') }}
                </span>
                </span>
              </span>
              <span class="about-card-item__title">{{ t('aboutpage.News.title') }}</span>
              <span class="about-card-item__desc">{{ t('aboutpage.News.description') }}</span>
            </p>
          </div>
          <div class="about-card-item campus">
            <p class="about-card-item__info">
              <span class="about-card-item__image">
                <span class="about-card-item__image-show">
                  <img src="https://website.xycloud.net.cn/images/about3.png"/>
                <span class="about-card-item__image-description" @click="$router.push('/campus')">
                  {{ t('aboutpage.CampusLife.more') }}
                </span>
                </span>
              </span>
              <span class="about-card-item__title">{{ t('aboutpage.CampusLife.title') }}</span>
              <span class="about-card-item__desc">{{ t('aboutpage.CampusLife.description') }}</span>
            </p>
          </div>
          <div class="about-card-item academic">
            <p class="about-card-item__info">
              <span class="about-card-item__image">
                <span class="about-card-item__image-show">
                  <img src="https://website.xycloud.net.cn/images/about2.png"/>
                <span class="about-card-item__image-description" @click="$router.push('/academics')">
                  {{ t('aboutpage.Academic.more') }}
                </span>
                </span>
              </span>
              <span class="about-card-item__title">{{ t('aboutpage.Academic.title') }}</span>
              <span class="about-card-item__desc">
                {{ t('aboutpage.Academic.description') }}</span>
            </p>
          </div>
          <div class="about-card-item community">
            <p class="about-card-item__info">
              <span class="about-card-item__image">
                <span class="about-card-item__image-show">
                  <img src="https://website.xycloud.net.cn/images/about0.png"/>
                <span class="about-card-item__image-description" @click="$router.push('/community')">
                  {{ t('aboutpage.Community.more') }}
                </span>
                </span>
              </span>
              <span class="about-card-item__title">{{ t('aboutpage.Community.title') }}</span>
              <span class="about-card-item__desc">
                {{ t('aboutpage.Community.description') }}
              </span>
            </p>
          </div>
          <div class="about-card-item admission">
            <p class="about-card-item__info">
              <span class="about-card-item__image">
                <span class="about-card-item__image-show">
                  <img src="https://website.xycloud.net.cn/images/about4.png"/>
                <span class="about-card-item__image-description" @click="$router.push('/admission')">
                  {{ t('aboutpage.Admission.more') }}
                </span>
                </span>
              </span>
              <span class="about-card-item__title">{{ t('aboutpage.Admission.title') }}</span>
              <span class="about-card-item__desc">
                {{ t('aboutpage.Admission.description') }}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from "vue-i18n"
const { t } = useI18n()

const members = computed(() => [
  {
    avatar: 'https://website.xycloud.net.cn/images/Selfie4.png',
    name: t('about.member1.name'),
    title: t('about.member1.title'),
    desc: t('about.member1.desc')
  },
  {
    avatar: 'https://website.xycloud.net.cn/photo.jpg',
    name: t('about.member2.name'),
    title: t('about.member2.title'),
    desc: t('about.member2.desc')
  },
  {
    avatar: 'https://website.xycloud.net.cn/images/user-avatar.jpg',
    name: t('about.member3.name'),
    title: t('about.member3.title'),
    desc: t('about.member3.desc')
  },
  {
    avatar: 'https://website.xycloud.net.cn/images/Selfie2.png',
    name: t('about.member4.name'),
    title: t('about.member4.title'),
    desc: t('about.member4.desc')
  },
  {
    avatar: 'https://website.xycloud.net.cn/images/user-avatar.jpg',
    name: t('about.member5.name'),
    title: t('about.member5.title'),
    desc: t('about.member5.desc')
  },
  {
    avatar: 'https://website.xycloud.net.cn/images/Selfie3.jpg',
    name: t('about.member6.name'),
    title: t('about.member6.title'),
    desc: t('about.member6.desc')
  }
])
</script>

<style scoped lang="scss">
@forward "about";
@forward "about_mb";
</style>