export interface Point {
    x: number
    y: number
}

export function bezier(t: number, P1: Point, P2: Point) {
    const x = 3 * (1 - t) ** 2 * t * P1.x + 3 * (1 - t) * t ** 2 * P2.x + t ** 3

    const y = 3 * (1 - t) ** 2 * t * P1.y + 3 * (1 - t) * t ** 2 * P2.y + t ** 3

    return { x, y }
}

export function sleep(ms: number) {
    return new Promise((a) => {
        setTimeout(a, ms)
    })
}

/**
 *
 * @param em number
 * @param el HTMLElement
 * @returns number
 *
 * @description converts EM to PX relative to the element's font-size
 */
export function EMToPX(em: number, el: HTMLElement) {
    const fontSize = parseFloat(getComputedStyle(el).fontSize)
    return em * fontSize
}
