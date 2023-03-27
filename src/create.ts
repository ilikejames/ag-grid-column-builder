import { DotNotation } from './types'
import { TypedColDef } from './ag-grid'
import { ColDef, ColGroupDef } from '@ag-grid-community/core'

export function createColDef<T extends object, K extends DotNotation<T, keyof T>>(options: TypedColDef<T, K>): TypedColDef<T, K> {
    return options
}

type CreateColumns<T extends object> = {
    add: <K extends DotNotation<T, keyof T>>(options: TypedColDef<T, K>) => CreateColumns<T>
    untypedAdd: (definition: ColDef) => CreateColumns<T>
    addGroup: (groupDefinition: ColGroupDef) => CreateColumns<T>
    build: () => (ColDef | ColGroupDef)[]
}

export function createColumns<T extends object>(): CreateColumns<T> {
    const columns = [] as (ColDef | ColGroupDef)[]
    const builder: CreateColumns<T> = {
        add: <K extends DotNotation<T, keyof T>>(options: TypedColDef<T, K>) => {
            const definition = createColDef<T, K>(options)
            columns.push(definition as ColDef)
            return builder
        },
        untypedAdd: (definition: ColDef) => {
            columns.push(definition)
            return builder
        },
        addGroup: (groupDefinition: ColGroupDef) => {
            columns.push(groupDefinition)
            return builder
        },
        build: () => columns,
    }
    return builder
}
