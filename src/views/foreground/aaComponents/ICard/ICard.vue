<template>
  <div class="i-card" :style="{width}">
    <div class="i-card-cover">
      <img :src="cover" alt="">
    </div>
    <div class="i-card-content">
      <div class="i-card-title">{{title}}</div>
      <div class="i-card-desc">{{description}}</div>
    </div>
  </div>
</template>
<script lang="ts">
import {defineComponent, PropType} from 'vue'

export default defineComponent({
  name: "ICard",
  props:{
    width:{
      type:String as PropType<string>,
      default:''
    },
    cover:{
      type:String as PropType<string>,
      default:''
    },
    title:{
      type:String as PropType<string>,
      default:''
    },
    description:{
      type:String as PropType<string>,
      default:''
    },
  }
})
</script>

<style scoped lang="scss">
@forward "ICard";
</style>