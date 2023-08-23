import React from 'react'
import style from './style.module.scss'

interface props {
    inView: boolean
    height: number
}

export default function Projects({ inView, height }: props) {
    return (
        <div className={style.container} style={{ height: height.toString() + 'px' }}>
            <div></div>
        </div>
    )
}
