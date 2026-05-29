<template>
  <div class="i-dialog">
    <el-dialog :model-value="modelValue" :title="title" :width="width" :append-to-body="true" @close="closeDialog"
               :close-on-click-modal="false">
      <template #default>
        <slot name="default"></slot>
      </template>
      <template #footer>
        <slot name="footer">
          <div class="dialog-footer">
            <el-button @click="closeDialog">取消</el-button>
            <el-button type="primary" @click="confirmDialog">确定</el-button>
          </div>
        </slot>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import {defineComponent, PropType} from 'vue'

export default defineComponent({
  name: "IDialog",
  props: {
    modelValue: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    title: {
      type: String as PropType<string>,
      default: ''
    },
    width: {
      type: [String, Number] as PropType<string | number>,
      default: ''
    }
  },
  emits: ['update:modelValue', 'closeHandle', 'confirmHandle'],
  setup(props, {emit}) {

    const closeDialog = () => {
      emit('update:modelValue', false)
      emit('closeHandle')
    }
    const confirmDialog = () => {
      emit('confirmHandle')
    }
    return {
      closeDialog,
      confirmDialog
    }
  }
})
</script>

<style scoped lang="scss">
@forward "IDialog";
</style>