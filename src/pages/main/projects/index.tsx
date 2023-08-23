import React from 'react'
import style from './style.module.scss'

interface props {
    inView: boolean
}

export default function Projects({ inView }: props) {
    return (
        <div className={style.container}>
            <div></div>
        </div>
    )
}
