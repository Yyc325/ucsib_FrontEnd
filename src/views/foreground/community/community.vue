<template>
  <div class="community">
    <main class="community-main">
      <header class="community-header">
        <section class="community-header-section left">
          <div class="community-header-title">UCS IB<br>Community</div>
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
                  <div class="club-photo-wall-intro">
                    Here, you will find a wide array of clubs founded by IB students, who hone their skills in diverse
                    fields and grow into capable club leaders.
                  </div>
                  <div class="club-photo-wall-more">Explore More</div>
                </div>
                <div class="club-photo-wall-section photos">
                  <div v-for="(photo, index) in photos" :key="index" class="club-photo-card">
                    <img :src="photo.url" alt="">
                  </div>
                </div>
              </div>
              <div class="club-list">
                <div class="club-list-header">Club List</div>
                <div class="club-list-body">
                  <div v-for="club in clubList" :key="club.label" class="club-item">{{ club.label }}</div>
                </div>
              </div>
            </div>
          </section>

          <section class="community-section">
            <div class="community-section-header">Student Voices</div>
            <div class="community-section-content">
              <div class="community-section-comment">
                <div class="comment-display" v-loading="commentsLoading">
                  <div
                    v-for="(comment, index) in commentList"
                    :key="comment.id"
                    class="comment-display-card"
                    :style="comment.style"
                  >
                    <div class="comment-display-card-dot" :style="{zIndex: index, ...comment.dotStyle}"></div>
                    <div class="comment-display-card-header">
                      <div class="comment-display-card-avatar"></div>
                      <div class="comment-display-card-author">
                        <span>{{ comment.author }}</span>
                        <small>{{ formatTime(comment.created_at) }}</small>
                      </div>
                    </div>
                    <div class="comment-display-card-content">{{ comment.content }}</div>
                  </div>
                  <div v-if="!commentsLoading && !commentList.length" class="comment-empty">No community posts yet</div>
                </div>

                <div class="comment-input">
                  <div class="comment-input-tip">Share your thoughts for UCS IB...</div>
                  <div class="comment-input-inner">
                    <el-input
                      v-model="shareContent"
                      type="textarea"
                      resize="none"
                      maxlength="500"
                      show-word-limit
                    />
                  </div>
                  <div class="comment-input-footer">
                    <el-button type="primary" :loading="posting" @click="submitComment">
                      <el-icon><Promotion /></el-icon>
                      Post
                    </el-button>
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
import {defineComponent, onMounted, reactive, toRefs} from 'vue'
import {ElMessage} from 'element-plus'
import {Promotion} from '@element-plus/icons-vue'
import ContentLayout from "@/views/foreground/aaComponents/ContentLayout/ContentLayout.vue";
import {
  CommunityComment,
  createCommunityComment,
  getCommunityComments,
} from '@/apis/foreground'
import {useUser} from '@/hooks/useUser'

const NOTE_LAYOUTS = [
  {top: '3.75rem', left: '3.75rem', width: '16.75rem', height: '14rem', background: '#A75D68', rotate: '10deg'},
  {top: '13.875rem', left: '14rem', width: '15.125rem', height: '12.75rem', background: '#526A96', rotate: '-15deg'},
  {top: '22.5rem', left: '3.75rem', width: '16.75rem', height: '14rem', background: '#B76E79', rotate: '8deg'},
  {top: '5rem', left: '28.75rem', width: '16.75rem', height: '12.75rem', background: '#9D5965', rotate: '2deg'},
  {top: '22.5rem', left: '28.75rem', width: '16.75rem', height: '14rem', background: '#4F6B98', rotate: '-2deg'},
  {top: '13.375rem', left: '42.75rem', width: '20.375rem', height: '11.5rem', background: '#5879A7', rotate: '-8deg'},
  {top: '24.875rem', left: '53.75rem', width: '16.625rem', height: '11.5rem', background: '#A96872', rotate: '10deg'},
  {top: '24.5rem', left: '68.5rem', width: '16.75rem', height: '14rem', background: '#49638E', rotate: '-10deg'},
  {top: '4.5rem', left: '62.25rem', width: '23rem', height: '18.5rem', background: '#97606B', rotate: '8deg'},
]

type PositionedComment = CommunityComment & {
  style: Record<string, string>
  dotStyle: Record<string, string>
}

export default defineComponent({
  name: 'Community',
  components: {ContentLayout, Promotion},
  setup() {
    const {getToken} = useUser()
    const state = reactive({
      shareContent: '',
      commentsLoading: false,
      posting: false,
      commentList: [] as PositionedComment[],
      photos: [
        {url: 'https://website.xycloud.net.cn/images/club_1.jpg'},
        {url: 'https://website.xycloud.net.cn/images/club_2.jpg'},
        {url: 'https://website.xycloud.net.cn/images/club_3.jpg'},
        {url: 'https://website.xycloud.net.cn/images/club_4.jpg'},
        {url: 'https://website.xycloud.net.cn/images/club_5.jpg'},
        {url: 'https://website.xycloud.net.cn/images/club-6.jpg'},
        {url: 'https://website.xycloud.net.cn/images/club_7.jpg'},
      ],
      clubList: [
        {label: 'Expreeso'},
        {label: 'Debate Club'},
        {label: 'Natural Photography'},
        {label: 'Dataquake'},
        {label: 'First Aid Club'},
        {label: 'Pearl Luminosity Society'},
        {label: 'ClubSkyLens Club'},
        {label: 'Ocean Club'},
        {label: 'DEI Club'},
        {label: 'Linguistic Club'},
        {label: 'Nanfeng Magazine Club'},
        {label: 'Chinese Traditional Orchestra Club'},
        {label: 'Traditional Game Club'},
        {label: 'Law Society'},
        {label: 'Yoga & Meditation Club'},
        {label: 'Ulink Chemistry Club'},
      ],
    })

    const positionComments = (comments: CommunityComment[]) => {
      state.commentList = comments.slice(0, NOTE_LAYOUTS.length).map((comment, index) => ({
        ...comment,
        style: NOTE_LAYOUTS[index],
        dotStyle: {width: index === 1 ? '0.5rem' : '1rem', height: index === 1 ? '0.5rem' : '1rem'},
      }))
    }

    const loadComments = async () => {
      state.commentsLoading = true
      try {
        const response = await getCommunityComments(NOTE_LAYOUTS.length)
        if (response.status === 'success') positionComments(response.data)
      } catch (_error) {
        ElMessage.warning('Unable to load community posts')
      } finally {
        state.commentsLoading = false
      }
    }

    const submitComment = async () => {
      const content = state.shareContent.trim()
      if (!getToken.value) {
        ElMessage.warning('Please sign in before posting')
        return
      }
      if (content.length < 2) {
        ElMessage.warning('Your post must contain at least 2 characters')
        return
      }

      state.posting = true
      try {
        const response = await createCommunityComment(content)
        if (response.status === 'success') {
          positionComments([response.data, ...state.commentList])
          state.shareContent = ''
          ElMessage.success('Posted')
        }
      } catch (_error) {
        ElMessage.warning('Unable to publish this post')
      } finally {
        state.posting = false
      }
    }

    const formatTime = (value: string) => {
      if (!value) return ''
      return new Intl.DateTimeFormat('en-GB', {
        month: 'short',
        day: 'numeric',
      }).format(new Date(value))
    }

    onMounted(loadComments)

    return {
      ...toRefs(state),
      submitComment,
      formatTime,
    }
  },
})
</script>

<style scoped lang="scss">
@forward "community";
@forward "community_mb";
</style>
