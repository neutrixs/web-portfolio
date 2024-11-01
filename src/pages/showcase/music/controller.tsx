import React, { memo, useEffect, useState, useRef, ReactNode } from 'react'
import style from './music.module.scss'
import pauseButton from '../../../img/pause-cropped.svg'
import playButton from '../../../img/play-cropped.svg'

const SVG_WIDTH_EM = 2

interface props {
    audio: React.MutableRefObject<HTMLAudioElement>
}

interface SeekbarProps {
    isPlaying: boolean
}

const Sine = memo(function Sine() {
    return (
        <svg
            width="500"
            height="105"
            style={{ width: `${SVG_WIDTH_EM}em` }}
            viewBox="0 0 6.2832 1"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M 7.853 1
                C 7.2855 1, 6.7955 0.75615, 6.2832 0.5
                C 5.7709 0.25615, 5.281 0, 4.7124 0
                C 4.144 0, 3.654 0.25615, 3.1416 0.5
                C 2.6293 0.75615, 2.1393 1, 1.5708 1
                C 1.0023 1, 0.5123 0.75615, 0 0.5
                C -0.5123 0.25615, -1.0022 0, -3.1416 0.5"
                fill="none"
                stroke="#33ff99"
                stroke-width="1.6"
            />
        </svg>
    )
})

const Seekbar = memo(function Seekbar({ isPlaying }: SeekbarProps) {
    const activeSeekRef = useRef<HTMLDivElement>(null)
    const wavesRef = useRef<HTMLDivElement>(null)
    const [amount, setAmount] = useState(1)
    const [translate, setTranslate] = useState(0)
    const [raise, setRaise] = useState(0)
    const isPlayingRef = useRef(isPlaying)

    useEffect(() => {
        isPlayingRef.current = isPlaying
    }, [isPlaying])

    useEffect(() => {
        function amountCheck() {
            if (activeSeekRef.current) {
                const fontSize = parseFloat(getComputedStyle(activeSeekRef.current).fontSize)
                const width = activeSeekRef.current.clientWidth
                const eachWidth = SVG_WIDTH_EM * fontSize

                setAmount(Math.ceil(width / eachWidth) + 1)
            }
        }

        const observer = new ResizeObserver(() => {
            amountCheck()
        })

        if (activeSeekRef.current) {
            observer.observe(activeSeekRef.current)
        }

        const interval = setInterval(() => {
            if (isPlayingRef.current) {
                setTranslate((prev) => {
                    const dec = 0.02
                    let newval = prev - dec
                    if (newval < -SVG_WIDTH_EM) newval += SVG_WIDTH_EM

                    if (activeSeekRef.current) {
                        const fontSize = parseFloat(
                            getComputedStyle(activeSeekRef.current).fontSize,
                        )
                        const width = activeSeekRef.current.clientWidth
                        const eachWidth = SVG_WIDTH_EM * fontSize

                        // 0.75 is the dot height / 4, idk why but it works
                        const sineX =
                            (-width / eachWidth + newval / SVG_WIDTH_EM + 0.75 / 2 / SVG_WIDTH_EM) *
                            2 *
                            Math.PI
                        const height = -Math.sin(sineX) * 0.1
                        setRaise(height)
                    }

                    return newval
                })
            }
        }, 50)

        return () => {
            if (activeSeekRef.current) {
                observer.unobserve(activeSeekRef.current)
            }
            clearInterval(interval)
        }
    }, [])

    function generateSines(amount: number) {
        const el: ReactNode[] = []
        for (let i = 0; i < amount; i++) {
            el.push(<Sine key={'sine' + i} />)
        }

        return el
    }

    return (
        <>
            <div ref={activeSeekRef} className={style.seekFirst}>
                <div className={style.waveContainer}>
                    <div
                        className={style.waves}
                        ref={wavesRef}
                        style={{ transform: `translateX(${translate}em)` }}
                    >
                        {generateSines(amount)}
                    </div>
                </div>
                <div
                    className={style.dot}
                    style={{ transform: `translate(-50%, calc(-50% + ${raise}em))` }}
                />
            </div>
            <div className={style.seekSecond}></div>
        </>
    )
})

const Controller = memo(function Controller({ audio }: props) {
    const [isPlaying, setIsPlaying] = useState(!audio.current.paused)
    const [progress, setProgress] = useState(audio.current.currentTime / audio.current.duration)

    const gridTemplate = `${progress * 100}% ${100 - progress * 100}%`

    function onclick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left

        const width = e.currentTarget.clientWidth
        audio.current.currentTime = (x * audio.current.duration) / width
        setProgress(x / width)
    }

    useEffect(() => {
        function onpause() {
            setIsPlaying(false)
        }

        function onplay() {
            setIsPlaying(true)
        }

        function seekUpdate() {
            setProgress(audio.current.currentTime / audio.current.duration)
        }

        audio.current.addEventListener('pause', onpause)
        audio.current.addEventListener('play', onplay)
        audio.current.addEventListener('timeupdate', seekUpdate)

        return () => {
            audio.current.removeEventListener('pause', onpause)
            audio.current.removeEventListener('play', onplay)
            audio.current.removeEventListener('timeupdate', seekUpdate)
        }
    }, [])

    return (
        <div className={style.controller}>
            <img
                src={isPlaying ? pauseButton : playButton}
                onClick={() => (isPlaying ? audio.current.pause() : audio.current.play())}
            />
            <div
                onClick={onclick}
                className={style.seek}
                style={{ gridTemplateColumns: gridTemplate }}
            >
                <Seekbar isPlaying={isPlaying} />
            </div>
        </div>
    )
})

export default Controller
