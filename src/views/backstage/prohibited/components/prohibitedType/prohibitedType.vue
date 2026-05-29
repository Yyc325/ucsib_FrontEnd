<template>
  <IDialog v-model="dialogObj.isVisible" :title="dialogObj.title" :width="dialogObj.width"
           @confirmHandle="confirmDialog" @closeHandle="closeDialog">
    <template #default>
      <div class="prohibited-type-body">
        <el-form ref="prohibitedTypeRef" :model="formData" :rules="formDataRules" label-position="top">
          <el-form-item label="名称" prop="name">
            <el-input v-model="formData.name" placeholder="请输入类型名称"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </template>
  </IDialog>
</template>

<script lang="ts">
import {defineComponent, reactive, ref, toRefs} from 'vue'
import IDialog from "@/components/IDialog/IDialog.vue";

export default defineComponent({
  name: "prohibitedType",
  components: {IDialog},
  setup(props, {emit, expose}) {
    const prohibitedTypeRef = ref()
    const state = reactive({
      dialogObj: {
        title: '禁用词类型',
        width: '384px',
        isVisible: false
      },
      formData: {
        name: ""
      },
      formDataRules: {
        name: [{required: true, message: '请输入类型名称', trigger: 'blur'}]
      }
    })
    const closeDialog = () => {
      state.dialogObj.isVisible = false
    }
    const confirmDialog = () => {
      state.dialogObj.isVisible = false
    }
    const openDialog = () => {
      state.dialogObj.isVisible = true
    }
    expose({
      openDialog
    })
    return {
      prohibitedTypeRef,
      ...toRefs(state),
      closeDialog,
      confirmDialog
    }
  }
})
</script>
<style scoped lang="scss">
@forward "prohibitedType";
</style>