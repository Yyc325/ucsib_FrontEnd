<template>
  <div class="i-search-popover fixed top-0 left-0 w-screen h-screen" v-if="popoverObj.visible">
    <div class="i-search-popover-body w-1/3 ml-auto mr-auto mt-52">
      <div class="i-search-container flex flex-col items-center text-white w-full">
        <div class="i-search-close absolute right-0 top-3.125 flex items-center justify-center cursor-pointer"
             @click="closePopover">
          <i class="iconfont icon-close mr-2"></i>
          <span>Close</span>
        </div>
        <div class="i-search-header">
          <div class="i-search-header__title">Search UCS IB</div>
        </div>
        <div class="i-search-body">
          <ISearchInput :disabled="disabled" @closePopover="closePopover"></ISearchInput>
        </div>
        <div class="i-search-footer flex justify-end pr-8 pl-8">
<!--          <div class="i-search-item i-search-help mr-4 cursor-pointer">-->
<!--            <i class="iconfont icon-Help mr-2"></i>-->
<!--            <span>Help</span>-->
<!--          </div>-->
          <div class="i-search-item i-search-history cursor-pointer">
            <i class="iconfont icon-searchhistory mr-2"></i>
            <span>History</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {defineComponent, nextTick, onMounted, PropType, reactive, ref, toRefs, watch} from 'vue'
import ISearchInput from "@/views/foreground/aaComponents/ISearchPopover/ISearchInput/ISearchInput.vue";

export default defineComponent({
  name: "ISearchPopover",
  components: {ISearchInput},
  props: {
    disabled: {
      type: Boolean as PropType<boolean>,
      default: true
    },
  },
  setup(props, {emit, expose}) {
    const state = reactive({
      popoverObj: {
        visible: false
      },
    })

    const setPopoverVisible = () => {
      state.popoverObj.visible = false
    }
    const openPopover = () => {
      state.popoverObj.visible = true
    }
    const closePopover = () => {
      state.popoverObj.visible = false
    }

    const ShortcutKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closePopover()
      }
      if (event.shiftKey && event.ctrlKey && event.key === 'F') {
        openPopover()
      }
    }
    onMounted(() => {
      window.addEventListener('keydown', ShortcutKey)
    })
    expose({
      openPopover
    })
    return {
      ...toRefs(state),
      setPopoverVisible,
      closePopover

    }
  }
})
</script>
<style scoped lang="scss">
@forward "ISearchPopover";
</style>