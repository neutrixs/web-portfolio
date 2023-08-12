export default function sleep(ms: number) {
    return new Promise((a) => {
        setTimeout(a, ms)
    })
}
