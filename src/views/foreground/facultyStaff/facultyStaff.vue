<!-- <template>
  <div class="faculty-staff">
    <header class="faculty-staff-header">
      <section class="faculty-staff-header-section right"></section>
      <section class="faculty-staff-header-section left">
        <div class="faculty-staff-header-title">Faculty & Staff</div>
        <div class="faculty-staff-header-member">
          Members：25+
        </div>
        <div class="faculty-staff-header-desc">
          UCS IB comprises a distinguished faculty with a variety of teaching methodologies, which enables students to find the instructor best suited to their learning style. The teaching staff functions as a supportive and cohesive unit, fostering an environment akin to a family.
        </div>
        <div class="faculty-staff-header-welcome">WELCOME</div>
      </section>
    </header>
    <main class="faculty-staff-main">
      <aside class="faculty-staff-aside">
        <div class="faculty-staff-aside-search">
          <div class="faculty-staff-aside-search-btn">
            FIND
          </div>
        </div>
        <div class="faculty-staff-aside-menu">
          <div v-for="country in countries" :key="country.value" class="faculty-staff-aside-menu-item">
            <span>{{ country.label }}</span>
          </div>
        </div>
      </aside>
      <section class="faculty-staff-section">
        <section class="faculty-staff-main">
          <div class="faculty-staff-card" v-for="(staff,index) in staffList" :key="index">
            <div class="faculty-staff-card-cover">
              <img :src="staff.avatar" alt="">
            </div>
            <div class="faculty-staff-card-info">
              <div class="faculty-staff-card-name">{{ staff.name }}</div>
            </div>
          </div>
        </section>
      </section>
    </main>
  </div>
</template>
<script lang="ts">
import {defineComponent, reactive, toRefs} from 'vue'

export default defineComponent({
  name: "facultyStaff",
  setup(){
    const state = reactive({
      countries:[
        {
          label:'IB Office',
          value:'IB Office',
        },
        {
          label:'Chinese',
          value:'Chinese',
        },
        {
          label:'English',
          value:'English',
        },
        {
          label:'Math',
          value:'Math',
        },
        {
          label:'Drama',
          value:'Drama',
        },
        {
          label:'TOK',
          value:'TOK',
        },
        {
          label:'Psychology',
          value:'Psychology',
        },
        {
          label:'Business Management',
          value:'Business Management',
        },
        {
          label:'Economics',
          value:'Economics',
        },
        {
          label:'Computer Science',
          value:'Computer Science',
        },
        {
          label:'Biology',
          value:'Biology',
        },
        {
          label:'Chemistry',
          value:'Chemistry',
        },
        {
          label:'Physics',
          value:'Physics',
        },
        {
          label:'Visual Art',
          value:'Visual Art',
        },
      ],
      staffList:[
        {
          avatar:'https://website.xycloud.net.cn/images/teacher-avatar.png',
          name:'Miranda Lin'
        },
        {
          avatar:'https://website.xycloud.net.cn/images/teacher-avatar.png',
          name:'Miranda Lin'
        },
        {
          avatar:'https://website.xycloud.net.cn/images/teacher-avatar.png',
          name:'Miranda Lin'
        },
        {
          avatar:'https://website.xycloud.net.cn/images/teacher-avatar.png',
          name:'Miranda Lin'
        },
        {
          avatar:'https://website.xycloud.net.cn/images/teacher-avatar.png',
          name:'Miranda Lin'
        },
        {
          avatar:'https://website.xycloud.net.cn/images/teacher-avatar.png',
          name:'Miranda Lin'
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
@forward "facultyStaff";
@forward "facultyStaff_mb";
</style> -->