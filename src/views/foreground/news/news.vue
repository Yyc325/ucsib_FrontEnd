<template>
  <div class="news-container" v-loading="loadingData">
    <div class="news-header">
      <div class="news-header-title">News</div>
      <div class="news-header-subtitle">Explore.Discover.Belong</div>
    </div>
    <div class="news-content">
      <div class="news-content-left">
        <div class="i-carousel">
          <div class="i-carousel-wrapper" ref="carouselWrapperRef">
            <div class="previous-btn" @click="handlePrevious">
              <el-icon><ArrowLeft /></el-icon>
            </div>
            <div class="next-btn" @click="handleNext">
              <el-icon><ArrowRight /></el-icon>
            </div>
            <div class="i-carousel-content" :style="{transform: `translateX(-${380*isActiveDot}px)`}">
              <div class="i-carousel-item" v-for="(item,index) in newsImage" :key="index" :style="{
              backgroundImage: `url(${item.cover})`,
            }" :class="{'is-focus':isFocusItem===item.url}" @click="handleFocus(item)">
                <div class="i-carousel-desc" @click="toDetail(item)">
                  <span class="i-carousel-desc_date">{{item.title}}</span>
                  <span class="i-carousel-desc_content">{{item.subtitle}}</span>
                </div>
              </div>
            </div>
          </div>
<!--          <div class="i-carousel-trigger">-->
<!--            <div class="i-carousel-trigger__dot" v-for="(item,index) in newsImage" :key="'dot'+index" :class="{-->
<!--              'is-active':isActiveDot==index-->
<!--            }"></div>-->
<!--          </div>-->
        </div>
<!--        <el-carousel type="card" height="508px">-->
<!--          <el-carousel-item v-for="(item,index) in newsImage"  :key="index">-->
<!--            <div class="i-carousel-item" :style="{-->
<!--                          backgroundImage: `url(${item.url})`,-->
<!--                        }">-->
<!--              <div class="i-carousel-subtitle">-->
<!--                <span class="i-carousel-desc_date">{{ item.title }}</span>-->
<!--                <span class="i-carousel-desc_content">{{ item.subtitle }}</span>-->
<!--              </div>-->
<!--            </div>-->
<!--          </el-carousel-item>-->
<!--        </el-carousel>-->
      </div>
      <div class="news-content-right">
        <div class="i-carousel-item" v-for="(item,index) in newsImage" :key="index" :style="{
              backgroundImage: `url(${item.cover})`,
            }">
          <div class="i-carousel-desc" @click="toDetail(item)">
            <span class="i-carousel-desc_date">{{ item.title }}</span>
            <span class="i-carousel-desc_content">{{ item.subtitle }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, ref, toRefs} from 'vue';
import {ArrowRight,ArrowLeft} from '@element-plus/icons-vue'
import {ElMessage} from "element-plus";
import {queryNoticeByLocation} from "@/apis/backstage/notice";
import {router} from "@/router";
import {useArticle} from "@/hooks/useArticle";

export default defineComponent({
  name: 'News',
  components:{
    ArrowRight,
    ArrowLeft
  },
  setup() {
    const {setCurrentArticle} = useArticle()
    const state = reactive({
      carouselWrapperRef:ref(),
      loadingData:false,
      newsImage: [] as any,
      isActiveDot: 0,
      isFocusItem:""
    })
    // 处理轮播图 单项移动
    const handleFocus = (item:any)=>{
      state.isFocusItem = item.cover
    }
    // 处理轮播图 向前
    const handlePrevious = ()=>{
      if(state.isActiveDot<=0){
        return
      }
      state.isActiveDot = state.isActiveDot-1
    }
    // 处理轮播图 向后
    const handleNext = ()=>{
      if(state.isActiveDot>=state.newsImage.length-2){
        return
      }
      state.isActiveDot = state.isActiveDot+1
    }
    const queryPublishedArticle = ()=>{
      state.loadingData = true
      queryNoticeByLocation({publish_location:'News'}).then(res=>{
        if(res.status==='success'){
          if(res.data.length){
            state.newsImage = res.data.map(vm=> {
              vm.position = 'left'
              return vm
            })
          }else{
            state.newsImage = [
              {
                title: "4/16",
                subtitle: "IB Collaborative Sciences Project",
                position: "left",
                cover: 'https://website.xycloud.net.cn/images/about2.png'
              },
              {
                title: "3/24 - 3/28",
                subtitle: "Chinese Culture Week",
                position: "left",
                cover: 'https://website.xycloud.net.cn/images/ChineseCultureWeek.png'
              },
              {
                title: "10/11",
                subtitle: "Front Door Decoration",
                position: "left",
                cover: 'https://website.xycloud.net.cn/images/front_door_decoration.jpg'
              },
              {
                title: "11/25",
                subtitle: "Debates Competition",
                position: "left",
                cover: 'https://website.xycloud.net.cn/images/debates_competition.jpg'
              },
              {
                title: "10/29",
                subtitle: "Basketball Games",
                position: "right",
                cover: 'https://website.xycloud.net.cn/images/basketball.jpg'
              },
              {
                title: "10/01",
                subtitle: "E-sports",
                position: "left",
                cover: 'https://website.xycloud.net.cn/images/e-sport.jpg'
              },
            ]
          }
        }else{
        }
        state.loadingData = false
      })
    }
    const toDetail = (about: any)=>{
      setCurrentArticle(about)
      if(about.content){
        router.push({
          name:'Article'
        })
      }
    }
    queryPublishedArticle()
    return {
      ...toRefs(state),
      handleFocus,
      handlePrevious,
      handleNext,
      toDetail
    };
  },
});
</script>

<style lang="scss" scoped>
@forward './news.scss';
@forward "news_mb";
</style>