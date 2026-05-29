<template>
  <div class="admission">
    <div class="admission-container">
      <div class="admission-header">
        <div class="admission-header-title">
          {{ t('primaryNav.admission') }}
        </div>
      </div>
      <div class="admission-body">
        <div class="admission-section preview-video">
          <template v-if="videoUrl">
            <video :src="videoUrl" controls></video>
          </template>
        </div>
        <div class="admission-section">
          <div class="admission-section__title">
            {{ t('admission.applicationguide.title') }}
          </div>
          <div class="admission-section__content">
            {{ t('admission.applicationguide.sub1') }}
          </div>
        </div>
        <div class="admission-section faq">
          <div class="admission-section__title">
            FAQ
          </div>
          <div class="admission-section__content">
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
        <!-- ...existing code... -->
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {defineComponent, reactive, toRefs, computed} from 'vue'
import {useI18n} from "vue-i18n";
import 'element-plus/dist/index.css'
import { ElCollapse, ElCollapseItem } from 'element-plus'

export default defineComponent({
  name: "admission",
  setup(){
    const { t } = useI18n();

    const videoUrl = 'https://website.xycloud.net.cn/video/Ulink27.mp4';



    const faqList = [
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
    ];

    const members = [
      {
        avatar:'https://website.xycloud.net.cn/images/user-avatar.jpg',
        information:{
          title:'Information',
          content:'xxxxxxxxxxx'
        }
      },
      {
        avatar:'https://website.xycloud.net.cn/images/user-avatar.jpg',
        information:{
          title:'Information',
          content:'xxxxxxxxxxx'
        }
      },
      {
        avatar:'https://website.xycloud.net.cn/images/user-avatar.jpg',
        information:{
          title:'Information',
          content:'xxxxxxxxxxx'
        }
      }
    ];

    return {
      t,
      videoUrl,
      faqList,
      members
    }
  }
})
</script>

<style scoped lang="scss">
@use "admission";
@use "admission_mb";
</style>