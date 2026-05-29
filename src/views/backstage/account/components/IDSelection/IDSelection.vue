<template>
  <div class="id-selection">
    <div class="id-selection-container">
      <div class="id-selection-title">
        {{ t('idSelection.title') }}
      </div>
      <div class="id-selection-list">
        <div class="id-selection-item" v-for="selector in selection" :key="selector.type" @click="selected_handle(selector)">
<!--          <div class="id-selection-item__logo"></div>-->
          <div class="id-selection-item__label">{{selector.label}}</div>
          <div class="id-selection-item__icon">
            <el-icon>
              <ArrowRight></ArrowRight>
            </el-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {computed, reactive, toRefs} from "vue";
import {useI18n} from 'vue-i18n'

import {ArrowRight} from "@element-plus/icons-vue";

const {t} = useI18n()
const emit = defineEmits(["update:identification","update:activeComponent"]);
const selection = computed(()=>{
  return [
    {
      label:t('idSelection.student'),
      type:'student'
    },
    {
      label:t('idSelection.teacher'),
      type:'teacher'
    },
    {
      label:t('idSelection.parent'),
      type:'parent'
    },
  ]
})

const selected_handle = (selection:any)=>{
  const {type} = selection;
  if(type){
    emit('update:identification',type)
  }
  emit('update:activeComponent','loginForm')
}
</script>

<style scoped lang="scss">
@forward "IDSelection";
</style>