<template>
  <el-popover :visible="searchObj.visible" trigger="click" placement="bottom" :offset="40"
              width="60%">
    <template #reference>
      <el-input ref="searchInputRef" v-model="searchObj.keyword"
                @blur="inputBlur"
                @focus="inputFocus"
                placeholder="What are you looking for？"
                clearable>
        <template #prefix>
          <div class="i-input-icon flex align-center h-6">
            <img class="h-full object-cover" src="../../../../../assets/images/search/searchInput.png" alt="">
          </div>
        </template>
      </el-input>
    </template>
    <template #default>
      <div class="flex flex-col w-full">
        <div class="flex-shrink-0 relative min-h-16 max-h-48 p-4 pl-12" v-if="!searchObj.keyword &&getHistory.length">
          <div class="absolute left-4 top-4 h-4 w-4">
            <img class="h-full object-cover" src="../../../../../assets/images/search/searchHistory.png" alt="">
          </div>
          <div class="grid grid-cols-5 gap-6">
            <div
              class="h-8 flex items-center bg-history-bg rounded-2xl p-2 cursor-pointer hover:scale-105 transition-all"
              v-for="history in getHistory" :key="history.id" @click="selectHistory(history)">
              <i class="iconfont icon-searchhistory text-2xl mr-2"></i>
              <span class="leading-8 translate-y-0.5 truncate">{{ history.content }}</span>
            </div>
          </div>
        </div>
        <div class="search-result-list w-full flex-1 max-h-80 overflow-auto overscroll-none"
             v-else-if="searchObj.keyword">
          <template v-if="searchResult.length">
            <div class="search-result-item cursor-pointer flex justify-between text-lg font-normal odd:bg-gray-100 p-4"
                 v-for="(result,index) in searchResult"
                 :key="result.id" @click="goSearchPage(result)">
              <div class="flex items-center">
                <div class="w-4 h-4 mr-4">
                  <img class="h-full object-cover" src="../../../../../assets/images/search/searchResult.png" alt="">
                </div>
                <span class=" hover:text-blue-950" v-html="result.displayContent"></span>
              </div>
              <div class="rotate-315">
                <i class="iconfont icon-goto"></i>
              </div>
            </div>
          </template>
          <div class="search-result-empty flex items-center justify-center text-slate-500 h-16 p-4" v-else>
            <div class="search-result-empty-tip">
              暂无相关数据
            </div>
          </div>
        </div>
      </div>
    </template>
  </el-popover>
</template>
<script lang="ts">
import {defineComponent, nextTick, onMounted, PropType, reactive, ref, toRefs, watch} from 'vue'
import {useSearchHistory} from "@/hooks/useSearchHistory";
import {nanoid} from "nanoid";
import {router} from "@/router";
import _ from "lodash";
import {HistoryRecord} from "@/store/modules/search_history";
import IntelligentHighlighter from "@/utils/tools/intelligentHighlighter";

export default defineComponent({
  name: "ISearchInput",
  props: {
    disabled: {
      type: Boolean as PropType<boolean>,
      default: true
    },
  },
  emits: ['closePopover'],
  setup(props, {emit, expose}) {
    const {getHistory, pushHistory} = useSearchHistory()
    const searchInputRef = ref<any>()
    const state = reactive({
      searchObj: {
        visible: false,
        keyword: ""
      },
      searchResult: [] as any[]
    })
    watch(() => state.searchObj.keyword, _.debounce((val: string) => {
        !state.searchObj.visible &&(state.searchObj.visible = true)
        state.searchResult = [
          {
            id: nanoid(),
            title: 'What is the IB Diploma Programme and what is its educational philosophy?'
          },
          {
            id: nanoid(),
            title: 'As a parent, how can I best support my child through the IB Diploma programme?'
          },
          {
            id: nanoid(),
            title: 'What are the costs associated with taking the IB Diploma programme?'
          },
          {
            id: nanoid(),
            title: 'How is the total IB Diploma programme score of 45 points calculated?'
          },
          {
            id: nanoid(),
            title: 'How can I effectively manage my time and stress during the IB Diploma programme ?'
          },
        ].map((vm: any) => {
          vm.displayContent = highlightKeywords(vm.title, val)
          return vm
        })
      },
      300
    ))
    const goSearchPage = (item: any) => {
      pushHistory({
        id: nanoid(8),
        content: item.title,
        createTime: new Date()
      })
      // router.push({
      //   name: 'Search',
      //   query: {
      //     keyword: state.searchObj.keyword
      //   }
      // })
      emit('closePopover')
    }

    function highlightKeywords(text: string, keywords: string | string[], caseSensitive = true) {
      const highlighter = new IntelligentHighlighter({
        highlightTag: 'span',
        highlightClass: 'underline text-search-color',
        caseSensitive: false
      });
      const result = highlighter.highlight(text, keywords)
      return result;

    }

    const selectHistory = (history: HistoryRecord) => {
      searchInputRef.value?.focus()
      state.searchObj.keyword = history.content
    }
    const inputBlur = () => {
      state.searchObj.visible = false
    }
    const inputFocus = () => {
      state.searchObj.visible = true
    }
    onMounted(() => {
      searchInputRef.value?.focus()
    })
    return {
      getHistory,
      searchInputRef,
      ...toRefs(state),
      inputBlur,
      inputFocus,
      goSearchPage,
      selectHistory
    }
  }
})
</script>

<style scoped lang="scss">
@forward "ISearchInput";
</style>