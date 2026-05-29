<template>
  <ISkeleton>
    <template #body>
      <div class="notice">
        <div class="notice-container">
          <div class="notice-search">
            <div class="notice-search-input">
              <div class="notice-search-btn">
                <el-button @click="createNotice">{{ t('operator.add') }}</el-button>
                <el-button @click="publishNotice">{{ t('operator.publish') }}</el-button>
                <el-dropdown>
                  <template #default>
                    <el-button>{{ t('operator.edit') }}
                      <el-icon class="el-icon--right">
                        <arrow-down/>
                      </el-icon>
                    </el-button>
                  </template>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item @click="editNotice">{{ t('operator.edit') }}</el-dropdown-item>
                      <el-dropdown-item @click="handleDelete">{{ t('operator.delete') }}</el-dropdown-item>
                      <el-dropdown-item @click="revokeNotice">{{ t('operator.revoke') }}</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </div>
            <div class="notice-search-btn">
<!--              <el-button type="primary" @click="loadData">{{ $t('buttonText.search') }}</el-button>-->
            </div>
          </div>
          <div class="notice-table">
            <ITable :tableData="tableData" :tableColumns="tableColumns" :total="total"
                    @size-change="handleSizeChange" @current-change="handleCurrentChange" @selectChange="selectChange" :is-paging="false"/>
          </div>
        </div>
        <add-notice ref="addNoticeRef" @loadData="loadData"></add-notice>
        <display-position ref="displayPositionRef"></display-position>
      </div>

    </template>
  </ISkeleton>
</template>
<script lang="ts">
import {defineComponent, h, onMounted, reactive, ref, toRefs} from "vue";
import ISkeleton from "@/components/ISkeleton/ISkeleton.vue";
import ITable from "@/components/ITable/ITable.vue";
import {useI18n} from "vue-i18n";
import {ArrowDown} from "@element-plus/icons-vue";
import AddNotice from "@/views/backstage/notice/components/addNotice/addNotice.vue";
import DisplayPosition from "@/views/backstage/notice/components/displayPosition/displayPosition.vue";
import {ElMessage, ElMessageBox} from "element-plus";
import {deleteNotice, publishNoticeById, queryNotice, revokeNoticeById} from "@/apis/backstage/notice";
import moment from "moment";

