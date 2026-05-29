<template>
  <IDialog v-model="dialogObj.isVisible" :title="dialogObj.title" :width="dialogObj.width" @closeHandle="closeDialog"
           @confirmHandle="confirmDialog">
    <template #default>
      <div class="prohibited-create-body">
        <el-form ref="prohibitedCreateRef" :model="formData" :rules="formDataRules" label-position="top">
          <el-form-item label="禁用词类型" prop="type">
            <el-select v-model="formData.type" placeholder="请选择类型名称">
              <el-option v-for="option in typeOptions" :key="option.id" :label="option.label"
                         :value="option.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="禁用词内容" prop="content">
            <el-input v-model="formData.content" placeholder="请输入禁用词内容"></el-input>
          </el-form-item>
          <el-form-item label="生效范围" prop="range">
            <el-select v-model="formData.range" placeholder="请输入生效范围">
              <el-option v-for="range in rangeOptions" :key="range.id" :label="range.label"
                         :value="range.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否启用" prop="isEnable">
            <el-switch v-model="formData.isEnable"></el-switch>
          </el-form-item>
          <el-form-item label="替换内容 " prop="replace_content">
            <el-input v-model="formData.replace_content" placeholder="请输入替换内容"></el-input>
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
  name: "prohibitedCreate",
  components: {IDialog},
  setup(props, {emit, expose}) {
    const prohibitedCreateRef = ref()
    const state = reactive({
      dialogObj: {
        title: '禁用词新增',
        width: '384px',
        isVisible: false
      },
      formData: {
        type: "",
        content: "",
        range: "",
        isEnable: false,
        replace_content: "",
      },
      formDataRules: {
        type: [{required: true, message: '请输入类型名称', trigger: 'blur'}],
        content: [{required: true, message: '请输入禁用词内容', trigger: 'blur'}],
        range: [{required: true, message: '请输入生效范围', trigger: 'blur'}],
      },
      typeOptions: [] as any,
      rangeOptions: [] as any
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
      prohibitedCreateRef,
      ...toRefs(state),
      closeDialog,
      confirmDialog
    }
  }
})
</script>
<style scoped lang="scss">
@forward "prohibitedCreate";
</style>