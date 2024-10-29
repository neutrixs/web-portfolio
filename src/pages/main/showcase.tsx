import React from 'react'
import style from './showcase.module.scss'
import galleryIcon from '../../img/gallery.svg'
import musicIcon from '../../img/music.svg'

interface props {
    height: number
    inView: boolean
}

export default function Showcase({ height, inView }: props) {
    return (
        <div className={style.container} style={{ height }}>
            <p className={style.title}>HAVE A LOOK</p>
            <div className={style.showcase}>
                <div>
                    <img src={galleryIcon} />
                    <span>Photo Gallery</span>
                </div>
                <div>
                    <img src={musicIcon} />
                    <span>Favorite Song</span>
                </div>
            </div>
        </div>
    )
}
