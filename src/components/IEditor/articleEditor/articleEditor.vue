<template>
  <div class="article-editor" v-loading="state.loading">
    <iframe ref="editorRef" src="/editor/editor.html"></iframe>
  </div>
</template>
<script setup lang="ts">
import { onMounted, PropType, reactive, ref, toRefs, watch} from 'vue';
// import {uploadFileFn} from '@/api/catalog/catalog';
import {base64ToFile} from '@/utils/func/file';
import {uploadFile} from "@/apis/backstage/utils";
import {ElMessage} from "element-plus";
const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: String as PropType<string>,
    default: ''
  }
});
const editorRef = ref();
const state = reactive({
  loading: false,
  content: '',
  editorInstance: null as any
});
const {} = toRefs(state);

const getSaveData = (type = 'text/lake') => {
  return state.editorInstance ? state.editorInstance.getDocument(type) : '';
};
const setData = (data: any) => {
  return state.editorInstance.setDocument('text/lake', data);
};

const resetData = ()=>{
  return state.editorInstance.setDocument('text/lake', '<p></p>');
}
defineExpose({
  getSaveData,
  setData,
  resetData
});
onMounted(() => {
  state.loading = true;
  editorRef.value.onload = async () => {
    const {
      Doc,
      document,
    } = editorRef.value.contentWindow;
    const {createOpenEditor, ToolbarOptionHelper} = Doc;
    state.editorInstance = createOpenEditor(document.getElementById('editor-root'), {
      input: {},
      disabledPlugins: [],
      // toc: {
      //   enable: true
      // },
      toolbar: ToolbarOptionHelper.start().getOption(),
      envAdapter: {
        openLocalLink(url: string) {
          console.log(url);
        }
      },
      image: {
        isCaptureImageURL() {
          return true;
        },
        // uploadFileURL: 'https://gateway.xycloud.net.cn/hangyi-knowledge/file/upload',
        createUploadPromise: async (request: any) => {
          const {type, data} = request;
          let imageFile = null as any;
          let uploadUrl = '';
          let uplaodRes = null as any;
          if (type === 'base64') {
            imageFile = base64ToFile(data, Date.now().toString());
            const formData = new FormData();
            formData.append('file', imageFile);
            uplaodRes = await uploadFile(formData);
          } else if (type === 'url') {
            // data 是一个url，表示需要转存
            uploadUrl = data;
            // const file = await getFileByUrl(data);
            // const formData = new FormData();
            // formData.append('file', file);
            // uplaodRes = await uploadFileFn(formData);
          } else if (type === 'file') {
            // data是一个File
            const formData = new FormData();
            formData.append('file', data);
            uplaodRes = await uploadFile(formData);
          }
          if (uplaodRes && uplaodRes.status==='success') {
            uploadUrl = uplaodRes.data.url;
          }
          return Promise.resolve({
            url: uploadUrl,
            size: type === 'base64' ? imageFile.size : data.size, // 文件大小
            filename: type === 'base64' ? imageFile.name : data.name
          });
        }
      },
      file: {
        getFileDownloadURL(src: string) {
          return `https://view.officeapps.live.com/op/view.aspx?src=${src}`;
        },
        viewerTooltip(ui: any) {
          const src = ui.cardData.getSrc();
          ui.getPreviewUrl = () => {
            return `https://view.officeapps.live.com/op/view.aspx?src=${src}`;
          };
          ui.getIFrameUrl = () => {
            return `https://view.officeapps.live.com/op/view.aspx?src=${src}`;
          };
          ui.downloadFile = () => {
            const a = document.createElement('a');
            a.href = src;
            a.click();
          };
        },
        createUploadPromise: async (request: any) => {
          const {type, data} = request;
          let uploadUrl = '';
          let size = data ? data.size : 0;
          let name = data ? data.name : '';
          let uplaodRes = null as any;
          if (type === 'url') {
            // data 是一个url，表示需要转存
            uploadUrl = data;
          } else if (type === 'file') {
            // data是一个File
            size = data.size;
            name = data.name;
            const formData = new FormData();
            formData.append('file', data);
            uplaodRes = await uploadFile(formData);
          } else {
            size = request.size;
            name = request.name;
            const formData = new FormData();
            formData.append('file', request);
            uplaodRes = await uploadFile(formData);
          }
          if (uplaodRes && uplaodRes.success) {
            uploadUrl = uplaodRes.data[0].url;
          }
          return Promise.resolve({
            url: uploadUrl,
            size: size, // 文件大小
            filename: name
          });
        }
      },
      video: {
        useOriginSrc: src => {
          return true;
        },
        createUploadPromise: async file => {
          const size = file.size;
          const name = file.name;
          let uploadUrl = '';
          const formData = new FormData();
          formData.append('file', file);
          const uplaodRes = await uploadFile(formData);
          if (uplaodRes && uplaodRes.success) {
            uploadUrl = uplaodRes.data[0].url;
          }
          return Promise.resolve({
            url: uploadUrl,
            size: size,
            filename: name
          });
        }
      }
    });
    state.editorInstance.setDocument('text/lake', props.modelValue);
    state.editorInstance.on('contentchange', () => {
      if(!state.editorInstance.queryCommandValue('isEmpty')){
        emits('update:modelValue',state.editorInstance.getDocument('text/lake'))
      }else{
        emits('update:modelValue',"")
      }
    });
    state.loading = false;
  };
});
</script>
<style scoped lang="scss">
@use 'articleEditor';
</style>
