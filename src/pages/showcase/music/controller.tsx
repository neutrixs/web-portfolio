import React, { memo, useEffect, useState, useRef } from 'react'
import style from './music.module.scss'
import pauseButton from '../../../img/pause-cropped.svg'
import playButton from '../../../img/play-cropped.svg'

interface props {
    audio: React.MutableRefObject<HTMLAudioElement>
}

interface SeekbarProps {
    isPlaying: boolean
}

const sine = (
    <svg width="500" height="105" viewBox="0 0 6.2832 1" xmlns="http://www.w3.org/2000/svg">
        <path
            d="
  M -3.1416 0.5
  C -1.0022 0, -0.5123 0.25615, 0 0.5
  M 0 0.5
  C 0.5123 0.75615, 1.0023 1, 1.5708 1
  C 2.1393 1, 2.6293 0.75615, 3.1416 0.5
  M 3.1416 0.5
  C 3.654 0.25615, 4.144 0, 4.7124 0
  C 5.281 0, 5.7709 0.25615, 6.2832 0.5
  M 6.2832 0.5
  C 6.7955 0.75615, 7.2855 1, 7.853 1
"
            fill="none"
            stroke="#33ff99"
            stroke-width="0.5"
        />
    </svg>
)

const Seekbar = memo(function Seekbar({ isPlaying }: SeekbarProps) {
    const activeSeekRef = useRef<HTMLDivElement>(null)

    return (
        <>
            <div ref={activeSeekRef} className={style.seekFirst}>
                {sine}
                <div className={style.dot} />
            </div>
            <div className={style.seekSecond}></div>
        </>
    )
})

const Controller = memo(function Controller({ audio }: props) {
    const [isPlaying, setIsPlaying] = useState(!audio.current.paused)
    const [progress, setProgress] = useState(audio.current.currentTime / audio.current.duration)

    const gridTemplate = `${progress * 100}% ${100 - progress * 100}%`

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
            <div className={style.seek} style={{ gridTemplateColumns: gridTemplate }}>
                <Seekbar isPlaying={isPlaying} />
            </div>
        </div>
    )
})

export default Controller
