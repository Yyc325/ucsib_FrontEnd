<template>
  <div class="course">
    <div class="course-container">
      <component :is="currentCourse"></component>
    </div>
  </div>
</template>
<script lang="ts">
import {defineComponent, reactive, toRefs} from 'vue'
import ExplorePreIB from "@/views/foreground/academics/Courses/ExplorePreIB/ExplorePreIB.vue";

export default defineComponent({
  name: "Courses",
  components: {
    ExplorePreIB
  },
  setup() {
    const state = reactive({
      currentCourse:"ExplorePreIB"
    })
    return {
      ...toRefs(state)
    }
  }
})
</script>

<style scoped lang="scss">
@forward "Courses";
</style>