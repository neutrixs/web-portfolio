import React, { useState } from 'react'
import style from './style.module.scss'

interface props {
    image: string
    url: string
    zindex: number
    index: number
    currentIndex: number
}

export default function Card({ image, url, zindex, index, currentIndex }: props) {
    const [randomRotation] = useState(Math.random() * 30 - 15)

    return (
        <div className={style.cardContainer} style={{ zIndex: zindex }}>
            <div
                className={style.card}
                style={{ transform: `rotateX(5deg) rotate(${randomRotation}deg)` }}
            >
                <div className={style.img}>
                    <img src={image} />
                </div>
            </div>
        </div>
    )
}
