import React, { memo, useEffect, useState, useRef, ReactNode } from 'react'
import style from './music.module.scss'
import pauseButton from '../../../img/pause.svg'
import playButton from '../../../img/play.svg'

const SVG_WIDTH_EM = 2
const PATH_LENGTH = 16.09857

interface props {
    audio: React.MutableRefObject<HTMLAudioElement>
    ctimeOverriden: React.MutableRefObject<boolean>
    ctimeOverride: React.MutableRefObject<number>
}

interface SeekbarProps {
    isPlaying: boolean
}

interface SineProps {
    isPlaying: boolean
    isFirst: boolean
    percentActive: number
}

const Sine = memo(function Sine({ isFirst, percentActive, isPlaying }: SineProps) {
    // the movement is just slightly slower than the div's movement, so there's this magic constant
    const percentage = 0.4 * (1 - percentActive * 1.03) * PATH_LENGTH

    const active = `M 16.9572 0
  16.9572 0, 16.4893 0.25615, 16 0.5
 C 15.5107 0.25615, 15.0420 0, 14.5 0
 C 13.9571 0, 13.4892 0.25615, 13 0.5
 C 12.5107 0.75615, 12.0421 1, 11.5 1
 C 10.9570 1, 10.4890 0.75615, 10 0.5
 C 9.5104 0.25615, 9.0426 0, 8.5 0
 C 7.9567 0, 7.4888 0.25615, 7 0.5
 C 6.5107 0.75615, 6.0428 1, 5.5 1
 C 4.9570 1, 4.4890 0.75615, 4 0.5
 C 3.5107 0.75615, 3.0428 1, 2.5 1
`

    const passive = `M 16.9572 0.5
  16.9572 0.5, 16.4893 0.5, 16 0.5
 C 15.5107 0.5, 15.0420 0.5, 14.5 0.5
 C 13.9571 0.5, 13.4892 0.5, 13 0.5
 C 12.5107 0.5, 12.0421 0.5, 11.5 0.5
 C 10.9570 0.5, 10.4890 0.5, 10 0.5
 C 9.5104 0.5, 9.0426 0.5, 8.5 0.5
 C 7.9567 0.5, 7.4888 0.5, 7 0.5
 C 6.5107 0.5, 6.0428 0.5, 5.5 0.5
 C 4.9570 0.5, 4.4890 0.5, 4 0.5
 C 3.5107 0.5, 3.0428 0.5, 2.5 0.5

`

    return (
        <svg
            width="1000"
            height="105"
            viewBox="4 0 12 1"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: `${SVG_WIDTH_EM * 2}em` }}
        >
            <path
                d={isPlaying ? active : passive}
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
                        isPlaying={isPlaying}
                    />,
                )
            } else {
                el.push(
                    <Sine
                        key={'sine' + i}
                        isFirst={false}
                        percentActive={0}
                        isPlaying={isPlaying}
                    />,
                )
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

const Controller = memo(function Controller({ audio, ctimeOverride, ctimeOverriden }: props) {
    const [isPlaying, setIsPlaying] = useState(!audio.current.paused)
    const [progress, setProgress] = useState(audio.current.currentTime / audio.current.duration)
    const isSeeking = useRef(false)
    const controllerSeek = useRef<HTMLDivElement>(null)

    const gridTemplate = `${progress * 100}% ${100 - progress * 100}%`

    function formatTime(seconds: number) {
        const minutes = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${minutes}:${secs.toString().padStart(2, '0')}`
    }

    useEffect(() => {
        function onpause() {
            setIsPlaying(false)
        }

        function onplay() {
            setIsPlaying(true)
        }

        function seekUpdate() {
            if (isSeeking.current) return
            setProgress(audio.current.currentTime / audio.current.duration)
        }

        function startDrag(e: MouseEvent | TouchEvent): void {
            isSeeking.current = true
            drag(e)

            document.addEventListener('mousemove', drag)
            document.addEventListener('touchmove', drag)
            e.preventDefault()
        }

        function drag(e: MouseEvent | TouchEvent): void {
            const rect = controllerSeek.current?.getBoundingClientRect() as DOMRect
            let x: number = 0

            if (e instanceof MouseEvent) {
                x = e.clientX - rect.left
            } else if (e instanceof TouchEvent) {
                x = e.touches[0].clientX - rect.left
            }

            const width = controllerSeek.current?.clientWidth ?? 0
            x = Math.min(width, Math.max(0, x))

            setProgress(x / width)
            ctimeOverriden.current = true
            ctimeOverride.current = (x / width) * audio.current.duration
        }

        function stopDrag() {
            document.removeEventListener('mousemove', drag)
            document.removeEventListener('touchmove', drag)
            if (isSeeking.current) {
                isSeeking.current = false
                ctimeOverriden.current = false
                audio.current.currentTime = ctimeOverride.current
            }
        }

        audio.current.addEventListener('pause', onpause)
        audio.current.addEventListener('play', onplay)
        audio.current.addEventListener('timeupdate', seekUpdate)

        controllerSeek.current?.addEventListener('touchstart', startDrag)
        controllerSeek.current?.addEventListener('mousedown', startDrag)
        document.addEventListener('mouseup', stopDrag)
        document.addEventListener('touchend', stopDrag)

        return () => {
            audio.current.removeEventListener('pause', onpause)
            audio.current.removeEventListener('play', onplay)
            audio.current.removeEventListener('timeupdate', seekUpdate)

            controllerSeek.current?.removeEventListener('touchstart', startDrag)
            controllerSeek.current?.removeEventListener('mousedown', startDrag)
            document.removeEventListener('mouseup', stopDrag)
            document.removeEventListener('touchend', stopDrag)
        }
    }, [])

    return (
        <div className={style.controller}>
            <img
                src={isPlaying ? pauseButton : playButton}
                onClick={() => (isPlaying ? audio.current.pause() : audio.current.play())}
            />
            <div className={style.controllerRightSide}>
                <div
                    className={style.seek}
                    style={{ gridTemplateColumns: gridTemplate }}
                    ref={controllerSeek}
                >
                    <Seekbar isPlaying={isPlaying} />
                </div>
                <div className={style.progressTime}>
                    <p>{formatTime(Math.floor(progress * audio.current.duration))}</p>
                    <p>{formatTime(Math.floor(audio.current.duration))}</p>
                </div>
            </div>
        </div>
    )
})

export default Controller
