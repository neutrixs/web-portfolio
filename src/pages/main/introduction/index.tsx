import React, { useEffect, useRef, useState } from 'react'
import style from './style.module.scss'
import sleep from '../../../scripts/sleep'
import Scrolldown from './scrolldown'

const FIRST_TEXT = "Hi! I'm @neutrixs!"
const SECOND_TEXT = 'What are you waiting for? Scroll down :)'
const defaultLetterTiming = 50
const letterTiming: { [name: string]: number } = {
    '!': 300,
    '?': 300,
}

interface props {
    height: number
}

export default function Introduction({ height }: props) {
    const [text, setText] = useState('')
    const [show, setShow] = useState(false)
    const textRef = useRef(text)

    useEffect(() => {
        setTimeout(async () => {
            await runText(FIRST_TEXT)
            setTimeout(() => {
                setShow(true)
            }, 1500)
            await sleep(15000)
            await clearText()
            await runText(SECOND_TEXT)
        }, 500)
    }, [])

    useEffect(() => {
        textRef.current = text
    }, [text])

    async function runText(targetText: string): Promise<void> {
        return new Promise(async (resolve) => {
            for (let i = 0; i < targetText.length; i++) {
                const letter = targetText[i]
                setText((prev) => prev + letter)
                if (letterTiming[letter]) {
                    await sleep(letterTiming[letter])
                } else {
                    await sleep(defaultLetterTiming)
                }
            }

            resolve()
        })
    }

    async function clearText(): Promise<void> {
        return new Promise(async (resolve) => {
            while (textRef.current) {
                setText((prev) => prev.slice(0, -1))
                await sleep(defaultLetterTiming)
            }

            resolve()
        })
    }

    return (
        <div className={style.holder} style={{ height: height.toString() + 'px' }}>
            <Scrolldown reverse={false} show={show} />
            <span className={style.text}>
                {text}
                <div className={style.cursorHolder}>
                    <div className={style.cursor}></div>
                </div>
            </span>
            <Scrolldown reverse={true} show={show} />
        </div>
    )
}
