<template>
  <IDialog v-model="dialogObj.isVisible" :title="dialogObj.title" :width="dialogObj.width"
           @confirmHandle="confirmDialog" @closeHandle="closeDialog">
    <template #default>
      <div class="replace-rule-body">
        <el-form ref="replaceRuleRef" :model="formData" :rules="formDataRules" label-position="top">
          <el-form-item label="退换内容" prop="replace_content">
            <el-input v-model="formData.replace_content" placeholder="请输入退换内容"></el-input>
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
  name: "replaceRule",
  components: {IDialog},
  setup(props, {emit, expose}) {
    const replaceRuleRef = ref()
    const state = reactive({
      dialogObj: {
        title: '替换规则设置',
        width: '384px',
        isVisible: false
      },
      formData: {
        replace_content: ""
      },
      formDataRules: {
        replace_content: [{required: true, message: '请输入退换内容', trigger: 'blur'}]
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
      replaceRuleRef,
      ...toRefs(state),
      closeDialog,
      confirmDialog
    }
  }
})
</script>
<style scoped lang="scss">
@forward "replaceRule";
</style>