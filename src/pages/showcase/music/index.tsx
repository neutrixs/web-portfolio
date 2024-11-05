import React, { memo, ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Controller from './controller'
import songsData, { LineData, PauseData, WordData } from './lyrics'
import style from './music.module.scss'

const TIME_TOLERANCE_S = 0.2

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
    let words: ReactNode = []
    const lineRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!active || !containerRef.current || !lineRef.current) return

        const relativeFontSize = parseFloat(getComputedStyle(containerRef.current).fontSize)
        const pos = Math.max(0, lineRef.current.offsetTop - 3 * 2.25 * relativeFontSize)

        containerRef.current.scroll(0, pos)
    }, [active])

    function onclick(time: number) {
        audio.currentTime = time
    }

    function genSpan(text: string, time: number, className: string) {
        return (
            <span onClick={() => onclick(time)} key={'w' + time} className={className}>
                {text}
            </span>
        )
    }

    if (line.type == 'pause') {
        const className = active ? style.wordActive : ''
        words = genSpan('...', line.time, className)
    } else {
        words = line.words.map((word, i) => {
            const text = word.word
            const className =
                (active && activeWord >= i ? style.wordActive : '') +
                ' ' +
                (activeWord > i ? style.wordPassive : '')

            return genSpan(text, word.time, className)
        })
    }
    return <p ref={lineRef}>{words}</p>
})

function getIndexAtCurrentTime(data: (PauseData | LineData)[] | WordData[], t: number) {
    return (
        data
            .map((val, i) => ({ time: val.time, i }))
            .filter((val) => val.time <= t + TIME_TOLERANCE_S)
            .at(-1)?.i ?? 0
    )
}

const Music = memo(({ audio }: props) => {
    const [activeLine, setActiveLine] = useState(0)
    const [activeWord, setActiveWord] = useState(0)
    const [songIndex, setSongIndex] = useState(0)
    const songIndexRef = useRef(0)
    const containerRef = useRef<HTMLDivElement>(null)

    const ctimeOverriden = useRef(false)
    const ctimeOverride = useRef(0)

    useLayoutEffect(() => {
        function play() {
            audio.current.play()
        }

        songIndexRef.current = songIndex
        audio.current.src = songsData[songIndex].audioURL
        audio.current.currentTime = 0
        audio.current.addEventListener('loadedmetadata', play)

        return () => audio.current.removeEventListener('loadedmetadata', play)
    }, [songIndex])

    useEffect(() => {
        const interval = setInterval(stateUpdater, 100)
        return () => clearInterval(interval)
    }, [])

    function stateUpdater() {
        const transcriptData = songsData[songIndexRef.current].lyrics
        const time = ctimeOverriden.current ? ctimeOverride.current : audio.current.currentTime
        const activeLineIndex = getIndexAtCurrentTime(transcriptData, time)
        const activeLine = transcriptData[activeLineIndex]

        let activeWord = -1
        if (activeLine.type == 'line') {
            activeWord = getIndexAtCurrentTime(activeLine.words, time)
        }

        setActiveLine(activeLineIndex)
        setActiveWord(activeWord)
    }

    function genLines() {
        const transcriptData = songsData[songIndex].lyrics
        return transcriptData.map((line, i) => (
            <Line
                key={i}
                line={line}
                active={activeLine === i}
                activeWord={activeLine === i ? activeWord : -1}
                audio={audio.current}
                containerRef={containerRef}
            />
        ))
    }

    function skip() {
        setSongIndex((prev) => (prev == songsData.length - 1 ? 0 : prev + 1))
    }

    return (
        <div className={style.container}>
            <div className={style.info}>
                <img src={songsData[songIndex].coverURL} />
                <div>
                    <span>{songsData[songIndex].title}</span>
                    <span>{songsData[songIndex].artist}</span>
                </div>
            </div>
            <div className={style.lyrics} ref={containerRef}>
                {genLines()}
            </div>
            <Controller {...{ audio, ctimeOverride, ctimeOverriden, skip }} />
        </div>
    )
})

export default Music
