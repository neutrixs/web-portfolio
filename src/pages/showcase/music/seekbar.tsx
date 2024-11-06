import React, { memo, ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react'
import style from './music.module.scss'
import { EMToPX, Point } from '../../../scripts/util'
import BezierEasing from 'bezier-easing'

const SVG_WIDTH_EM = 2
const SVG_WIDTH_ACTUAL_EM = 4
const PATH_LENGTH = 16.09857
const PASSIVE_PATH_LENGTH = 14.8572
const LONG_TERM_ANIMATION_INTERVAL_MS = 10
const WAVES_ANIMATION_DECREMENT = 0.01
const SEEKER_DOT_WIDTH_EM = 1.5
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
    isPlaying: boolean
    isFirst: boolean
    percentActive: number
    animationMultiplier: number
}

interface SeekbarProps {
    isPlaying: boolean
}

function wavesAmountCheck(seekerElement: HTMLDivElement) {
    const width = seekerElement.clientWidth
    const singleWaveWidth = EMToPX(SVG_WIDTH_EM, seekerElement)

    const factor = SVG_WIDTH_ACTUAL_EM / SVG_WIDTH_EM
    return Math.ceil(width / singleWaveWidth / factor) + 1
}

function wavesTranslator(prev: number, animationMultiplier: number) {
    let newPosition = prev - WAVES_ANIMATION_DECREMENT * animationMultiplier
    // will be changed just slightly before -width to prevent visual artifacts
    if (newPosition < -1.8 * SVG_WIDTH_EM) newPosition += SVG_WIDTH_EM
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

function generateSineWavePath(amount: number) {
    const length = 2 * Math.PI * amount
    let path = `M ${length} 0.5`
    for (let i = 0; i < amount * 2; i++) {
        const even = !(i % 2)
        for (let j = 0; j < HALF_SINE_CURVES.length; j++) {
            let data = !(j % 3) ? 'C' : ''
            const curve = HALF_SINE_CURVES[j]
            data += `${length - curve.x - i * Math.PI} ${even ? 1 - curve.y : curve.y}`
            if ((j + 1) % 3) data += ','
            path += data
        }
    }

    return path
}

function generateSineWaves(
    amount: number,
    translateWavesEM: number,
    isPlaying: boolean,
    animationMultiplier: number,
) {
    const elements: ReactNode[] = []
    for (let i = 0; i < amount; i++) {
        elements.push(
            <Sine
                key={'sine' + i}
                isFirst={i == 0}
                percentActive={i == 0 ? -(translateWavesEM + SVG_WIDTH_EM) / SVG_WIDTH_EM : 0}
                isPlaying={isPlaying}
                animationMultiplier={i == 0 ? animationMultiplier : 0}
            />,
        )
    }
    return elements
}

const Sine = memo(({ isFirst, isPlaying, percentActive, animationMultiplier }: SineProps) => {
    const chosenPathLength =
        PASSIVE_PATH_LENGTH + (PATH_LENGTH - PASSIVE_PATH_LENGTH) * animationMultiplier
    const percentage = 0.4 * (1 - percentActive) * chosenPathLength
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
        C 3.5107 0.75615, 3.0428 1, 2.5 1`

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
        C 3.5107 0.5, 3.0428 0.5, 2.5 0.5`

    return (
        <svg viewBox="4 0 12 1" style={{ width: `${SVG_WIDTH_ACTUAL_EM}em` }}>
            <path
                d={isPlaying ? active : passive}
                fill="none"
                stroke="#33ff99"
                strokeWidth="1.6"
                {...{
                    strokeDasharray: `${isFirst ? percentage : PATH_LENGTH}, ${PATH_LENGTH}`,
                    strokeLinecap: isFirst ? 'round' : 'square',
                }}
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
    const [translateWavesEM, setTranslateWavesEM] = useState(-SVG_WIDTH_EM)
    const [raiseSeekerDotEM, setRaiseSeekerDotEM] = useState(0)
    const [animationMultiplier, setAnimationMultiplier] = useState(0)
    const animationMultiplierRef = useRef(0)
    // some logic (not rendering logic) requires its property
    const isPlayingRef = useRef(isPlaying)
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
            const newTranslatePos = wavesTranslator(
                translateWavesEMRef.current,
                animationMultiplierRef.current,
            )
            setTranslateWavesEM(newTranslatePos)
            setRaiseSeekerDotEM(seekerDotRaiser(seekerElementRef.current, newTranslatePos))
        }, LONG_TERM_ANIMATION_INTERVAL_MS)

        ;(window as any).kontol = generateSineWavePath

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
            }
        }

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
                        {generateSineWaves(
                            repeatingWavesAmount,
                            translateWavesEM,
                            isPlaying,
                            animationMultiplier,
                        )}
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
