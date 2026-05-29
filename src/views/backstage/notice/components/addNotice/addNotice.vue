<template>
  <el-drawer :title="t(`operator.${drawerObj.command}`)" v-model="drawerObj.isShow" size="76.4%">
    <div class="add-notice">
      <div class="add-notice-body">
        <el-form ref="noticeFormRef" :model="noticeForm" :rules="noticeRules" label-position="top">
          <el-form-item :label="t(`backstage.Notice.popup.cover`)" prop="cover_url" label-position="left" class="label-left-center">
            <el-upload
              class="avatar-uploader"
              accept="image/*"
              action="#"
              :auto-upload="false"
              :show-file-list="false"
              :on-change="changeFile"
            >
              <img v-if="noticeForm.cover_url || noticeForm.cover" :src="noticeForm.cover_url || noticeForm.cover" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
          </el-form-item>
          <div class="tip">
            <span class="tip-text">{{t(`backstage.Notice.popup.uploadTip`)}}</span>
          </div>
          <el-form-item :label="t('backstage.Notice.table.title')" prop="title" required>
            <div class="i-form-item__inner">
              <el-input type="textarea" v-model="noticeForm.title" :rows="4" resize="none" show-word-limit maxlength="20"></el-input>
            </div>
          </el-form-item>
          <el-form-item :label="t('backstage.Notice.table.subtitle')" prop="subtitle">
            <div class="i-form-item__inner">
              <el-input type="textarea" v-model="noticeForm.subtitle" :rows="4" resize="none" show-word-limit maxlength="20"></el-input>
            </div>
          </el-form-item>
          <el-form-item :label="t('backstage.Notice.popup.tip.publish.form.position')"  prop="publish_location">
            <el-select v-model="noticeForm.publish_location">
              <el-option v-for="position in displayPosition" :key="position.value" :label="position.label" :value="position.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="noticeForm.publish_location==='About'" :label="t('backstage.Notice.popup.tip.publish.form.positionIndex')">
            <el-select v-model="noticeForm.position_index">
              <el-option v-for="position in positionIndex.About" :key="position.value" :label="position.label" :value="position.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="t('backstage.Notice.table.publishTime')">
            <el-date-picker v-model="noticeForm.publish_time" type="datetime" value-format="YYYY-MM-DD HH:mm:ss"></el-date-picker>
          </el-form-item>
          <el-form-item :label="t('backstage.Notice.table.content')" prop="content">
            <div class="i-article-editor">
              <ArticleEditor ref="contentEditor" v-model="noticeForm.content"></ArticleEditor>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="add-notice-footer">
        <template v-if="drawerObj.command==='add'">
          <el-button type="primary" @click="saveAndCreate($event)">{{ t('operator.saveAndCreate') }}</el-button>
          <el-button type="primary" @click="saveAndCreate($event,false)">{{ t('operator.submit') }}</el-button>
        </template>
        <template v-if="drawerObj.command==='edit'">
          <el-button type="primary" @click="handleUpdate($event)">{{ t('operator.save') }}</el-button>
        </template>
        <el-button @click="cancelHandle">{{ t('operator.cancel') }}</el-button>
      </div>
    </div>
  </el-drawer>
</template>
<script lang="ts">
import {defineComponent, nextTick, reactive, ref, toRefs} from "vue";
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
import {useI18n} from "vue-i18n";
import ArticleEditor from "@/components/IEditor/articleEditor/articleEditor.vue";
import {createNotice, updateNotice} from "@/apis/backstage/notice";
import {NoticeItem} from "@/apis/backstage/type";
import {uploadFile} from "@/apis/backstage/utils";

