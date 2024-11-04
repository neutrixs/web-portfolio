import React, { memo, useEffect, useState, useRef, ReactNode } from 'react'
import Seekbar from './seekbar'
import style from './music.module.scss'
import pauseButton from '../../../img/pause.svg'
import playButton from '../../../img/play.svg'

interface props {
    audio: React.MutableRefObject<HTMLAudioElement>
    ctimeOverriden: React.MutableRefObject<boolean>
    ctimeOverride: React.MutableRefObject<number>
}

const Controller = memo(function Controller({ audio, ctimeOverride, ctimeOverriden }: props) {
    const [isPlaying, setIsPlaying] = useState(!audio.current.paused)
    const [progress, setProgress] = useState(audio.current.currentTime / audio.current.duration)
    const isSeeking = useRef(false)
    const controllerSeek = useRef<HTMLDivElement>(null)
    const REAL_DURATION_NO_NAN = isNaN(audio.current.duration) ? 0 : audio.current.duration

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
            const newProgress = audio.current.currentTime / audio.current.duration
            setProgress(isNaN(newProgress) ? 0 : newProgress)
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
                    <p>{formatTime(Math.floor(progress * REAL_DURATION_NO_NAN))}</p>
                    <p>{formatTime(Math.floor(REAL_DURATION_NO_NAN))}</p>
                </div>
            </div>
        </div>
    )
})

export default Controller
