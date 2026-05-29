<template>
  <div class="i-table" ref="iTableRef">
    <BaseTable :table-data="props.tableData" :table-columns="props.tableColumns" :height="baseTableHeight"
      @select-change="emit('selectChange', $event)"></BaseTable>
    <TablePaging v-if="isPaging" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
    </TablePaging>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, type PropType, nextTick } from 'vue'

import BaseTable from './components/BaseTable/BaseTable.vue'
import TablePaging from './components/TablePaging/TablePaging.vue'

const props = defineProps({
  tableData: {
    type: Array<any>,
    default: () => []
  },
  tableColumns: {
    type: Array<any>,
    default: () => []
  },
  total: {
    type: [String, Number]
  },
  isPaging: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['sizeChange', 'currentChange', 'selectChange'])

const handleSizeChange = (val: number) => {
  emit('sizeChange', val)
}
const handleCurrentChange = (val: number) => {
  emit('currentChange', val)
}

const baseTableHeight = ref(0)
const iTableRef = ref()

onMounted(() => {
  // baseTableHeight.value = iTableRef.value.clientHeight - 56
  // nextTick(() => {
  //   let timerId: any = null
  //   window.addEventListener('resize', function () {
  //     if (timerId) {
  //       this.clearTimeout(timerId)
  //       console.log(111)
  //     }
  //     timerId = this.setTimeout(() => {
  //       baseTableHeight.value = iTableRef.value.clientHeight - 56
  //     }, 10)
  //   })
  // })
})

</script>
<style scoped lang="scss">
@forward './ITable.scss';
</style>