export default defineComponent({
  name: "AddNotice",
  components: {
    ArticleEditor,
    Plus,
    ElMessage
  },
  emits:['loadData'],
  props: {},
  setup(props, {emit,expose}) {
    const {t} = useI18n()
    const contentEditor = ref<any>(null)
    const noticeFormRef = ref<any>(null)
    const state = reactive({
      drawerObj: {
        isShow: false,
        command: "add"
      },
      positionIndex:{
        About:[
          {
            label:'左侧-1',
            value:'1'
          },
          {
            label:'右侧-1',
            value:'2'
          },
          {
            label:'右侧-2',
            value:'3'
          }
        ]
      },
      noticeForm:{
        cover:"",
        cover_url:"",
        title:'',
        subtitle:'',
        publish_location:'',
        position_index:'',
        publish_time:'',
        content:''
      } as NoticeItem,
      noticeRules: {
        title:[{
          message:t('backstage.Notice.popup.required.title'),
          required: true,
          trigger:"blur",
        }],
        subtitle:[{
          message:t('backstage.Notice.popup.required.subtitle'),
          required: true,
          trigger:"blur",
        }],
        publish_location:[{
          message:t('backstage.Notice.popup.required.publish_location'),
          required: true,
          trigger:"blur",
        }]
      },
      displayPosition:[
        {
          label:t('primaryNav.news'),
          value:'News'
        },
        {
          label:t('primaryNav.about'),
          value:'About'
        }
      ]
    })

    const openDialog = (option:{command?:string,data?:any}) => {
      initData()
      state.drawerObj.command = option&&option?.command || 'add'
      state.drawerObj.isShow = true
      if(option&&option.data){
        state.noticeForm = {...option.data}
        contentEditor.value&&contentEditor.value.setData(state.noticeForm.content)
      }
    }

    const changeFile = (file:any,files:any) => {
      const formData = new FormData()
      formData.append('file',file.raw)
      uploadFile(formData).then((res: any)=>{
        if(res.status==='success'){
          state.noticeForm.cover_url = res.data.url
        }
      })
    }
    // 重置数据
    const initData = ()=>{
      state.noticeForm = {
        cover:"",
        cover_url:"",
        title:'',
        subtitle:'',
        publish_location:'',
        position_index:'',
        publish_time:'',
        content:''
      }
      contentEditor.value&&contentEditor.value.resetData()
    }
    // 保存并新增
    const saveAndCreate = (event:any,refresh:boolean = true)=>{
      if(!state.noticeForm.cover_url){
        ElMessage.warning(t('backstage.Notice.popup.required.cover'))
        return
      }
      if(state.noticeForm.publish_location==='About'&&!state.noticeForm.position_index){
        ElMessage.warning(t('backstage.Notice.popup.tip.warning.notPositionIndex'))
        return
      }
      noticeFormRef.value.validate((valid:boolean)=>{
        if(valid){
          createNotice(state.noticeForm).then((res)=>{
            if(res.status==='success'){
              ElMessage.success(t('backstage.Notice.popup.tip.success'))
              if(refresh){
                initData()
              }else{
                initData()
                cancelHandle()
              }
              emit('loadData')
            }
          })

        }
      })
    }
    // 修改
    const handleUpdate = (event: any)=>{
      if(!state.noticeForm.cover_url){
        ElMessage.warning(t('backstage.Notice.popup.required.cover'))
        return
      }
      noticeFormRef.value.validate((valid:boolean)=>{
        if(valid){
          updateNotice(state.noticeForm).then(res=>{
            if(res.status==='success'){
              ElMessage.success(t('backstage.Notice.popup.tip.success'))
              cancelHandle()
              initData()
              emit('loadData')
            }
          })

        }})
    }
    // 取消
    const cancelHandle = ()=>{
      state.drawerObj.isShow = false
      initData()
    }
    expose({
      openDialog
    })
    return {
      t,
      contentEditor,
      noticeFormRef,
      ...toRefs(state),
      changeFile,
      saveAndCreate,
      cancelHandle,
      handleUpdate
    }
  }
})
</script>

<style scoped lang="scss">
@forward "addNotice";
</style>