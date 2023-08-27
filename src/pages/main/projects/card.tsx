import React, { useEffect, useRef, useState } from 'react'
import style from './style.module.scss'

interface props {
    image: string
    url: string
    zindex: number
    index: number
    currentIndex: number
}

const DEF_ROTATE_X = '5deg'

function getRandomRotation() {
    return Math.random() * 30 - 15
}

export default function Card({ image, url, zindex, index, currentIndex }: props) {
    const [randomRotation, setRandomRotation] = useState(getRandomRotation())
    const [rotateX, setRotateX] = useState(DEF_ROTATE_X)
    const [scale, setScale] = useState(1)
    const [pop, setPop] = useState(false)

    const [cardELement, setCardElement] = useState<HTMLDivElement | null>(null)
    const locked = useRef(false)

    useEffect(() => {
        if (!cardELement) return

        function enter() {
            locked.current = true
            setPop(true)
        }

        function leave() {
            if (locked.current) {
                locked.current = false
                return
            }
            setPop(false)
        }

        cardELement.addEventListener('click', enter)
        document.body.addEventListener('click', leave)

        return () => {
            cardELement.removeEventListener('click', enter)
            document.body.removeEventListener('click', leave)
        }
    }, [cardELement])

    useEffect(() => {
        if (pop && index != currentIndex) return setPop(false)

        setRotateX(pop ? '0' : DEF_ROTATE_X)
        setRandomRotation(pop ? 0 : getRandomRotation())
        setScale(pop ? 1.5 : 1)
    }, [pop])

    function mouseEvent(popVal: boolean) {
        if (index != currentIndex) return
        setPop(popVal)
    }

    return (
        <div className={style.cardContainer} style={{ zIndex: zindex }}>
            <div
                className={style.card}
                style={{
                    transform: `rotateX(${rotateX}) rotate(${randomRotation}deg) scale(${scale})`,
                }}
                ref={setCardElement}
                onMouseEnter={() => mouseEvent(true)}
                onMouseLeave={() => mouseEvent(false)}
            >
                <div className={style.roundedContainer}>
                    <img src={image} />
                    <div className={style.open} style={{ opacity: pop ? 1 : 0 }}>
                        <div className={style.openButton}>Open</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
