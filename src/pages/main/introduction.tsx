import React, { useEffect, useState } from 'react'
import myself from '../../img/myself.jpg'
import style from './introduction.module.scss'

interface props {
    height: number
    inView: boolean
}

export default function Introduction({ height, inView }: props) {
    const [titleActive, setTitleActive] = useState(false)
    const [descriptionActive, setDescriptionActive] = useState(false)
    const [picActive, setPicActive] = useState(false)

    useEffect(() => {
        setTimeout(() => setTitleActive(inView), 300)
        setTimeout(() => setPicActive(inView), 700)
        setTimeout(() => setDescriptionActive(inView), 1100)
    }, [inView])

    return (
        <div style={{ height: `${height}px` }} className={style.container}>
            <div className={style.contentContainer}>
                <span className={style.title + ' ' + (titleActive ? style.show : '')}>
                    A frontend web developer.
                </span>
                <span className={style.description + ' ' + (descriptionActive ? style.show : '')}>
                    And sometimes, a backend developer too.
                </span>
            </div>
            <div style={{ position: 'relative' }}>
                <div className={style.zigzag} />
                <div className={style.pic + ' ' + (picActive ? style.show : '')}>
                    <img alt={'picture of Steven'} src={myself} />
                </div>
                <div className={style.picShadow + ' ' + (picActive ? style.show : '')} />
            </div>
            <div className={style.right} />
        </div>
    )
}
