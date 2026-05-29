<template>
  <div class="alumni">
    <div class="alumni-header">
      <div class="alumni-header-inner">
        <div class="alumni-header-title">Welcome Home</div>
      </div>
    </div>
    <div class="alumni-describe">
      <div class="alumni-describe-inner">Here, past IB learners of UCS have showcased their remarkable achievements. Having accomplished so much, they are now forging ahead on new paths. Let us take a moment to witness the excellence of these graduates.</div>
    </div>
    <div class="alumni-container">
      <ContentLayout>
        <div class="alumni-section">
          <div class="alumni-section-header">
            Alumni Highlights
          </div>
          <div class="alumni-section-content">
            <div class="highlight">
              <div class="highlight-trigger">
                <el-popover v-model:visible="popoverVisible" trigger="click" width="11.625rem" :show-arrow="false" placement="bottom-end">
                  <template #reference>
                    <div class="highlight-trigger-select">
                      <div class="highlight-trigger-select__prefix">
                        <el-icon>
                          <ArrowDown></ArrowDown>
                        </el-icon>
                      </div>
                      <div class="highlight-trigger-select__inner">{{ selectedYear.label }}</div>
                    </div>
                  </template>
                  <template #default>
                    <div class="select-popover">
                      <div class="select-option" v-for="year in yearSelects" :key="year.label" @click="selectYearHandle(year)">
                        <div class="select-option__label">{{year.label}}</div>
                      </div>
                    </div>
                  </template>
                </el-popover>
              </div>
              <div class="highlight-display">
                <div class="highlight-display-inner">
                  <div class="highlight-display-card" v-for="index in 3" :key="index">
                    <img :src="`https://website.xycloud.net.cn/images/${selectedYear.value}-fall-${index}.jpg`" alt="">
                  </div>
                </div>
                <div class="highlight-display-ribbons">
                  {{selectedYear.label}}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="alumni-section alumni-voices">
          <div class="alumni-section-header">
            <div class="alumni-voices-title">
              Alumni Voices
            </div>
          </div>
          <div class="alumni-section-content">
            <div class="alumni-voice-list">
              <div class="alumni-voice-item" v-for="(voice,index) in alumniVoices" :key="index" :class="voice.starPosition">
                <div class="alumni-voice-item-author">
                  <div class="alumni-voice-item-author__name">
                    {{voice.author}}
                  </div>
                  <div class="alumni-voice-item-author__suffix">
                    <svg width="150" height="150" viewBox="0 0 150 150">
                      <path d="M75,0 L96,60 L150,60 L111,90 L129,150 L75,120 L21,150 L39,90 L0,60 L54,60 Z"
                            fill="#6D73B6"/>
                    </svg>
                  </div>
                </div>
                <div class="alumni-voice-item-content">
                  <div class="alumni-voice-item-title">
                    {{voice.title}}
                  </div>
                  <div class="alumni-voice-item-article">
                    {{ voice.content}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentLayout>
    </div>
    <div class="alumni-footer">
      <div class="alumni-footer-section">
        Dear graduates, your UCS IB alma mater's door is always open!<br /> We'd love for you to drop by!
      </div>
      <div class="alumni-footer-section">
        <img src="https://website.xycloud.net.cn/images/alumni-footer.jpg" alt="">
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {computed, defineComponent, reactive, toRefs} from 'vue'
import {ArrowDown} from "@element-plus/icons-vue";
import ContentLayout from "@/views/foreground/aaComponents/ContentLayout/ContentLayout.vue";

export default defineComponent({
  name: "alumni",
  components: {
    ContentLayout,
    ArrowDown
  },
  setup(){
    const state = reactive({
      popoverVisible:false,
      selectedYear:{
        label:'2020fall',
        value:'2020'
      },
      yearSelects:[
        {
          label:'2020fall',
          value:'2020',
        },
        {
          label:'2021fall',
          value:'2021',
        },
        {
          label:'2022fall',
          value:'2022',
        },
        {
          label:'2023fall',
          value:'2023',
        },
        {
          label:'2024fall',
          value:'2024',
        },
        {
          label:'2025fall',
          value:'2025',
        },
      ],
      alumniVoices:[
        {
          starPosition:'left',
          author:'Student Wu',
          title:'UCS IB Program Graduate (University of Oxford)',
          content:'The IB curriculum system is characterized by its high frequency of English writing assignments. This is often unfamiliar and challenging for Chinese students, yet it is a core skill essential for succeeding in university studies abroad. Therefore, I chose to embrace this challenge precisely because I recognized its value in cultivating personal abilities. Furthermore, the well-rounded education provided by the IB curriculum allows students to gain broad knowledge across various fields, promoting holistic development. It helps prevent one from becoming narrowly focused only on STEM subjects while having a superficial understanding of the humanities and social sciences, thereby enabling a broader perspective on the world.'
        },
        {
          starPosition:'right',
          author:'Student Wu',
          title:'UCS IB Program Graduate (Imperial College London / Columbia University)',
          content:'The most challenging yet innovative aspects of the IB curriculum deeply attracted me. This kind of "encounter-based education" pushed me out of my comfort zone, fostering scientific and critical thinking skills that prepared me well for university. Additionally, I believe one of the most demanding, yet ultimately rewarding, aspects of the IB program is its emphasis on developing time management skills. It taught me the importance of long-term planning, which helped me adapt to the pace of university studies and become more efficient. I sincerely recommend challenging yourself during high school to fully realize your potential.',
        },

      ]
    })
    const selectYearHandle = (year:any)=>{
      state.selectedYear = year
      state.popoverVisible = false
    }
    return {
      ...toRefs(state),
      selectYearHandle
    }
  }
})
</script>

<style scoped lang="scss">
@forward "alumni";
@forward "alumni_mb";
</style>