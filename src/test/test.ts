import { createColDef } from '../create'
import { Expect, Equal, ExtractFunction } from './test-helper-types'
import { Order, OrderStatus, User } from './types'

/* eslint-disable @typescript-eslint/no-unused-vars */

// A react/angular/etc component.
// The key part is that its interface requires a value of type bigint.
const BigIntRenderer = ({ value }: { value: bigint }) => value.toString()
const OrderStatusRenderer = ({ value }: { value: OrderStatus }) => value.toString()

const def1 = createColDef<Order, 'id'>({
    field: 'id',
    valueFormatter: params => params.value.toString(),
    equals: (a, b) => {
        return a === b
    },
    cellClass: params => {
        return params.value > BigInt(0) ? 'positive' : 'negative'
    },
    cellClassRules: {
        positive: params => params.value >= BigInt(0),
        negative: params => params.value < BigInt(0),
    },
    cellRenderer: BigIntRenderer,
})

// valueFormatter params
type T1_ValueFormatterParam = Parameters<ExtractFunction<typeof def1['valueFormatter']>>[0]['value']
type Assert1_FormatterParam = Expect<Equal<T1_ValueFormatterParam, bigint>>

// equals params
type T1_EqualsParams = Parameters<ExtractFunction<typeof def1['equals']>>
type Assert1_EqualsParams = Expect<Equal<T1_EqualsParams, [bigint, bigint]>>

// cellClass params
type T1_CellClassParams = Parameters<ExtractFunction<typeof def1['cellClass']>>
type Assert1_CellClassParams = Expect<Equal<T1_CellClassParams[0]['value'], bigint>>

// cellRenderer params
type T1_CellRendererParams = Parameters<ExtractFunction<typeof def1['cellRenderer']>>[0]
type Assert1_CellRendererParams_Value = Expect<Equal<T1_CellRendererParams['value'], bigint>>
type Assert1_CellRendererParams_Data = Expect<Equal<T1_CellRendererParams['data'], Order>>
type Assert1_CellRendererParams_RowNodeData = Expect<Equal<T1_CellRendererParams['node']['data'], Order>>

const def2 = createColDef<Order, 'payload.orderStatus'>({
    field: 'payload.orderStatus',
    valueFormatter: params => params.value.toString(),
    cellRenderer: OrderStatusRenderer,
})

// valueFormatter params
type T2_ValueFormatterParam = Parameters<ExtractFunction<typeof def2['valueFormatter']>>[0]['value']
type Assert2_FormatterParam = Expect<Equal<T2_ValueFormatterParam, OrderStatus>>
// cellRenderer params
type T2_CellRendererParams = Parameters<ExtractFunction<typeof def2['cellRenderer']>>[0]
type Assert2_CellRendererParams_Value = Expect<Equal<T2_CellRendererParams['value'], OrderStatus>>
type Assert2_CellRendererParams_Data = Expect<Equal<T2_CellRendererParams['data'], Order>>
type Assert2_CellRendererParams_RowNodeData = Expect<Equal<T2_CellRendererParams['node']['data'], Order>>

const def3 = createColDef<Order, 'payload.users'>({
    field: 'payload.users',
    valueFormatter: params => params.value.map(x => x.name).join(', '),
})

// valueFormatter params
type T3_ValueFormatterParam = Parameters<ExtractFunction<typeof def3['valueFormatter']>>[0]['value']
type Assert3_FormatterParam = Expect<Equal<T3_ValueFormatterParam, User[]>>

/* eslint-enable @typescript-eslint/no-unused-vars */
