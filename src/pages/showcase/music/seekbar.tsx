import React, { memo, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import style from './music.module.scss'
import { EMToPX, Point } from '../../../scripts/util'
import BezierEasing from 'bezier-easing'

const SVG_WIDTH_EM = 2
const LONG_TERM_ANIMATION_INTERVAL_MS = 10
const WAVES_ANIMATION_DECREMENT = 0.01
const SEEKER_DOT_WIDTH_EM = 1.5
const STROKE_WIDTH = 1.6
const BEZIER_CURVES: Point[] = [
    { x: 0.16, y: 0.86 },
    { x: 0.28, y: 0.97 },
]
const HALF_SINE_CURVES: Point[] = [
    { x: 0.5, y: 0.75 },
    { x: 1, y: 1 },
    { x: Math.PI / 2, y: 1 },
    { x: Math.PI - 1, y: 1 },
    { x: Math.PI - 0.5, y: 0.75 },
    { x: Math.PI, y: 0.5 },
]

interface SineProps {
    repeatingWavesAmount: number
    translateWavesEM: number
    isPlaying: boolean
    animationMultiplier: number
}

interface SeekbarProps {
    isPlaying: boolean
}

function wavesAmountCheck(seekerElement: HTMLDivElement) {
    const width = seekerElement.clientWidth
    const singleWaveWidth = EMToPX(SVG_WIDTH_EM, seekerElement)

    return Math.ceil(width / singleWaveWidth) + 1
}

function wavesTranslator(prev: number, animationMultiplier: number) {
    let newPosition = prev - WAVES_ANIMATION_DECREMENT * animationMultiplier
    // will be changed just slightly before -width to prevent visual artifacts
    if (newPosition < -SVG_WIDTH_EM) newPosition += SVG_WIDTH_EM
    return newPosition
}

function seekerDotRaiser(seekerElement: HTMLDivElement, waveTranslation: number) {
    const width = seekerElement.clientWidth
    const waveWidth = EMToPX(SVG_WIDTH_EM, seekerElement)
    // waveTranslation advances the x pos for the sin(x) therefore must be accounted here
    // think of x as the progress percentage
    // after that, it's multiplied by 2PI
    const xRelative = width / waveWidth - waveTranslation / SVG_WIDTH_EM
    const xPI = xRelative * 2 * Math.PI

    // 0.1 because we don't wanna go crazy
    return Math.sin(xPI) * 0.1
}

function generateSineWavePath(amount: number, isPlaying: boolean) {
    const length = 2 * Math.PI * amount
    let path = `M ${length} 0.5`
    for (let i = 0; i < amount * 2; i++) {
        const even = !(i % 2)
        for (let j = 0; j < HALF_SINE_CURVES.length; j++) {
            let data = !(j % 3) ? 'C' : ''
            const curve = HALF_SINE_CURVES[j]
            const y = even ? 1 - curve.y : curve.y
            data += `${length - curve.x - i * Math.PI} ${isPlaying ? y : 0.5}`
            if ((j + 1) % 3) data += ','
            path += data
        }
    }

    return path
}

const Sine = memo((props: SineProps) => {
    const { isPlaying, repeatingWavesAmount, translateWavesEM, animationMultiplier } = props
    const [progress, setProgress] = useState(0)
    const [pathLength, setPathLength] = useState(0)
    const halfStroke = STROKE_WIDTH / 2
    const vbLength = repeatingWavesAmount * 2 * Math.PI
    const realLength = repeatingWavesAmount * SVG_WIDTH_EM
    const realOffset = (halfStroke * SVG_WIDTH_EM) / (2 * Math.PI)
    const pathRef = useRef<SVGPathElement>(null)
    const pathD = useMemo(
        () => generateSineWavePath(repeatingWavesAmount, isPlaying),
        [isPlaying, repeatingWavesAmount],
    )

    useLayoutEffect(() => {
        const pathLength = pathRef.current?.getTotalLength() || 0
        setPathLength(pathLength)
        setProgress((1 + (translateWavesEM - 0.1) / realLength) * pathLength)
    }, [isPlaying, repeatingWavesAmount, translateWavesEM, animationMultiplier])

    return (
        <svg
            viewBox={`${-halfStroke} ${-halfStroke} ${vbLength + halfStroke} ${1 + STROKE_WIDTH}`}
            width={realLength + realOffset + 'em'}
        >
            <path
                ref={pathRef}
                d={pathD}
                fill="none"
                stroke="#33ff99"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeDasharray={`${progress}, ${pathLength}`}
            />
        </svg>
    )
})

const Seekbar = memo(({ isPlaying }: SeekbarProps) => {
    const seekerElementRef = useRef(document.createElement('div'))
    const [repeatingWavesAmount, setRepeatingWavesAmount] = useState(1)
    // The SVG contains 2x sine wave, and we only use the right part
    // due to the fact that, if otherwise, some part of the stroke might get cut
    // because the viewbox cuts vertically, and not at an angle
    const [translateWavesEM, setTranslateWavesEM] = useState(0)
    const [raiseSeekerDotEM, setRaiseSeekerDotEM] = useState(0)
    const [animationMultiplier, setAnimationMultiplier] = useState(0)
    const animationMultiplierRef = useRef(0)
    // some logic (not rendering logic) requires its property
    const isPlayingRef = useRef(isPlaying)
    // prevents workerInterval from calculating stuff when there's literally nothing to do
    const isAnimationPlaying = useRef(false)
    const translateWavesEMRef = useRef(translateWavesEM)
    useLayoutEffect(() => {
        isPlayingRef.current = isPlaying
        translateWavesEMRef.current = translateWavesEM
        animationMultiplierRef.current = animationMultiplier
    }, [isPlaying, translateWavesEM, animationMultiplier])

    useEffect(() => {
        const observer = new ResizeObserver(() =>
            setRepeatingWavesAmount(wavesAmountCheck(seekerElementRef.current)),
        )
        observer.observe(seekerElementRef.current)

        const workerInterval = setInterval(() => {
            if (!isAnimationPlaying.current) return
            const newTranslatePos = wavesTranslator(
                translateWavesEMRef.current,
                animationMultiplierRef.current,
            )
            setTranslateWavesEM(newTranslatePos)
            setRaiseSeekerDotEM(seekerDotRaiser(seekerElementRef.current, newTranslatePos))
        }, LONG_TERM_ANIMATION_INTERVAL_MS)

        return () => {
            observer.disconnect()
            clearInterval(workerInterval)
        }
    }, [])

    useEffect(() => {
        const duration = 1000
        const startTime = +new Date()
        const easing = BezierEasing(
            BEZIER_CURVES[0].x,
            BEZIER_CURVES[0].y,
            BEZIER_CURVES[1].x,
            BEZIER_CURVES[1].y,
        )

        function animate() {
            const t = (+new Date() - startTime) / duration
            const multiplier = easing(t)

            setAnimationMultiplier(isPlaying ? multiplier : 1 - multiplier)

            if (+new Date() - startTime < duration && isPlaying == isPlayingRef.current) {
                requestAnimationFrame(animate)
                return
            }
            // using the ref because isPlaying won't be up to date by the time the animation has finished
            if (!isPlayingRef.current) isAnimationPlaying.current = false
        }

        if (isPlaying) isAnimationPlaying.current = true

        animate()
    }, [isPlaying])

    return (
        <>
            <div ref={seekerElementRef} className={style.seekFirst}>
                <div className={style.waveContainer}>
                    <div
                        className={style.waves}
                        style={{ transform: `translateX(${translateWavesEM}em)` }}
                    >
                        <Sine
                            {...{
                                repeatingWavesAmount,
                                translateWavesEM,
                                isPlaying,
                                animationMultiplier,
                            }}
                        />
                    </div>
                </div>
                <div
                    className={style.dot}
                    style={{
                        transform: `translate(-50%, calc(-50% + ${
                            raiseSeekerDotEM * animationMultiplier
                        }em))`,
                        width: `${SEEKER_DOT_WIDTH_EM}em`,
                    }}
                />
            </div>
            <div className={style.seekSecond} />
        </>
    )
})

export default Seekbar
