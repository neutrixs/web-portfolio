import React, { memo, useEffect, useState, useRef, ReactNode } from 'react'
import style from './music.module.scss'
import pauseButton from '../../../img/pause-cropped.svg'
import playButton from '../../../img/play-cropped.svg'

const SVG_WIDTH_EM = 2
const PATH_LENGTH = 13.3135

interface props {
    audio: React.MutableRefObject<HTMLAudioElement>
}

interface SeekbarProps {
    isPlaying: boolean
}

interface SineProps {
    isFirst: boolean
    percentActive: number
}

const Sine = memo(function Sine({ isFirst, percentActive }: SineProps) {
    const percentage = 0.4 * (1 - percentActive) * PATH_LENGTH

    return (
        <svg
            width="1000"
            height="105"
            viewBox="4.7117 0 12.56 1"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: `${SVG_WIDTH_EM * 2}em` }}
        >
            <path
                d=" M 18.2801 0
    18.2801 0, 17.7901 0.25615, 17.2777 0.5
   C 16.7654 0.25615, 16.2755 0, 15.707 0
   C 15.1385 0, 14.6485 0.25615, 14.1361 0.5
   C 13.6238 0.75615, 13.1338 1, 12.5653 1
   C 11.9968 1, 11.5068 0.75615, 10.9944 0.5
   C 10.4821 0.25615, 9.9922 0, 9.4236 0
   C 8.8551 0, 8.3651 0.25615, 7.853 0.5
   C 7.3409 0.75615, 6.8509 1, 6.2823 1
   C 5.7138 1, 5.2238 0.75615, 4.7117 0.5
   C 4.1994 0.75615, 3.7094 1, 3.1409 1"
                fill="none"
                stroke="#33ff99"
                strokeWidth="1.6"
                {...{
                    strokeDasharray: isFirst ? `${percentage}, ${PATH_LENGTH}` : undefined,
                    strokeLinecap: isFirst ? 'round' : 'square',
                }}
            />
        </svg>
    )
})

const Seekbar = memo(function Seekbar({ isPlaying }: SeekbarProps) {
    const activeSeekRef = useRef<HTMLDivElement>(null)
    const wavesRef = useRef<HTMLDivElement>(null)
    const [amount, setAmount] = useState(1)
    const [translate, setTranslate] = useState(-SVG_WIDTH_EM)
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

                setAmount(Math.ceil(width / eachWidth / 2) + 1)
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
                    if (newval < -1.8 * SVG_WIDTH_EM) newval += SVG_WIDTH_EM

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
            if (i == 0) {
                el.push(
                    <Sine
                        key={'sine' + i}
                        isFirst={true}
                        percentActive={-(translate + SVG_WIDTH_EM) / SVG_WIDTH_EM}
                    />,
                )
            } else {
                el.push(<Sine key={'sine' + i} isFirst={false} percentActive={0} />)
            }
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
