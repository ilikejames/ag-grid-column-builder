import { createColDef } from '../create'
import { Expect, Equal, ExtractFunction } from './test-helper-types'
import { Order } from './types'

// A react/angular/etc component.
// The key part is that its interface requires a value of type bigint.
const BigIntRenderer = ({ value }: { value: bigint }) => value.toString()

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

/* eslint-disable @typescript-eslint/no-unused-vars */

type T1_ValueFormatterParam = Parameters<ExtractFunction<typeof def1['valueFormatter']>>[0]['value']
type Assert1_FormatterParam = Expect<Equal<T1_ValueFormatterParam, bigint>>
type T1_EqualsParams = Parameters<ExtractFunction<typeof def1['equals']>>
type Assert1_EqualsParams = Expect<Equal<T1_EqualsParams, [bigint, bigint]>>
type T1_CellClassParams = Parameters<ExtractFunction<typeof def1['cellClass']>>
type Assert1_CellClassParams = Expect<Equal<T1_CellClassParams[0]['value'], bigint>>

type T1_CellRendererParams = Parameters<ExtractFunction<typeof def1['cellRenderer']>>[0]
type Assert1_CellRendererParams_Value = Expect<Equal<T1_CellRendererParams['value'], bigint>>
type Assert1_CellRendererParams_Data = Expect<Equal<T1_CellRendererParams['data'], Order>>
type Assert1_CellRendererParams_RowNodeData = Expect<Equal<T1_CellRendererParams['node']['data'], Order>>

/* eslint-enable @typescript-eslint/no-unused-vars */
