<template>
  <ContentLayout>
    <div class="search-page w-full flex flex-col items-center pt-32">
      <div class="search-page-input w-1/3">
        <div class="i-search-container flex flex-col items-center text-white w-full">
          <div class="i-search-header mb-8">
            <div class="i-search-header__title text-4xl text-title-grey">Search UCS IB</div>
          </div>
          <div class="i-search-body w-full mb-4">
            <ISearchInput></ISearchInput>
          </div>
          <div class="i-search-footer w-full flex justify-end pr-8 pl-8 text-title-grey">
            <div class="i-search-item i-search-history cursor-pointer">
              <i class="iconfont icon-searchhistory mr-2"></i>
              <span>History</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ContentLayout>
</template>
<script lang="ts">
import {defineComponent, onMounted, reactive, toRefs} from 'vue'
import ContentLayout from "@/views/foreground/aaComponents/ContentLayout/ContentLayout.vue";
import {router} from '@/router';
import ISearchInput from "@/views/foreground/aaComponents/ISearchPopover/ISearchInput/ISearchInput.vue";

export default defineComponent({
  name: "search",
  components: {ISearchInput, ContentLayout},
  setup() {
    const state = reactive({
      searchObj: {
        keyword: ''
      }
    })

    onMounted(() => {
      if (router.currentRoute.value.query) {
        const {keyword} = router.currentRoute.value.query
        // state.searchObj.keyword = keyword
      }
    })
    return {
      ...toRefs(state)
    }
  }
})
</script>
<style scoped lang="scss">
@forward "search";
</style>