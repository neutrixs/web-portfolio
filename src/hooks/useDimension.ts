import { useEffect, useState } from 'react'

export default function useDimension() {
    const [width, setWidth] = useState(window.innerWidth)
    const [height, setHeight] = useState(window.innerHeight)

    function onResize(this: Window) {
        setWidth(this.innerWidth)
        setHeight(this.innerHeight)
    }

    useEffect(() => {
        window.addEventListener('resize', onResize)

        return () => {
            window.removeEventListener('resize', onResize)
        }
    }, [])

    return { width, height }
}
