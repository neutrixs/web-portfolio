export interface Point {
    x: number
    y: number
}

export function bezier(t: number, P1: Point, P2: Point) {
    const x =
        (1 - t) ** 3 * 0 + 3 * (1 - t) ** 2 * t * P1.x + 3 * (1 - t) * t ** 2 * P2.x + t ** 3 * 1

    const y =
        (1 - t) ** 3 * 0 + 3 * (1 - t) ** 2 * t * P1.y + 3 * (1 - t) * t ** 2 * P2.y + t ** 3 * 1

    return { x, y }
}

export function sleep(ms: number) {
    return new Promise((a) => {
        setTimeout(a, ms)
    })
}
