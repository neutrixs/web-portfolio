import React, { useEffect, useState } from 'react'
import linkIcon from '../../img/open_link.svg'
import spotifinfoScreenshot from '../../img/screenshot/spotifinfo.png'
import style from './projects.module.scss'

interface props {
    height: number
    inView: boolean
}

export default function Projects({ height, inView }: props) {
    const [titleShow, setTitleShow] = useState(false)

    useEffect(() => {
        if (inView) {
            setTimeout(() => setTitleShow(true), 300)
        } else {
            setTitleShow(false)
        }
    }, [inView])

    return (
        <div className={style.container} style={{ height: `${height}px` }}>
            <p className={style.title + (titleShow ? ` ${style.show}` : '')}>My Projects</p>
            <div className={style.content}>
                <div className={style.project}>
                    <img src={spotifinfoScreenshot} alt={'Screenshot of Spotifinfo'} />
                    <a
                        className={style.projTitle}
                        href={'https://spotifinfo.neutrixs.my.id'}
                        target={'_blank'}
                    >
                        <span>Spotifinfo</span>
                        <img src={linkIcon} alt={'Open link'} />
                    </a>
                    <span>
                        Stats for your Spotify account, including your recently played, top tracks,
                        etc.
                    </span>
                    <a href={'https://github.com/neutrixs/spotifinfo'} target={'_blank'}>
                        Github
                    </a>
                </div>
            </div>
        </div>
    )
}
