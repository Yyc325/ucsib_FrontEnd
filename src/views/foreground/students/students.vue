<template>
  <div class="students">
    <div class="students-header">
      <div class="students-header-container">
        <div class="students-header-inner">
          <div class="students-header-section">
            <div class="students-header__title">Gateway for students</div>
          </div>
          <div class="students-header-section">
            <div class="students-header-more" @click="$router.push('/about')">Explore more</div>
          </div>
        </div>
      </div>
    </div>
    <div class="students-center">
      <div class="students-tip">
        Empowering global citizens through the international baccalaureate program discover opportunities,connect with peers,and shape your future.
      </div>
    </div>
    <ContentLayout>
      <section class="student-section">
        <header class="student-section-header">
          <div class="student-section-header__title">Student Development</div>
          <div class="student-section-header__desc">Comprehensive programs designed to nurture your academic, personal,
            and professional growth throughout your IB journey.
          </div>
        </header>
        <main class="student-section-content">
          <div class="develop-cards">
            <div class="develop-card" v-for="(card,index) in developments" :key="index">
              <div class="develop-card-icon">
                <img :src="card.icon" alt="">
              </div>
              <div class="develop-card-title">{{ card.title }}</div>
              <div class="develop-card-todos">
                <div class="develop-card-todo" v-for="(todo,todoIndex) in card.todos" :key="todoIndex">
                  <span>{{ todo.label }}</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>
      <section class="student-section">
        <header class="student-section-header">
          <div class="student-section-header__title">Student Activities</div>
          <div class="student-section-header__desc">Discover exciting opportunities to engage, learn, and grow through
            our diverse range of clubs, events, and extracurricular activities.
          </div>
        </header>
        <main class="student-section-content">
          <div class="active-cards">
            <template v-for="(card,index) in studentActives">
              <template v-if="card.fullCover">
                <div class="active-card">
                  <div class="active-card-cover">
                    <img :src="card.cover" alt="">
                  </div>
                  <div class="active-card-popover">
                    <div class="active-card-title">{{ card.title }}</div>
                    <div class="active-card-desc">{{ card.desc }}</div>
                  </div>
                </div>
              </template>
              <template v-else>
                <ICard :cover="card.cover" :title="card.title" :description="card.desc"></ICard>
              </template>
            </template>

          </div>
        </main>
      </section>
      <section class="student-section">
        <div class="student-section-tip">
          UCS IB students, self-made music video "ib is difficult"
        </div>
        <div class="student-section-content">
          <div class="history-carousel">
            <div class="history-carousel-display" :style="{background:currentHistory.background}">
              <video
                v-if="currentHistory.videoUrl"
                :src="currentHistory.videoUrl"
                controls
                style="width: 100%; height: 100%; border-radius: 16px; background: #000;"
              ></video>
            </div>
            <div class="history-carousel-trigger">
              <div class="history-carousel-trigger-item" v-for="history in historicalLine" :key="history.date"
                   :style="{background:history.background}" @click="changeHistory(history)">
                <div class="history-carousel-trigger-item-date">
                  {{ history.date }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ContentLayout>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs} from 'vue';
import ContentLayout from "@/views/foreground/aaComponents/ContentLayout/ContentLayout.vue";
import ICard from "@/views/foreground/aaComponents/ICard/ICard.vue";


export default defineComponent({
  name: 'Students',
  components: {ICard, ContentLayout},
  setup() {
    const state = reactive({
      developments: [
        {
          icon: 'https://website.xycloud.net.cn/images/student_develop_1.png',
          title: 'Academic Excellence',
          todos: [
            {
              label: 'Extended Essay Support',
            },
            {
              label: 'TOK Workshops',
            },
            {
              label: 'Subject-specific Tutoring',
            },
          ]
        },
        {
          icon: 'https://website.xycloud.net.cn/images/student_develop_2.png',
          title: 'Career Guidance',
          todos: [
            {
              label: 'University Applications',
            },
            {
              label: 'Career Assessments',
            },
            {
              label: 'Industry Connections',
            },
          ]
        },
        {
          icon: 'https://website.xycloud.net.cn/images/student_develop_3.png',
          title: 'Innovation Hub',
          todos: [
            {
              label: 'Startup Incubator',
            },
            {
              label: 'Design Thinking',
            },
            {
              label: 'Research Projects',
            },
          ]
        },
        {
          icon: 'https://website.xycloud.net.cn/images/student_develop_4.png',
          title: 'Leadership Development',
          todos: [
            {
              label: 'Student Council',
            },
            {
              label: 'Peer Mentoring',
            },
            {
              label: 'Community Projects',
            },
          ]
        },
      ],
      studentActives: [
        {
          cover: "https://website.xycloud.net.cn/images/student_active_1.jpg",
          title: 'Sports Day',
          desc: "exciting times",
          fullCover: true
        },
        {
          cover: "https://website.xycloud.net.cn/images/student_active_2.jpg",
          title: 'Performance',
          desc: "IB learners can create and inspire their talents and show themselves in ULink.There are many stages prepared for them."
        },
        {
          cover: "https://website.xycloud.net.cn/images/student_active_3.jpg",
          title: 'Festival',
          desc: "Celebrate various festivals in different ways, you will see endless possibilities here."
        }
      ],
      currentHistory: {
        date: '2019',
        background: '#010736',
        videoUrl: 'https://website.xycloud.net.cn/video/%5BMV%5DIB%20is%20so%20diffucult%EF%BC%88IB%E5%A5%BD%E9%9A%BE%EF%BC%89.mp4'
      },
      historicalLine: [
        {
          date: '2019',
          background: '#010736',
          videoUrl: 'https://website.xycloud.net.cn/video/%5BMV%5DIB%20is%20so%20diffucult%EF%BC%88IB%E5%A5%BD%E9%9A%BE%EF%BC%89.mp4'
        },
        {
          date: '2020',
          background: '#121B52',
          videoUrl: 'https://website.xycloud.net.cn/video/%E9%A2%86%E7%A7%91%E4%B8%8A%E6%B5%B72020%E5%B1%8APreIB%E8%87%AA%E5%88%B6%E9%9F%B3%E4%B9%90%E7%9F%AD%E7%89%87%E3%80%8AIB%E5%A5%BD%E9%9A%BE%E3%80%8B.mp4'

        },
        {
          date: '2024',
          background: '#221C5A',
          videoUrl:'https://website.xycloud.net.cn/video/Ulink27.mp4'
        },
        {
          date: '2025',
          background: '#1F2D7C',
          videoUrl: 'https://website.xycloud.net.cn/video/ibhn.mp4'
        },
      ]
    })
    const changeHistory = (history: any) => {
      state.currentHistory = history
    }
    return {
      changeHistory,
      ...toRefs(state)
    };
  },
});
</script>

<style lang="scss" scoped>
@forward './students.scss';
@forward "students_mb";
</style>