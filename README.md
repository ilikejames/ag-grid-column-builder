# ag-grid-column-builder

[![NPM Version][npm-image]][npm-url]


A typesafe builder for creating column definitions in ag-grid. 

Ag-grid now supports types on the `ColDef` but its not implemented very well, with very little type safety. 

This library uses the dot notation expressed in the `field` definition property to automatically provide the types for the column's other properties, and provide build-time breaks if the dot notation is no longer correct. 

### Install

```sh
    npm install ag-grid-column-builder
```

### Features

 - build errors when the `field` no longer matches the source object 
 - automatic typing of `ColDef` handlers, passing the `value`, `data`, `node.data` all correctly typed, helping to catch api type changes at **build time**, not _runtime_.
 - accelerator for custom renderer components that only require a `value` property

### Requirements

Requires `@ag-grid-community/core` to be installed. 

### Examples

```ts
type Person = { firstName : string, lastName: string, age: number  }

const definition = createColumns<Person>()
    // .add({ field: 'unknown' }) // ❌ no such path
    // .add({ field: 'age.something' }) // ❌ no such path
    .add({
        field: 'age',
        valueFormatter: ({ value, data }) => {
            // ^ value is number ✅
            // ^ data is Person ✅
            return param.value.toString()
        }
    })
    .build()
```

It supports deeply nested objects, and dot notation references to objects and arrays not just primitives:

```ts
enum Status = {
    Open,
    Closed
}

type Shop = {
    name: string,
    description?: string,
    contact: {
        person: Person,
        tel: string[]
    }
}

const definition = createColumns<Shop>()
    .add({ field: 'name' })
    .add({ 
        field: 'description', 
        valueFormatter: ({ value }) => {
            // ^ value is string | undefined ✅
            return value
        }
    }),
    .add({ 
        field: 'contact.person', 
        valueFormatter: ({ value }) => {
            // ^ value is Person ✅
            return `${value.firstName} ${value.lastName}`
        }
    })
    .add({ 
        field: 'contact.tel', 
        valueFormatter: ({ value }) => {
            // ^ value is string[] ✅
            return value.join(', ')
        }
    })
    .build()
```


### Grouped columns and non-typed columns

```ts
const definition = createColumns<Shop>()
    .add({ field: 'name' })
    .addGroup({
        headerName: 'Contact',
        children: createColumns<Shop>()
            .add({field: 'contact.person', cellRenderer: PersonRender})
            .add({field: 'contact.tel', valueFormatter: ({ value }) => value.join(', ')})
    })
    .untypedAdd({ flex: 1 })
    .build()
```

### Custom cellRenderers 

```ts
const PersonRenderer = (params: { value : Person}) => { /* etc */ }

const definition = createColumns<Shop>()
    .add({ 
        field: 'contact', 
        cellRenderer: PersonRenderer // ✅ type safe. 
        // If  either the Shop definition changes, or the `PersonRenderer` it will give a build
        // error on this `cellRenderer`. 
    })
    .build()
```

If you're using nominal/branded types, it provides deeper type restrictions:

```ts
type TimeMicro = bigint & { ___micro: never }

const MicroSecondRenderer = (props: {value: TimeMicro }) => { 
    /* render in fractions of milliseconds */
    return (value / 1000).toFixed(3)
}

type TimerResults = {
    duration: bigint
    durationMicros: TimeMicro
}

const definition = createColumns<TimerResults>()
    .add({ 
        field: 'durationMicros', 
        cellRenderer: MicroSecondRenderer // ✅ correct type between the field property and the renderer
    })
    .add({ 
        field: 'duration', 
        cellRenderer: MicroSecondRenderer // ❌ incorrect type between the field property and the renderer
    })
    .build()
```

### Typed parameters

This library/builder provides fully typed values for the following `ColDef` properties:

- field: This is a required field on `add` method. If this doesn't exist in the type, it will be caught in a build failure
- valueFormatter
- equals
- onCellValueChanged
- onCellClicked
- onCellDoubleClicked
- cellClass
- cellClassRules
- cellRenderer
- comparator

### License

ag-grid-column-builder is licensed under the [MIT License](https://mit-license.org/).


[npm-image]: https://img.shields.io/npm/v/ag-grid-column-builder.svg
[npm-url]: https://npmjs.org/package/ag-grid-column-builder
