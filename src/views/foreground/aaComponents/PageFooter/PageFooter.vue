<template>
  <div class="page-footer">
    <div class="page-footer__inner">
      <div class="page-footer-name">UCS IB</div>
      <div class="page-footer-quick">
        <div class="page-footer-quick-item" @click="searchUCSIB">
          Search UCS
        </div>
        <div class="spline"></div>
        <div class="page-footer-quick-item" @click="$router.push('/about')">About us</div>
        <div class="spline"></div>
        <div class="page-footer-quick-item">Enrollment information</div>
      </div>
      <div class="page-footer-logo">
        <div class="page-footer-logo__image">
          <img
            src="https://www.ulink.cn/wp-content/uploads/2024/11/cropped-Corporate-logo-%E9%9B%86%E5%9B%A2%E6%A0%87%E8%AF%86a-300x300.png"
            alt="">
        </div>
        <div class="page-footer-logo__title">
          ULINK
        </div>
      </div>
    </div>

    <div class="page-footer__record">
      <img src="https://website.xycloud.net.cn/images/ip_beian.png" alt="">
      <a href="https://beian.miit.gov.cn/" target="_blank">沪ICP备2025116303号-1</a>
    </div>
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "PageFooter",
  emits:['openSearch'],
  setup(props,{emit}){
    const searchUCSIB = ()=>{
      emit('openSearch')
    }
    return {
      searchUCSIB
    }
  }
})
</script>

<style scoped lang="scss">
@forward "PageFooter";
</style>