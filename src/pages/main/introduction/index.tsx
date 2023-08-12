import React, { useEffect, useState } from 'react'
import style from './style.module.scss'
import sleep from '../../../scripts/sleep'

const FIXED_TEXT = "Hi! I'm @neutrixs!"
const defaultLetterTiming = 50
const letterTiming: { [name: string]: number } = {
    '!': 300,
}

export default function Introduction() {
    const [text, setText] = useState('')

    useEffect(() => {
        setTimeout(() => {
            runText()
        }, 500)
    }, [])

    async function runText() {
        for (let i = 0; i < FIXED_TEXT.length; i++) {
            const letter = FIXED_TEXT[i]
            setText((prev) => prev + letter)
            if (letterTiming[letter]) {
                await sleep(letterTiming[letter])
            } else {
                await sleep(defaultLetterTiming)
            }
        }
    }

    return (
        <div className={style.holder}>
            <div className={style.textHolder}>
                <span>{text}</span>
                <div className={style.cursor}></div>
            </div>
        </div>
    )
}
