<template>
  <div class="i-tabel-paging">
    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="props.pageSizes"
      :small="props.small" :disabled="props.disabled" :background="props.background"
      layout="total, sizes, prev, pager, next, jumper" :total="props.total" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const currentPage = ref(1)
const pageSize = ref(10)

const props = defineProps({
  small: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  background: {
    type: Boolean,
    default: true
  },
  total: {
    type: [Number, String],
    default: 0
  },
  pageSizes: {
    type: Array<Number>,
    default: [10, 20, 30, 40]
  }
})

const emit = defineEmits(['sizeChange', 'currentChange'])

const handleSizeChange = (val: number) => {
  emit('sizeChange', val)
}

const handleCurrentChange = (val: number) => {
  emit('currentChange', val)
}
</script>
<style scoped lang="scss">
@forward './TablePaging.scss';
</style>
