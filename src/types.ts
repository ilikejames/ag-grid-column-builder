export type DotNotation<T, K extends keyof T> = K extends string
    ? T[K] extends object
        ? `${string & K}.${DotNotation<T[K], keyof T[K]>}` | `${string & K}`
        : `${string & K}`
    : never

export type At<T, K extends string> = K extends keyof T
    ? T[K]
    : K extends `${infer F}.${infer R}`
    ? F extends keyof T
        ? At<T[F], R>
        : never
    : never
