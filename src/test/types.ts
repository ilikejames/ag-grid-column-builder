export enum OrderStatus {
    Open = 1,
    Closed = 2,
}

export type User = {
    id: number
    name: string
}

export type Order = {
    id: bigint
    payload: {
        name: string
        orderStatus: OrderStatus
        users: User[]
    }
}
