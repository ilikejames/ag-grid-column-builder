import {
    NewValueParams as BaseNewValueParams,
    CellClassParams,
    CellEvent as BaseCellEvent,
    ColDef,
    ICellRendererParams,
    ICellRendererFunc as BaseICellRendererFunc,
    RowNode,
    ValueFormatterParams,
    IComponent,
    ICellRenderer,
} from '@ag-grid-community/core'
import { At, DotNotation } from './types'

type TypedValue<BaseType, T extends object, K extends DotNotation<T, keyof T>> = Omit<BaseType, 'value'> & {
    value: At<T, K>
}

type TypedFunction<BaseType, Returns, T extends object, K extends DotNotation<T, keyof T>> = (params: TypedValue<BaseType, T, K>) => Returns

type TypedRowNode<T> = Omit<RowNode, 'data'> & { data: T }

export type ValueFormatterFunc<T extends object, K extends DotNotation<T, keyof T>> = TypedFunction<ValueFormatterParams, string, T, K>

export type CellClassFunc<T extends object, K extends DotNotation<T, keyof T>> = TypedFunction<CellClassParams, string | string[], T, K>

export type CellClassRules<T extends object, K extends DotNotation<T, keyof T>> = {
    [cssClassName: string]: ((params: TypedValue<CellClassParams, T, K>) => boolean) | string
}

export type TypedICellRendererParams<T extends object, K extends DotNotation<T, keyof T>> = Omit<
    ICellRendererParams,
    'value' | 'node' | 'data'
> & { node: TypedRowNode<T>; value: At<T, K>; data: T }

export type ICellRendererFunc<T extends object, K extends DotNotation<T, keyof T>> = (
    params: TypedICellRendererParams<T, K>,
) => ReturnType<BaseICellRendererFunc>

export type ICellRendererComp<T extends object, K extends DotNotation<T, keyof T>> = ICellRenderer &
    IComponent<TypedICellRendererParams<T, K>>

export type NewValueParams<T extends object, K extends DotNotation<T, keyof T>> = Omit<
    BaseNewValueParams,
    'newValue' | 'oldValue' | 'data' | 'node'
> & {
    oldValue: At<T, K>
    newValue: unknown
    data: T
    node: TypedRowNode<RowNode>
}

type CellEvent<T extends object, K extends DotNotation<T, keyof T>> = Omit<BaseCellEvent, 'value'> & {
    value: At<T, K>
}
export type CellClickedEvent<T extends object, K extends DotNotation<T, keyof T>> = CellEvent<T, K>
export type CellDoubleClickedEvent<T extends object, K extends DotNotation<T, keyof T>> = CellEvent<T, K>

type OverriddenColDef<T extends object, K extends DotNotation<T, keyof T>> = {
    field: K
    valueFormatter?: string | ValueFormatterFunc<T, K>
    equals?: (a: At<T, K>, b: At<T, K>) => boolean
    onCellValueChanged?: (event: NewValueParams<T, K>) => void
    onCellClicked?: (event: CellClickedEvent<T, K>) => void
    onCellDoubleClicked?: (event: CellDoubleClickedEvent<T, K>) => void
    cellClass?: string | string[] | CellClassFunc<T, K>
    cellClassRules?: CellClassRules<T, K>
    cellRenderer?:
        | {
              new (): ICellRendererComp<T, K>
          }
        | ICellRendererFunc<T, K>
        | string
    comparator?: (valueA: At<T, K>, valueB: At<T, K>, nodeA: TypedRowNode<T>, nodeB: TypedRowNode<T>, isInverted: boolean) => number
    // TODO: ?
    // valueSetter
    // valueParser
    // getQuickFilterText
}

export type TypedColDef<T extends object, K extends DotNotation<T, keyof T>> = Omit<ColDef, keyof OverriddenColDef<T, K>> &
    OverriddenColDef<T, K>
