

<template>
  <div class="content-layout">
    <div class="content-layout-container">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "ContentLayout"
})
</script>

<style scoped lang="scss">
@forward "ContentLayout";
</style>