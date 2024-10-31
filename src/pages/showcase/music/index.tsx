import React, {
    ReactNode,
    memo,
    createContext,
    useContext,
    useEffect,
    useState,
    useMemo,
    useId,
    useCallback,
} from 'react'
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
}

const Line = memo(function Line({ line, active, activeWord, audio }: LineProps) {
    const words: ReactNode[] = []
    const onclick = useCallback(() => {
        audio.pause()
        audio.currentTime = line.time
        audio.play()
    }, [])

    if (line.type == 'pause') {
        words.push(
            <span key={'p_0'} className={active ? style.wordActive : ''}>
                ...
            </span>,
        )
    } else {
        line.words.forEach((word, i) => {
            words.push(
                <span
                    key={'w' + word.time}
                    className={active && activeWord >= i ? style.wordActive : ''}
                >
                    {word.word + ' '}
                </span>,
                <span className={style.whitespace} key={'s' + word.time}>
                    {' '}
                </span>,
            )
        })
    }
    return <p onClick={onclick}>{words}</p>
})

export default function Music({ audio }: props) {
    const [activeLine, setActiveLine] = useState(0)
    const [activeWord, setActiveWord] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            const active =
                transcriptData
                    .map((val, i) => ({ time: val.time, i }))
                    .filter((val) => val.time <= audio.current.currentTime)
                    .at(-1)?.i ?? 0

            const line = transcriptData[active]
            let activeWordCurrent = -1
            if (line.type == 'line') {
                activeWordCurrent =
                    line.words
                        .map((val, i) => ({ time: val.time, i }))
                        .filter((val) => val.time <= audio.current.currentTime)
                        .at(-1)?.i ?? 0
                console.log(activeWordCurrent)
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
            <div className={style.lyrics}>{genLines()}</div>
        </div>
    )
}
