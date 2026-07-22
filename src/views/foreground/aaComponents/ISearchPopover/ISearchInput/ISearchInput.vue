<template>
  <el-popover
    :visible="searchObj.visible"
    trigger="click"
    placement="bottom"
    :offset="40"
    width="60%"
  >
    <template #reference>
      <el-input
        ref="searchInputRef"
        v-model="searchObj.keyword"
        @blur="inputBlur"
        @focus="inputFocus"
        placeholder="What are you looking for?"
        clearable
      >
        <template #prefix>
          <div class="i-input-icon flex align-center h-6">
            <img
              class="h-full object-cover"
              src="../../../../../assets/images/search/searchInput.png"
              alt=""
            >
          </div>
        </template>
      </el-input>
    </template>

    <template #default>
      <div class="flex flex-col w-full">
        <div
          v-if="!searchObj.keyword && getHistory.length"
          class="flex-shrink-0 relative min-h-16 max-h-48 p-4 pl-12"
        >
          <div class="absolute left-4 top-4 h-4 w-4">
            <img
              class="h-full object-cover"
              src="../../../../../assets/images/search/searchHistory.png"
              alt=""
            >
          </div>
          <div class="grid grid-cols-5 gap-6">
            <div
              v-for="history in getHistory"
              :key="history.id"
              class="h-8 flex items-center bg-history-bg rounded-2xl p-2 cursor-pointer hover:scale-105 transition-all"
              @mousedown.prevent="selectHistory(history)"
            >
              <i class="iconfont icon-searchhistory text-2xl mr-2"></i>
              <span class="leading-8 translate-y-0.5 truncate">{{ history.content }}</span>
            </div>
          </div>
        </div>

        <div v-else-if="searchObj.keyword" class="search-result-list w-full flex-1 max-h-96 overflow-auto overscroll-none">
          <div class="flex justify-end px-4 py-2">
            <el-radio-group v-model="searchObj.scope" size="small">
              <el-radio-button label="All" value="all" />
              <el-radio-button label="News" value="notices" />
              <el-radio-button label="Community" value="community" />
            </el-radio-group>
          </div>

          <div v-loading="searchObj.loading" class="min-h-16">
            <template v-if="searchResult.length">
              <div
                v-for="result in searchResult"
                :key="result.id"
                class="search-result-item cursor-pointer flex justify-between text-base font-normal odd:bg-gray-100 p-4"
                @mousedown.prevent="goSearchPage(result)"
              >
                <div class="flex min-w-0">
                  <div class="w-4 h-4 mr-4 mt-1 flex-shrink-0">
                    <img
                      class="h-full object-cover"
                      src="../../../../../assets/images/search/searchResult.png"
                      alt=""
                    >
                  </div>
                  <div class="min-w-0">
                    <div class="flex items-center gap-2">
                      <span class="text-xs text-slate-500">{{ sourceLabel(result.source) }}</span>
                      <span class="hover:text-blue-950" v-html="result.displayTitle"></span>
                    </div>
                    <div class="text-sm text-slate-500 truncate mt-1" v-html="result.displaySnippet"></div>
                  </div>
                </div>
                <div class="rotate-315 flex-shrink-0 ml-4">
                  <i class="iconfont icon-goto"></i>
                </div>
              </div>
            </template>
            <div
              v-else-if="!searchObj.loading"
              class="search-result-empty flex items-center justify-center text-slate-500 h-16 p-4"
            >
              No results found
            </div>
          </div>
        </div>
      </div>
    </template>
  </el-popover>
</template>

<script lang="ts">
import {defineComponent, onBeforeUnmount, onMounted, reactive, ref, toRefs, watch} from 'vue'
import {useSearchHistory} from "@/hooks/useSearchHistory";
import {nanoid} from "nanoid";
import {router} from "@/router";
import _ from "lodash";
import {HistoryRecord} from "@/store/modules/search_history";
import IntelligentHighlighter from "@/utils/tools/intelligentHighlighter";
import {SearchResult, searchSite} from "@/apis/foreground";
import {useArticle} from "@/hooks/useArticle";

type DisplaySearchResult = SearchResult & {
  displayTitle: string;
  displaySnippet: string;
}

export default defineComponent({
  name: "ISearchInput",
  emits: ['closePopover'],
  setup(_props, {emit}) {
    const {getHistory, pushHistory} = useSearchHistory()
    const {setCurrentArticle} = useArticle()
    const searchInputRef = ref<any>()
    let activeRequest = 0

    const state = reactive({
      searchObj: {
        visible: false,
        keyword: "",
        scope: "all",
        loading: false,
      },
      searchResult: [] as DisplaySearchResult[],
    })

    const executeSearch = _.debounce(async () => {
      const keyword = state.searchObj.keyword.trim()
      const requestId = ++activeRequest
      if (!keyword) {
        state.searchResult = []
        state.searchObj.loading = false
        return
      }

      state.searchObj.visible = true
      state.searchObj.loading = true
      try {
        const response = await searchSite(keyword, state.searchObj.scope)
        if (requestId !== activeRequest) return
        const results = response.status === 'success' ? response.data.results : []
        state.searchResult = results.map((result: SearchResult) => ({
          ...result,
          displayTitle: highlightKeywords(escapeHtml(result.title), keyword),
          displaySnippet: highlightKeywords(escapeHtml(result.snippet), keyword),
        }))
      } catch (_error) {
        if (requestId === activeRequest) state.searchResult = []
      } finally {
        if (requestId === activeRequest) state.searchObj.loading = false
      }
    }, 300)

    watch(
      () => [state.searchObj.keyword, state.searchObj.scope],
      () => executeSearch(),
    )

    const goSearchPage = (item: DisplaySearchResult) => {
      pushHistory({
        id: nanoid(8),
        content: state.searchObj.keyword.trim(),
        createTime: new Date(),
      })
      if (item.source === 'notice' && item.article) {
        setCurrentArticle(item.article)
        router.push({name: 'Article'})
      } else {
        router.push({name: 'Community'})
      }
      state.searchObj.visible = false
      emit('closePopover')
    }

    function escapeHtml(text: string) {
      return (text || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
    }

    function highlightKeywords(text: string, keywords: string) {
      return new IntelligentHighlighter({
        highlightTag: 'span',
        highlightClass: 'underline text-search-color',
        caseSensitive: false,
      }).highlight(text, keywords)
    }

    const sourceLabel = (source: SearchResult['source']) => {
      return source === 'notice' ? 'News' : 'Community'
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

    onMounted(() => searchInputRef.value?.focus())
    onBeforeUnmount(() => executeSearch.cancel())

    return {
      getHistory,
      searchInputRef,
      ...toRefs(state),
      inputBlur,
      inputFocus,
      goSearchPage,
      selectHistory,
      sourceLabel,
    }
  },
})
</script>

<style scoped lang="scss">
@forward "ISearchInput";
</style>
