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
    const [textApplied, setTextApplied] = useState(false)

    useEffect(() => {
        const repeatTimes = Math.ceil(width / textWidth)
        setText(baseText.repeat(repeatTimes))
    }, [width])

    // for some reasons, i can't apply the animation to the CSS directly
    // because it would cause the element to move very slowly (on chrome windows)
    // maybe it's the issue with the devtools, but I'm not sure
    useEffect(() => {
        setTextApplied(true)
    }, [text])

    function applyAnimation() {
        if (!show || !textApplied) return ''

        return reverse ? style.movingText2 : style.movingText1
    }

    return (
        <div
            className={style.scrolldownHolder + ' ' + (reverse ? style.reverse : '')}
            style={{ opacity: show ? 1 : 0 }}
        >
            <span style={{ animationName: applyAnimation() }}>{text.substring(2) + ' SC'}</span>
            <span style={{ animationName: applyAnimation() }}>{text.substring(2) + ' SC'}</span>
        </div>
    )
}
