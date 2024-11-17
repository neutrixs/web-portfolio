import React, {
    memo,
    ReactNode,
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react'
import Controller from './controller'
import songsData, { LineData, PauseData, WordData } from './lyrics'
import Colorthief from '@neutrixs/colorthief'
import style from './music.module.scss'
import { brightness, hsl2rgb, rgb2hsl, rgb2hsv } from '../../../scripts/util'

const TIME_TOLERANCE_S = 0.2

type color = ReturnType<Colorthief['getColor']>

interface props {
    audio: React.MutableRefObject<HTMLAudioElement>
    musicState: ReturnType<typeof useMusicRestoreState>
    setUsingCustomColor: React.Dispatch<React.SetStateAction<boolean>>
    setCustomColor: React.Dispatch<React.SetStateAction<string>>
}

interface LineProps {
    line: LineData | PauseData
    active: boolean
    activeWord: number
    audio: HTMLAudioElement
    containerRef: React.RefObject<HTMLDivElement>
}

const Line = memo(function Line({ line, active, activeWord, audio, containerRef }: LineProps) {
    let words: ReactNode
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

function sortBySaturation(colors: color[]) {
    const copy = [...colors]
    return copy.sort((a, b) => {
        const { S: S1 } = rgb2hsv(a[0], a[1], a[2])
        const { S: S2 } = rgb2hsv(b[0], b[1], b[2])
        return S2 - S1
    })
}

function sortByBrightness(colors: color[], target: number) {
    const copy = [...colors]
    return copy.sort((a, b) => {
        const P1 = brightness(a[0] / 255, a[1] / 255, a[2] / 255)
        const P2 = brightness(b[0] / 255, b[1] / 255, b[2] / 255)

        return Math.abs(P1 - target) - Math.abs(P2 - target)
    })
}

function decreaseBrightness(color: color, target: number): color {
    const b = brightness(color[0] / 255, color[1] / 255, color[2] / 255)
    const { H, S, L } = rgb2hsl(color[0] / 255, color[1] / 255, color[2] / 255)
    if (b <= target) return color
    let diff = b - target
    let min = 0
    let max = L
    let R = 0
    let G = 0
    let B = 0

    while (diff > 0.01) {
        const middle = (min + max) / 2
        const rgb = hsl2rgb(H, S, middle)
        R = rgb.R
        G = rgb.G
        B = rgb.B
        const b = brightness(R, G, B)
        if (b < target) {
            min = middle
        } else {
            max = middle
        }

        diff = b - target
    }

    return [R * 255, G * 255, B * 255]
}

;(window as any).k = decreaseBrightness

export function useMusicRestoreState() {
    const [songIndex, setSongIndex] = useState(0)
    const [initialized, setInitialized] = useState(false)
    // this way, the object ID will only change if the value(s) actually change
    return useMemo(
        () => ({
            songIndex,
            setSongIndex,
            initialized,
            setInitialized,
        }),
        [songIndex, setSongIndex, initialized, setInitialized],
    )
}

const Music = memo(({ audio, musicState, setCustomColor, setUsingCustomColor }: props) => {
    const { initialized, setInitialized, songIndex, setSongIndex } = musicState
    const [activeLine, setActiveLine] = useState(0)
    const [activeWord, setActiveWord] = useState(0)
    const [first, setFirst] = useState(true)
    const songIndexRef = useRef(songIndex)
    const containerRef = useRef<HTMLDivElement>(null)
    const imgCoverRef = useRef<HTMLImageElement>(null!)

    const ctimeOverriden = useRef(false)
    const ctimeOverride = useRef(0)

    useEffect(() => {
        const thief = new Colorthief()

        function imgOnLoad() {
            const palette = thief.getPalette(imgCoverRef.current, 5)
            const mostSaturated = sortBySaturation(palette).slice(0, 3)
            const sorted = sortByBrightness(mostSaturated, 0.5)
            const adjusted = decreaseBrightness(sorted[0], 0.5)
            setUsingCustomColor(true)
            setCustomColor(`rgb(${adjusted.join(',')})`)
        }

        imgCoverRef.current.addEventListener('load', imgOnLoad)
        return () => {
            setUsingCustomColor(false)
            imgCoverRef.current?.removeEventListener('load', imgOnLoad)
        }
    }, [])

    useLayoutEffect(() => {
        if (first && initialized) {
            return
        }

        function play() {
            audio.current.play()
        }

        songIndexRef.current = songIndex
        audio.current.src = songsData[songIndex].audioURL
        audio.current.currentTime = 0
        audio.current.addEventListener('loadedmetadata', play)

        const songData = songsData[songIndex]
        navigator.mediaSession.metadata = new MediaMetadata({
            title: songData.title,
            artist: songData.artist,
            artwork: [{ src: songData.coverURL }],
        })

        return () => audio.current.removeEventListener('loadedmetadata', play)
    }, [songIndex])

    useEffect(() => {
        setInitialized(true)
        setFirst(false)
        const interval = setInterval(stateUpdater, 100)
        return () => clearInterval(interval)
    }, [])

    const skip = useCallback(() => {
        setSongIndex((prev) => (prev == songsData.length - 1 ? 0 : prev + 1))
    }, [setSongIndex])

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

    return (
        <div className={style.container}>
            <div className={style.info}>
                <img
                    ref={imgCoverRef}
                    alt={songsData[songIndex].title + ' album cover'}
                    src={songsData[songIndex].coverURL}
                />
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
