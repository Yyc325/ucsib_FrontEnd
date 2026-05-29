<template>
  <div class="explore-ibdp-courses">
    <div class="container">
      <header class="page-header">
        <button class="back" @click="goBack">← Back</button>
        <h1>Explore IBDP Courses</h1>
        <p class="lead">
          Links to the official IBO curriculum pages for common IBDP courses.
          Click a card to open the official syllabus on the IBO website.
        </p>
      </header>

      <section class="course-grid">
        <article
          v-for="course in courses"
          :key="course.id"
          class="course-card"
        >
          <div class="course-card__meta">
            <div class="course-card__tag">{{ course.group }}</div>
            <h3 class="course-card__title">{{ course.title }}</h3>
          </div>

          <div class="course-card__actions">
            <a
              class="btn"
              :href="course.url"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open on IBO
            </a>
          </div>
        </article>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const goBack = () => router.back();

const courses = [
  {
    id: 'physics',
    title: 'Physics',
    group: 'Sciences',
    url: 'https://www.ibo.org/programmes/diploma-programme/curriculum/sciences/physics/'
  },
  {
    id: 'biology',
    title: 'Biology',
    group: 'Sciences',
    url: 'https://www.ibo.org/programmes/diploma-programme/curriculum/sciences/biology/'
  },
  {
    id: 'chemistry',
    title: 'Chemistry',
    group: 'Sciences',
    url: 'https://www.ibo.org/programmes/diploma-programme/curriculum/sciences/chemistry/'
  },
  {
    id: 'computer-science',
    title: 'Computer Science',
    group: 'Sciences',
    url: 'https://www.ibo.org/programmes/diploma-programme/curriculum/sciences/computer-science/'
  },
  {
    id: 'mathematics',
    title: 'Mathematics',
    group: 'Mathematics',
    url: 'https://www.ibo.org/programmes/diploma-programme/curriculum/mathematics/'
  },
  {
    id: 'language-ab-initio',
    title: 'Language acquisition — Language ab initio',
    group: 'Language acquisition',
    url: 'https://www.ibo.org/programmes/diploma-programme/curriculum/language-acquisition/language-ab-initio/'
  },
  {
    id: 'language-b',
    title: 'Language acquisition — Language B',
    group: 'Language acquisition',
    url: 'https://www.ibo.org/programmes/diploma-programme/curriculum/language-acquisition/language-b/'
  },
  {
    id: 'language-a',
    title: 'Language and literature — Language A',
    group: 'Language & Literature',
    url: 'https://www.ibo.org/programmes/diploma-programme/curriculum/language-and-literature/language-a-language-and-literature/'
  },
  {
    id: 'business-management',
    title: 'Business Management',
    group: 'Individuals & Societies',
    url: 'https://www.ibo.org/programmes/diploma-programme/curriculum/individuals-and-societies/business-and-management/'
  },
  {
    id: 'economics',
    title: 'Economics',
    group: 'Individuals & Societies',
    url: 'https://www.ibo.org/programmes/diploma-programme/curriculum/individuals-and-societies/economics/'
  },
  {
    id: 'psychology',
    title: 'Psychology',
    group: 'Individuals & Societies',
    url: 'https://www.ibo.org/programmes/diploma-programme/curriculum/individuals-and-societies/psychology/'
  },
  {
    id: 'visual-arts',
    title: 'Visual Arts',
    group: 'The Arts',
    url: 'https://www.ibo.org/programmes/diploma-programme/curriculum/the-arts/visual-arts/'
  }
];
</script>

<style scoped lang="scss">
.explore-ibdp-courses {
  .container {
    max-width: 1100px;
    margin: 40px auto;
    padding: 0 20px;
  }
  .page-header {
    text-align: center;
    margin-bottom: 28px;
    .back {
      position: absolute;
      left: 20px;
      top: 24px;
      background: transparent;
      border: none;
      color: #1a3a5d;
      font-weight: 600;
      cursor: pointer;
    }
    h1 {
      font-family: 'Montserrat', 'Jacques Francois', serif;
      font-size: 36px;
      color: #1a3a5d;
      margin: 0 0 8px 0;
    }
    .lead {
      color: #495057;
      font-size: 16px;
      margin: 0 auto;
      max-width: 760px;
    }
  }

  .course-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 20px;
    align-items: stretch;
  }

  .course-card {
    background: #fff;
    border-radius: 12px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: none; /* 取消 hover 动画 */

    &:hover {
      transform: none; /* 取消抬起效果 */
      /* box-shadow 已移除 */
    }

    &__meta {
      .course-card__tag {
        display: inline-block;
        background: linear-gradient(90deg, #eef4ff, #e6f0ff);
        color: #1a3a5d;
        font-weight: 700;
        padding: 6px 10px;
        border-radius: 999px;
        font-size: 12px;
        margin-bottom: 12px;
      }
      .course-card__title {
        font-size: 18px;
        color: #12223f;
        margin: 0 0 8px 0;
        font-weight: 700;
      }
    }

    &__actions {
      display: flex;
      justify-content: center;
      margin-top: 12px;
      .btn {
        background: #1a3a5d;
        color: #fff;
        padding: 10px 14px;
        border-radius: 8px;
        text-decoration: none;
        font-weight: 700;
        font-size: 14px;
        display: inline-block;
        transition: background 0.12s ease;
      }
      .btn:hover {
        background: #285a98;
      }
    }
  }

  @media (max-width: 600px) {
    .page-header h1 {
      font-size: 26px;
    }
    .course-card {
      padding: 16px;
      .course-card__title {
        font-size: 16px;
      }
    }
  }
}
    .explore-ibdp-courses .course-card,
    .explore-ibdp-courses .course-card * {
    box-shadow: none !important;
    -webkit-box-shadow: none !important;
    filter: none !important; /* 取消 drop-shadow */
    text-shadow: none !important;
    background-image: none !important;
    transition: none !important;
    }

    /* 覆盖可能由外部未 scoped 的样式（Element / 全局类等） */
    :deep(.course-card),
    :deep(.course-card) * ,
    :deep(.el-card),
    :deep(.el-card) * {
    box-shadow: none !important;
    -webkit-box-shadow: none !important;
    filter: none !important;
    text-shadow: none !important;
    background-image: none !important;
    transition: none !important;
    }
</style>

