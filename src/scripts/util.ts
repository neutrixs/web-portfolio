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
 * @param r - [0,1]
 * @param g - [0,1]
 * @param b - [0,1]
 * @return {H, S, V} - Where H in [0,360] and S, L in [0,1]
 */
export function rgb2hsv(r: number, g: number, b: number) {
    let v = Math.max(r, g, b),
        c = v - Math.min(r, g, b)
    let h = c && (v == r ? (g - b) / c : v == g ? 2 + (b - r) / c : 4 + (r - g) / c)
    return { H: 60 * (h < 0 ? h + 6 : h), S: v && c / v, V: v }
}

/**
 * @param r - [0,1]
 * @param g - [0,1]
 * @param b - [0,1]
 * @return {H, S, L} - Where H in [0,360] and S, L in [0,1]
 */
export function rgb2hsl(r: number, g: number, b: number) {
    let v = Math.max(r, g, b),
        c = v - Math.min(r, g, b),
        f = 1 - Math.abs(v + v - c - 1)
    let h = c && (v == r ? (g - b) / c : v == g ? 2 + (b - r) / c : 4 + (r - g) / c)
    return { H: 60 * (h < 0 ? h + 6 : h), S: f ? c / f : 0, L: (v + v - c) / 2 }
}

/**
 * @param h - [0,360]
 * @param s - [0,1]
 * @param l - [0,1]
 * @return {R, G, B} - Where R, G, B in [0,1]
 */
export function hsl2rgb(h: number, s: number, l: number) {
    let a = s * Math.min(l, 1 - l)
    let f = (n: number, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return { R: f(0), G: f(8), B: f(4) }
}

/**
 * @param r - [0,1]
 * @param g - [0,1]
 * @param b - [0,1]
 * @return P - [0,1]
 */
export function brightness(r: number, g: number, b: number) {
    return Math.sqrt(0.299 * r ** 2 + 0.587 * g ** 2 + 0.114 * b ** 2)
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
