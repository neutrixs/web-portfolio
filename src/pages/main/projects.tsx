import React from 'react'
import style from './projects.module.scss'

interface props {
    height: number
    inView: boolean
}

export default function Projects({ height, inView }: props) {
    return (
        <div className={style.container} style={{ height: `${height}px` }}>
            <p className={style.title + (inView ? ` ${style.show}` : '')}>My Projects</p>
        </div>
    )
}
