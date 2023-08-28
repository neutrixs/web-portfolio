export default function range(input: number, low: number, high: number): number {
    return Math.min(Math.max(input, low), high)
}
