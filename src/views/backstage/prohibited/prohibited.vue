<template>
  <ISkeleton>
    <template #body>
      <section class="h-full flex">
        <aside class="w-45  flex-shrink-0 flex flex-col">
          <div class="flex-shrink-0 flex items-center justify-between mb-1 pt-3">
            <div class="text-2xl">禁用词类型</div>
            <div class="flex-shrink-0">
              <el-button type="text" @click="createProhibitedType">
                <el-icon size="20">
                  <CirclePlusFilled></CirclePlusFilled>
                </el-icon>
              </el-button>
            </div>
          </div>
          <div class="flex flex-col flex-1 border border-solid border-line-color pb-5 pt-5 pl-2.5 pr-2.5">
            <div class="w-full mb-5">
              <el-input :suffix-icon="Search"></el-input>
            </div>
            <div class="flex-1 overflow-y-auto overscroll-y-none">
              <div
                class="category-item flex justify-between hover:bg-hover-bg pl-7 pt-2 pb-2 pr-2 text-[#00000099] mb-1 ease-in-out duration-300 cursor-pointer"
                v-for="category in categoryList" :key="category.id"
                :class="{'bg-hover-bg':activeCategoryId === category.id,'text-[#000000E6]':activeCategoryId === category.id}">
                <div class="category-item-label">{{ category.label }}</div>
                <div class="category-item-operation" v-if="category.id!=='0'">
                  <el-icon size="12">
                    <MoreFilled></MoreFilled>
                  </el-icon>
                </div>
              </div>
            </div>
          </div>
        </aside>
        <section class="prohibited-container flex-1 ml-4">
          <el-tabs v-model="activeTab">
            <el-tab-pane name="prohibited" label="禁用词配置">
              <template #default>
                <div class="prohibited-table h-full flex flex-col ">
                  <div class="prohibited-table-header flex-shrink-0 flex items-center justify-between mb-5">
                    <div class="prohibited-table-operation flex items-center">
                      <el-button type="primary" class="mr-2" @click="createProhibited">新增</el-button>
                      <el-dropdown>
                        <template #default>
                          <el-button>
                            编辑
                            <el-icon>
                              <ArrowDown></ArrowDown>
                            </el-icon>
                          </el-button>
                        </template>
                        <template #dropdown>
                          <el-dropdown-menu>
                            <el-dropdown-item command="edit">编辑</el-dropdown-item>
                            <el-dropdown-item command="delete">删除</el-dropdown-item>
                          </el-dropdown-menu>
                        </template>
                      </el-dropdown>
                    </div>
                    <div class="prohibited-table-search flex items-center text-xs text-nowrap">
                      高级搜索
                      <el-input class="ml-2 mr-12" suffix-icon="" placeholder="请输入名称"></el-input>
                    </div>
                  </div>
                  <div class="prohibited-table-body flex-1">
                    <ITable :tableColumns="tableColumn" :tableData="tableData" :total="total"></ITable>
                  </div>
                </div>
              </template>
            </el-tab-pane>
          </el-tabs>
        </section>
        <!--   禁用词类型     -->
        <prohibited-type ref="createProhibitedTypeRef"></prohibited-type>
        <!--   禁用词类型     -->
        <prohibited-create ref="createProhibitedRef"></prohibited-create>
        <!--   禁用词类型     -->
        <replaceRule ref="replaceRuleRef"></replaceRule>
      </section>
    </template>
  </ISkeleton>
</template>
<script lang="ts">
import {defineComponent, h, reactive, ref, toRefs} from 'vue'
import ISkeleton from "@/components/ISkeleton/ISkeleton.vue";
import {ArrowDown, CirclePlusFilled, MoreFilled, Search} from "@element-plus/icons-vue";
import {ITable} from "@/components/ITable";
import ProhibitedType from "@/views/backstage/prohibited/components/prohibitedType/prohibitedType.vue";
import ProhibitedCreate from "@/views/backstage/prohibited/components/prohibitedCreate/prohibitedCreate.vue";
import {ElButton, ElSwitch} from "element-plus";
import ReplaceRule from "@/views/backstage/prohibited/components/replaceRule/replaceRule.vue";

export default defineComponent({
  name: "comment",
  computed: {
    Search() {
      return Search
    }
  },
  components: {ReplaceRule, ProhibitedCreate, ProhibitedType, ArrowDown, ITable, MoreFilled, CirclePlusFilled, ISkeleton},
  setup(props, {emit}) {
    const replaceRuleRef = ref<any>(null)
    const createProhibitedRef = ref<any>(null)
    const createProhibitedTypeRef = ref<any>(null)
    const state = reactive({
      activeTab: 'prohibited',
      activeCategoryId: "0",
      categoryList: [
        {
          id: '0',
          label: '全部'
        },
        {
          id: '1',
          label: '侮辱谩骂类'
        },
        {
          id: '2',
          label: '色情低俗类'
        },
      ],
      tableColumn: [
        {
          label: '禁用词ID号',
          prop: '',
          minWidth: ''
        },
        {
          label: '名称',
          prop: '',
          minWidth: ''
        },
        {
          label: '生效范围',
          prop: '',
          minWidth: ''
        },
        {
          label: '启用',
          prop: '',
          minWidth: '',
          render(row: any) {
            return h(ElSwitch, {
              modelValue: row.enabled,
              "onUpdate:modelValue": (val: any) => {

              }
            })
          }
        },
        {
          label: '替换规则 ',
          prop: '',
          minWidth: '',
          render(row: any) {
            return h(ElButton, {
              type: 'text',
              style: {
                color: '#1664ff',
                cursor: 'pointer'
              },
              onClick() {
                replaceRuleRef.value.openDialog()
              }
            }, () => '设置')
          }
        },
        {
          label: '操作',
          prop: '',
          minWidth: '',
          render(row: any) {
            return h('div', {style: {display: 'flex', justifyContent: 'center'}}, [h(ElButton, {
              type: 'text',
              style: {
                width: 'fit-content',
                color: '#1664ff',
                cursor: 'pointer'
              },
              onClick() {
                createProhibited()
              }
            }, () => '详情'), h(ElButton, {
              type: 'text',
              style: {
                width: 'fit-content',
                color: '#1664ff',
                cursor: 'pointer'
              },
              onClick() {

              }
            }, () => '删除')])
          }
        },
      ],
      tableData: [{}],
      total: 0,
      searchParams: {
        pageNum: 1,
        pageSize: 10,

      }
    })
    const createProhibited = () => {
      createProhibitedRef.value.openDialog()
    }

    const createProhibitedType = () => {
      createProhibitedTypeRef.value.openDialog()
    }
    return {
      replaceRuleRef,
      createProhibitedRef,
      createProhibitedTypeRef,
      ...toRefs(state),
      createProhibited,
      createProhibitedType
    }
  }
})
</script>

<style scoped lang="scss">
@forward "prohibited";
</style>