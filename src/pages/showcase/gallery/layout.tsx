import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import style from './layout.module.scss'

const MAX_SIZE_EM = 30
const MIN_SIZE_EM = 20
const GAP_EM = 0.5

export interface imageMetadata {
    url: string
    ratio: number
}

interface props {
    images: imageMetadata[]
}

export default function Layout({ images }: props) {
    const [fontSize, setFontSize] = useState(12)
    const [width, setWidth] = useState(0)
    const container = useRef<HTMLDivElement>(null!)
    const element: ReactNode = useMemo(() => {
        if (width == 0) {
            return null
        }
        const children: ReactNode[] = []
        // prevent empty slots
        const filtered = images.filter((n) => n)
        for (let i = 0; i < filtered.length; i++) {
            let aspectsSum = 0
            let cssAspects: string[] = []
            let endOfRow = i + 1

            // try to fit as much image as possible that still fits the requirements
            for (let cRow = i; cRow < filtered.length; cRow++) {
                const image = filtered[cRow]
                let newAspectsSum = aspectsSum + image.ratio
                const expectedHeight = width / aspectsSum

                if (expectedHeight < MIN_SIZE_EM) break
                aspectsSum = newAspectsSum
                cssAspects.push(image.ratio + 'fr')
                endOfRow = cRow + 1
            }

            const expectedHeight = width / aspectsSum
            if (expectedHeight > MAX_SIZE_EM) {
                aspectsSum = (expectedHeight * aspectsSum) / MAX_SIZE_EM
            }

            const grandchildren: ReactNode[] = []

            for (let j = i; j < endOfRow; j++) {
                const img = filtered[j]
                grandchildren.push(
                    <img
                        alt="Steven's image"
                        src={img.url}
                        style={{
                            aspectRatio: img.ratio,
                        }}
                        key={img.url}
                    />,
                )
            }

            children.push(
                <div
                    className={style.row}
                    style={{ gridTemplateColumns: cssAspects.join(' '), gap: `${GAP_EM}em` }}
                    key={i}
                >
                    {grandchildren}
                </div>,
            )

            i = endOfRow - 1
        }

        return children
    }, [images, fontSize, width])

    useEffect(() => {
        // parent fontsize will directly affect everything here
        // therefore it must be accounted
        const m_observer = new MutationObserver(() => {
            const size = parseFloat(getComputedStyle(container.current).fontSize)
            setFontSize(size)
        })

        let lastResizeTime = +new Date()
        let timeoutID = setTimeout(() => {})

        function updateWidth() {
            const size = parseFloat(getComputedStyle(container.current).fontSize)
            const width = container.current.clientWidth / size
            setWidth(width)
        }

        const r_observer = new ResizeObserver(() => {
            const time = +new Date()
            if (time - lastResizeTime > 1000) {
                clearTimeout(timeoutID)
                lastResizeTime = time
                updateWidth()
                return
            }
            clearTimeout(timeoutID)
            timeoutID = setTimeout(() => {
                lastResizeTime = +new Date()
                updateWidth()
            }, 1000)
        })

        const size = parseFloat(getComputedStyle(container.current).fontSize)
        const width = container.current.clientWidth / size
        setWidth(width)

        m_observer.observe(container.current, { childList: true })
        r_observer.observe(container.current)

        return () => {
            m_observer.disconnect()
            r_observer.disconnect()
        }
    }, [])
    return (
        <div className={style.container} style={{ gap: `${GAP_EM}em` }} ref={container}>
            {element}
        </div>
    )
}
