import React from 'react'
import style from './music.module.scss'
import coloraturaImg from '../../../img/coloratura.png'

export default function Music() {
    return (
        <div className={style.container}>
            <div className={style.info}>
                <img src={coloraturaImg} />
                <div>
                    <span>Coloratura</span>
                    <span>Coldplay</span>
                </div>
            </div>
        </div>
    )
}
