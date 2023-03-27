// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Compute<T> = T extends (...args: any[]) => any ? T : { [K in keyof T]: Compute<T[K]> }

export type Equal<X, Y> = (<T>() => T extends Compute<X> ? 1 : 2) extends <T>() => T extends Compute<Y> ? 1 : 2 ? true : false

export type Expect<T extends true> = T extends true ? true : never

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ExtractFunction<T> = T extends (...args: any[]) => any ? T : never
