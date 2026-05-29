<template>
  <div class="admission">
    <div class="admission-header">
      <div class="admission-header-inner">
        <div class="admission-header-section">
          <div class="admission-header__title">Admission</div>
        </div>
        <div class="admission-header-section"></div>
      </div>
    </div>
    <div class="admission-center">
      <div class="admission-tip">
        IB students gain a competitive edge with a diploma sought after by leading universities worldwide. The program
        fosters their holistic growth and allows them to tailor their studies to personal interests.
      </div>
    </div>
    <div class="admission-forward admission-section">
      <div class="admission-forward-container admission-section-container">
        <div v-for="forward in forwardSection" :key="forward.name" class="admission-forward-section" :style="{
          backgroundImage:`url(${forward.background})`
        }">
          <div class="admission-forward-tip" @click="navigatorHandle(forward.name)">
            <div class="admission-forward-tip__title">
              {{ forward.title }}
            </div>
            <div class="admission-forward-tip__desc">
              {{ forward.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="admission-journey admission-section">
      <div class="admission-journey-container admission-section-container">
        <div class="admission-journey-section">
          <div class="admission-journey-title">Join the UCS IB Journey.</div>
          <div class="admission-journey-desc">Your Future. Our Program. UCS IB.</div>
          <div class="admission-journey-btn">
            <span class="admission-journey-btn__inner">Apply Now</span>
          </div>
        </div>
        <div class="admission-journey-section">
          <div class="admission-journey-model">
            <div class="admission-journey-model-outer"><img
              src="https://website.xycloud.net.cn/images/admission_jorney.png" alt=""></div>
          </div>
        </div>
      </div>
    </div>
    <ContentLayout>
      <div class="admission-content-section">
        <div class="admission-content-header">
          Find Out About the IB
        </div>
        <div class="admission-content-body">
          <div class="preview-box">
            <div class="preview-box-inner">
              <video 
                id="myVideoPlayer"
                class="video-js"
                controls
                preload="auto"
                :width="1105"
                :height="510"
              >
                <source src="https://website.xycloud.net.cn/video/Admission_intro.mp4" type="video/mp4" />

              </video>
            </div>
          </div>
        </div>
      </div>
      <div class="admission-content-section">
        <div class="admission-content-body">
          <div class="application-guidelines">
            <div class="application-guidelines-inner">
              <div class="application-guidelines-title">Application GuideLines</div>
              <div class="application-guidelines-content">Our school's admissions process includes both a written exam and an interview, Applicants should follow the official enrollment steps provided on <span>this page</span> to register, submit documents, and pay fees. Please check the website regularly for exam details,important dates, and admission updates.</div>
            </div>
          </div>
        </div>
      </div>
      <div class="admission-content-section">
        <div class="admission-content-header faq">
          FAQ
        </div>
        <div class="admission-content-body">
          <el-collapse accordion>
            <el-collapse-item
              v-for="(faq, i) in faqList"
              :key="i"
              :title="faq.question"
            >
              <div>{{ faq.answer }}</div>
            </el-collapse-item>
          </el-collapse>

        </div>
      </div>
    </ContentLayout>
  </div>
</template>
<script lang="ts">
import {defineComponent, reactive, toRefs} from "vue";
import {router} from "@/router";
import ContentLayout from "@/views/foreground/aaComponents/ContentLayout/ContentLayout.vue";

export default defineComponent({
  name: 'Admission',
  components: {ContentLayout},
  setup() {
    const state = reactive({
      forwardSection: [
        {
          background: 'https://website.xycloud.net.cn/images/admission_academic.png',
          title: "Academic",
          description: 'Explore Our Curriculum',
          name: 'Academics'
        },
        {
          background: 'https://website.xycloud.net.cn/images/admission_campus.png',
          title: "Campus Life",
          description: 'Explore our Vibrant Community',
          name: 'Campus'
        },
      ],
      faqList:[
        {
          question: 'What is the admissions exam process?',
          answer: 'Our admissions exam consists of a written test and an interview, held about one week apart. Only candidates who pass the written test are eligible for the interview. Approximately one week after the interview, results will be released. Those who pass will receive official admission offers.'
        },
        {
          question: 'Where can I register for the exam?',
          answer: 'Please follow the instructions and register at the following website:https://www.ulink.cn/ru-xue-liu-cheng/'
        },
        {
          question: 'Where can I find the exam syllabus?',
          answer: 'Please follow the official “Ulink Education” WeChat account and stay tuned for updates regarding the 2025 Fall admissions exam.'
        },
        {
          question: 'What documents do I need to bring to the exam?',
          answer: 'You must print and bring your Admission Ticket along with your valid ID card.'
        },
        {
          question: 'Besides presenting documents, what are the entry procedures for the exam?',
          answer: 'We will use facial recognition to verify candidate identity. Therefore, candidates must arrive at least 30 minutes before the exam and ensure that the ID number in the registration system is accurate.'
        },
        {
          question: 'What stationery and supplies should I bring?',
          answer: 'Please bring a black gel pen, a 2B pencil, a transparent stationery bag, and a transparent water bottle.'
        },
        {
          question: 'Can I bring a calculator to the written exam?',
          answer: 'Calculators are only permitted for the Mathematics (English version) exam.'
        }
      ]
    })
    // 页面跳转
    const navigatorHandle = (name: string) => {
      router.push({
        name
      })
    }
    return {
      ...toRefs(state),
      navigatorHandle
    }
  }
})
</script>
<style lang="scss" scoped>
@forward "admission";
@forward "admission_mb";
</style>