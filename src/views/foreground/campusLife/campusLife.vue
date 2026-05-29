<template>
  <ContentLayout>
    <div class="campus-life-section">
      <div class="campus-life-section__header dark">
        <div class="campus-life-section__title">Experience Campus Life</div>
        <div class="campus-life-section__desc">Immerse yourself in a vibrant community where learning extends far beyond
          the classroom and lifelong friendships are forged
        </div>
      </div>
      <div class="campus-life-section__content">
        <div class="preview-image">
          <img src="https://website.xycloud.net.cn/images/campus_life_1.jpg" alt="">
        </div>
      </div>
    </div>
    <div class="campus-life-section">
      <div class="campus-life-section__header">
        <div class="campus-life-section__title">Student Life</div>
      </div>
      <div class="campus-life-section__content">
        <div class="card-list">
          <ICard v-for="(card,index) in studentLife" :key="index" :cover="card.cover" :title="card.title"
                 :description="card.desc"></ICard>
        </div>
      </div>
    </div>
    <div class="campus-life-section">
      <div class="campus-life-section__header">
        <div class="campus-life-section__title">Arts & Culture</div>
      </div>
      <div class="campus-life-section__content">
        <div class="card-list">
          <ICard v-for="(card,index) in artAndCulture" :key="index" :cover="card.cover" :title="card.title"
                 :description="card.desc"></ICard>
        </div>
      </div>
    </div>
    <div class="campus-life-section">
      <div class="campus-life-section__header">
        <div class="campus-life-section__title">Sports & Fitness</div>
      </div>
      <div class="campus-life-section__content">
        <div class="sport-fitness">
          <div class="sport-fitness-box">
            <div class="sport-fitness-box__inner">
              <div class="sport-fitness-box-title">Contact Sports</div>
              <div class="sport-fitness-box-desc">
                ·PE classes<br />
                ·Campus Sports Meets<br />
                ·Sports Clubs<br />
              </div>
            </div>
          </div>
          <div class="sport-fitness-image">
            <img src="https://website.xycloud.net.cn/images/sport_1.jpg" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="campus-life-topbar">
      <div class="campus-life-topbar-line">What's Happening at UCSIB</div>
      <button class="about-btn" @click="$router.push('/news')">
        News & Events on Campus
      </button>
    </div>
  </ContentLayout>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs} from 'vue'
import ContentLayout from "@/views/foreground/aaComponents/ContentLayout/ContentLayout.vue";
import ICard from "@/views/foreground/aaComponents/ICard/ICard.vue";

export default defineComponent({
  name: "campusLife",
  components: {ICard, ContentLayout},
  setup() {
    const state = reactive({
      studentLife: [
        {
          cover: "https://website.xycloud.net.cn/images/student_life_1.jpg",
          title: 'Campus Events',
          desc: "Here you can find rich schedule and collection"
        },
        {
          cover: "https://website.xycloud.net.cn/images/student_life_2.jpg",
          title: 'Dining & Catering',
          desc: "A variety of restaurants are waiting for you at ulink"
        },
        {
          cover: "https://website.xycloud.net.cn/images/student_life_3.jpg",
          title: 'Clubs & Organizations',
          desc: "UCS IB learners join and create many rich societies and there is a strong student union"
        }
      ],
      artAndCulture: [
        {
          cover: "https://website.xycloud.net.cn/images/arts_culture_1.jpg",
          title: 'Cultural Activities',
          desc: "Many performances are waiting for you here, let your talents shine"
        },
        {
          cover: "https://website.xycloud.net.cn/images/arts_culture_2.jpg",
          title: 'Drama',
          desc: "Come see the achievements of IB learners in this annual drama show"
        },
        {
          cover: "https://website.xycloud.net.cn/images/arts_culture_3.png",
          title: 'Chinese Culture Week',
          desc: "IB's unique Chinese Culture Week, where you can learn a lot about traditional culture"
        }
      ]
    })
    return {
      ...toRefs(state)
    }
  }
})
</script>
<style scoped lang="scss">
@forward "campusLife";
@forward "campusLife_mb";
</style>