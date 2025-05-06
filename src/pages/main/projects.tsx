import React, { useEffect, useState } from 'react'
import linkIcon from '../../img/open_link.svg'
import spotifinfoScreenshot from '../../img/screenshot/spotifinfo.png'
import tictactoeScreenshot from '../../img/screenshot/tictactoe.png'
import radarScreenshot from '../../img/screenshot/radar.png'
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
                    <span>Made with React in Typescript</span>
                    <a href={'https://github.com/neutrixs/spotifinfo'} target={'_blank'}>
                        Github
                    </a>
                </div>
                <div className={style.project}>
                    <img src={tictactoeScreenshot} alt={'Screenshot of Tic Tac Toe'} />
                    <a
                        className={style.projTitle}
                        href={'https://tictactoe.neutrixs.my.id'}
                        target={'_blank'}
                    >
                        <span>Tic-Tac-Toe</span>
                        <img src={linkIcon} alt={'Open link'} />
                    </a>
                    <span>A very simple tic-tac-toe game written in vanilla JavaScript.</span>
                    <span>Uses neumorphic UI design.</span>
                    <a href={'https://github.com/neutrixs/tic-tac-toe'} target={'_blank'}>
                        Github
                    </a>
                </div>
                <div className={style.project}>
                    <img src={radarScreenshot} alt={'Screenshot of radar'} />
                    <a
                        className={style.projTitle}
                        href={'https://github.com/neutrixs/bmkg-radar'}
                        target={'_blank'}
                    >
                        <span>bmkg-radar</span>
                        <img src={linkIcon} alt={'Open link'} />
                    </a>
                    <span>
                        An experimental Discord bot for showing weather radar images for Indonesia.
                    </span>
                    <span>Written in Rust.</span>
                    <a href={'https://github.com/neutrixs/bmkg-radar'} target={'_blank'}>
                        Github
                    </a>
                </div>
            </div>
        </div>
    )
}