export default defineComponent({
  name: 'notice',
  components: {
    AddNotice,
    ArrowDown,
    ITable,
    ISkeleton,
    DisplayPosition
  },
  setup() {
    const {t} = useI18n();

    const addNoticeRef = ref()
    const displayPositionRef = ref()

    const state = reactive({
      queryParams: {
        pageName: 1,
        pageSize: 10
      },
      selectedArr:[] as any,
      tableData: [],
      tableColumns: [
        {
          type: 'selection',
        },
        {
          label: t('backstage.Notice.table.title'),
          minWidth: '140',
          prop: 'title',
          render: (row: any) => {
            return h('div',{
              style:{
                whiteSpace:'nowrap',
                overflow:'hidden',
                textOverflow:'ellipsis',
                cursor:"pointer",
                color:"#1664ff"
              },
              onClick(){
                addNoticeRef.value.openDialog({command:'edit',data:row})
              }
            },row.title)
          }
        },
        {
          label: t('backstage.Notice.table.subtitle'),
          minWidth: '140',
          prop: 'subtitle',
          render: (row: any) => {
            return h('div',{
              style:{
                whiteSpace:'nowrap',
                overflow:'hidden',
                textOverflow:'ellipsis'
              }
            },row.subtitle)
          }
        },
        {
          label: t('backstage.Notice.table.publishLocation'),
          prop: 'publish_location',
          width: '160',
          render: (row: any) => {
            return t(`primaryNav.${row.publish_location.toLowerCase()}`)
          }
        },
        {
          label: t('backstage.Notice.table.publisher'),
          minWidth: '140',
          prop: 'publisher',
          render: (row: any) => {
            return row.publisher
          }
        },
        {
          label: t('backstage.Notice.table.status'),
          minWidth: '140',
          prop: 'status',
          render: (row: any) => {
            return row.status
          }
        },
        {
          label: t('backstage.Notice.table.publishTime'),
          minWidth: '140',
          prop: 'publish_time',
          render: (row: any) => {
            return moment(row.publish_time).format('YYYY-MM-DD HH:mm:ss')
          }
        },
        {
          label: t('backstage.Notice.table.createTime'),
          minWidth: '140',
          prop: 'create_time',
          render: (row: any) => {
            return row.create_time?moment(row.create_time).format('YYYY-MM-DD HH:mm:ss'):'---'
          }
        },
      ],
      total: 0,
    })
    // 请求数据
    const loadData = () => {
      queryNotice({
        phone: "",
        publisher: "",
      }).then((res: any) => {
        if (res.status === "success") {
          state.tableData = res.data
          state.total = res.data.length
        }else{
          state.tableData = []
          state.total = 0
        }
      })
    }
    // 表格选择
    const selectChange = (selection: any[])=>{
      state.selectedArr = selection
    }
    // 页数改变
    const handleSizeChange = () => {

    }
    // 当前页改变
    const handleCurrentChange = () => {

    }

    // 新增公告
    const createNotice = () => {
      addNoticeRef.value.openDialog()
    }

    // 编辑公告
    const editNotice = () => {
      if(state.selectedArr.length===0){
        ElMessage.warning(t('backstage.Notice.popup.tip.warning.limitOne'))
        return
      }
      if(state.selectedArr.length >1){
        ElMessage.warning(t('backstage.Notice.popup.tip.warning.onlyOne'))
        return
      }
      addNoticeRef.value.openDialog({command:'edit',data:state.selectedArr[0]})
    }
    // 撤销
    const revokeNotice = () => {
      ElMessageBox({
        boxType:"confirm",
        title:t('backstage.Notice.popup.tip.revoke.title'),
        message:t('backstage.Notice.popup.tip.revoke.description'),
        confirmButtonText:t('operator.confirm'),
        cancelButtonText:t('operator.cancel'),
      }).then(() => {
        const ids = state.selectedArr.map(vm=>vm.id)
        revokeNoticeById({id:ids}).then(res=>{
          if(res.status==='success'){
            ElMessage.success(t('backstage.Notice.popup.tip.success'))
            loadData()
          }
        })
      })
    }

    // 发布公告
    const publishNotice = () => {
      if(state.selectedArr.length===0){
        ElMessage.warning(t('backstage.Notice.popup.tip.warning.limitOne'))
        return
      }
      ElMessageBox({
        boxType:"confirm",
        title:t('backstage.Notice.popup.tip.publish_location.title'),
        message:t('backstage.Notice.popup.tip.publish_location.description'),
        confirmButtonText:t('operator.confirm'),
        cancelButtonText:t('operator.cancel'),
      }).then(() => {
        const ids = state.selectedArr.map(vm=>vm.id)
        publishNoticeById({id:ids}).then(res=>{
          if(res.status === 'success'){
            ElMessage.success(t('backstage.Notice.popup.tip.success'))
            loadData()
          }
        })
      })
    }

    // 删除公告
    const handleDelete = () => {
      if(state.selectedArr.length===0){
        ElMessage.warning(t('backstage.Notice.popup.tip.warning.limitOne'))
        return
      }
      ElMessageBox({
        boxType:"confirm",
        title:t('backstage.Notice.popup.tip.delete.title'),
        message:t('backstage.Notice.popup.tip.delete.description'),
        confirmButtonText:t('operator.confirm'),
        cancelButtonText:t('operator.cancel'),
      }).then(() => {
        const ids = state.selectedArr.map(vm=>vm.id)
        deleteNotice({id:ids}).then(res=>{
          if(res.status === 'success'){
            ElMessage.success(t('backstage.Notice.popup.tip.success'))
            loadData()
          }
        })
      })
    }

    onMounted(() => {
      loadData()
    })
    return {
      t,
      addNoticeRef,
      displayPositionRef,
      ...toRefs(state),
      createNotice,
      loadData,
      handleSizeChange,
      handleCurrentChange,
      editNotice,
      publishNotice,
      handleDelete,
      revokeNotice,
      selectChange
    }
  }
})
</script>


<style scoped lang="scss">
@use "notice";
</style>