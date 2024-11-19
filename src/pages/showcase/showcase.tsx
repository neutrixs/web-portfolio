import React, { ReactNode, useContext, useEffect, useRef, useState } from 'react'
import songsData from './music/lyrics'
import Music, { useMusicRestoreState } from './music'
import Gallery, { useGalleryRestoreState } from './gallery'

import style from './showcase.module.scss'
import galleryIcon from '../../img/gallery.svg'
import musicIcon from '../../img/music.svg'
import backIcon from '../../img/back.svg'
import { ScrollableContext } from '../../context'

interface props {
    height: number
    inView: boolean
}

enum subpanelMenus {
    gallery,
    music,
}

export default function Showcase({ height, inView }: props) {
    const [titleShow, setTitleShow] = useState(false)
    const [galleryShow, setGalleryShow] = useState(false)
    const [musicShow, setMusicShow] = useState(false)
    const [subpanelShow, setSubpanelShow] = useState(false)
    const [subpanelTitle, setSubpanelTitle] = useState('')
    const [subpanelID, setSubpanelID] = useState(subpanelMenus.gallery)
    const musicState = useMusicRestoreState()
    const galleryState = useGalleryRestoreState()
    const audio = useRef(new Audio(songsData[0].audioURL))

    const { setScrollable } = useContext(ScrollableContext)

    useEffect(() => {
        if (inView) {
            setTimeout(() => setTitleShow(true), 300)
            setTimeout(() => setGalleryShow(true), 600)
            setTimeout(() => setMusicShow(true), 900)
        } else {
            setTitleShow(false)
            setGalleryShow(false)
            setMusicShow(false)
        }
    }, [inView])

    useEffect(() => {
        if (setScrollable) setScrollable(!subpanelShow)
    }, [subpanelShow])

    function openSubpanel(id: subpanelMenus) {
        setSubpanelShow(true)
        setSubpanelID(id)
        switch (id) {
            case subpanelMenus.gallery:
                setSubpanelTitle('Photo Gallery')
                return
            case subpanelMenus.music:
                setSubpanelTitle('Favorite Songs')
                return
            default:
                setSubpanelTitle('')
                return
        }
    }

    function subpanelContent(): ReactNode {
        switch (subpanelID) {
            case subpanelMenus.gallery:
                return <Gallery {...{ galleryState }} />
            case subpanelMenus.music:
                return <Music {...{ audio, musicState }} />
            default:
                return null
        }
    }

    return (
        <div className={style.container} style={{ height }}>
            <div className={style.showcasePanel}>
                <p className={style.title + ' ' + (titleShow ? style.show : '')}>HAVE A LOOK</p>
                <div className={style.showcase}>
                    <div className={galleryShow ? style.show : ''}>
                        <div
                            className={style.showcaseElement}
                            onClick={() => openSubpanel(subpanelMenus.gallery)}
                        >
                            <img alt={'gallery icon'} src={galleryIcon} />
                            <span>Photo Gallery</span>
                        </div>
                    </div>
                    <div className={musicShow ? style.show : ''}>
                        <div
                            className={style.showcaseElement}
                            onClick={() => openSubpanel(subpanelMenus.music)}
                        >
                            <img alt={'music icon'} src={musicIcon} />
                            <span>Favorite Songs</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.subPanel + ' ' + (subpanelShow ? style.show : '')}>
                <div className={style.navigation}>
                    <img alt="back button" src={backIcon} onClick={() => setSubpanelShow(false)} />
                    <span>{subpanelTitle}</span>
                </div>
                {subpanelShow ? subpanelContent() : null}
            </div>
        </div>
    )
}
