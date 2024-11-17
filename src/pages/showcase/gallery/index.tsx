import React, { useEffect, useMemo, useRef, useState } from 'react'
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

export function useGalleryRestoreState() {
    const [images, setImages] = useState<imageMetadata[]>([])
    const [initialized, setInitialized] = useState(false)

    return useMemo(
        () => ({
            images,
            setImages,
            initialized,
            setInitialized,
        }),
        [images, setImages, initialized, setInitialized],
    )
}

export default function Gallery({ urls, galleryState }: GalleryProps) {
    const { images, setImages, initialized, setInitialized } = galleryState
    const fetchID = useRef(0)

    // ID will be compared to fetchID
    // if it's not the same, the execution will stop
    // useful in case of sudden detach and re-attach
    async function fetchImages(id: number) {
        // TODO: support other image formats too
        const listToUse = urls?.current ? urls.current : await getImagesURLs()
        const imgLists = listToUse.filter((u) => u.endsWith('.webp'))
        const tmpImages: imageMetadata[] = []
        let schedulerID = setTimeout(() => {})
        let lastScheduleTime = 0

        function fetchCallback(i: number, size: Size) {
            if (id != fetchID.current) return
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
    }

    useEffect(() => {
        if (initialized) {
            return
        }
        setInitialized(true)
        const id = +new Date()
        fetchID.current = id
        fetchImages(id)
    }, [])

    return (
        <div className={style.container}>
            <Layout images={images} />
        </div>
    )
}
