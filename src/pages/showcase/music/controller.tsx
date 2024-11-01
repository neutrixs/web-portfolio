import React, { memo, useEffect, useState } from 'react'
import style from './music.module.scss'
import pauseButton from '../../../img/pause-cropped.svg'
import playButton from '../../../img/play-cropped.svg'

interface props {
    audio: React.MutableRefObject<HTMLAudioElement>
}

const Controller = memo(function Controller({ audio }: props) {
    const [isPlaying, setIsPlaying] = useState(!audio.current.paused)

    useEffect(() => {
        function onpause() {
            setIsPlaying(false)
        }

        function onplay() {
            setIsPlaying(true)
        }

        audio.current.addEventListener('pause', onpause)
        audio.current.addEventListener('play', onplay)

        return () => {
            audio.current.removeEventListener('pause', onpause)
            audio.current.removeEventListener('play', onplay)
        }
    }, [])

    return (
        <div className={style.controller}>
            <img
                src={isPlaying ? pauseButton : playButton}
                onClick={() => (isPlaying ? audio.current.pause() : audio.current.play())}
            />
        </div>
    )
})

export default Controller
