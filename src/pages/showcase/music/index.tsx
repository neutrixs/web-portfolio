import React, { ReactNode, useEffect, useState } from 'react'
import transcriptData, { LineData, PauseData } from './lyrics'
import style from './music.module.scss'
import coloraturaImg from '../../../img/coloratura.png'

interface props {
    audio: React.MutableRefObject<HTMLAudioElement>
}

interface wordProps {
    text: string
    active: boolean
}

interface lineProps {
    lineData: LineData | PauseData
    active: boolean
    currentTime: number
}

function Word({ text, active }: wordProps) {
    return <span className={active ? style.wordActive : ''}>{text}</span>
}

function Line({ lineData, active, currentTime }: lineProps) {
    const words: ReactNode[] = []
    if (lineData.type == 'line') {
        lineData.words.forEach((word) => {
            words.push(
                <Word
                    key={'w' + word.time}
                    active={!active ? false : currentTime >= word.time ? true : false}
                    text={word.word}
                />,
                <span> </span>,
            )
        })
    } else {
        words.push(
            <span key={'s' + lineData.time} className={active ? style.wordActive : ''}>
                ...
            </span>,
        )
    }

    return <p>{words}</p>
}

export default function Music({ audio }: props) {
    const lines: ReactNode[] = []
    const [currentTime, setCurrentTime] = useState(audio.current.currentTime)

    useEffect(() => {
        ;(window as any).audio = audio
        audio.current.currentTime = 100
        audio.current.play()

        const interval = setInterval(() => {
            setCurrentTime(audio.current.currentTime)
        }, 50)

        return () => clearInterval(interval)
    }, [])

    for (let i = 0; i < transcriptData.length; i++) {
        const lineData = transcriptData[i]
        const isAfterStart = audio.current.currentTime >= lineData.time
        const isBeforeEnd = transcriptData[i + 1]
            ? audio.current.currentTime < transcriptData[i + 1].time
            : true
        const active = isAfterStart && isBeforeEnd

        lines.push(
            <Line
                key={'l' + lineData.time}
                active={active}
                lineData={lineData}
                currentTime={currentTime}
            />,
        )
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
            <div className={style.lyrics}>{lines}</div>
        </div>
    )
}
