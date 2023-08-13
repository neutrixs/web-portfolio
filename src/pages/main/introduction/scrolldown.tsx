import React, { useEffect, useRef, useState } from 'react'
import style from './style.module.scss'
import useDimension from '../../../hooks/useDimension'

// not the best practice but come on
const textWidth = 256
const baseText = 'SCROLLDOWN '
const speed = 100

interface props {
    reverse: boolean
    show: boolean
}

interface textProps {
    text: string
    baseOffset: number
    offset: number
    reverse: boolean
}

export default function Scrolldown({ reverse, show }: props) {
    const { width } = useDimension()
    const [text, setText] = useState('')
    const [offset, setOffset] = useState(0)

    useEffect(() => {
        const repeatTimes = Math.ceil(width / textWidth)
        setText(baseText.repeat(repeatTimes))
    }, [width])

    useEffect(() => {
        if (offset >= getBaseOffset(1)) {
            setOffset(0)
        }
    }, [offset])

    useEffect(() => {
        const interval = setInterval(() => {
            setOffset((prev) => prev + speed / 200)
        }, 5)

        return () => clearInterval(interval)
    }, [])

    function getBaseOffset(n: number) {
        return n * textWidth * (text.split('SCROLLDOWN').length - 1)
    }

    return (
        <div className={style.scrolldownHolder} style={{ opacity: show ? 1 : 0 }}>
            <Text {...{ text, reverse, baseOffset: getBaseOffset(0), offset }} />
            <Text {...{ text, reverse, baseOffset: getBaseOffset(1), offset }} />
        </div>
    )
}

function Text({ text, reverse, baseOffset, offset }: textProps) {
    return <span style={{ [reverse ? 'right' : 'left']: baseOffset - offset }}>{text}</span>
}
