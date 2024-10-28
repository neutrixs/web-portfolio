import React, { useEffect, useState } from 'react'
import style from './about.module.scss'

interface props {
    height: number
    inView: boolean
}

export default function About({ height, inView }: props) {
    const [aboutShow, setAboutShow] = useState(false)
    const [languagesShow, setLanguagesShow] = useState(false)

    useEffect(() => {
        setTimeout(() => setAboutShow(inView), 300)
        setTimeout(() => setLanguagesShow(inView), 700)
    }, [inView])

    function gen2Dots() {
        const dots: React.ReactNode[] = []
        for (let i = 0; i < 2; i++) {
            dots.push(
                <div className={style.dotsContainer} key={'dots' + i}>
                    <div className={style.dot} />
                </div>,
            )
        }

        return dots
    }

    return (
        <div style={{ height: `${height}px` }} className={style.container}>
            <div className={style.about + ' ' + (aboutShow ? style.show : '')}>
                <span className={style.title}>About me</span>
                <span className={style.description}>
                    My name is Ihsan Maulana Rakhman. However, you may call me by my second name,
                    Steven. I started coding when I was about 13 years old. I learned to code by my
                    own with the help of online guides. I also love photography.
                </span>
            </div>
            {gen2Dots()}
            <div className={style.languages + ' ' + (languagesShow ? style.show : '')}>
                <span className={style.title}>Languages</span>
                <span className={style.description}>
                    The languages I speak are Javascript, Typescript, and Go. But, I'm currently
                    learning C and C++.
                </span>
            </div>
        </div>
    )
}
