import React, { ReactNode, memo, createContext, useContext, useEffect, useState } from 'react'
import transcriptData, { LineData, PauseData } from './lyrics'
import style from './music.module.scss'
import coloraturaImg from '../../../img/coloratura.png'

interface props {
    audio: React.MutableRefObject<HTMLAudioElement>
}

interface wordProps {
    text: string
    lineIndex: number
    myIndex: number
}

interface lineProps {
    lineData: LineData | PauseData
    myIndex: number
    audio: React.MutableRefObject<HTMLAudioElement>
}

interface activeLyrics {
    line: number
    word: number
}

const ActiveLyricsContext = createContext<activeLyrics>({ line: 0, word: 0 })

function Word({ text, myIndex, lineIndex }: wordProps) {
    const { line, word } = useContext(ActiveLyricsContext)

    return (
        <span className={line == lineIndex && word >= myIndex ? style.wordActive : ''}>{text}</span>
    )
}

const Line = memo(function Line({ lineData, myIndex, audio }: lineProps) {
    const words: ReactNode[] = []
    if (lineData.type == 'line') {
        lineData.words.forEach((word, i) => {
            words.push(
                <Word key={'w' + word.time} text={word.word} myIndex={i} lineIndex={myIndex} />,
                <span> </span>,
            )
        })
    } else {
        words.push(<Word key={'w' + lineData.time} text={'...'} myIndex={0} lineIndex={myIndex} />)
    }

    return <p onClick={() => (audio.current.currentTime = lineData.time)}>{words}</p>
})

export default function Music({ audio }: props) {
    const [lines, setLines] = useState<ReactNode[]>([])
    const [cline, setcline] = useState(0)
    const [cword, setcword] = useState(0)

    useEffect(() => {
        ;(window as any).audio = audio
        audio.current.currentTime = 100
        audio.current.play()

        setLines(
            transcriptData.map((line, i) => (
                <Line key={'l' + line.time} lineData={line} myIndex={i} audio={audio} />
            )),
        )

        const interval = setInterval(() => {
            const currentLineIndex =
                transcriptData
                    .map((val, i) => ({ time: val.time, i }))
                    .filter((val) => val.time < audio.current.currentTime)
                    .at(-1)?.i ?? 0
            let currentWordIndex = 0
            const currentLine = transcriptData[currentLineIndex]

            if (currentLine.type == 'line') {
                currentWordIndex =
                    currentLine.words
                        .map((val, i) => ({ time: val.time, i }))
                        .filter((val) => val.time < audio.current.currentTime)
                        .at(-1)?.i ?? 0
            }

            setcline(currentLineIndex)
            setcword(currentWordIndex)
        }, 50)

        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <div className={style.container}>
            <div className={style.info}>
                <img src={coloraturaImg} />
                <div>
                    <span>Coloratura</span>
                    <span>Coldplay</span>
                </div>
            </div>
            <ActiveLyricsContext.Provider value={{ line: cline, word: cword }}>
                <div className={style.lyrics}>{lines}</div>
            </ActiveLyricsContext.Provider>
        </div>
    )
}
