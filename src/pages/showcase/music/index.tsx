import React, { ReactNode, memo, useEffect, useState, useCallback, useRef } from 'react'
import Controller from './controller'
import transcriptData, { LineData, PauseData } from './lyrics'
import style from './music.module.scss'
import coloraturaImg from '../../../img/coloratura.png'

interface props {
    audio: React.MutableRefObject<HTMLAudioElement>
}

interface LineProps {
    line: LineData | PauseData
    active: boolean
    activeWord: number
    audio: HTMLAudioElement
    containerRef: React.RefObject<HTMLDivElement>
}

const Line = memo(function Line({ line, active, activeWord, audio, containerRef }: LineProps) {
    const words: ReactNode[] = []
    const onclick = (time: number) => {
        audio.currentTime = time
    }

    const lineRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        audio.play()
    }, [])
    useEffect(() => {
        if (active && containerRef.current && lineRef.current) {
            const relativeFontSize = parseFloat(getComputedStyle(containerRef.current).fontSize)
            const pos = Math.max(0, lineRef.current.offsetTop - 3 * 2.25 * relativeFontSize)

            containerRef.current.scroll(0, pos)
        }
    }, [active])

    if (line.type == 'pause') {
        words.push(
            <span
                key={'p_0'}
                className={active ? style.wordActive : ''}
                onClick={() => onclick(line.time)}
            >
                ...
            </span>,
        )
    } else {
        line.words.forEach((word, i) => {
            words.push(
                <span
                    key={'w' + word.time}
                    onClick={() => onclick(word.time)}
                    className={
                        (active && activeWord >= i ? style.wordActive : '') +
                        ' ' +
                        (activeWord > i ? style.wordPassive : '')
                    }
                >
                    {word.word + ' '}
                </span>,
                <span className={style.whitespace} key={'s' + word.time}>
                    {' '}
                </span>,
            )
        })
    }
    return <p ref={lineRef}>{words}</p>
})

export default function Music({ audio }: props) {
    const [activeLine, setActiveLine] = useState(0)
    const [activeWord, setActiveWord] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)

    const ctimeOverriden = useRef(false)
    const ctimeOverride = useRef(0)

    useEffect(() => {
        ;(window as any).audio = audio.current
        const interval = setInterval(() => {
            const time = ctimeOverriden.current ? ctimeOverride.current : audio.current.currentTime
            const active =
                transcriptData
                    .map((val, i) => ({ time: val.time, i }))
                    .filter((val) => val.time <= time + 0.2)
                    .at(-1)?.i ?? 0

            const line = transcriptData[active]
            let activeWordCurrent = -1
            if (line.type == 'line') {
                activeWordCurrent =
                    line.words
                        .map((val, i) => ({ time: val.time, i }))
                        .filter((val) => val.time <= time + 0.2)
                        .at(-1)?.i ?? 0
            }

            setActiveLine(active)
            setActiveWord(activeWordCurrent)
        }, 100)

        return () => clearInterval(interval)
    }, [])

    function genLines() {
        const lines: ReactNode[] = []
        for (let i = 0; i < transcriptData.length; i++) {
            const line = transcriptData[i]
            const active = activeLine == i

            lines.push(
                <Line
                    key={'l' + line.time}
                    {...{
                        active,
                        activeWord: active ? activeWord : -1,
                        line,
                        audio: audio.current,
                        containerRef,
                    }}
                />,
            )
        }

        return lines
    }

    return (
        <div className={style.container}>
            <div className={style.info}>
                <img src={coloraturaImg} />
                <div>
                    <span>Coloratura</span>
                    <span>Coldplay</span>
                </div>
            </div>
            <div className={style.lyrics} ref={containerRef}>
                {genLines()}
            </div>
            <Controller {...{ audio, ctimeOverride, ctimeOverriden }} />
        </div>
    )
}