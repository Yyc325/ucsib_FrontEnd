<template>
  <div class="home" v-loading="loadingData">
    <el-container class="home_container">
      <section class="home_section main">
        <section class="panel-collection" data-modular-content-collection="">
          <section
            class="panel theme--white"
            data-type="section"
            id="Beyond east or west, for all humanity"
            data-modular-content=""
            data-js="panel"
            data-index="3"
          >
            <header>
              <h2 class="center header-text">{{ $t('home.slogan') }}</h2>
            </header>
            <section
              class="panel theme--white"
              data-type="position-stmt"
              id="position-stmt-1"
              data-width="full"
            >
              <p>{{ $t('home.commitment1') }}</p>
              <p>
                {{ $t('home.commitment2') }}
              </p>
            </section>
            <!-- panel  -->
            <section
              class="panel"
              data-type="call-to-action"
              id="more-about-ucs"
            >
              <li class=button @click="$router.push('/about')">{{ $t('home.moreAbout')}}</li>
            </section>

            <section class="panel" data-type="call-to-action">
              <div class="activities-wrapper">
                <div class="activities activitie-1" :style="{backgroundImage: `url('${about_news[0]?about_news[0].cover:'https://website.xycloud.net.cn/images/ChineseCultureWeek.png'}')`}">
                  <div class="info" @click="toDetail(about_news[0])">
                    <div class="title">{{ about_news[0]?about_news[0].title:"Chinese Culture Week" }}</div>
                    <div class="desc">
                        {{ about_news[0]?about_news[0].subtitle:"Bridging the World with Chinese Culture" }}
                    </div>
                  </div>
                </div>
                <div class="activities-wrapper-right">
                  <div class="activities activitie-2" :style="{backgroundImage: `url('${about_news[1]?about_news[1].cover:'https://website.xycloud.net.cn/images/Basketball.png'}')`}">
                    <div class="info" @click="toDetail(about_news[1])">
                      <div class="title">{{ about_news[1]?about_news[1].title:"10.29 Basketball Match" }}</div>
                      <div class="desc">
                        {{ about_news[1]?about_news[1].subtitle:"Old vs. Young—Who Runs the Court?" }}
                      </div>
                    </div>
                  </div>
                  <div class="activities activitie-3" :style="{backgroundImage: `url('${about_news[2]?about_news[2].cover:'https://website.xycloud.net.cn/images/Halloween1.png'}')`}">
                    <div class="info" @click="toDetail(about_news[2])">
                      <div class="title">{{ about_news[2]?about_news[2].title:"10.30 Halloween" }}</div>
                      <div class="desc">
                        {{ about_news[2]?about_news[2].subtitle:"Tonight, subvert the daily" }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <!-- panel More about UCS -->
          </section>
          <!-- panel Beyond east or west, for all humanity -->
        </section>
      </section>
    </el-container>
  </div>
</template>

<script lang="ts">
import {
  reactive,
  toRefs,
  onMounted,
  defineComponent,
  ref,
  nextTick,
} from "vue";
import About from "../about/about.vue";
import {queryNoticeByLocation} from "@/apis/backstage/notice";
import {useArticle} from "@/hooks/useArticle";
import {router} from "@/router";

export default defineComponent({
  name: "Home",
  components: {},
  setup() {
    const {setCurrentArticle} = useArticle()
    const state = reactive({
      about_news:[] as any,
      loadingData:false
    })
    const queryPublishedArticle = ()=>{
      state.loadingData = true
      queryNoticeByLocation({publish_location:'About'}).then(res=>{
        if(res.status==='success'&&res.data.length){
          state.about_news = handleRepeatPositionNotice(res.data)
        }else{
          state.about_news = new Array(3)
        }
        state.loadingData = false
      }).catch(()=>{
          state.about_news = new Array(3)
          state.loadingData = false
      });
    }
    const handleRepeatPositionNotice = (notices: any)=>{
      const map = new Map()
      for (const notice of notices) {
        if(map.get(notice.position_index)){
          const old_notice = map.get(notice.position_index)
          const old_create_time = new Date(old_notice.create_time).getTime()
          const cur_create_time = new Date(notice.create_time).getTime()
          if(cur_create_time > old_create_time){
            map.set(notice.position_index,notice)
          }
        }else{
          map.set(notice.position_index,notice)
        }
      }
      return Array.from(map.values())
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
      toDetail
    };
  },
});
</script>
<style lang="scss" scoped>
@forward "./home";
@forward "./home_mb";
</style>
