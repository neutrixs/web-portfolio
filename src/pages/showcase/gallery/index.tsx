import React, { useEffect, useMemo, useState } from 'react'
import style from './gallery.module.scss'
import Layout, { imageMetadata } from './layout'
import WebPDecoder, { Size } from '../../../scripts/webpdecoder'

const BASE_URL = 'https://neutrixs.my.id/gallery/'

interface nginxIndexing {
    name: string
    type: string
    mtime: string
    size: number
}

interface GalleryProps {
    urls?: React.MutableRefObject<string[]>
    galleryState: ReturnType<typeof useGalleryRestoreState>
}

export async function getImagesURLs() {
    const request = await fetch(BASE_URL)
    const imagesData = (await request.json()) as nginxIndexing[]

    return imagesData.map((img) => BASE_URL + img.name)
}

async function getMeta(url: string) {
    const resp = await fetch(url, { headers: { Range: 'bytes=0-31' } })
    const header = await resp.arrayBuffer()
    const image = new WebPDecoder(header)
    return image.decoder.decode().getDimension()
}

export function useGalleryRestoreState(allowRunning?: boolean) {
    const [images, setImages] = useState<imageMetadata[]>([])
    const [urls, setUrls] = useState<string[]>([])
    const [initialized, setInitialized] = useState(false)

    useEffect(() => {
        getImagesURLs().then((u) => setUrls(u))
    }, [])

    useEffect(() => {
        // TODO: support other image formats too
        if (urls.length == 0 || allowRunning === false || initialized) return
        setInitialized(true)

        let shouldStillRun = true

        const imgLists = urls.filter((u) => u.endsWith('.webp'))
        const tmpImages: imageMetadata[] = []
        let schedulerID = setTimeout(() => {})
        let lastScheduleTime = 0

        function fetchCallback(i: number, size: Size) {
            if (!shouldStillRun) return
            tmpImages[i] = { url: imgLists[i], ratio: size.width / size.height }

            const ctime = +new Date()
            if (ctime - lastScheduleTime > 500) {
                clearTimeout(schedulerID)
                lastScheduleTime = ctime
                setImages(() => [...tmpImages])
                return
            }
            clearTimeout(schedulerID)
            schedulerID = setTimeout(() => {
                lastScheduleTime = ctime
                setImages(() => [...tmpImages])
            }, 500)
        }

        for (let i = 0; i < imgLists.length; i++) {
            getMeta(imgLists[i]).then((size) => fetchCallback(i, size))
        }

        return () => {
            clearTimeout(schedulerID)
            shouldStillRun = false
        }
    }, [urls, allowRunning])

    return useMemo(() => ({ images }), [images])
}

export default function Gallery({ galleryState }: GalleryProps) {
    const { images } = galleryState

    return (
        <div className={style.container}>
            <Layout images={images} />
        </div>
    )
}
