<!--
- description: 发布位置 选择弹窗
-->
<template>
  <div class="select-position">
    <el-dialog v-model="dialogObj.visible" :close-on-click-modal="false" :title="dialogObj.title" :width="dialogObj.width">
      <div class="select-position-content">
        <el-form :model="displayForm" label-position="top">
          <el-form-item :label="t('backstage.Notice.popup.tip.publish.form.position')">
            <el-select v-model="displayForm.position">
              <el-option v-for="position in displayPosition" :key="position.value" :label="position.label" :value="position.value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import {defineComponent, reactive, toRefs} from 'vue'
import {useI18n} from "vue-i18n";

export default defineComponent({
  name: "selectPosition",
  setup(props,{expose}){
    const {t}=useI18n()
    const state = reactive({
      dialogObj:{
        visible:false,
        title:t('backstage.Notice.popup.tip.publish.title'),
        width:'460px'
      },
      displayForm:{
        position:''
      },
      displayPosition:[
        {
          label:t('primaryNav.news'),
          value:'news'
        },
        {
          label:t('primaryNav.about'),
          value:'about'
        }
      ]
    })
    const openDialog = ()=>{
      state.dialogObj.visible = true
    }
    expose({
      openDialog
    })
    return {
      t,
      ...toRefs(state)
    }
  }
})
</script>

<style scoped lang="scss">

</style>