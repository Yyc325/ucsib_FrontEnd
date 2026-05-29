<template>
  <div class="article-display">
    <div class="article-display__content">
      <div class="article-display__inner">
        <template v-if="getCurrentArticle&&getCurrentArticle.content">
          <article-reader :content="getCurrentArticle.content"></article-reader>
        </template>
        <template v-else>
          <div class="article-empty">
            <span class="article-empty__content">
              暂无相关内容
            </span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'
import ArticleReader from "@/components/IEditor/articleReader/articleReader.vue";
import {useArticle} from "@/hooks/useArticle";

export default defineComponent({
  name: "articleDisplay",
  components: {ArticleReader},
  setup(){
    const {getCurrentArticle} = useArticle()
    return {
      getCurrentArticle
    }
  }
})
</script>

<style scoped lang="scss">
@use "articleDisplay";
@use "articleDisplay_mb";
</style>