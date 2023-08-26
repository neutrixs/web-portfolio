import React, { useEffect, useState } from 'react'
import style from './style.module.scss'

interface props {
    inView: boolean
    height: number
}

export default function Projects({ inView, height }: props) {
    const [show, setShow] = useState(' ')

    useEffect(() => {
        setTimeout(() => setShow(' ' + (inView ? style.show : '')), 500)
    }, [inView])

    return (
        <div className={style.container} style={{ height: height.toString() + 'px' }}>
            <p className={style.title + show}>My Projects</p>
        </div>
    )
}
