<template>
  <router-view v-slot="{ Component }">
    <transition>
      <component :is="Component" />
    </transition>
  </router-view>
</template>
<script setup>
</script>
<style lang="scss" scoped>
@forward "@/assets/css/common/var";
</style>
