import { defineComponent, computed } from 'vue'
import { ElTableColumn } from 'element-plus'
import { tableColumnProps } from '@/components/ITable/props'
import { ColumnTypeEnum } from '@/components/ITable/type'
import { get } from 'lodash'
import './TableColumn.scss'

export default defineComponent({
  props: { ...tableColumnProps },
  setup(props:any) {
    const getInitProps = computed((): any => {
      const propsExist: any = {}
      Reflect.ownKeys(props).forEach((key:any) => {
        if (props[key] !== undefined) {
          propsExist[key] = props[key]
        }
      })
      return propsExist
    })

    const defaultRenderFn = (props:any) => {
      const thCellFn = (params:any) => {
        const { column, $index } = params

        if (props.renderHead) return props.renderHead(column, $index)
        return column.label
      }

      const tdCellFn = (params:any) => {
        const { row, column, $index } = params
        const tdProps = {
          class: [props.className],
          style: {
            display: 'flex',
            justifyContent: props.align
          }
        }
        // 返回正常数据
        let cellValue = get(params.row, props.prop)
        // 返回渲染函数
        if (props.render) return props.render(row, column, cellValue, $index)
        // 返回格式化数据
        if (props.formatter) {
          cellValue = props.formatter(row, column, cellValue, $index)
        }

        return <div {...tdProps}>{cellValue}</div>
      }

      return {
        thCellFn,
        tdCellFn
      }
    }

    const { thCellFn, tdCellFn } = defaultRenderFn(props)

    const getSlots = computed((): any => {
      switch (props.type) {
        case ColumnTypeEnum.SELECTION:
        case ColumnTypeEnum.INDEX:
        case ColumnTypeEnum.EXPAND:
          return {}
        case ColumnTypeEnum.DEFAULT:
          return {
            header: thCellFn,
            default: tdCellFn
          }
        default:
          return {}
      }
    })

    const render = () => {
      return (
        <ElTableColumn
          {...getInitProps.value}
          v-slots={getSlots.value}
        ></ElTableColumn>
      )
    }
    return render
  }
})
