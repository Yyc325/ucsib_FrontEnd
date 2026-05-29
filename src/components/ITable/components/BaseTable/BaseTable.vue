<template>
  <el-table
    class="base-table"
    :data="props.tableData"
    style="width: 100%"
    header-cell-class-name="base-table-header"
    :height="props.height"
    @selection-change="emit('selectChange', $event)"
  >
    <TableColumn
      v-for="(column, index) in props.tableColumns"
      :key="index"
      v-bind="column"
    >
    </TableColumn>
    <template #empty>
      <div class="empty-table">
        <div class="empty-table__image">
          <img :src="noInfo">
        </div>
        <div class="empty-table__text">
          {{ t('component.table.empty') }}
        </div>
      </div>
    </template>
  </el-table>
</template>

<script lang="ts" setup>
import TableColumn from '../TableColumn/TableColumn'
import {useI18n} from "vue-i18n";

import noInfo from '@/assets/images/table/noInfo.png'
const {t } = useI18n()
const props = defineProps({
  tableData: {
    type: Array<any>,
    default: () => []
  },
  tableColumns: {
    type: Array<any>,
    default: () => []
  },
  height: {
    type: Number
  }
})

const emit = defineEmits(['selectChange', 'selectionChange'])
</script>
<style scoped lang="scss">
@forward './BaseTable.scss';
</style>
