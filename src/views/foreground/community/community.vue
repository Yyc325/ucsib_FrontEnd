<template>
  <div class="community">
    <main class="community-main">
      <header class="community-header">
        <section class="community-header-section left">
          <div class="community-header-title">UCS IB<br/>
            Community
          </div>
          <div class="community-header-desc">
            UCS IB is beyond being a division of Ulink; it is a close-knit community where academic excellence and care
            intertwine, creating a place where your ideas are valued and your voice matters.
          </div>
        </section>
        <section class="community-header-section right">
          <div class="community-header-cover">
            <img src="https://website.xycloud.net.cn/images/Halloween1.png" alt="">
          </div>
        </section>
      </header>
      <section class="community-container">
        <ContentLayout>
          <section class="community-section">
            <div class="community-section-header">Clubs & Organizations</div>
            <div class="community-section-content">
              <div class="club-photo-wall">
                <div class="club-photo-wall-section info">
                  <div class="club-photo-wall-intro">Here, you will find a wide array of clubs founded by IB students,
                    who hone their skills in diverse fields and grow into capable club leaders.
                  </div>
                  <div class="club-photo-wall-more">Explore More</div>
                </div>
                <div class="club-photo-wall-section photos">
                  <div class="club-photo-card" v-for="(photo,index) in photos" :key="index">
                    <img :src="photo.url" alt="">
                  </div>
                </div>
              </div>
              <div class="club-list">
                <div class="club-list-header">
                  Club List
                </div>
                <div class="club-list-body">
                  <div class="club-item" v-for="(club,index) in clubList" :key="index">
                    {{ club.label }}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section class="community-section">
            <div class="community-section-header">Student Voices </div>
            <div class="community-section-content">
              <div class="community-section-comment">
                <div class="comment-display">
                  <div class="comment-display-card" v-for="(comment,index) in commentList" :key="index"
                       :style="comment.style">
                    <div class="comment-display-card-dot" :style="{zIndex:index,...comment.dotStyle}"></div>
                    <div class="comment-display-card-header">
                      <div class="comment-display-card-avatar"></div>
                      <div class="comment-display-card-author">{{comment.author}}</div>
                    </div>
                    <div class="comment-display-card-content">xxxxxxx</div>
                  </div>
                </div>
                <div class="comment-input">
                  <div class="comment-input-tip">Share your thoughts for UCS IB…</div>
                  <div class="comment-input-inner">
                    <el-input v-model="shareContent" type="textarea" resize="none"></el-input>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ContentLayout>
      </section>
    </main>
  </div>
</template>
<script lang="ts">
import {defineComponent, reactive, toRefs} from 'vue'
import ContentLayout from "@/views/foreground/aaComponents/ContentLayout/ContentLayout.vue";

export default defineComponent({
  name: "community",
  components: {ContentLayout},
  setup() {
    const state = reactive({
      shareContent:"",
      photos: [
        {
          url: 'https://website.xycloud.net.cn/images/club_1.jpg'
        },
        {
          url: 'https://website.xycloud.net.cn/images/club_2.jpg'
        },
        {
          url: 'https://website.xycloud.net.cn/images/club_3.jpg'
        },
        {
          url: 'https://website.xycloud.net.cn/images/club_4.jpg'
        },
        {
          url: 'https://website.xycloud.net.cn/images/club_5.jpg'
        },
        {
          url: 'https://website.xycloud.net.cn/images/club-6.jpg'
        },
        {
          url: 'https://website.xycloud.net.cn/images/club_7.jpg'
        },
      ],
      clubList: [
        {
          label: 'Expreeso',
        },
        {
          label: 'Debate Club',
        },
        {
          label: 'Natural Photography ',
        },
        {
          label: 'Dataquake',
        },
        {
          label: 'First Aid Club',
        },
        {
          label: 'Pearl Luminosity Society',
        },
        {
          label: 'ClubSkyLens Club',
        },
        {
          label: 'Ocean Club',
        },
        {
          label: 'DEI Club',
        },
        {
          label: 'Linguistic Club',
        },
        {
          label: 'Nanfeng Magazine Club',
        },
        {
          label: 'Chinese Traditional Orchestra Club',
        },
        {
          label: 'Traditional Game Club',
        },
        {
          label: 'Law Society',
        },
        {
          label: 'Yoga & Meditation Club',
        },
        {
          label: 'Ulink Chemistry Club',
        },
      ],
      commentList: [
        {
          author: 'XXX',
          avatar: "",
          style: {
            top:'3.75rem',
            left:'3.75rem',
            width: "16.75rem",
            height: "14rem",
            background: "#E5C8C8",
            rotate:"10deg"
          },
          dotStyle: {
            width:'1rem',
            height:'1rem'
          }
        },
        {
          author: 'XXX',
          avatar: "",
          style: {
            top:'13.875rem',
            left:'14rem',
            width: "15.125rem",
            height: "12.75",
            background: "#8899BE",
            rotate:"-15deg"
          },
          dotStyle: {
            width:'0.5rem',
            height:'0.5rem'
          }
        },
        {
          author: 'XXX',
          avatar: "",
          style: {
            top:'22.5rem',
            left:'3.75rem',
            width: "16.75rem",
            height: "14rem",
            background: "#D3B4B4",
            rotate:"8deg",
            borderRadius:'1.5rem'
          },
          dotStyle: {
            width:'0.75rem',
            height:'0.75rem'
          }
        },
        {
          author: 'XXX',
          avatar: "",
          style: {
            top:'5rem',
            left:'28.75rem',
            width: "16.75rem",
            height: "12.75rem",
            background: "#D6B3B3",
            rotate:"2deg"
          },
          dotStyle: {
            width:'1rem',
            height:'1rem'
          }
        },
        {
          author: 'XXX',
          avatar: "",
          style: {
            top:'22.5rem',
            left:'28.75rem',
            width: "16.75rem",
            height: "14rem",
            background: "#8499BA",
            rotate:"-2deg"
          },
          dotStyle: {
            width:'1rem',
            height:'1rem'
          }
        },
        {
          author: 'XXX',
          avatar: "",
          style: {
            top:'13.375rem',
            left:'42.75rem',
            width: "20.375rem",
            height: "11.5rem",
            background: "#92ABCC",
            rotate:"-8deg",
            borderRadius: "3rem"
          },
          dotStyle: {
            width:'1rem',
            height:'1rem'
          }
        },
        {
          author: 'XXX',
          avatar: "",
          style: {
            top:'24.875rem',
            left:'53.75rem',
            width: "16.625rem",
            height: "11.5rem",
            background: "#E3C4C4",
            rotate:"10deg"
          },
          dotStyle: {
            width:'1rem',
            height:'1rem'
          }
        },
        {
          author: 'XXX',
          avatar: "",
          style: {
            top:'24.5rem',
            left:'68.5rem',
            width: "16.75rem",
            height: "14rem",
            background: "#8194B9",
            rotate:"-10deg"
          },
          dotStyle: {
            width:'1rem',
            height:'1rem'
          }
        },
        {
          author: 'XXX',
          avatar: "",
          style: {
            top:'4.5rem',
            left:'62.25rem',
            width: "23rem",
            height: "18.5rem",
            background: "#E1CECE",
            rotate:"8deg"
          },
          dotStyle: {
            width:'1rem',
            height:'1rem'
          }
        },
      ]
    })
    return {
      ...toRefs(state)
    }
  }
})
</script>

<style scoped lang="scss">
@forward "community";
@forward "community_mb";
</style>