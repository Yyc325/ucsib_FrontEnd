import type { PropType, VNode } from 'vue'

import type { FixedType, SortType, AlignType } from './type'

const tableColumnProps = {
  // 列的内容
  type: {
    type: String as PropType<string>,
    default: ''
  },
  // 列标题
  label: {
    type: String as PropType<string>
  },
  // 列表头  渲染函数
  renderHead: {
    type: Function as PropType<Function>
  },
  // 列内容的字段名
  prop: {
    type: String as PropType<string>
  },
  // 列宽
  width: {
    type: [Number, String] as PropType<number | string>
  },
  minWidth: {
    type: [Number, String] as PropType<number | string>
  },
  // 是否可拖动列宽
  resizable: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  // 是否固定
  fixed: {
    type: String as PropType<FixedType>
  },
  // 是否排序
  sortable: {
    type: [Boolean, 'custom'] as PropType<SortType>,
    default: false
  },
  // 排序方法
  sortMethod: {
    type: Function as PropType<Function>
  },
  sortBy: {
    type: Function as PropType<Function>
  },
  sortOrders: {
    type: Array,
    default: () => ['ascending', 'descending', null]
  },
  // 内容过长被隐藏显示 tooltip
  showOverflowTooltip: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  // 列标题的类名
  labelClassName: {
    type: String as PropType<string>
  },
  // 列的类名
  className: {
    type: String as PropType<string>
  },
  // type = selection 时的是否勾选函数
  selectable: {
    type: Function as PropType<Function>
  },
  // type = selection 时的 反选
  reserveSelection: {
    type: Function as PropType<Function>
  },
  // 以上参数均用于 ElTableColumn
  // 表头对齐方式
  headerAlign: {
    type: String as PropType<AlignType>
  },
  // 对齐方式
  align: {
    type: String as PropType<AlignType>,
    default: 'center'
  },

  // 格式化列内容
  formatter: {
    type: Function as PropType<Function>
  },
  // td cell 的渲染函数
  render: {
    type: Function as PropType<Function>
  },
  // 多级表头
  childs: {
    type: Array as PropType<VNode[]>
  },
  // type: edit 类型的表单验证
  verify: {
    type: Array as PropType<object[]>
  }
}

export { tableColumnProps }
